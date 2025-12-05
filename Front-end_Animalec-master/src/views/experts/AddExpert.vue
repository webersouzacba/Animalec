<!-- src/views/experts/AddExpert.vue -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="nome"
                type="text"
                class="form-control form-control-lg"
                id="txtNome"
                placeholder="Nome do especialista"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="area"
                type="text"
                class="form-control form-control-lg"
                id="txtArea"
                placeholder="Área de atuação"
              />
            </div>

            <div class="form-group">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="Email"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="telefone"
                type="text"
                class="form-control form-control-lg"
                id="txtTelefone"
                placeholder="Telefone"
              />
            </div>

            <div class="form-group">
              <textarea
                v-model="descricao"
                class="form-control form-control-lg"
                id="txtDescricao"
                placeholder="Descrição / bio do especialista"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2 mt-2"
            >
              <i class="fas fa-save"></i> ADICIONAR
            </button>
            <router-link
              :to="{ name: 'listExperts' }"
              tag="button"
              class="btn btn-outline-info btn-lg mt-2"
            >
              <i class="fas fa-arrow-left"></i> VOLTAR
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
import { ADD_EXPERT } from "@/store/especialistas/especialista.constants";

export default {
  name: "AddExpert",
  components: { HeaderPage },
  data() {
    return {
      nome: "",
      area: "",
      descricao: "",
      email: "",
      telefone: ""
    };
  },
  computed: {
    ...mapGetters("especialista", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`especialista/${ADD_EXPERT}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Especialista adicionado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
