// Cria uma função assíncrona chamada traduzirTexto que recebe uma string texto como parâmetro
async function traduzirTexto(texto) { 
  // Cria uma const chamada url para armazenar a URL da API
  // encodeURIComponent(texto) garante que caracteres especiais (como acentos ou espaços) sejam aceitos na URL.
  // texto é o valor do parâmetro (q) que a função recebe (ex: "Olá mundo")
  // langpair=pt|en significa que está traduzindo do português(pt) para o inglês(en).
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|en`; 
  // Cria uma const chamada responde que irá armazenar uma requisição
  // fetch faz uma requisição(HTTP GET(Busca dados)) para a url especificada(API)
  // await espera a resposta da URL(API)
  const response = await fetch(url);
  // Uma const chamada data vai armazenar a resposta da API em um objeto JavaScript(JSON)
  // *.json converte a resposta da API em formato JSON*
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