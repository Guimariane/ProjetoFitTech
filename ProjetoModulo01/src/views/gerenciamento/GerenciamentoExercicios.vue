<template>
  <Menu></Menu>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <h2>Exercícios</h2>
        </v-col>
      </v-row>
    </v-container>
  
    <v-form @submit.prevent="CadastrarExercicio" ref="cadexercicio">
      <v-container>
        <v-row>
          <v-col cols="12" md="10">
            <v-text-field v-model="description" label="Digite seu exercício"></v-text-field>
          </v-col>
          <v-col>
            <v-btn cols="12" md="2" type="submit">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workout in workouts" :key="workout.id">
            <td>{{ workout.description }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  import { captureErrorYup } from '../../utils/generalfunctions'
  import * as yup from 'yup'
  import Menu from '../menu/Menu.vue'
  
  export default {
    data() {
      return {
        workouts: [],
        workout: {},
        description: ''
      }
    },
  
    methods: {
      CadastrarExercicio() {
        try {
          const schema = yup.object().shape({
            description: yup.string().required('Campo Obrigatório!')
          })
  
          schema.validateSync(
            {
              description: this.description
            },
            { abortEarly: false }
          )
  
          axios({
            url: 'http://localhost:3000/exercises',
            method: 'POST',
            data: {
              description: this.description
            }
          })
            .then(() => {
              alert('Exercício Cadastrado com sucesso!')
              this.ExibirExercicio()
              this.$refs.cadexercicio.reset()
            })
            .catch(() => {
              alert('Falha ao concluir o cadastro do exercício')
            })
        } catch (error) {
          console.log(error)
          if (error instanceof yup.ValidationError) {
            console.log(error)
            this.errors = captureErrorYup(error)
          }
        }
      },
  
      ExibirExercicio() {
        axios({
          url: 'http://localhost:3000/exercises',
          method: 'GET'
        })
          .then((response) => {
            this.workouts = response.data
            console.log(this.workouts)
          })
          .catch(() => {
            console.log('Deu ruim')
          })
      }
    },
  
    mounted() {
      this.ExibirExercicio()
    }, 

    components: {
      Menu
    }
  }
  </script>