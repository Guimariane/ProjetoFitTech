<template>
    <div class="pagelogin">
  
      <div class="logo">
        <img src="../src/assets/logo/halter.png">
      </div>
  
      <h1>Faça o seu login aqui!</h1>
  
      <form @submit="validateuser" class="login">
  
        <input placeholder="Digite o seu e-mail" v-model="email">
        <br>
        <br>
        <input placeholder="Digite a sua senha" v-model="password">
        <br>
        <br>
  
        <div class="error-login">
          <ul>
            <li v-if="errorInputEmail">{{ errorInputEmail }}</li>
            <li v-if="errorInputPassword">{{ errorInputPassword }}</li>
          </ul>
        </div>
  
        <br>
        <button type="submit">Entrar</button>
  
      </form>
  
    </div>
  </template>
  
  
  <script>
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
        validateuser(event) {
          this.errorInputEmail = ""
          this.errorInputPassword = ""
          event.preventDefault();
          if(this.email === '') this.errorInputEmail = "Por favor, digite o seu e-mail"
          if(this.password === '') this.errorInputPassword = "Por favor, digite a sua senha"
          
        }
      }
    }
  </script>
  
  <style>
    .error-login{
      width: 300px;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      font-size: 12px;
      color: crimson;
      font-weight: bold;
    }
  
    .pagelogin{
      background-color: darkgrey;
      font-family: Arial, Helvetica, sans-serif;
      width: 400px;
      justify-content: center;
      align-items: center;
    }
  
    .logo{
      display: flex;
      justify-content: center;
    }
  
    img {
      width: 2cm;
      height: 2cm;
      margin-top: 20px;
    }
  
    h1{
      text-align: center;
      padding-top: 20px;
      margin-top: 10px;
    }
  
    #pagelogin {
      justify-content: center;
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
      background-color: blueviolet;
      border-color: blueviolet;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 14px;
      color: white;
      font-weight: bold;
      height: 40px;
      width: 80px;
      margin-bottom: 30px;
    }
  </style>