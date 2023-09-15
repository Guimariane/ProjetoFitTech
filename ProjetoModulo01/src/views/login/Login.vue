<template>  
    <form @submit="validateuser" class="login">

        <div class="logo">
            <img src= "../../assets/halter.png">
        </div>
  
      <h1>Faça o seu login aqui!</h1>
  
        <div>
            <input placeholder="Digite o seu e-mail" v-model="email">
        </div>

        <br>

        <div>
            <input placeholder="Digite a sua senha" v-model="password">
        </div>

        <br>
  
        <div class="error-login">
          <ul>
            <li v-if="errorInputEmail">{{ errorInputEmail }}</li>
            <li v-if="errorInputPassword">{{ errorInputPassword }}</li>
          </ul>
        </div>
  
        <button type="submit">Entrar</button>
  
        <p>Ainda não tem uma conta?</p>
        <button id="cadastro"><router-link to="/cadastro">Cadastre-se aqui!</router-link></button>
    </form>
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
              local.Storage.setItem('sessions_token', response.data.token)
              local.Storage.setItem('sessions_name', response.data.name)

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
  
  <style>
    .error-login{
      width: 300px;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      font-size: 12px;
      color: crimson;
      font-weight: bold;
    }
  
    .login{
        display: flex;
        flex-direction: column;
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

    #cadastro{
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
  </style>