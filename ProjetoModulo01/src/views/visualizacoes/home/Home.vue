<template>
<Menu></Menu>
<v-container>
<v-row>
  <v-col>
    <h2>Olá, {{ user }}</h2>
  </v-col>
  </v-row>
</v-container>

  <v-container>
    <v-row>
      <v-col cols="12" md="6">
    <v-card variant="outlined">
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
        <router-link to="/gerenciamentoexercicios">Adicionar</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
  <br>

  <v-col cols="12" md="6">
  <v-card variant="outlined"
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
      <v-btn variant="outlined">
        <router-link to="/cadastroalunos">Adicionar</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</v-container>
</template>

<script>
import axios from 'axios'
import Menu from '../../menu/Menu.vue'

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
},
components: {
  Menu
}}
</script>

<style scoped>

h2{
  color: darkmagenta;
}

button{
  background-color: white;
}

</style>