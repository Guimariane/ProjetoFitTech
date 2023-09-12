<template>
    <div class="d-flex flex-row justify-space-around mb-6 bg-surface-variant">
    <v-card
    class= "max-auto"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
            Exercícios Cadastrados
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="outlined">
        <router-link to="/cadastroaluno">Adicionar</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card
    class="max-auto"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          Headline
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn     
        variant="outlined">
        <router-link to="/cadastroexercicios">Adicionar</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>

</script>

<style>

</style>