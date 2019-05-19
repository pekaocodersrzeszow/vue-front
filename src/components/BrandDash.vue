<template>
  <v-container fluid fill-height class="wrapper">
    <v-layout>
      <v-flex xs11 md6 class="mx-auto my-auto">
        <v-card>
          <v-card-title>
            <h1 class="mx-auto">Panel Przedsiębiorcy</h1>
          </v-card-title>
          <v-card-text>
            <h2 class="text-md-center text-sm-center">Nowi klienci w tym miesiącu: 247</h2>
            <h2 class="text-md-center text-sm-center">Polecenia w tym miesiącu : 28</h2>
            <br>

            <canvas id="savings-chart" class="chart"></canvas>
          </v-card-text>
          <v-card-title class="text-xs-center">
            <h1 class="mx-auto">Aktualne rabaty <v-btn color="success">Dodaj
              <v-icon class="menu-icon">
                fas fa-plus
              </v-icon>
            </v-btn></h1>
          </v-card-title>
          <v-card-text class="mx-auto">
            <h3 class="text-md-center text-sm-center">5% na cały asortyment</h3>
            <p class="text-md-center text-sm-center">Oferta trwa do: 29.08.2019</p>
            <div class="text-xs-center">
              <v-btn color="info">
                Edytuj
                <v-icon class="menu-icon">
                  fas fa-edit
                </v-icon>
              </v-btn>
              <v-btn color="error">
                Usuń
                <v-icon class="menu-icon">
                  fas fa-trash
                </v-icon>
              </v-btn>
            </div>

          </v-card-text>
          <v-card-actions>



          </v-card-actions>

        </v-card>

      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
  export default {
    name: 'BrandDash',
    methods: {
      createChart () {
        const chart = new Chart(document.getElementById('savings-chart').getContext('2d'), {
          // The type of chart we want to create
          type: 'bar',

          // The data for our dataset
          data: {
            labels: ['01/05','02/05','03/05','04/05','05/05','06/05','07/05','08/05','09/05','10/05','11/05','12/05','13/05','14/05','15/05','16/05','17/05','18/05','19/05',],
            datasets: [{
              label: 'Przychody w tym miesiącu',
              backgroundColor: 'rgb(205, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [7993,7506,8731,6954,8478,7995,9891,7522,8522,8174,7153,8662,8554,7288,7644,7617,7307,6733,9777]
            }]
          },

          // Configuration options go here
          options: {},
        })
      }
    },
    mounted () {
      this.createChart()
  }
  }
</script>

<style scoped>
  .menu-icon{
    margin-left: 0.5rem;
  }
  .wrapper{
    background-image: url("~@/assets/brand.jpg");
    background-size: cover;
  }
</style>
