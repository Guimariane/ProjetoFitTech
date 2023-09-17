<template>  

<h1>Faça o seu login aqui!</h1>
<br>
  <v-form @submit.prevent="validateuser">
    <v-container class="d-flex justify-center">
      <v-sheet width="300">
      <v-row>
        <v-text-field label="Digite o seu email" v-model="email"></v-text-field>
      </v-row>

      <v-row>
        <v-text-field label="Digite a sua senha" v-model="password" type="password"></v-text-field>
      </v-row>

      <v-row class="error-login">
        <p v-if="errorInputEmail">{{ errorInputEmail }}</p>
        <p v-if="errorInputPassword">{{ errorInputPassword }}</p>
      </v-row>

      <br>

      <v-row>
        <v-btn block type="submit">Entrar</v-btn>
      </v-row>

      <v-row>
        <p>Ainda não tem uma conta?</p>
      </v-row>

      <v-row>
        <v-btn block color="white"><router-link to="/cadastro">Cadastre-se aqui!</router-link></v-btn>
      </v-row>
      
    </v-sheet>
    </v-container>
  </v-form>
</template>
  
  
  <script>

  import axios from 'axios'

    export default {
      data () {
        return {
          email: '',
          password: '',
          errorInputEmail: '',
          errorInputPassword: ''
        }
      },
  
      methods: {
        validateuser() {
          this.errorInputEmail = ""
          this.errorInputPassword = ""

          if(this.email === '') this.errorInputEmail = "Por favor, digite o seu e-mail"
          if(this.password === '') this.errorInputPassword = "Por favor, digite a sua senha"

          if(this.errorInputEmail === '' && this.errorInputPassword === '') {

            axios({
              url: 'http://localhost:3000/sessions',
              method: 'POST',
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then((response) => {
              localStorage.setItem('sessions_token', response.data.token)
              localStorage.setItem('sessions_name', response.data.name)

              alert("Login realizado com sucesso! Redirecionando para a Home...")
              this.$router.push('/home')
            
            })
            .catch(() =>
              alert("Falha ao realizar o seu login"))
            }
            }
            }
          }
          
  </script>
  
  <style scoped>

  *{
    text-decoration: none;
  }
   .error-login{
      width: 300px;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      font-size: 12px;
      color: crimson;
      font-weight: bold;
    }
  
    h1{
      text-align: center;
      margin-top: 20px;
      color: darkmagenta
    }
  
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    input {
      width: 300px;
      height: 40px;
    }
  
    button{
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