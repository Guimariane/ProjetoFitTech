<template>
    
        <h2>Crie a sua conta aqui!</h2>

        <v-form @submit.prevent="criarCadastro" ref="login">
            <v-container class="d-flex justify-center">
                <v-sheet width="500">
                    <v-row>
                        <v-text-field label="Nome Completo" v-model="name"></v-text-field>
                        <v-span>{{ this.errors.name }}</v-span>
                    </v-row>

                    <v-row>
                        <v-text-field label="E-mail" v-model="email"></v-text-field>
                        <v-span>{{ this.errors.email }}</v-span>
                    </v-row>

                    <v-row>
                        <v-text-field label="Senha" v-model="password" type="password"></v-text-field>
                        <v-span>{{ this.errors.password }}</v-span>
                    </v-row>

                    <v-row>
                        <v-text-field label="Confirme a Senha" v-model="confirmpassword" type="password"></v-text-field>
                        <v-span>{{ this.errors.confirmpassword }}</v-span>
                    </v-row>

                    <v-row>
                        <v-select label="Plano" v-model="type_plan" :items="plan"></v-select>
                    </v-row>

                    <v-row>
                        <v-btn block type="Submit">Cadastrar</v-btn>
                    </v-row>

                    <v-row>
                        <v-btn block color="white"><router-link to='/'>Voltar</router-link></v-btn>
                    </v-row>
                </v-sheet>
            </v-container>
        </v-form>
</template>

<script>

import * as yup from 'yup'
import {captureErrorYup} from '../../utils/generalfunctions'

    export default {
        data(){
            return {
                name: '',
                email: '',
                password: '',
                confirmpassword: '',
                type_plan: 'Bronze',
                plan:  [{
                title: 'Bronze',
                value: 'bronze'
            },
            {
                title: 'Prata',
                value: 'silver'
            },
            {
                title: 'Ouro',
                value: 'gold'
            }],
                errors: {}
            }
        },
        methods: {
            
            criarCadastro() {
                try{
                    const schema = yup.object().shape({
                        name: yup.string().required("Campo Obrigatório!"),
                        email: yup.string().email("Email inválido!").required("Campo Obrigatório!"),
                        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres")
                                    .max(20, "A senha deve ter no máximo 20 caracteres")
                                    .required("Campo Obrigatório!"),
                        confirmpassword: yup.string().oneOf([yup.ref('password')], "As senhas devem ser iguais!")
                    })

                    schema.validateSync(
                        {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            confirmpassword: this.confirmpassword
                        },
                        { abortEarly: false}
                    )

                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            type_plan: this.type_plan
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
                        alert('Cadastro realizado com sucesso!')
                        this.$router.push('/')
                        })
                    .catch(() => {
                        alert("Não foi possível criar a conta nesse momento.")
                    })

                } catch (error) {
                    if(error instanceof yup.ValidationError){
                        this.errors = captureErrorYup(error)
                    }
                    }
                }
            }
        }
</script>

<style scoped>
*{
    text-decoration: none;
}

h2 {
    font-family: Arial, Helvetica, sans-serif;
    color:darkmagenta;
    text-align: center;
    margin-top: 20px
}

form{
   margin: 10px auto;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

button {
    background-color: darkmagenta;
    border-color: darkmagenta;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    color: white;
    font-weight: bold;
    height: 40px;
    width: 200px;
    margin-bottom: 30px;
}

</style>