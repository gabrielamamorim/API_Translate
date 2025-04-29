async function traduzirTexto(texto) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|en`;
  const response = await fetch(url);
  const data = await response.json();
  return data.responseData.translatedText;
}

async function traduzirPagina() {
  const elementos = document.querySelectorAll("h1, h2, h3, p, span, li, a");

  for (const el of elementos) {
    if (el.innerText.trim()) {
      try {
        const traducao = await traduzirTexto(el.innerText);
        el.innerText = traducao;
      } catch (error) {
        console.error("Erro ao traduzir:", error);
      }
    }
  }
}