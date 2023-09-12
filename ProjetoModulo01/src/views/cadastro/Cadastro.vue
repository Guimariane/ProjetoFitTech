<template>
    <form @submit.prevent="criarCadastro">

        <div class="logo">
            <img src= "../../assets/halter.png">
        </div>

        <h2>Crie a sua conta aqui!</h2>

        <div class="singup-element">
            <label for="name">Nome Completo</label>
            <input id="name" v-model="name">
            {{ this.errors.name }}
        </div>

        <br>

        <div class="singup-element">
            <label for="email">Email</label>
            <input id="email" v-model="email">
            {{ this.errors.email }}
        </div>

        <br>

        <div class="singup-element">
            <label for="password">Senha</label>
            <input id="password" v-model="password">
            {{ this.errors.password }}
        </div>

        <br>

        <div class="singup-element">
            <label for="confirmpassword">Confirme a senha</label>
            <input id="confirmpassword" v-model="confirmpassword">
            {{ this.errors.confirmpassword }}
        </div>

        <br>
        
        <div class="singup-element">
            <label for="type_plan">Selecione o seu plano</label>
            <select id="type_plan" v-model="type_plan">
                <option value="bronze">Bronze</option>
                <option value="silver">Prata</option>
                <option value="gold">Ouro</option>
            </select>
        </div>

        <button id="concluircadastro" type="submit">Concluir Cadastro</button>

        <button id="voltar"><router-link to="/">Voltar</router-link></button>

    </form>
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
                type_plan: 'bronze',
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

<style>
h2 {
    font-family: Arial, Helvetica, sans-serif;
}

form{
    margin: 40px auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: darkgray;
}

.singup-element {
    display: flex;
    flex-direction: column;
    height: 50px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
}

#concluircadastro {
    background-color: blueviolet;
    border-color: blueviolet;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    color: white;
    font-weight: bold;
    height: 40px;
    width: 200px;
    margin-bottom: 30px;
}

#voltar {
    background-color: white;
    border-color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
    color: blueviolet;
    font-weight: bold;
    height: 40px;
    width: 200px;
    margin-bottom: 30px;
}

</style>