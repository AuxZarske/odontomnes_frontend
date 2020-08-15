<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Datos del Proveedor:
            </div>

            <div class="subtitle-1 font-weight-light">
              (Complete los datos para la carga)
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="form.empresa"
                    label="Empresa"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="form.contacto"
                    label="Contacto"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="form.email"
                    label="Correo electronico"
                    class="purple-input"
                    placeholder="empresa123@gmail.com"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="form.telefono"
                    label="Telefono"
                    class="purple-input"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.direccion"
                    label="Direccion"
                    class="purple-input"
                    placeholder="Gral Paz 432"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-combobox
                    v-model="selectPais"
                    :items="itemsPais"
                    label="Seleccione un Pais"
                    @change="cambioPais()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-combobox
                    v-model="selectAuxProv"
                    :items="itemsAuxProv"
                    label="Provincia"
                    @change="cambioProvincia()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-combobox
                    v-model="selectAuxLoc"
                    :items="itemsAuxLoc"
                    label="Localidad"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="form.nota_general"
                    class="purple-input"
                    label="Nota general"
                    placeholder="Breve descripcion extra, o informacion util...(opcional)"
                  />
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-btn
                    color="blue-grey"
                    class="mr-0"
                    to="/pages/proveedores"
                  >
                    Volver
                  </v-btn>
                </v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="guardar()"
                  >
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert'
  export default {
    name: 'Beer',
    props: ['CodProv'],

    data () {
      return {
        beer: [],
        selectPais: [],
        itemsPais: [],
        selectAuxProv: [],
        itemsAuxProv: [],
        selectAuxLoc: [],
        itemsAuxLoc: [],
        auxCodPais: '',
        auxCodProvincia: '',
        auxCodLocalidad: '',
        form: {
          codProve: '',
          empresa: '',
          telefono: '',
          email: '',
          contacto: '',
          nota_general: '',
          direccion: '',
          area_geografica: '',
        },
      }
    },

    created () {
      if (this.CodProv > 0) {
        // edicion
        this.getDataProveedores()
      } else {
        // crear
        this.getDataPais()
      }
    },
    methods: {
      cambioProvincia () {
        console.log(this.selectAuxProv.value)
        this.selectAuxLoc = []
        this.actualizarLocalidad()
      },
      cambioPais () {
        console.log(this.selectPais.value)
        this.selectAuxProv = []
        this.selectAuxLoc = []
        this.itemsAuxLoc = []
        this.actualizarProvincia()
      },
      actualizarLocalidad () {
        var path = axios.defaults.baseURL + '/api/parametros/localidades/'
        axios.get(path).then((response) => {
          this.itemsAuxLoc = []
          console.log(response.data)
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].provincia === this.selectAuxProv.value) {
              diccion = {
                value: response.data[i].codLoc,
                text: response.data[i].nombre_loc,
              }
              this.itemsAuxLoc.push(diccion)
            }
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      actualizarProvincia () {
        var path = axios.defaults.baseURL + '/api/parametros/provincias/'
        axios.get(path).then((response) => {
          this.itemsAuxProv = []
          console.log(response.data)
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].pais === this.selectPais.value) {
              diccion = {
                value: response.data[i].codProv,
                text: response.data[i].nombre_prov,
              }
              this.itemsAuxProv.push(diccion)
            }
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      getDataPais () {
        var path = axios.defaults.baseURL + '/api/parametros/paises/'
        axios.get(path).then((response) => {
          this.itemsPais = []
          console.log(response.data)
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            diccion = {
              value: response.data[i].codPais,
              text: response.data[i].nombre_pais,
            }
            this.itemsPais.push(diccion)
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      actualizarGeografia (codLoc) {
        this.auxCodLocalidad = codLoc
        var path = axios.defaults.baseURL + '/api/parametros/localidades/'
        axios.get(path).then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].codLoc === this.auxCodLocalidad) {
              this.auxCodProvincia = response.data[i].provincia
              break
            }
          }
          this.actualizarCodPais()
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      actualizarCodPais () {
        var path = axios.defaults.baseURL + '/api/parametros/provincias/'
        axios.get(path).then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].codProv === this.auxCodProvincia) {
              this.auxCodPais = response.data[i].pais
              break
            }
          }
          this.establecerSeleccionGeograficaPais()
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      establecerSeleccionGeograficaPais () {
        var path = axios.defaults.baseURL + '/api/parametros/paises/'
        axios.get(path).then((response) => {
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            diccion = {
              value: response.data[i].codPais,
              text: response.data[i].nombre_pais,
            }
            this.itemsPais.push(diccion)
            if (response.data[i].codPais === this.auxCodPais) {
              this.selectPais = diccion
            }
          }
          this.establecerSeleccionGeograficaProv()
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      establecerSeleccionGeograficaProv () {
        var path = axios.defaults.baseURL + '/api/parametros/provincias/'
        axios.get(path).then((response) => {
          var diccion = {}
          console.log(response.data)
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].pais === this.auxCodPais) {
              diccion = {
                value: response.data[i].codProv,
                text: response.data[i].nombre_prov,
              }
              this.itemsAuxProv.push(diccion)
              if (response.data[i].codProv === this.auxCodProvincia) {
                this.selectAuxProv = diccion
              }
            }
          }
          this.establecerSeleccionGeograficaLoc()
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      establecerSeleccionGeograficaLoc () {
        var path = axios.defaults.baseURL + '/api/parametros/localidades/'
        axios.get(path).then((response) => {
          var diccion = {}
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].provincia === this.auxCodProvincia) {
              diccion = {
                value: response.data[i].codLoc,
                text: response.data[i].nombre_loc,
              }
              this.itemsAuxLoc.push(diccion)
              if (response.data[i].codLoc === this.auxCodLocalidad) {
                this.selectAuxLoc = diccion
              }
            }
          }
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
      guardar () {
        this.form.area_geografica = this.selectAuxLoc.value
        if (this.CodProv > 0) {
          console.log(this.form)
          var path2 = axios.defaults.baseURL + '/api/proveedores/proveedores/' + this.form.codProve + '/'
          this.dialogLoad2 = true
          axios.put(path2, this.form).then((response) => {
            this.dialogLoad2 = false
            console.log(response)
            swal('Editado correctamente', { icon: 'success' })
            this.$router.push({ name: 'Proveedores' })
          })
            .catch((erujror) => {
              this.dialogLoad2 = false
              swal('No es posible editarlo', '', 'error')
              console.log('falladatos')
            })
        } else {
          var path = axios.defaults.baseURL + '/api/proveedores/proveedores/'
          console.log(this.form)
          this.dialogLoad2 = true
          axios.post(path, this.form).then((response) => {
            this.dialogLoad2 = false
            console.log(response)
            swal('Agregado correctamente', { icon: 'success' })
            this.$router.push({ name: 'Proveedores' })
          })
            .catch((erujror) => {
              this.dialogLoad2 = false
              swal('No es posible agregarlo', '', 'error')
              console.log('falladatos')
            })
        }
      },
      getDataProveedores () {
        var path = axios.defaults.baseURL + '/api/proveedores/proveedores/' + this.CodProv + '/'
        axios.get(path).then((response) => {
          this.form = {}
          console.log(response.data)
          var aux = {}
          aux = {
            codProve: response.data.codProve,
            empresa: response.data.empresa,
            telefono: response.data.telefono,
            email: response.data.email,
            contacto: response.data.contacto,
            nota_general: response.data.nota_general,
            direccion: response.data.direccion,
            area_geografica: response.data.area_geografica,
          }
          this.form = aux
          this.actualizarGeografia(response.data.area_geografica)
        })
          .catch((erujror) => {
            console.log('falladatos')
          })
      },
    },
  }
</script>
