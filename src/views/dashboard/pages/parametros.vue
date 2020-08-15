<template>
  <v-container
    class="fluid px-0"
  >
    <v-row
      align="center"
      justify="center"
    >
      <div id="app">
        <v-app id="inspire">
          <v-card id="topi">
            <v-tabs
              v-model="tabs"
              background-color="indigo"
              center-active
              fixed-tabs
              dark
            >
              <v-tab :key="1">
                Areas geograficas
              </v-tab>
              <v-tab :key="2">
                Tipo de estados
              </v-tab>
              <v-tab :key="3">
                niveles de urgencias
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item :key="1">
                <v-card flat>
                  <v-card-text>
                    <my-componentOne />
                    <my-componentOne2 />
                    <my-componentOne3 />
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="2">
                <v-card flat>
                  <v-card-text>
                    <my-componentOneEst />
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="3">
                <v-card flat>
                  <v-card-text>
                    <my-componentOneUrg />
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-app>
      </div>
    </v-row>
  </v-container>
</template>
<script>
  import paisCrud from '@/views/dashboard/pages/componentsWeb/paisCrud.vue'
  import provCrud from '@/views/dashboard/pages/componentsWeb/provinciaCrud.vue'
  import ciudCrud from '@/views/dashboard/pages/componentsWeb/ciudadCrud.vue'
  import urgCrud from '@/views/dashboard/pages/componentsWeb/urgencias.vue'
  import estCrud from '@/views/dashboard/pages/componentsWeb/estados.vue'
  export default {
    components: {
      'my-componentOne': paisCrud,
      'my-componentOne2': provCrud,
      'my-componentOne3': ciudCrud,
      'my-componentOneUrg': urgCrud,
      'my-componentOneEst': estCrud,
    },
    data () {
      return {
        tabs: 0,
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
    },
  }
</script>

<style scoped>
  div#app{
    width: 80%;
  }
  .v-card{
    margin-top: 0;
  }
</style>
