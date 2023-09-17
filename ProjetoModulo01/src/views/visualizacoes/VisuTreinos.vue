<template>
    <Menu></Menu>
    <div v-if="workoutsData.length > 0">
        <h2>Treino</h2>

        <h2>Aluno {{ workoutsData[0].student_name }}</h2>

    </div>

    <h2>Exercícios de Hoje</h2>


    <h2>Exercícios da Semana</h2>

    <v-card>
        <v-tabs>
            <v-tab value="segunda">Segunda</v-tab>
            <v-tab value="terça">Terça</v-tab>
            <v-tab value="quarta">Quarta</v-tab>
            <v-tab value="quinta">Quinta</v-tab>
            <v-tab value="sexta">Sexta</v-tab>
            <v-tab value="sabado">Sábado</v-tab>
            <v-tab value="domingo">Domingo</v-tab>
        </v-tabs>
        <v-card-text>
            <v-window>
                <v-window-item>
                    <v-table>
                        <thead>
                        <tr>
                            <th class="text-left">
                                Nome
                            </th>
                            <th class="text-left">
                                Peso
                            </th>
                            <th class="text-left">
                                Repetições
                            </th>
                            <th>
                                Pausa
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="workout in workoutsData" :key="workout.id">
                            <td> {{ workout.exercise_description }}</td>
                            <td> {{ workout.weight }}KG</td>
                            <td> {{ workout.repetitions }} repetições</td>
                            <td> {{ workout.break_time }}</td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-window-item>
            </v-window>    
          </v-card-text>
        </v-card>
</template>

<script>

import axios from 'axios'
import Menu from '../menu/Menu.vue'

export default {
    data() {
        return {
            workoutsData: [],
            workout: {},
            id: '',
            student_id: this.$route.query.id,
            day: {},
            weekday:  [{
                id: 1,
                title: 'Segunda',
                value: 'segunda'
            },
            {   
                id: 2,
                title: 'Terça',
                value: 'terca'
            },
            {
                id: 3,
                title: 'Quarta',
                value: 'quarta'
            },
            {
                id: 4,
                title: 'Quinta',
                value: 'quinta'
            },
            {
                id: 5,
                title: 'Sexta',
                value: 'sexta'
            },
            {
                id: 6,
                title: 'Sábado',
                value: 'sábado'
            },
            {
                id: 7,
                title: 'Domingo',
                value: 'domingo'
            }]
        }
    },

    methods: {
        async PegarTreino() {
        try{
            const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
            this.workoutsData = response.data.workouts
        } catch (error) {
            console.error("Deu ruim", error)
        }
        },

    },

    components: {
        Menu
    },

    mounted() {
        this.PegarTreino()
    },

}

</script>