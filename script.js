let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Adiciona um listener para carregar os dados assim que o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', () => {
    iniciarBusca();
});

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Pega o termo de busca do input, em minúsculas.
    const termoBusca = campoBusca.value.toLowerCase();

    // Filtra os dados com base no termo de busca.
    let resultadosFiltrados = dados;
    
    // Se houver um termo de busca, filtra os resultados.
    if (termoBusca) {
        resultadosFiltrados = dados.filter(dado => {
            const nome = dado.nome.toLowerCase();
            const descricao = dado.descricao.toLowerCase();
            // Retorna true se o termo de busca estiver no nome OU na descrição.
            return nome.includes(termoBusca) || descricao.includes(termoBusca);
        });
    }
    renderizarCards(resultadosFiltrados);
}

function renderizarCards(itens){
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores
    for (let item of itens){
        let article = document.createElement("article");
        article.classList.add("card");  
        article.innerHTML = `
        <img src="${item.imagemUrl}" alt="Pôster do filme ${item.nome}" class="card-imagem">
        <div class="card-conteudo">
            <h2>${item.nome}</h2>
            <p>${item.descricao}</p>
            <p>Ano: ${item.ano}</p>
            <a href="${item.link}" target="_blank">ASSISTIR</a>
        </div>
        `
         cardContainer.appendChild(article);
    
    }
}