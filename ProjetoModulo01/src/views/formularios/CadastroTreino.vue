<template>
    <Menu></Menu>

    <v-form @submit.prevent="CriarExercicio()" ref="cadtreinoaluno">
        <v-container>
            <v-row>
                <h2>Treino</h2>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12" md="12">
                <v-select  v-model="this.exercise_id" :items="this.training" item-title="description" item-value="id" label="Qual Exercício?"></v-select>
                <v-span>{{ this.errors.exercise_id }}</v-span>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                <v-text-field v-model="repetitions" label="Repetições" id="repetitions"></v-text-field>
                <v-span>{{ this.errors.repetitions }}</v-span>
                </v-col>

                <v-col cols="12" md="4">
                <v-text-field v-model="weight" label="Peso" id="weight" type="number"></v-text-field>
                <v-span>{{ this.errors.weight }}</v-span>
                </v-col>

                <v-col cols="12" md="4">
                <v-text-field v-model="break_time" label="Tempo de Pausa" id="break_time" type="time"></v-text-field>
                <v-span>{{ this.errors.break_time }}</v-span>
                </v-col>
            </v-row>

            <v-row>
                <v-select v-model="day" cols="12" md="12" label="Dia da Semana" :items="weekday"></v-select>
                <v-span>{{ this.errors.day }}</v-span>
            </v-row>

            <v-row>
                <v-textarea cols="12" md="12" label="Observações" v-model="observations" id="observations"></v-textarea>
                <v-span>{{ this.errors.observations }}</v-span>
            </v-row>

            <v-row>
                <v-col cols="12" md="2">
                    <v-btn type="submit" @click="Cancelar()">Cancelar</v-btn>
                </v-col>

                <v-col cols="12" md="2">
                    <v-btn type="submit">Cadastrar</v-btn>
                </v-col>
            </v-row>

        </v-container>
    </v-form>
</template>

<script>

import Menu from '../menu/Menu.vue'
import {captureErrorYup} from '../../utils/generalfunctions.js'
import * as yup from 'yup'
import axios from 'axios'

    export default {
        data(){
            return {
                exercise_id: '',
                student_id: this.$route.query.id,
                repetitions: '',
                weight: null,
                break_time: '',
                observations: '',
                day: '',
                weekday:  [{
                title: 'Segunda-Feira',
                value: 'segunda'
            },
            {
                title: 'Terça-Feira',
                value: 'terca'
            },
            {
                title: 'Quarta-Feira',
                value: 'quarta'
            },
            {
                title: 'Quinta-Feira',
                value: 'quinta'
            },
            {
                title: 'Sexta-Feira',
                value: 'sexta'
            },
            {
                title: 'Sábado',
                value: 'sábado'
            },
            {
                title: 'Domingo',
                value: 'domingo'
            }],
                errors: {},
                training: [],
                id: '',
                description: ''
            }
        },

        methods: {
            CriarExercicio () {
            try{
                    const schema = yup.object().shape({
                        exercise_id: yup.string().required("Campo Obrigatório!"),
                        repetitions: yup.string().min(1, "O exercício deve ter pelo menos 1 repetição!"),
                        weight: yup.number("O peso precisa ser um número!").required("Campo Obrigatório!"),
                        break_time: yup.string().required("Campo Obrigatório!"),
                        day: yup.string().required("Campo Obrigatório!")
                    })

                    schema.validateSync(
                        {
                            exercise_id: this.exercise_id,
                            repetitions: this.repetitions,
                            weight: this.weight,
                            break_time: this.break_time,
                            day: this.day
                        },
                        { abortEarly: false})
                                        
                    fetch('http://localhost:3000/workouts', {
                        method: 'POST',
                        body: JSON.stringify({
                            exercise_id: this.exercise_id,
                            student_id: this.student_id,
                            repetitions: this.repetitions,
                            weight: this.weight,
                            break_time: this.break_time,
                            observations: this.observations,
                            day: this.day
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        console.log("Chegamos no then")
                        if(response.ok === false) {
                            throw new Error()
                        }
                        return response.json()})
                    
                    .then(() => {
                        alert('Treino Cadastrado com sucesso!')
                        })
                    .catch(() => {
                        alert("Falha ao concluir o cadastro do treino")
                    })
                    
                } catch (error) {
                    alert("Estamos aqui")
                    if (error instanceof yup.ValidationError) {
                    this.errors = captureErrorYup(error);
                    }}},
                    
              
            CarregarExercicio () {
                axios.get('http://localhost:3000/exercises')
                    .then((response) => {
                        this.training = response.data
                    }) .catch (() => {
                        console.log("Deu ruim")
                    })
            },

            Cancelar() {
                this.$refs.cadtreinoaluno.reset()
            }},

            mounted () {
                this.CarregarExercicio();
                const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
                this.day = today;
            },

            components: {
                Menu
            }}

</script>

<style>

</style>