<template>
    <Menu></Menu>

    <v-form v-model="valid" @submit.prevent="CadastrarAlunos" ref="cadaluno">
        <v-container>
            <v-row>
                <h2>Cadastro de Alunos</h2>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <v-col cols="12" md="12"><h3>Dados do Aluno</h3></v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                <v-text-field v-model="fullname" label="Nome Completo" id="fullname"></v-text-field>
                <v-span>{{ this.errors.fullname }}</v-span>
                </v-col>

                <v-col cols="12" md="6">
                <v-text-field v-model="email" label="Email" id="email"></v-text-field>
                <v-span>{{ this.errors.email }}</v-span>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                <v-text-field v-model="contact" label="Contato" id="contact"></v-text-field>
                <v-span>{{ this.errors.contact }}</v-span>
                </v-col>

                <v-col cols="12" md="6">
                <v-text-field v-model="date_birth" label="Data de Nascimento" id="date_birth" type="date"></v-text-field>
                <v-span>{{ this.errors.date_birth }}</v-span>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <v-col cols="12" md="12"><h3>Endereço do Aluno</h3></v-col>
            </v-row>
            </v-container>

            <v-container>
            <v-row>
                <v-col cols="12" md="3">
                <v-text-field v-model="cep" label="CEP" id="cep"></v-text-field>
                <v-span>{{ this.errors.cep }}</v-span>
                </v-col>

                <v-col cols="12" md="3">
                    <v-btn density= "default" size="x-large" @click="buscarCEP">Buscar CEP</v-btn>
                </v-col>

                <v-col cols="12" md="6">
                <v-text-field v-model="street" label="Logradouro" id="street"></v-text-field>
                <v-span>{{ this.errors.street }}</v-span>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                <v-text-field v-model="number" label="Número" id="number"></v-text-field>
                <v-span>{{ this.errors.number }}</v-span>
                </v-col>

                <v-col cols="12" md="4">
                <v-text-field v-model="complement" label="Complemento" id="complemento"></v-text-field>
                <v-span>{{ this.errors.complement }}</v-span>
                </v-col>

                <v-col cols="12" md="4">
                <v-text-field v-model="neighborhood" label="Bairro" id="neighborhood"></v-text-field>
                <v-span>{{ this.errors.neighborhood }}</v-span>
                </v-col>

            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                <v-text-field v-model="city" label="Cidade" id="city"></v-text-field>
                <v-span>{{ this.errors.city }}</v-span>
                </v-col>

                <v-col cols="12" md="6">
                <v-text-field v-model="province" label="Estado" id="province"></v-text-field>
                <v-span>{{ this.errors.province }}</v-span>
                </v-col>

            </v-row>
            </v-container>

            <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn density= "default" size="x-large" type="submit">Cadastrar Aluno</v-btn>
                </v-col>
            </v-row>
        </v-container>

    </v-form>
</template>

<script>

import Menu from '../menu/Menu.vue';
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
                    
                    }
                
                
                },
            components: {
                Menu
            }}
</script>

<style>

</style>