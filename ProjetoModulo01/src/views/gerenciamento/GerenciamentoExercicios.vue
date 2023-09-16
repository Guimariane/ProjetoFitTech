<template>
    <v-container>
    <v-row>
        <v-col cols="12" md="2">
            <h2>Exercícios</h2>
        </v-col>
    </v-row>
    </v-container>

    <v-form @submit.prevent="CadastrarExercicio">
        <v-container>
            <v-row>
                <v-col cols="12" md="10">
                    <v-text-field v-model="description" label="Digite seu exercício"></v-text-field>
                </v-col>
                <v-col>
                    <v-btn cols="12" md="2">Cadastrar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>

    <v-container>
        <v-table fixed-header>
            <thead>
                <tr>
                    <th class="text-left">Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="workout in workouts" :key="workout.id">
                    <td>{{ workout.description }} </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>

</template>

<script>
import axios from 'axios'
import {captureErrorYup} from '../../utils/generalfunctions.js'
import * as yup from 'yup'


export default {
    data () {
        return {
            workouts: [],
            workout: {},
            description: ''
        }
    },
    
    methods: {
        CadastrarExercicio (){
            try{
                    const schema = yup.object().shape({
                        description: yup.string().required("Campo Obrigatório!")
                    })
                    
                    schema.validateSync(
                        {
                            workout: this.workout.description,
                        },
                        { abortEarly: false})

            axios({
                url: 'http://localhost:3000/exercises',
                method: 'POST',
            })
            .then((response) => {
                console.log("Chegamos no then")
                        if(response.ok === false) {
                            throw new Error()
                        }
                        return response.json()})
                        .then(() => {
                        alert('Exercício Cadastrado com sucesso!')
                        })
                    .catch(() => {
                        alert("Falha ao concluir o cadastro do exercício")
                    })
        } catch (error) {
                        this.errors = captureErrorYup(error)
                    }
        },

        exibirexercicio(){
            axios ({
                url:'http://localhost:3000/exercises',
                method: 'GET',
            })
        .then((response) => {
            this.workouts = response.data.workouts
        })
        .catch(() => {
            console.log("Deu ruim")
        })
        }},

    mounted() {
        this.exibirexercicio()
    }
    }
</script>