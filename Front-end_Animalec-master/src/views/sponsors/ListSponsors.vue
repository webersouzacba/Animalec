<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />

      <!-- MENU TOPO -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addSponsor' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR
          </router-link>
          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!-- TABELA -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">NOME</th>
                <th scope="col">ÁREA / SETOR</th>
                <th scope="col">WEBSITE</th>
                <th scope="col">ATIVO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="patrocinador in patrocinadores"
                :key="patrocinador._id"
              >
                <td class="pt-4">
                  {{ patrocinador.nome }}
                </td>
                <td class="pt-4">
                  {{ patrocinador.areaSetor }}
                </td>
                <td class="pt-4">
                  <a
                    v-if="patrocinador.website"
                    :href="patrocinador.website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ patrocinador.website }}
                  </a>
                  <span v-else>-</span>
                </td>
                <td class="pt-4">
                  <span
                    class="badge"
                    :class="
                      patrocinador.active ? 'badge-success' : 'badge-secondary'
                    "
                  >
                    {{ patrocinador.active ? "Ativo" : "Inativo" }}
                  </span>
                </td>

                <!-- AÇÕES: EDITAR / VER / REMOVER (em uma linha) -->
                <td class="text-nowrap">
                  <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: patrocinador._id }
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                    @click="verPatrocinador(patrocinador._id)"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                    @click="remover(patrocinador._id)"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>

              <tr v-if="patrocinadores.length === 0">
                <td colspan="5" class="text-center text-muted">
                  Nenhum patrocinador registado.
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import patrocinadorService from "@/api/patrocinador.service";
import { mapGetters } from "vuex";

export default {
  name: "ListSponsors",
  components: { HeaderPage },

  data() {
    return {
      patrocinadores: []
    };
  },

  computed: {
    ...mapGetters("auth", ["token"])
  },

  created() {
    this.carregarPatrocinadores();
  },

  methods: {
    async carregarPatrocinadores() {
      try {
        const result = await patrocinadorService.getSponsors(this.token);
        this.patrocinadores = result.body || [];
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Erro ao carregar patrocinadores:", e);
      }
    },

    // Botão VER (abre modal no mesmo estilo dos animais/especialistas)
    verPatrocinador(id) {
      const pat = this.patrocinadores.find(p => p._id === id);
      if (!pat) return;

      this.$fire({
        title: pat.nome,
        html: `
          <p><b>Área / Setor:</b> ${pat.areaSetor || "-"}</p>
          <p><b>Website:</b> ${
            pat.website
              ? `<a href="${pat.website}" target="_blank">${pat.website}</a>`
              : "-"
          }</p>
          <p><b>Email de contacto:</b> ${pat.emailContacto || "-"}</p>
          <p><b>Nível de patrocínio:</b> ${
            pat.nivelPatrocinioNome || "-"
          }</p>
          <p><b>Notas:</b> ${pat.descricaoNotas || "-"}</p>
          <p><b>Estado:</b> ${pat.active ? "Ativo" : "Inativo"}</p>
        `,
        imageUrl: pat.logotipoUrl || undefined,
        imageWidth: pat.logotipoUrl ? 300 : undefined,
        imageHeight: pat.logotipoUrl ? 150 : undefined,
        imageAlt: "Logotipo do patrocinador"
      });
    },

    async remover(id) {
      if (!confirm("Deseja mesmo remover este patrocinador?")) return;

      try {
        const response = await patrocinadorService.deleteSponsor(
          this.token,
          id
        );

        if (response.ok) {
          this.carregarPatrocinadores();
        } else {
          let erro;
          try {
            erro = await response.json();
          } catch (e) {
            erro = null;
          }
          // eslint-disable-next-line no-console
          console.error("Erro ao remover patrocinador", erro || response.status);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Erro ao remover patrocinador:", e);
      }
    }
  }
};
</script>

<style scoped>
.page-section {
  padding-top: 2rem;
}
</style>
