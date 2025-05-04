// Cria uma função assíncrona chamada traduzirTexto que recebe uma string texto como parâmetro
async function traduzirTexto(texto) { 
  // Cria uma const chamada url para armazenar a URL da API
  // encodeURIComponent(texto) garante que caracteres especiais (como acentos ou espaços) sejam aceitos na URL.
  // texto é o valor do parâmetro (q) que a função recebe (ex: "Olá mundo")
  // langpair=pt|en significa que está traduzindo do português(pt) para o inglês(en).
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|en`; 
  // Cria uma const chamada response que irá armazenar uma requisição
  // fetch faz uma requisição(HTTP GET(Busca dados)) para a url especificada(API)
  // await espera a resposta da URL(API)
  const response = await fetch(url);
  // Uma const chamada data vai armazenar a resposta da API em um objeto JavaScript(JSON)
  // *.json converte a resposta da API em formato JSON*
  const data = await response.json();
  // Retorna o texto traduzido que está dentro do JSON
  return data.responseData.translatedText;
}

// Função traduzirPagina traduz textos visíveis na página web para inglês, elemento por elemento (por isso que a tradução é mais lenta)
async function traduzirPagina() {
  // Seleciona todos os elementos HTML listados
  const elementos = document.querySelectorAll("h1, h2, h3, p, span, li, a");

  // Faz um loop sobre todos os elementos encontrados
  for (const el of elementos) {
    // Verifica se o conteúdo de texto do elemento não está vazio
    // ".trim()" remove espaços em branco do início e do fim de uma string
    // innertext é o texto visível dentro do elemento
    if (el.innerText.trim()) {
      try {
        // Chama a função de tradução para o texto do elemento
        // Usa await para esperar o texto traduzido.
        const traducao = await traduzirTexto(el.innerText);
        // Substitui o texto do elemento pelo texto traduzido.
        el.innerText = traducao;
        // Se algo der errado. mostra o erro no console
      } catch (error) {
        console.error("Erro ao traduzir:", error);
      }
    }
  }
}