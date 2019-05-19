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
    name: 'BrandDash'
  }
</script>

<style scoped>
  .menu-icon{
    margin-left: 0.5rem;
  }
</style>
