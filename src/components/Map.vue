<template>
  <v-container fluid id="mapWrapper" pa-0>
    <v-layout row wrap>

      <v-flex xs12 lg9 id="map-inner-wrapper">
        <v-flex id="map-nav-wrapper">
          <v-toolbar dense floating  class="my-3 d-flex">
            <v-text-field
              v-model="searchKey"
              hide-details
              prepend-icon="fas fa-search"
              single-line
              grow
              label="Wyszukaj partnera"
              class="mb-2"
              @click:prepend="searchPartners"
              ></v-text-field>
            <v-btn icon @click="centerMap(myPos.lat,myPos.lang)">
              <v-icon>fas fa-map-marker-alt</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
        <div id="map"></div>
      </v-flex>

      <v-flex xs12 lg3>
        <v-card class="ma-1">
         <v-card-title><h2 class="text-xs-center">Lista partnerów w Twojej okolicy</h2></v-card-title>
          <v-list v-if="partners.length>0">
            <v-list-tile v-for="partner in partners" :key="partner.id" @click="centerMap(partner.lat,partner.long)">
              <v-list-tile-avatar>
                <v-icon>
                  {{categories[partner.category-1].icon}}
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>{{partner.name}}</v-list-tile-title>
              <v-list-tile-action>-{{partner.discount*100}}%</v-list-tile-action>
            </v-list-tile>
          </v-list>
          <h4 class="pa-4 text--secondary" v-else>Brak partnertów w Twojej okolicy dla podanych kryteriów :(</h4>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import L from 'leaflet'
import 'leaflet.icon.glyph/Leaflet.Icon.Glyph'
export default {
  name: 'Map',
  data () {
    return {
      map: {},
      searchKey: '',
      markerGroup: {},
      myMarker: null,
      myPos: {
        lat: 50.020526,
        lang: 21.983588
      },
      fetchedPartners: [ {
        id: 1,
        name: 'McDonalds',
        discount: 0.1,
        lat: 51,
        long: 19,
        category: 2
      },
      {
        id: 2,
        name: 'Lidl',
        discount: 0.15,
        lat: 50.020278,
        long: 21.977706,
        category: 3
      },
      {
        id: 3,
        name: 'Kiosk',
        discount: 0.05,
        lat: 50.0196181,
        long: 21.9808197,
        category: 3
      }
      ],
      partners: [

      ],
      categories: [
        {
          id: 1,
          name: 'Lotniska',
          icon: 'fas fa-plane'
        },
        {
          id: 2,
          name: 'Restauracje',
          icon: 'fas fa-utensils'
        },
        {
          id: 3,
          name: 'Supermarkety',
          icon: 'fas fa-shopping-cart'
        }
      ]
    }
  },
  methods: {

    createMap () {
      this.map = L.map('map').setView([this.myPos.lat, this.myPos.lang], 13)
      L.tileLayer(`https://api.mapbox.com/styles/v1/karlos20/cjvtdel6n0p4r1co9sajy9so9/tiles/{z}/{x}/{y}?access_token=${this.$store.state.apiToken}`,
        { attribution: 'Map data &copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: this.$store.state.apiToken }).addTo(this.map)
      this.markerGroup = L.layerGroup().addTo(this.map)
    },
    addMarker (partner) {
      const markerIcon = L.icon.glyph({
        glyphColor: 'white',
        prefix: 'fa',
        glyph: this.categories[partner.category - 1].icon

      })

      const marker = L.marker([partner.lat, partner.long], { icon: markerIcon }).addTo(this.markerGroup)
      marker.bindPopup(this.createPopupData(partner))

      //  popup.on('click', ()=>{this.$router.push({ name: 'partner', params: { id: partner.id } }) });
      marker.on('click', () => { this.centerMap(partner.lat, partner.long) })
      marker.on('click', () => { this.map.remove();this.$router.push({ name: 'PartnerView', params: { id: partner.id, partner: partner,  categories: this.categories } }) })
    },
    createPopupData (partner) {
      // $router.push({ name: 'partner', params: { partnerID: 'partner.id' } })

      return `${partner.name}<br>
                Rabat: -${partner.discount * 100}%`
    },
    searchPartners () {
      // todo: branzza

      this.partners = this.fetchedPartners.filter(partner => partner.name.toUpperCase().includes(this.searchKey.toUpperCase()))
      this.refreshMarkers()
    },
    fetchPartners () {
      this.partners = this.fetchedPartners
      this.refreshMarkers()
    },
    centerMap (lat, lang) {
      this.map.setView([lat, lang], 15)
    },
    refreshMarkers () {
      this.map.removeLayer(this.markerGroup)
      this.markerGroup = L.layerGroup().addTo(this.map)
      this.partners.forEach(partner => {
        this.addMarker(partner)
      })
    }
  },
  mounted () {
    this.createMap()
    const markerIcon = L.icon.glyph({
      glyphColor: 'white',
      prefix: 'fa',
      glyph: 'fa-map-pin'

    })
    this.myMarker = L.marker([this.myPos.lat, this.myPos.lang], { icon: markerIcon }).addTo(this.map)
    this.fetchPartners()
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
  .popup-inner{
    font-size:2rem;
  }
</style>
