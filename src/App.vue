<template>
  <v-app >

    <Navbar app/>
    <v-content app>
      <v-container fill-height fluid class="pa-0">

        <router-view></router-view>

      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<style>

  body{
    margin: 0;
  }


</style>
<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  export default {
    components: { Footer, Navbar },


  }
</script>
