<script setup>
import { ref, onMounted } from 'vue';
import { fetchImages } from './api';
import logoo from '@/assets/logoo.svg';

const images = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);
const isDarkMode = ref(true);

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

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  // salva preferência
  localStorage.setItem('theme-mode', isDarkMode.value ? 'dark' : 'light');
  document.body.className = isDarkMode.value ? 'dark-mode' : 'light-mode';
};

onMounted(() => {
  const saved = localStorage.getItem('theme-mode');
  if (saved) isDarkMode.value = saved === 'dark';
  document.body.className = isDarkMode.value ? 'dark-mode' : 'light-mode';
  loadMore();
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
/* THEME / VARS - usando variáveis CSS (sem mixins externos) */
:root {
  --color-primary: #ff3e67;
  --logo-purple: #a855f7;
  --color-background: #ffffff;
  --color-text: #333333;
  --color-card-background: #f5f5f5;
  --color-footer-background: #eeeeee;
}

/* modo escuro */
.dark-mode {
  --color-background: #1a1a1a;
  --color-text: #f0f0f0;
  --color-card-background: #2c2c2c;
  --color-footer-background: #222222;
}

/* modo claro (opcional, reafirma) */
.light-mode {
  --color-background: #ffffff;
  --color-text: #333333;
  --color-card-background: #f5f5f5;
  --color-footer-background: #eeeeee;
}

/* Reset/Globais */
* { box-sizing: border-box; }
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: background-color 0.4s, color 0.4s;
}

/* ===== HEADER ===== */
.header {
  width: 100%;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* separa logo e toggle */
  gap: 20px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

/* Container da logo */
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Ícone */
.logo-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
}

/* Texto da logo */
.logo {
  font-size: 27px;
  font-weight: 700;
  color: var(--logo-purple);
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

/* Theme toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Switch */
.switch {
  position: relative;
  width: 50px;
  height: 24px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  inset: 0;
  background-color: #ccc;
  border-radius: 24px;
  transition: .3s;
}
.slider::before {
  content: "";
  position: absolute;
  left: 4px;
  bottom: 4px;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: .3s;
}
.switch input:checked + .slider {
  background-color: var(--color-primary);
}
.switch input:checked + .slider::before {
  transform: translateX(26px);
}

/* pequenos ajustes responsivos */
@media (max-width: 600px) {
  .logo { font-size: 20px; }
  .logo-icon { width: 34px; height: 34px; }
}

/* GRID e footer básicos (mantive simplificado) */
.image-grid { display: grid; gap: 15px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-item { background: var(--color-card-background); border-radius: 8px; overflow: hidden; }
.load-more-item { grid-column: 1 / -1; display:flex; justify-content:center; padding: 10px 0; }
.load-more-btn { padding: 10px 30px; background: var(--color-primary); color: #fff; border-radius: 30px; border: none; cursor: pointer; }
.footer { background: var(--color-footer-background); padding: 40px 20px; margin-top: 40px; }
</style>



