<template>
  <v-container fluid fill-height class="wrapper">
    <v-layout>
      <v-flex xs11 md6 class="mx-auto my-auto">
        <v-card class="pa-3 ">
          <v-card-title><h1>Twoje oszczędności</h1></v-card-title>
          <v-divider></v-divider>

          <h2>Ostatnie wydatki:</h2>
          <v-card-text>
            <canvas id="savings-chart"></canvas>
          </v-card-text>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Helikopter w ogniu</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'user',
  methods: {
    createChart () {
      const chart = new Chart(document.getElementById('savings-chart').getContext('2d'), {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Oszczędności',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
          }]
        },

        // Configuration options go here
        options: {}
      })
    }
  },
  mounted () {
   this.createChart();
  }
}
</script>

<style scoped>
.wrapper{
  background-image: url("~@/assets/savings.jpg");
  background-size: cover;
}
</style>
