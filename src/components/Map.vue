<template>
  <v-container fluid id="mapWrapper" pa-0>
    <v-layout row wrap>

      <v-flex xs12 lg9 id="map-inner-wrapper">
        <v-flex id="map-nav-wrapper">
          <v-toolbar dense floating  class="my-3 d-flex">
            <v-text-field
              hide-details
              prepend-icon="fas fa-search"
              single-line
              grow
              label="Wyszukaj partnera"
              ></v-text-field>
            <v-btn icon @click="centerMap">
              <v-icon>fas fa-map-marker-alt</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
        <div id="map"></div>
      </v-flex>

      <v-flex xs12 lg3>
        <v-card class="ma-1">
         <v-card-title><h2 class="text-xs-center">Lista partnerów w Twojej okolicy</h2></v-card-title>
          <v-list>
            <v-list-tile v-for="partner in partners" :key="partner.id" @click="centerMap(partner.lat,partner.lang)">
              <v-list-tile-avatar>
                <v-icon>
                  fas fa-shopping-cart
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>{{partner.name}}</v-list-tile-title>
              <v-list-tile-action>-{{partner.discount*100}}%</v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'Map',
  data () {
    return {
      map: {},

      markers: {},
      myMarker: null,
      myPos: {
        lat: 50.020526,
        lang: 21.983588,
      },
      partners: [
        {
          id: 1,
          name: 'McDonalds',
          discount: 0.1,
          lat: 51,
          long: 19,
        }
      ],
    }
  },
  methods: {

    createMap () {
      this.map = L.map('map').setView([this.myPos.lat, this.myPos.lang], 13)
      L.tileLayer(`https://api.mapbox.com/styles/v1/karlos20/cjvtdel6n0p4r1co9sajy9so9/tiles/{z}/{x}/{y}?access_token=${this.$store.state.apiToken}`,
        {attribution: 'Map data &copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18, id: 'mapbox.streets',
          accessToken: this.$store.state.apiToken}).addTo(this.map);
    },
    addMarker(lat,long,id){
       const marker = L.marker([lat, long]).addTo(this.map);
       this.markers.id = marker;
       //$router.push({ name: 'partner', params: { partnerID: 'partner.id' } })
    },
    fetchPartners(){

      this.partners.forEach(partner=>{
        this.addMarker(partner.lat,partner.long,partner.id);
      });
    },
    centerMap(lat,lang){
      this.map.setView([lat, lang], 15);
    },
  },
  mounted () {
    console.log(this.$store.state.apiToken)
    this.createMap()
    this.myMarker = L.marker([this.myPos.lat, this.myPos.lang]).addTo(this.map);
  }
}
</script>

<style scoped>
  #map {
    width:100%;
    height:  90vh;
    z-index: 0;
  }
  #mapWrapper{
    width:100%;
    height: 100%;

  }
  #map-nav-wrapper{
    width:100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  #map-inner-wrapper{
    position: relative;
  }
  #map-nav-wrapper >* {
    position: relative;
    width:75%;
    margin-left:12.5%
  }

</style>
