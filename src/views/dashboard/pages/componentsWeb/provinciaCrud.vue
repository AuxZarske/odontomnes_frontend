<template>
  <v-container>
    <div id="app">
      <v-app id="inspire">
        <v-data-table
          :search="search"
          :headers="headers"
          :items="desserts"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Provincias actuales</v-toolbar-title>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                />
              </v-card-title>
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="botonAgregarProv()"
                  >
                    Agregar Provincia
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Nombre"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="7"
                        >
                          <v-combobox
                            v-model="select"
                            :items="items"
                            label="Seleccione un pais"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Actualizar
            </v-btn>
          </template>
        </v-data-table>
      </v-app>
    </div>
    <v-dialog
      v-model="dialogLoad2"
      persistent
      max-width="auto"
    >
      <v-card
        class="text-center"
        color="rgb(0, 0, 0, 0.1)"
        style="padding:17%"
      >
        <v-progress-circular
          :size="70"
          :width="7"
          color="green"
          indeterminate
        />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert'

  export default {
    data: () => ({
      dialog: false,
      editacion: 0,
      headers: [
        {
          text: 'Nombre de Provincia',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Pais de referencia',
          align: 'center',
          sortable: true,
          value: 'namepais',
        },
        { text: 'Acciones', align: 'center', value: 'actions', sortable: false },
      ],
      desserts: [],
      select: [],
      items: [],
      search: '',
      dialogLoad2: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Provincia' : 'Editar Provincia'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.getDataPais()
      this.getDataProvincia()
    },

    methods: {
      botonAgregarProv () {
        this.getDataPais()
        this.select = ''
      },
      getDataPais () {
        var path = axios.defaults.baseURL + '/api/parametros/paises/'
        axios.get(path).then((response) => {
          this.items = []
          console.log(response.data)
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            diccion = {
              value: response.data[i].codPais,
              text: response.data[i].nombre_pais,
            }
            this.items.push(diccion)
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      getDataProvincia () {
        this.getDataPais()
        var path = axios.defaults.baseURL + '/api/parametros/provincias/'
        axios.get(path).then((response) => {
          this.desserts = []
          console.log(response.data)
          var diccion = {}
          var aux = '----'
          for (var i = 0; i < response.data.length; i++) {
            for (var g = 0; g < this.items.length; g++) {
              if (this.items[g].value === response.data[i].pais) {
                aux = this.items[g].text
                break
              }
            }
            diccion = {
              codProv: response.data[i].codProv,
              name: response.data[i].nombre_prov,
              namepais: aux,
              codpais: response.data[i].pais,
            }
            this.desserts.push(diccion)
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },

      editItem (item) {
        this.getDataPais()
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.editacion = 1
        var diccion = {
          value: item.codPais,
          text: item.namepais,
        }
        this.select = diccion
      },

      deleteItem (item) {
        swal({
          title: 'Estas seguro de eliminar?',
          text: 'Una vez removido, usted no podra recuperar esta informacion!',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              var path = axios.defaults.baseURL + '/api/parametros/provincias/' + item.codProv + '/'
              this.dialogLoad2 = true
              axios.delete(path).then((response) => {
                this.dialogLoad2 = false
                swal('Borrado correctamente', { icon: 'success' })
                this.getDataProvincia()
              })
                .catch((erhror) => {
                  this.dialogLoad2 = false
                  swal('No es posible eliminarlo', '', 'error')
                })
            } else {
            }
          })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.editacion = 0
      },

      save () {
        if (this.editedItem !== '' && this.editacion === 1) {
          console.log(this.editedItem)
          this.editacion = 0
          var dicti2 = {
            codProv: this.editedItem.codProv,
            nombre_prov: this.editedItem.name,
            pais: this.select.value,
          }
          var path2 = axios.defaults.baseURL + '/api/parametros/provincias/' + dicti2.codProv + '/'
          console.log(dicti2)
          this.dialogLoad2 = true
          axios.put(path2, dicti2).then((response) => {
            this.dialogLoad2 = false
            console.log(response)
            swal('Editado correctamente', { icon: 'success' })
            this.getDataProvincia()
          })
            .catch((erujror) => {
              this.dialogLoad2 = false
              swal('No es posible editarlo', '', 'error')
              console.log('falladatos')
            })
        } else {
          if (this.editedItem.name !== '') {
            var dicti = {
              nombre_prov: this.editedItem.name,
              pais: this.select.value,
            }
            var path = axios.defaults.baseURL + '/api/parametros/provincias/'
            console.log(dicti)
            this.dialogLoad2 = true
            axios.post(path, dicti).then((response) => {
              this.dialogLoad2 = false
              console.log(response)
              swal('Agregado correctamente', { icon: 'success' })
              this.getDataProvincia()
            })
              .catch((erujror) => {
                this.dialogLoad2 = false
                swal('No es posible agregarlo', '', 'error')
                console.log('falladatos')
              })
          }
        }
        this.close()
      },
    },
  }
</script>

<style>
  div.v-application--wrap{
    min-height: 55vh;
  }
</style>
