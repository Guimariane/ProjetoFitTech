<template>
    <Menu></Menu>
    <v-container>
    <div v-if="workoutsData.length > 0">
        <h2>Treino</h2>

        <h2>Aluno {{ workoutsData[0].student_name }}</h2>

    </div>

    <h2>Exercícios de Hoje</h2>
        <v-checkbox v-for="workout in workoutsDataAtual" :key="workout.id" v-model="status" :label="[workout.exercise_description, ' || ', 
        workout.weight, 'Kg || ', workout.repetitions, ' repetições || ', workout.break_time, ' min de pausa']" 
        :value="workout.id">
        </v-checkbox>

    <h2>Exercícios da Semana</h2>

    <v-card>
        <v-tabs v-model="weekday">
            <v-tab value="segunda">Segunda</v-tab>
            <v-tab value="terca">Terça</v-tab>
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
</v-container>
</template>

<script>

import axios from 'axios'
import { format } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import Menu from '../menu/Menu.vue'

export default {
    data() {
        return {
            workoutsData: [],
            workoutsDataAtual: [],
            workout: {},
            student_id: this.$route.query.id,
            weekday: null,
            currentDay: "",
            status: "",
            WorkoutId: ""
        }
    },

    methods: {
        async PegarTreino() {
            try {
                const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
                this.workoutsData = response.data.workouts
                this.workoutsData = this.workoutsData.filter(item => item.day === this.weekday)
            } catch (error) {
                console.error("Deu ruim", error)
            }
        },

        async PegarTreinoDia() {
            try {
                const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
                this.workoutsDataAtual = response.data.workouts
                this.WorkoutId = response.data.workouts.id
                this.workoutsDataAtual = this.workoutsDataAtual.filter(item => item.day === this.currentDay)
                console.log(this.workoutsDataAtual)

                console.log(this.WorkoutId)
            } catch (error) {
                console.error("Deu ruim", error)
            }
        },

        StatusTreino() {
            axios.post(`http://localhost:3000/workouts/check`,
            {
                workout_id: this.status,
                student_id: this.student_id,
                day_of_week: this.currentDay,
            })

        }

    },

    components: {
        Menu
    },

    watch: {
        weekday() {
            this.PegarTreino()
        },

        status(){
            this.StatusTreino()
        }
    },

    mounted() {
        this.currentDay = format(new Date(), "cccc", { locale: ptBR });
        this.PegarTreino()
        this.PegarTreinoDia()
        console.log(this.weekday)
        console.log(this.currentDay)
    },

}

</script>