<template>
  <div :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
    <Home :is-dark-mode="isDarkMode" @toggle-theme="toggleTheme" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Home from './Home.vue';
import './style.scss';

const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

watch(isDarkMode, (newVal) => {
  document.body.className = newVal ? 'dark-mode' : 'light-mode';
}, { immediate: true });
</script>
