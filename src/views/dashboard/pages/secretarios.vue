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
              <v-toolbar-title>Secretarios actuales de la empresa</v-toolbar-title>
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
                    @click="agregarSecretario()"
                  >
                    Agregar Secretario
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
              @click="editarSecretario(item)"
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
          text: 'Apellido',
          align: 'center',
          sortable: true,
          value: 'nameapellido',
        },
        {
          text: 'Nombres',
          align: 'center',
          sortable: true,
          value: 'namenombres',
        },
        {
          text: 'Telefono',
          align: 'center',
          sortable: true,
          value: 'nametalefono',
        },
        {
          text: 'Correo electronico',
          align: 'center',
          sortable: true,
          value: 'nameemail',
        },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      dialogLoad2: false,
      desserts: [
      ],
      editedIndex: -1,
      search: '',
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Estado' : 'Editar Estado'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.getDataSecretarios()
    },

    methods: {
      agregarSecretario () {
        this.$router.push({ name: 'camposSecretario', params: { CodSecre: '-7' } })
      },
      editarSecretario (codSecreParams) {
        console.log(codSecreParams)
        this.$router.push({ name: 'camposSecretario', params: { CodSecre: codSecreParams.codSecre } })
      },
      getDataSecretarios () {
        var path = axios.defaults.baseURL + '/api/secretarios/secretarios/'
        axios.get(path).then((response) => {
          this.desserts = []
          console.log(response.data)
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            diccion = {
              codSecre: response.data[i].codSecre,
              nameapellido: response.data[i].apellido,
              nametalefono: response.data[i].telefono,
              nameemail: response.data[i].email,
              namenombres: response.data[i].nombres,
              // namedireccion: response.data[i].direccion,
              namelocalidad: response.data[i].area_geografica,
            }
            this.desserts.push(diccion)
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
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
              var path = axios.defaults.baseURL + '/api/secretarios/secretarios/' + item.codSecre + '/'
              this.dialogLoad2 = true
              axios.delete(path).then((response) => {
                this.dialogLoad2 = false
                swal('Borrado correctamente', { icon: 'success' })
                this.getDataSecretarios()
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
    },
  }
</script>

<style>
  div.v-application--wrap{
    min-height: 55vh;
  }
</style>
