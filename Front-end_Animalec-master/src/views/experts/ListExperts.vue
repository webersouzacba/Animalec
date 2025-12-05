<!-- src/views/experts/ListExperts.vue -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Especialistas" />

      <!-- MENU TOPO (igual Animais / Patrocinadores) -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addExpert' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR ESPECIALISTA
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
                <th scope="col">ÁREA</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ESTADO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expert in experts" :key="expert._id">
                <td class="pt-4">{{ expert.nome }}</td>
                <td class="pt-4">{{ expert.area }}</td>
                <td class="pt-4">{{ expert.email }}</td>
                <td class="pt-4">
                  <span
                    class="badge"
                    :class="expert.active ? 'badge-success' : 'badge-secondary'"
                  >
                    {{ expert.active ? "Ativo" : "Inativo" }}
                  </span>
                </td>
                <!-- AÇÕES: alinhadas em uma linha -->
                <td class="text-nowrap">
                  <router-link
                    :to="{ name: 'editExpert', params: { expertId: expert._id } }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                    @click="viewExpert(expert._id)"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                    @click="removeExpert(expert._id)"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>

              <tr v-if="experts.length === 0">
                <td colspan="5" class="text-center text-muted">
                  Nenhum especialista registado.
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
import { mapGetters } from "vuex";
import {
  FETCH_EXPERTS,
  REMOVE_EXPERT
} from "@/store/especialistas/especialista.constants";

export default {
  name: "ListExperts",
  components: { HeaderPage },

  data() {
    return {
      experts: []
    };
  },

  computed: {
    // namespace do módulo no store: "especialista"
    ...mapGetters("especialista", ["getExperts", "getMessage"])
  },

  methods: {
    fetchExperts() {
      this.$store.dispatch(`especialista/${FETCH_EXPERTS}`).then(
        () => {
          this.experts = this.getExperts;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },

    viewExpert(id) {
      const expert = this.experts.find(e => e._id === id);
      if (!expert) return;

      this.$fire({
        title: expert.nome,
        html: `
          <h5>Área: ${expert.area || "-"}</h5>
          <p><b>Email:</b> ${expert.email || "-"}</p>
          <p><b>Telefone:</b> ${expert.telefone || "-"}</p>
          <p><b>Descrição:</b> ${expert.descricao || "-"}</p>
          <p><b>Estado:</b> ${expert.active ? "Ativo" : "Inativo"}</p>
        `
      });
    },

    removeExpert(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o especialista?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store
            .dispatch(`especialista/${REMOVE_EXPERT}`, id)
            .then(() => {
              this.$alert(this.getMessage, "Especialista removido!", "success");
              this.fetchExperts();
            });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },

  created() {
    this.fetchExperts();
  }
};
</script>

<style scoped>
.page-section {
  padding-top: 2rem;
}
</style>
