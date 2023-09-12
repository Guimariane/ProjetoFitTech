import {createRouter, createWebHistory} from 'vue-router'

// Importando as telas da aplicação

import Cadastro from '../views/cadastro/Cadastro.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/visualizacoes/home/Home.vue'
import CadastroAlunos from '../views/formularios/CadastroAlunos.vue'
import CadastroTreino from '../views/formularios/CadastroTreino.vue'
import GerenciamentoAlunos from '../views/gerenciamento/GerenciamentoAlunos.vue'
import GerenciamentoExercicios from '../views/gerenciamento/GerenciamentoExercicios.vue'
import VisuTreinos from '../views/visualizacoes/VisuTreinos.vue'
import Menu from '../views/menu/Menu.vue'

const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login

        },

        {
            path: '/cadastro',
            name: 'Cadastro',
            component: Cadastro
        },

        {
            path: '/home',
            name: 'Home',
            component: Home
        },

        {
            path: '/cadastroalunos',
            name: 'CadastroAlunos',
            component: CadastroAlunos
        },

        {
            path: '/cadastrotreinos',
            name: 'CadastroTreino',
            component: CadastroTreino
        },

        {
            path: '/gerenciamentoalunos',
            name: 'GerenciamentoAlunos',
            component: GerenciamentoAlunos
        },

        {
            path: '/gerenciamentoexercicios',
            name: 'GerenciamentoExercicios',
            component: GerenciamentoExercicios
        },

        {
            path: '/visualizacaotreinos',
            name: 'VisuTreinos',
            component: VisuTreinos
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu
        }
    ]

})

export default router