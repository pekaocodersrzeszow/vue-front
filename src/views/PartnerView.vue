<template>
    <v-container fluid fill-height class="wrapper">
      <v-layout>
        <v-flex xs11 md6 class="mx-auto my-auto">
          <v-card class="pa-3 ">
            <h1>Punkt partnera:</h1>
            <v-divider class="my-3"></v-divider>
            <v-card-title class="justify-center"><h1>

              {{partner.name}}
            </h1>
            </v-card-title>
            <h3 class="text-xs-center">
              <v-icon class="mx-2">
              {{this.$props.categories[this.$props.partner.category-1].icon}}
            </v-icon>{{this.$props.categories[this.$props.partner.category-1].name}}</h3>
            <v-card-text class="text-xs-center">

              <span>jakis adres moze?</span>
              <h2 class="my-3">Kupując u tego sprzedawcy zaoszczędziłeś już: <span class="primary--text">{{savings}} PLN</span></h2>
              <div id="discount-wrapper" class="mx-auto">

                <h2>-{{partner.discount*100}}%</h2>
              </div>
              <div id="mapa" class="mx-auto"></div>
            </v-card-text>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import L from 'leaflet'
  export default {
    name: 'PartnerView',
    props: ['partner','categories'],
    data(){
      return {

      }
    },
    computed: {
      savings(){
        return parseFloat(8*Math.random()/Math.random()).toFixed(2);
      }
    },
    mounted () {
      const mapp = L.map('mapa').setView([this.$props.partner.lat, this.$props.partner.long], 16)
      L.tileLayer(`https://api.mapbox.com/styles/v1/karlos20/cjvtdel6n0p4r1co9sajy9so9/tiles/{z}/{x}/{y}?access_token=${this.$store.state.apiToken}`,
        {attribution: 'Map data &copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18, id: 'mapbox.streets',
          accessToken: this.$store.state.apiToken}).addTo(mapp);

     const markerIcon = L.icon.glyph({
        glyphColor: 'white',
        prefix: 'fa',
        glyph: this.$props.categories[this.$props.partner.category-1].icon

      });
       L.marker([this.$props.partner.lat, this.$props.partner.long], {icon: markerIcon}).addTo(mapp);
    }

  }
</script>

<style scoped>
#discount-wrapper{
  position: relative;
  width:140px;
  height: 60px;
  background-image: url("~@/assets/discount.png");
  background-size: contain;
}
  #discount-wrapper h2{
    text-align: center;
    position: absolute;

    color:white;
    left:32%;
    top:25%;

  }
  #mapa{
    max-width:400px;
    height: 400px;
    margin:1rem;
  }
  .wrapper{
    background-image: url("~@/assets/login-bg.jpg");
    background-size: cover;
  }
</style>
