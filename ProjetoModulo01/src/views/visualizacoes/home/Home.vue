<template>
    <div class="d-flex flex-row justify-space-around mb-6 bg-surface-variant">
      <h2>Olá, {{ user }}</h2>

    <br>

    <v-card
    class= "max-auto"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          {{ amount_exercises }}
            Exercícios Cadastrados
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="outlined">
        <router-link to="/cadastroalunos">Adicionar</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card
    class="max-auto"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          {{ amount_students }}
          Alunos Cadastrados
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn     
        variant="outlined">
        <router-link to="/cadastrotreinos">Adicionar</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
      return {
        amount_exercises: 0,
        amount_students: 0,
        user: ''

      }
  },

  methods: {
    InfoDashboard() {
      axios({
      url: 'http://localhost:3000/dashboard',
      method: 'GET'
    })
    .then(response => {
      console.log(response.data)
      this.user = localStorage.getItem('sessions_name')
      this.amount_exercises = response.data.amount_exercises
      this.amount_students = response.data.amount_students
    })
    }
  },
  mounted() {
    this.InfoDashboard()
    this.user
}}
</script>

<style>

</style>