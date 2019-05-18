<template >
<div class="elevation-2 nav-wrapper">
  <span class="" >
    <v-toolbar clipped-left class="container no-shadow transparent pa-0" >
    <v-toolbar-side-icon
      @click.stop="drawer = !drawer"
      class="hidden-md-and-up">
    </v-toolbar-side-icon>
   <router-link class="brand" to="/">
     <img  src="../assets/logo_desktop.png"/>
   </router-link>
   <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down"  >


    </v-toolbar-items>
      <div class="user-state-container hidden-sm-and-down">
        <v-btn  round class="primary "  >
          <v-icon class="menu-icon">
           fas fa-map-marked-alt
          </v-icon>
            Mapa partnerów
        </v-btn>
        <v-btn round  class="primary "  >
          <v-icon class="menu-icon">
           fas fa-piggy-bank
          </v-icon>
           Twoje rabaty
        </v-btn>
        <v-btn  round class="primary "  >
          <v-icon class="menu-icon">
           fas fa-users
          </v-icon>
           Poleć znajomym
        </v-btn>
      </div>

  </v-toolbar>
  </span>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      disable-resize-watcher
      id = "drawer"
    >
      <div class=" px-5 py-3">
        <router-link class="headline text-xs-center" to="/">
          <img class="mobile-logo"  src="../assets/logo_desktop.png"/>
        </router-link>
      </div>
      <v-divider></v-divider>
      <v-list class="pa-0">
        <v-list-tile to="/" >
          <v-list-tile-content>
            <v-list-tile-title>
              <v-icon class="menu-icon">
                fas fa-map-marked-alt
              </v-icon>

              Mapa partnerów</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider> </v-divider>
        <v-list-tile to="/list" >
          <v-list-tile-content>
            <v-list-tile-title>
              <v-icon class="menu-icon">
                fas fa-piggy-bank
              </v-icon>
              Twoje rabaty</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
         <v-divider> </v-divider>
        <v-list-tile to="/list" >
          <v-list-tile-content>

            <v-list-tile-title>
              <v-icon class="menu-icon">
                fas fa-users
              </v-icon> Poleć znajomym
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider> </v-divider>


        </v-list>

    </v-navigation-drawer>

  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,

    };
  },

};
</script>

<style scoped>
  .nav-wrapper{
    z-index: 12;
    display: block;
  }

  .no-shadow{
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow:  none !important;
  }
  .brand h3{
    width:100%;
    text-transform: capitalize;
    text-decoration: none;

  }

  .user-state-container{
    margin:auto 0.5rem auto 0.5rem;

  }
  .user-state-container .v-btn{
      margin-top: 0;
      margin-bottom: 0;
      padding-top:0.5rem;
      padding-bottom: 0.5rem;
  }

  #drawer a{
    text-decoration: none;
  }
  .mobile-logo{
    width:100%;
    height: auto;
  }
  .menu-icon{
    margin-right: 0.5rem;
  }

</style>
