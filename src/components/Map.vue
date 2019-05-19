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
              @keyup.enter.native="searchPartners"
              ></v-text-field>
            <v-btn icon @click="centerMap(myPos.lat,myPos.lang)">
              <v-icon>fas fa-map-marker-alt</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
        <div id="map"></div>
      </v-flex>

      <v-flex xs12 lg3 style="max-height: 90vh;overflow-y: scroll">
        <v-card class="ma-1" >
         <v-card-title><h2 class="text-xs-center">Lista partnerów w Twojej okolicy</h2></v-card-title>

          <v-list v-if="partners.length>0">
            <v-list-tile v-for="partner in partners" :key="partner.id" @click="centerMap(partner.lat,partner.long,17)">
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
      selectedCat: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
      map: {},
      searchKey: '',
      markerGroup: {},
      myMarker: null,
      myPos: {
        lat: 50.0365036,
        lang: 21.994452,
      },
      fetchedPartners: [ {
        id: 16,
        name: 'McDonalds',
        discount: 0.1,
        lat: 51,
        long: 19,
        category: 20
      },
      {
        id: 17,
        name: 'Lidl',
        discount: 0.15,
        lat: 50.020278,
        long: 21.977706,
        category: 22
      },
      {
        id: 1,
        name: 'Infoloty.pl - Bilety Lotnicze - Tanie Loty',
        lat: 50.0359058,
        long: 21.9992854,
        discount: 0.1,
        category: 1
      },
      {
        id: 2,
        name: 'Merkury Market - Płytki, panele, meble',
        lat: 50.0362109,
        long: 21.9983974,
        discount: 0.15,
        category: 3
      },
      {
        id: 3,
        name: 'Centrum Budowlane BOZ',
        lat: 50.0255546,
        long: 21.9658703,
        discount: 0.1,
        category: 3
      },
      {
        id: 4,
        name: 'Dyskont Odzieżowy TANIA ODZIEŻ',
        lat: 50.0388387,
        long: 21.9990234,
        discount: 0.1,
        category: 5
      },
      {
        id: 5,
        name: 'H&M Galeria Rzeszów',
        lat: 50.0421122,
        long: 21.9981045,
        discount: 0.1,
        category: 5
      },
      {
        id: 6,
        name: 'Euro-Trade Hurtownia',
        lat: 50.0266989,
        long: 21.9769192,
        discount: 0.1,
        category: 6
      },
      {
        id: 7,
        name: 'Kros - Hurtownia bielizny i wyrobów pościelowych',
        lat: 50.0470151,
        long: 21.9836473,
        discount: 0.1,
        category: 6
      },
      {
        id: 8,
        name: 'Laserowa Twierdza - Laserowy Paintball',
        lat: 50.0397949,
        long: 22.0067523,
        discount: 0.1,
        category: 7
      },
      {
        id: 9,
        name: 'Lychee w dziczy',
        lat: 50.032237,
        long: 22.0049226,
        discount: 0.1,
        category: 7
      },
      {
        id: 10,
        name: 'NOTUS Finanse S.A.',
        lat: 50.0392906,
        long: 21.9993369,
        discount: 0.1,
        category: 8
      },
      {
        id: 11,
        name: 'Midas Finanse i Ubezpieczenia',
        lat: 50.0384873,
        long: 22.0001805,
        discount: 0.1,
        category: 8
      },
      {
        id: 12,
        name: 'Dara Kebab',
        lat: 50.0376919,
        long: 22.0032633,
        discount: 0.1,
        category: 9,
      },
      {
        id: 13,
        name: "Zapieksy Dave'a",
        lat: 50.0386843,
        long: 21.999519,
        discount: 0.12,
        category: 9,
      },
      {
        id: 14,
        name: 'Instytut Zdrowia i Urody Twój Styl',
        lat: 50.0419707,
        long: 21.9975803,
        discount: 0.1,
        category: 10
      },
      {
        id: 15,
        name: 'Studio urody Piccola Stella',
        lat: 50.0333669,
        long: 21.9973865,
        discount: 0.1,
        category: 10
      },
      {
        id: 19,
        name: 'DUKA',
        lat: 50.0419271,
        long: 21.9962154,
        discount: 0.12,
        category: 12
      },
      {
        id: 20,
        name: 'Salon Homla - Wyposażenie wnętrz',
        lat: 50.0274021,
        long: 22.009903,
        discount: 0.1,
        category: 12
      },
      {
        id: 21,
        name: 'Hotel Bristol Tradition & Luxury',
        lat: 50.0382665,
        long: 22.0023552,
        discount: 0.1,
        category: 13
      },
      {
        id: 22,
        name: 'Hotele Prezydenckie',
        lat: 50.0284397,
        long: 22.0089288,
        discount: 0.1,
        category: 13
      },
      {
        id: 23,
        name: "Restauracja McDonald's",
        lat: 50.0197713,
        long: 21.9907869,
        discount: 0.1,
        category: 20
      },
      {
        id: 24,
        name: 'Restauracja W ogrodach',
        lat: 50.0316949,
        long: 22.0032633,
        discount: 0.1,
        category: 20
      },
      {
        id: 25,
        name: 'LOTOS - Stacja paliw',
        lat: 50.0290073,
        long: 21.9741423,
        discount: 0.1,
        category: 18
      },
      {
        id: 26,
        name: 'Shell',
        lat: 50.0428806,
        long: 21.9888349,
        discount: 0.1,
        category: 18
      },
      {
        id: 27,
        name: 'Lidl',
        lat: 50.0233349,
        long: 21.9943419,
        discount: 0.1,
        category: 22
      },
      {
        id: 28,
        name: 'Bi1',
        lat: 50.0388415,
        long: 21.9745269,
        discount: 0.1,
        category: 22
      },
      {
        id: 29,
        name: 'TUI Biuro Podrozy',
        lat: 50.0273432,
        long: 22.0135219,
        discount: 0.1,
        category: 25
      },
      {
        id: 30,
        name: 'Wagabunda. Biuro podróży',
        lat: 50.0426938,
        long: 22.0047672,
        discount: 0.1,
        category: 25
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
          name: 'Bankomaty',
          icon: 'money-bill'
        },
        {
          id: 3,
          name: 'Sklepy i usługi budowlane',
          icon: 'fas fa-toolbox'
        },
        {
          id: 4,
          name: 'Usługi?',
          icon: ''
        },
        {
          id: 5,
          name: 'Odziez',
          icon: 'fas fa-tshirt'
        },
        {
          id: 6,
          name: 'Hurtownie',
          icon: 'fas fa-building'
        },
        {
          id: 7,
          name: 'Rozrywka',
          icon: 'fas fa-music'
        },
        {
          id: 8,
          name: 'Finanse',
          icon: 'fas fa-hand-holding-usd'
        },
        {
          id: 9,
          name: 'Lokale gastronomiczne',
          icon: 'fas fa-cookie'
        },
        {
          id: 10,
          name: 'Sklepy?',
          icon: 'fas fa-shopping-cart'
        },
        {
          id: 11,
          name: 'Zdrowie i uroda',
          icon: 'fas fa-weight'
        },
        {
          id: 12,
          name: 'Wyposazenie domu',
          icon: 'fas fa-home'
        },
        {
          id: 13,
          name: 'Hotele',
          icon: 'fas fa-hotel'
        },
        {
          id: 14,
          name: 'Nie wiem ?',
          icon: ''
        },
        {
          id: 15,
          name: 'Motoryzacja',
          icon: 'fas fa-car'
        },
        {
          id: 16,
          name: 'Nieprzypisana',
          icon: 'fas fa-question-circle'
        },
        {
          id: 17,
          name: 'nie wiem?',
          icon: ''
        },
        {
          id: 18,
          name: 'Stacje benzynowe',
          icon: 'fas fa-gas-pump'
        },
        {
          id: 19,
          name: 'recuming transa?',
          icon: ''
        },
        {
          id: 20,
          name: 'Restauracje',
          icon: 'fas fa-utensils'
        },
        {
          id: 21,
          name: 'Usługi',
          icon: 'fas fa-wrench'
        },
        {
          id: 22,
          name: 'Supermarkety',
          icon: 'fas fa-shopping-cart'
        },
        {
          id: 23,
          name: 'Telekomunikacja',
          icon: 'fas fa-phone'
        },
        {
          id: 24,
          name: 'Edukacja',
          icon: 'fas fa-university'
        },
        {
          id: 25,
          name: 'Podroze',
          icon: 'fas fa-compass'
        },
        {
          id: 26,
          name: 'Narzedzia',
          icon: 'fas fa-tools'
        },
        {
          id: 28,
          name: 'hurtownie?',
          icon: ''
        }
      ]

    }
  },
  methods: {

    createMap () {
      this.map = L.map('map').setView([this.myPos.lat, this.myPos.lang], 15)
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
      marker.on('click', () => { this.map.remove(); this.$router.push({ name: 'PartnerView', params: { id: partner.id, partner: partner, categories: this.categories } }) })
    },
    createPopupData (partner) {
      // $router.push({ name: 'partner', params: { partnerID: 'partner.id' } })

      return `${partner.name}<br>
                Rabat: -${partner.discount * 100}%`
    },
    searchPartners () {
      // todo: branzza

      this.partners = this.fetchedPartners.filter(partner => {
        return partner.name.toUpperCase().includes(this.searchKey.toUpperCase()) ||
           this.categories[partner.category - 1].name.toUpperCase().includes(this.searchKey.toUpperCase())
      }
      )
      this.refreshMarkers()
    },
    fetchPartners () {
      this.partners = this.fetchedPartners
      this.refreshMarkers()
    },
    centerMap (lat, lang,size=15) {
      this.map.setView([lat, lang], size)
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
    const circle = L.circle([this.myPos.lat, this.myPos.lang], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 120
    }).addTo(this.map)
    // const markerIcon = L.icon.glyph({
    //   glyphColor: 'white',
    //   prefix: 'fa',
    //   glyph: 'fa-map-pin'
    //
    // })
    // this.myMarker = L.marker([this.myPos.lat, this.myPos.lang], { icon: markerIcon }).addTo(this.map)
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
