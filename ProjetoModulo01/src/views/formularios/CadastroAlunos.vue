<template>
    <Menu></Menu>
    <form @submit.prevent="CadastrarAlunos" ref="cadaluno">

        <h2>Cadastro de Alunos</h2>

        <h3>Dados do Aluno</h3>

        <div class="registerstudent-element">
            <label for="fullname">Nome Completo</label>
            <input id="fullname" :reset="reset" v-model="fullname">
            {{ this.errors.fullname }}
            <label for="email">Email</label>
            <input id="email" :reset="reset" v-model="email">
            {{ this.errors.email }}
            <label for="contact">Contato</label>
            <input id="contact" :reset="reset" v-model="contact">
            {{ this.errors.contact }}
            <label for="date_birth">Data de Nascimento</label>
            <input type="date" id="date_birth" :reset="reset" v-model="date_birth">
            {{ this.errors.date_birth }}
        </div>

        <br>

        <h3>Endereço do Aluno</h3>

        <div class="addressstudent-element">
            <label for="cep">CEP</label>
            <input id="cep" :reset="reset" v-model="cep">
            <button type="button" @click="buscarCEP">Buscar CEP</button>
            <span>{{ this.errors.cep }}</span>
            <label for="street">Logradouro</label>
            <input id="street" :reset="reset" v-model="street">
            {{ this.errors.street }}
            <label for="number">Número</label>
            <input id="number" :reset="reset" v-model="number">
            {{ this.errors.number }}
            <label for="complement">Complemento</label>
            <input id="complement" :reset="reset" v-model="complement">
            {{ this.errors.complement }}
            <label for="neighborhood">Bairro</label>
            <input id="neighborhood" :reset="reset" v-model="neighborhood">
            {{ this.errors.neighborhood }}
            <label for="city">Cidade</label>
            <input id="city" :reset="reset" v-model="city">
            {{ this.errors.city }}
            <label for="province">Estado</label>
            <input id="province" :reset="reset" v-model="province">
            {{ this.errors.province }}
        </div>

        <br>

        <button id="concluircadastro" type="submit">Cadastrar Aluno</button>

    </form>
</template>

<script>

import Menu from '../menu/Menu.Vue';
import * as yup from 'yup'
import {captureErrorYup} from '../../utils/generalfunctions'
import axios from 'axios'


    export default {
        data(){
            return {
                fullname: '',
                email: '',
                contact: '',
                date_birth: new Date(),
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                province: '',
                errors: {},
            }
        },

        methods: {

            buscarCEP(){
                axios.get(`https://viacep.com.br/ws/${this.cep}/json`)
                    .then((response) => {
                        this.city = response.data.localidade;
                        this.province = response.data.uf;
                        this.street = response.data.logradouro;
                        this.neighborhood = response.data.bairro;
                    }) .catch((error) => {
                        console.log(error.message)
                        alert("Houve um erro durante a busca deste CEP!")
                    })
            },

            CadastrarAlunos () {
            try{
                    const schema = yup.object().shape({
                        fullname: yup.string().required("Campo Obrigatório!"),
                        email: yup.string().email("Email inválido!"),
                        contact: yup.string().required("Campo Obrigatório!"),
                        date_birth: yup.date().max(new Date(), "A data precisa ser até o dia de hoje"),
                        cep: yup.string().required("Campo Obrigatório!"),
                        street: yup.string().required("Campo Obrigatório!"),
                        number: yup.string().required("Campo Obrigatório!"),
                        neighborhood: yup.string().required("Campo Obrigatório!"),
                        city: yup.string().required("Campo Obrigatório!"),
                        province: yup.string().required("Campo Obrigatório!")
                    })

                    schema.validateSync(
                        {
                            fullname: this.fullname,
                            email: this.email,
                            contact: this.contact,
                            date_birth: this.date_birth,
                            cep: this.cep,
                            street: this.street,
                            number: this.number,
                            neighborhood: this.neighborhood,
                            city: this.city,
                            province: this.province,
                        },
                        { abortEarly: false})
                
                    fetch('http://localhost:3000/students', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: this.fullname,
                            email: this.email,
                            contact: this.contact,
                            date_birth: this.date_birth,
                            cep: this.cep,
                            street: this.street,
                            number: this.number,
                            complement: this.complement,
                            neighborhood: this.neighborhood,
                            city: this.city,
                            province: this.province
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if(response.ok === false) {
                            throw new Error()
                        }
                        return response.json()})
                    
                    .then(() => {
                        alert('Aluno Cadastrado com sucesso!')
                        this.$refs.cadaluno.reset()
                        })
                    .catch(() => {
                        alert("Falha ao concluir o cadastro do aluno")
                    })
                
                } catch (error) {
                    if(error instanceof yup.ValidationError){
                        this.errors = captureErrorYup(error)
                    }
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