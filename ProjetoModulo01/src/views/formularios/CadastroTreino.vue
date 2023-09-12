<template>
    <Menu></Menu>
    <form @submit.prevent="CriarExercicio">

        <h2>Exercícios</h2>

        <div class="register-exercise">
            <label for="exercise_id">Qual Exercicío?</label>
            <input id="exercise_id" v-model="exercise_id">
            {{ this.errors.exercise_id }}
            <label for="repetitions">Repetições</label>
            <input id="repetitions" v-model="repetitions">
            {{ this.errors.repetitions }}
            <label for="weight">Peso</label>
            <input type="number" id="weight" v-model="weight">
            {{ this.errors.weight }}
            <label for="break_time">Tempo de Pausa</label>
            <input type="time" id="break_time" v-model="break_time">
            {{ this.errors.break_time }}
            <label for="observations">Observações</label>
            <input id="observations" v-model="observations">
            {{ this.errors.observations }}
            <label for="day">Dia da Semana</label>
            <select for="day">
                <option>Segunda-feira</option>
                <option>Terça-feira</option>
                <option>Quarta-feira</option>
                <option>Quinta-feira</option>
                <option>Sexta-feira</option>
                <option>Sábado</option>
                <option>Domingo</option>
            </select>
        </div>

        <br>

        <button id="concluir" type="submit">Cadastrar Treino</button>

    </form>
</template>

<script>

import Menu from '../menu/Menu.Vue';
import {captureErrorYup} from '../../utils/generalfunctions'
import * as yup from 'yup'

    export default {
        data(){
            return {
                exercise_id: '',
                repetitions: '',
                weight: null,
                break_time: '',
                observations: '',
                day: '',
                errors: {},
            }
        },

        methods: {
            CriarExercicio () {
            try{
                    const schema = yup.object().shape({
                        exercise_id: yup.string().required("Campo Obrigatório!"),
                        repetitions: yup.string().min(1, "O exercício deve ter pelo menos 1 repetição!"),
                        weight: yup.number().required("Campo Obrigatório!"),
                        break_time: yup.string().required("Campo Obrigatório!"),
                        day: yup.string().required("Campo Obrigatório!")
                    })

                    schema.validateSync(
                        {
                            exercise_id: this.exercise_id,
                            repetitions: this.repetitions,
                            weight: this.weight,
                            break_time: this.break_time,
                            observations: this.observations,
                            day: this.day
                        },
                        { abortEarly: false})
                    
                    fetch('http://localhost:3000/workouts', {
                        method: 'POST',
                        body: JSON.stringify({
                            exercise_id: this.exercise_id,
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
                        this.errors = captureErrorYup(error)
                    }
                    
                    }},
            components: {
                Menu
            }}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: 0;
}

</style>