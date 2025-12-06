<template>
  <div :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
    <Home @toggle-theme="toggleTheme" :is-dark-mode="isDarkMode" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Home from './Home.vue';
import './style.scss'; // Importa os estilos globais

const isDarkMode = ref(true); // Começa em modo noturno por padrão (como a imagem)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Monitora o estado e aplica a classe ao <body>
watch(isDarkMode, (newVal) => {
  document.body.className = newVal ? 'dark-mode' : 'light-mode';
}, { immediate: true });

// Tenta carregar a preferência do usuário ao iniciar
onMounted(() => {
  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  }
});
</script>

<style lang="scss">
/* Estilos globais para transição de tema */
:root {
  transition: background-color 0.5s, color 0.5s;
}
.dark-mode {
  // Define o fundo do body para o modo escuro
  background-color: #1a1a1a; 
  color: #f0f0f0;
}
.light-mode {
  // Define o fundo do body para o modo claro
  background-color: #ffffff;
  color: #333333;
}
</style>