<template>
    <v-toolbar class="ml=10">
        <v-toolbar-title>FitTech</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn><v-toolbar-items><router-link to="/home">Home</router-link></v-toolbar-items></v-btn>
        <v-btn><v-toolbar-items><router-link to="/gerenciamentoalunos">Alunos</router-link></v-toolbar-items></v-btn>
        <v-btn><v-toolbar-items><router-link to="/gerenciamentoexercicios">Exercícios</router-link></v-toolbar-items></v-btn>
        <v-btn><v-toolbar-items><router-link to="/">Sair</router-link></v-toolbar-items></v-btn>
    </v-toolbar>
</template>

<style>

</style>