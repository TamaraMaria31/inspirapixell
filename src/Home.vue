<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import Home from './Home.vue';
import { fetchImages } from './api';
import logoo from '@/assets/logoo.svg';

const props = defineProps({
  isDarkMode: Boolean
});

const emit = defineEmits(['toggleTheme']);

const images = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);

const loadMore = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  const newImages = await fetchImages(currentPage.value, 24);
  images.value = [...images.value, ...newImages];
  currentPage.value++;
  isLoading.value = false;
};

const subscribe = () => {
  alert("Inscrição simulada! Obrigado por assinar.");
};

// Tema
const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  emit('toggleTheme', isDarkMode.value);
};

watch(isDarkMode, (newVal) => {
  document.body.className = newVal ? 'dark-mode' : 'light-mode';
}, { immediate: true });

onMounted(() => {
  loadMore();

  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  }
});
</script>

<template>
  <div class="inspire-pixel-page">

    <!-- HEADER -->
    <header class="header">
      <div class="logo-container">
        <img :src="logoo" class="logo-icon" alt="InspiraPixel Logo">
        <h1 class="logo">InspiraPixel</h1>
      </div>

      <div class="theme-toggle">
        <span class="theme-label">{{ isDarkMode ? 'Modo Noturno' : 'Modo Claro' }}</span>
        <label class="switch">
          <input type="checkbox" :checked="isDarkMode" @change="toggleTheme" />
          <span class="slider round"></span>
        </label>
      </div>
    </header>

    <!-- SUBHEADER -->
    <div class="subheader">
      <p class="tagline">Sua dose diária de inspiração visual.</p>
    </div>

    <!-- GRID DE IMAGENS -->
    <main class="image-grid">
      <div v-for="image in images" :key="image.id" class="grid-item">
        <img :src="image.imageUrl" :alt="image.author" loading="lazy" />
        <div class="overlay">
          <span>{{ image.author }}</span>
        </div>
      </div>
    </main>

    <!-- BOTÃO CARREGAR MAIS -->
    <div class="grid-item load-more-item">
      <button @click="loadMore" :disabled="isLoading" class="load-more-btn">
        {{ isLoading ? 'Carregando...' : 'Carregar Mais' }}
      </button>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-section contact">
        <h3>Contato</h3>
        <ul>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Central de Ajuda</a></li>
        </ul>
      </div>

      <div class="footer-section newsletter">
        <h3>Assine nossa newsletter</h3>
        <p>Receba as melhores inspirações diretamente na sua caixa de entrada.</p>
        <form @submit.prevent="subscribe">
          <input type="email" placeholder="Seu email" required class="input-email" />
          <button type="submit" class="btn-subscribe">Inscrever-se</button>
        </form>
        <p class="contact-email">contato@inspiralens.com</p>
      </div>

      <div class="footer-section policies">
        <h3>Políticas</h3>
        <ul>
          <li><a href="#">Políticas de privacidade</a></li>
          <li>Rio de Janeiro – Brasil</li>
        </ul>
      </div>
    </footer>

  </div>
</template>

<style lang="scss">
:root {
  transition: background-color 0.5s, color 0.5s;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

.light-mode {
  background-color: #ffffff;
  color: #333333;
}
</style>

