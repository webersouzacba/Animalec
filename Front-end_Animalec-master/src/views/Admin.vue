<template>
  <section class="page-section">
    <b-container fluid>
      <HeaderPage title="Gestão do Animalec"/>

      <b-row class="justify-content-center">

        <!-- Coluna central com largura automática -->
        <b-col cols="12" md="8" lg="6">

          <!-- Linha 1 -->
          <b-card-group deck>
            <AdminOptionBox routeName="listUsers"      iconName="users"            title="Utilizadores"/>
            <AdminOptionBox routeName="listAnimals"    iconName="dog"              title="Animais"/>
          </b-card-group>

          <!-- Linha 2 -->
          <b-card-group deck class="mt-3">
            <AdminOptionBox routeName="listQuizzes"     iconName="file-alt"        title="Quizzes"/>
            <AdminOptionBox routeName="listQuestions"   iconName="question-circle" title="Questões"/>
          </b-card-group>

          <!-- Linha 3 (NOVA) -->
          <b-card-group deck class="mt-3">
            <AdminOptionBox routeName="listSponsors"    iconName="handshake"       title="Patrocinadores"/>
            <AdminOptionBox routeName="listExperts"     iconName="user-tie"        title="Especialistas"/>
          </b-card-group>

        </b-col>

      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: { HeaderPage, AdminOptionBox }
};
</script>