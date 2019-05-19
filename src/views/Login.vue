<template>
<v-container fluid fill-height text-xs-center id="login-wrapper">
  <v-layout row >
    <v-flex md6 lg4 xs12 align-center class="mx-auto my-auto">
      <v-card class=" pa-4 text-xs-center card-view"  >
        <v-card-title><h1>Logowanie</h1></v-card-title>
        <v-form v-if="!isLogged">
          <v-text-field v-model="username" required label="Użytkownik"></v-text-field>
          <v-text-field v-model="password" required type="password" label="Hasło"></v-text-field>
          <v-btn @click="login" class="primary ">Zaloguj się</v-btn>
          <v-divider class="my-3"></v-divider>
          <a @click="goTo('Register')" class="text--secondary">Nie masz jeszcze konta? Załóż je!</a>
        </v-form>
        <h2 v-else text-xs-center>
          Jesteś już zalogowany jako {{`${store.state.getUserData.name} ${store.state.getUserData.surname}`}}
        </h2>
      </v-card>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showTip: false,
    };
  },
  methods: {
    login() {
      this.$router.push('/');
    },
    goTo(path) {
      this.$router.push({ name: path });
    },
  },
  computed: {
    isLogged() {
      return this.$store.state.loginSession;
    },
  },
};
</script>

<style scoped>
#login-wrapper{
  background-image: url("~@/assets/login.jpg");
  -webkit-background-size: cover;
  background-size: cover;
}
  .card-view{
    background-color: rgba(255,255,255,0.85);
  }
</style>
