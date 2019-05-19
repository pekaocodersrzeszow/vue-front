<template>
  <v-container fluid fill-height class="wrapper">
    <v-layout>
      <v-flex xs11 md6 class="mx-auto my-auto">
        <v-card class="pa-3 ">
          <v-card-title><h1>Twoje oszczędności</h1></v-card-title>
          <v-divider></v-divider>
          <v-card class="elevation-5">
            <v-card-title><h2>Maj</h2></v-card-title>
            <canvas id="chart2" class="chart"></canvas>
          </v-card>
         <v-divider></v-divider>
          <v-card-text>
            <canvas id="savings-chart" class="chart"></canvas>
          </v-card-text>
          <h2 class="ml-3 mt-3">Ostatnie wydatki:</h2>
          <v-list>
            <v-list-tile v-for="purchase in purchases" :key="purchase.name">
              <v-list-tile-avatar>
                <v-icon>
                  {{purchase.icon}}
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>{{purchase.name}}</v-list-tile-title>
              <v-list-tile-action>
                <v-list-tile-action-text>
                  Wydano: {{purchase.value}}PLN
                  Zaoszczędzono: <span class="primary--text">{{(purchase.value*purchase.discount).toFixed(2)}}PLN</span>
                </v-list-tile-action-text>
              </v-list-tile-action>
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
  data(){
    return {
      purchases: [
        {
          name: 'Lidl',
          value: 24.51,
          discount: 0.02,
          icon: 'fas fa-shopping-cart'
        },
        {
          name: 'Orlen',
          value: 50.01,
          discount: 0.05,
          icon: 'fas fa-gas-pump'
        },
        {
          name: 'Kiosk Agatka',
          value: 12.51,
          discount: 0.03,
          icon: 'fas fa-shopping-cart'
        },
        {
          name: 'Kino Zorza',
          value: 25.51,
          discount: 0.05,
          icon: 'fas fa-film'
        }
      ],
    }
  },
  methods: {
    createChart () {
      const chart = new Chart(document.getElementById('savings-chart').getContext('2d'), {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj'],
          datasets: [{
            label: 'Oszczędności',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [12, 10, 5, 5, 20 ]
          }]
        },

        // Configuration options go here
        options: {},
      })
    },
    createChart2(){
      const myPieChart = new Chart(document.getElementById('chart2').getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Żywność', 'Rozrywka', 'Transport', 'Kultura', 'Inne'],
          datasets: [{
            label: 'Oszczędności',
            backgroundColor: ['#d91918','#4bad05','#4286f4', '#ad056c','#e5de14'],

            data: [12, 10, 5, 5, 20]
          }]
        },
        options: {}
      });
    }
  },
  mounted () {
   this.createChart()
   this.createChart2()
  }
}
</script>

<style scoped>
.wrapper{
  background-image: url("~@/assets/savings.jpg");
  background-size: cover;
}
</style>
