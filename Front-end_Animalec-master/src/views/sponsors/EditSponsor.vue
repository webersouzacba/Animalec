<!-- src/views/sponsors/EditSponsor.vue -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Patrocinador" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form v-if="sponsor" @submit.prevent="update">
            <!-- Nome -->
            <div class="form-group">
              <input
                v-model="sponsor.nome"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do patrocinador"
                required
              />
            </div>

            <!-- Logotipo URL -->
            <div class="form-group">
              <input
                v-model="sponsor.logotipoUrl"
                type="text"
                class="form-control form-control-lg"
                placeholder="URL do logotipo (/assets/img/logos/...)"
              />
            </div>

            <!-- Área / Setor -->
            <div class="form-group">
              <input
                v-model="sponsor.areaSetor"
                type="text"
                class="form-control form-control-lg"
                placeholder="Área / setor de atuação"
              />
            </div>

            <!-- Nível de Patrocínio -->
            <div class="form-group">
              <b-form-select
                v-model="sponsor.nivelPatrocinioId"
                class="form-control form-control-lg"
              >
                <option disabled value="">Selecione o nível de patrocínio</option>
                <option
                  v-for="nivel in nivelOptions"
                  :key="nivel.value"
                  :value="nivel.value"
                >
                  {{ nivel.text }}
                </option>
              </b-form-select>
            </div>

            <!-- Email -->
            <div class="form-group">
              <input
                v-model="sponsor.emailContacto"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email de contacto"
                required
              />
            </div>

            <!-- Website -->
            <div class="form-group">
              <input
                v-model="sponsor.website"
                type="text"
                class="form-control form-control-lg"
                placeholder="Website"
              />
            </div>

            <!-- Notas / Descrição -->
            <div class="form-group">
              <textarea
                v-model="sponsor.descricaoNotas"
                class="form-control form-control-lg"
                placeholder="Notas e informação detalhada"
                rows="4"
              ></textarea>
            </div>

            <!-- Ativo -->
            <div class="form-group">
              <b-form-checkbox v-model="sponsor.active">
                Patrocinador ativo
              </b-form-checkbox>
            </div>

            <!-- Botões (alinhados com Editar Animal) -->
            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2 mt-2"
            >
              <i class="fas fa-save"></i> ATUALIZAR
            </button>

            <router-link
              :to="{ name: 'listSponsors' }"
              tag="button"
              class="btn btn-outline-danger btn-lg mt-2"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import {
  EDIT_SPONSOR,
  FETCH_SPONSORS
} from "@/store/patrocinadores/patrocinador.constants";
import API_URL from "@/api/config.js";

export default {
  name: "EditSponsor",
  components: { HeaderPage },

  data() {
    return {
      sponsor: null,
      nivelOptions: []
    };
  },

  computed: {
    ...mapGetters("auth", ["token"]),
    ...mapGetters("patrocinador", ["getSponsorById", "getMessage"])
  },

  methods: {
    async update() {
      // atualiza o nome textual do nível
      const nivelSelecionado = this.nivelOptions.find(
        n => n.value === this.sponsor.nivelPatrocinioId
      );
      this.sponsor.nivelPatrocinioNome = nivelSelecionado
        ? nivelSelecionado.text
        : "";

      this.$store
        .dispatch(`patrocinador/${EDIT_SPONSOR}`, this.sponsor)
        .then(
          () => {
            this.$alert(
              this.getMessage,
              "Patrocinador atualizado!",
              "success"
            );
            router.push({ name: "listSponsors" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    },

    async loadNiveis() {
      try {
        const response = await fetch(`${API_URL}/niveisPatrocinio`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token
          }
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status} ao carregar níveis: ${text}`);
        }

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
        this.$alert(
          "Erro ao carregar níveis de patrocínio. " + e,
          "Erro",
          "error"
        );
      }
    }
  },

  async created() {
    const id = this.$route.params.sponsorId;

    // tenta vir do Vuex
    this.sponsor = this.getSponsorById(id);

    // se entrou direto na URL, carrega lista primeiro
    if (!this.sponsor) {
      await this.$store.dispatch(`patrocinador/${FETCH_SPONSORS}`);
      this.sponsor = this.getSponsorById(id);
    }

    await this.loadNiveis();
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>
