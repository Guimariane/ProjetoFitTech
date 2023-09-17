<template>
    <Menu></Menu>
    <v-container>
        <v-row class="d-flex justify-space-between">
            <v-col cols="12" md="11">
                <h2>Alunos</h2>
            </v-col>
            <v-col cols="12" md="1">
                <v-btn type="submit"><router-link to='/cadastroalunos'>Novo</router-link></v-btn>
            </v-col>
        </v-row>
    </v-container>        

    <v-container>
        <v-row>
            <v-col cols="12" md="12">
                <v-text-field :loading="loading" density="compact" variant="solo" label="Pesquisar Aluno"
                 append-inner-icon="mdi-magnify" single-line hide-details
                 @click:append-inner="BuscarAluno"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
    
    <v-container>
         <v-table fixed-header>
             <thead>
             <tr>
                 <th class="text-left">Nome</th>
                 <th>Ações</th>
             </tr>
             </thead>
             <tbody>
             <tr v-for="student in students" :key="student.id">
                 <td>{{ student.name }} </td>
                 <td><v-btn size="large" @click="RedirecionarCadTreino(student.id)">Montar Treino</v-btn>
                    <v-btn size="large" @click="RedirecionarVerTreino(student.id)">Ver Informações</v-btn>
                </td>
             </tr>
             </tbody>
         </v-table>
    </v-container>
 </template>
 
 <script>
 import axios from 'axios'
 import Menu from '../menu/Menu.vue'
 
 
 export default {
     data () {
         return {
             student: {},
             students: []
         }
     },
 
     mounted() {
        this.ExibirAluno()
     },
     methods: {
     ExibirAluno(){
         axios ({
             url:'http://localhost:3000/students',
             method: 'GET',
         })
        .then((response) => {
         this.students = response.data.students
     })
        .catch(() => {
         console.log("Deu ruim")
     })},

     RedirecionarCadTreino(student_id){
        this.$router.push({
            path: '/cadastrotreinos',
            query: { id: student_id }
        }) 
     }, 

     RedirecionarVerTreino(student_id){
        this.$router.push({
            path: '/visualizacaotreinos',
            query: { id: student_id }
        }) 
     },

     BuscarAluno() {
        console.log("Vamos pesquisar")
     }
    
    },

    components: {
        Menu
    }
 
 }
 </script>

 <style>
 h2 {
    color: darkmagenta
 }

</style>