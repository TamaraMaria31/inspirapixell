export async function fetchImages(page = 1, limit = 24) {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);

    if (!response.ok) throw new Error("Erro ao carregar dados da API");

    const data = await response.json();

    // Ajustar formato para o que o Vue espera
    return data.map(img => ({
      id: img.id,
      author: img.author,
      imageUrl: img.download_url  // ← CORREÇÃO AQUI
    }));
  } catch (error) {
    console.error("API Error:", error);
    return []; // evita crash
  }
}
