<template>
    <nav>
        <div>
            <h2>FitTech</h2>
        </div>
        <div class="options">
            <ul>
                <router-link class="item-options" to="/home">
                    <li>
                        <h2>Home</h2>
                    </li>
                </router-link>
                <router-link class="item-options" to="/gerenciamentoalunos">
                    <li>
                        <h2>Alunos</h2>
                    </li>
                </router-link>
                <router-link class="item-options" to="/gerenciamentoexercicios">
                    <li>
                        <h2>Exercícios</h2>
                    </li>
                </router-link>
                <router-link class="item-options" to="/">
                    <li>
                        <h2>Sair</h2>
                    </li>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<style>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.item-options {
    display: flex;
    flex-direction: row;
}
</style>