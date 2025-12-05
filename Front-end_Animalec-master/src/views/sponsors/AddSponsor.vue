<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Patrocinador" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="save">
            <!-- Nome -->
            <div class="form-group">
              <label>Nome</label>
              <input
                v-model="patrocinador.nome"
                type="text"
                class="form-control form-control-lg"
                required
              />
            </div>

            <!-- Nível de patrocínio -->
            <div class="form-group">
              <label>Nível de patrocínio</label>
              <select
                v-model="patrocinador.nivelPatrocinioId"
                class="form-control form-control-lg"
              >
                <option disabled value="">Selecione um nível</option>
                <option
                  v-for="opt in nivelOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.text }}
                </option>
              </select>
            </div>

            <!-- Email de contacto -->
            <div class="form-group">
              <label>Email de contacto</label>
              <input
                v-model="patrocinador.emailContacto"
                type="email"
                class="form-control form-control-lg"
                required
              />
            </div>

            <!-- Website -->
            <div class="form-group">
              <label>Website</label>
              <input
                v-model="patrocinador.website"
                type="text"
                class="form-control form-control-lg"
              />
            </div>

            <!-- Área / Setor -->
            <div class="form-group">
              <label>Área / Setor</label>
              <input
                v-model="patrocinador.areaSetor"
                type="text"
                class="form-control form-control-lg"
              />
            </div>

            <!-- Descrição / Notas -->
            <div class="form-group">
              <label>Descrição / Notas</label>
              <textarea
                v-model="patrocinador.descricaoNotas"
                class="form-control"
                rows="3"
              ></textarea>
            </div>

            <!-- Ativo -->
            <div class="form-group form-check">
              <input
                v-model="patrocinador.active"
                type="checkbox"
                class="form-check-input"
                id="chkActive"
              />
              <label class="form-check-label" for="chkActive">
                Ativo
              </label>
            </div>

            <!-- Botões -->
            <button type="submit" class="btn btn-primary btn-lg">
              Guardar
            </button>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import patrocinadorService from "@/api/patrocinador.service";
import API_URL from "@/api/config.js";
import { mapGetters } from "vuex";


export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },

  data() {
    return {
      patrocinador: {
        nome: "",
        logotipoUrl: "",
        areaSetor: "",
        nivelPatrocinioId: "",
        nivelPatrocinioNome: "",
        emailContacto: "",
        website: "",
        descricaoNotas: "",
        active: true
      },
      nivelOptions: []
    };
  },

  computed: {
    ...mapGetters("auth", ["token"])
  },

  created() {
    this.loadNiveis();
  },

  methods: {
    async loadNiveis() {
      try {
        const response = await fetch(`${API_URL}/niveisPatrocinio`, {  
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token
            }
          }
        );

        const result = await response.json();

        if (result.body) {
          this.nivelOptions = result.body.map(nivel => ({
            value: nivel._id,
            text: nivel.nome
          }));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Erro carregando níveis:", e);
        alert("Erro carregando níveis de patrocínio."+e);
      }
    },

    async save() {
      try {
        // validação simples no front
        if (!this.patrocinador.nivelPatrocinioId) {
          alert("Selecione um nível de patrocínio.");
          return;
        }

        if (!this.patrocinador.emailContacto) {
          alert("Informe o email de contacto.");
          return;
        }

        // preencher o nome textual do nível
        const nivelSelecionado = this.nivelOptions.find(
          n => n.value === this.patrocinador.nivelPatrocinioId
        );

        this.patrocinador.nivelPatrocinioNome = nivelSelecionado
          ? nivelSelecionado.text
          : "";

        const response = await patrocinadorService.addSponsor(
          this.token,
          this.patrocinador
        );

        if (response.ok) {
          this.$router.push({ name: "listSponsors" });
        } else {
          let erro;

          try {
            erro = await response.json();
          } catch (e) {
            erro = null;
          }

          const msg =
            (erro && (erro.message || erro.code)) ||
            "Erro ao guardar patrocinador.";

          alert("Erro ao guardar patrocinador: " + msg);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        alert("Erro inesperado ao guardar patrocinador.");
      }
    }
  }
};
</script>
