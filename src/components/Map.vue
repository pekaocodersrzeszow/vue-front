<template>
  <div id="mapWrapper">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'Map',
  data () {
    return {
      map: {},
      zoom: 6.5
    }
  },
  methods: {

    createMap () {
      this.map = L.map('map').setView([52.168, 19.708], this.zoom)
      L.tileLayer(`https://api.mapbox.com/styles/v1/karlos20/cjvtdel6n0p4r1co9sajy9so9/tiles/{z}/{x}/{y}?access_token=${this.$store.state.apiToken}`,
        {attribution: 'Map data &copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18, id:'mapbox.streets',
          accessToken: this.$store.state.apiToken}).addTo(this.map);
    }
  },
  mounted () {
    console.log(this.$store.state.apiToken)
    this.createMap()
  }
}
</script>

<style scoped>
  #map {
    width:100%;
    height:  100vh;
    z-index: 0;
  }
  #mapWrapper{
    width:100%;
    height: 100%;

  }
</style>
