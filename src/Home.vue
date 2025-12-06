<template>
  <div class="inspire-pixel-page">
    
    <header class="header">
  <div class="logo-container">
    <img src="./assets/logoo.svg" class="logo-icon" alt="InspiraPixel Logo"> 
    <h1 class="logo">InspiraPixel</h1>
  </div>
  </header>

      <div class="theme-toggle">
        <span class="theme-label">{{ isDarkMode ? 'Modo Noturno' : 'Modo Claro' }}</span>
        <label class="switch">
          <input type="checkbox" :checked="isDarkMode" @change="$emit('toggleTheme')" />
          <span class="slider round"></span>
        </label>
      </div>
    </header>

   <div class="subheader">
  <p class="tagline">Sua dose diária de inspiração visual.</p>
</div>

<main class="image-grid">
  <div v-for="image in images" :key="image.id" class="grid-item">
    <img :src="image.imageUrl" :alt="image.author" loading="lazy" />
    <div class="overlay">
      <span>{{ image.author }}</span>
    </div>
  </div>
</main>


    <main class="image-grid">
      <div v-for="image in images" :key="image.id" class="grid-item">
        <img :src="image.imageUrl" :alt="image.author" loading="lazy" />
        <div class="overlay">
          <span>{{ image.author }}</span>
        </div>
      </div>
    </main>

     <!-- Botão -->
  <div class="grid-item load-more-item">
    <main>
    <button @click="loadMore" :disabled="isLoading" class="load-more-btn">
      {{ isLoading ? 'Carregando...' : 'Carregar Mais' }}
    </button>
  
</main>
</div>
    
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

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { fetchImages } from './api'; // Reutilize o serviço da resposta anterior

// Define as propriedades (props) e eventos (emits)
const props = defineProps({
  isDarkMode: Boolean
});

defineEmits(['toggleTheme']);

const images = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);

const loadMore = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  // Busca 24 imagens para preencher 4 colunas perfeitamente
  const newImages = await fetchImages(currentPage.value, 24); 
  images.value = [...images.value, ...newImages];
  currentPage.value++;
  isLoading.value = false;
};

const subscribe = () => {
  alert("Inscrição simulada! Obrigado por assinar.");
};

onMounted(() => {
  loadMore();
});

</script>


