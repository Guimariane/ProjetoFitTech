<template>
   <div>
        <h2>Exercícios</h2>

        <v-card
            class="mx-auto"
            color="grey-lighten-3"
            max-width="400"
        >
            <v-card-text>
            <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search templates"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
            ></v-text-field>
            </v-card-text>
        </v-card>

        <v-table fixed-header>
            <thead>
            <tr>
                <th class="text-left">
                Nome
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="student in students" :key="student.id">
                <td>{{ student.name }} </td>
            </tr>
            </tbody>

        </v-table>
   </div> 
</template>

<script>
import axios from 'axios'


export default {
    data () {
        return {
            student: {},
            students: [],
            workout: ''
        }
    },

    mounted() {
        this.exibirexercicio()
    },
    methods: {
    exibirexercicio(){
        axios ({
            url:'http://localhost:3000/exercises',
            method: 'GET',
        })
    .then((response) => {
        this.students = response.data.students
    })
    .catch(() => {
        console.log("Deu ruim")
    })
},
}}
</script>