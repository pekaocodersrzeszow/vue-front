<template>
    <v-container fluid fill-height class="pa-0 ma-0" id="container">
      <v-layout class="pa-3" row wrap style="height: auto;">
        <v-card class="mx-auto pa-3 card-view" xs12 lg10 >
          <h2>Poleć nasz program lojalnościowy swoim znajomym: </h2>
          <v-list class="transparent">
            <v-list-tile v-for="friend in friends">
              <v-list-tile-avatar>
                <v-icon>
                  fas fa-user-circle
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>
              {{friend.name}}
              </v-list-tile-title>
              <v-list-tile-action>
                <v-btn :class="friend.invited? '':'success'"  icon :disabled="friend.invited" @click="friend.invited = true">
                  <v-icon>
                    {{friend.invited? 'fas fa-check-circle':'fas fa-plus'}}
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'Recommend',
    data(){
      return {
        friends: [
          { name: 'Marek',
          invited:false},
          { name: 'Ania',
            invited:false},
          { name: 'Piotrek',
            invited:false},
          { name: 'Karol',
            invited:false},
          { name: 'Wojtek',
            invited:false},
          { name: 'Agnieszka',
            invited:false},
          { name: 'Wojtek',
            invited:false},
          { name: 'Jacek',
            invited:false},

        ],
      }
    },
  }
</script>

<style scoped>
#container{
  background-image: url("../assets/login-bg.jpg");
  background-size: cover;
}
  .card-view{
    background-color: rgba(255,255,255,0.8);
  }
</style>
