<!-- src/views/experts/EditExpert.vue -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Especialista" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update" v-if="expert">
            <!-- Nome -->
            <div class="form-group">
              <input
                v-model="expert.nome"
                type="text"
                class="form-control form-control-lg"
                id="txtNome"
                placeholder="Nome do especialista"
                required
              />
            </div>

            <!-- Área de atuação -->
            <div class="form-group">
              <input
                v-model="expert.area"
                type="text"
                class="form-control form-control-lg"
                id="txtArea"
                placeholder="Área de atuação"
              />
            </div>

            <!-- Email -->
            <div class="form-group">
              <input
                v-model="expert.email"
                type="email"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="Email"
                required
              />
            </div>

            <!-- Telefone -->
            <div class="form-group">
              <input
                v-model="expert.telefone"
                type="text"
                class="form-control form-control-lg"
                id="txtTelefone"
                placeholder="Telefone"
              />
            </div>

            <!-- Descrição / Bio -->
            <div class="form-group">
              <textarea
                v-model="expert.descricao"
                class="form-control form-control-lg"
                id="txtDescricao"
                placeholder="Descrição / bio do especialista"
                rows="4"
              ></textarea>
            </div>

            <!-- Ativo -->
            <div class="form-group">
              <b-form-checkbox v-model="expert.active">
                Especialista ativo
              </b-form-checkbox>
            </div>

            <!-- Botões (padrão Editar Animal) -->
            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2"
            >
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{ name: 'listExperts' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import { EDIT_EXPERT } from "@/store/especialistas/especialista.constants";

export default {
  name: "EditExpert",
  components: { HeaderPage },
  data() {
    return {
      expert: null
    };
  },
  computed: {
    ...mapGetters("especialista", ["getExpertById", "getMessage"])
  },
  methods: {
    update() {
      this.$store
        .dispatch(`especialista/${EDIT_EXPERT}`, this.expert)
        .then(
          () => {
            this.$alert(
              this.getMessage,
              "Especialista atualizado!",
              "success"
            );
            router.push({ name: "listExperts" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.expert = this.getExpertById(this.$route.params.expertId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>
