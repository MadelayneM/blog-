
const fotos = document.querySelectorAll(".galeria .card img");
const cartoes = document.querySelectorAll(".galeria .card");
const botoesFiltro = document.querySelectorAll(".filtro-btn");

let fotoAtual = 0;
let toqueInicial = 0;
let toqueFinal = 0;

// NÃO CRIA O ÁLBUM SE NÃO EXISTIREM FOTOGRAFIAS
if (fotos.length > 0) {

    // CRIA O LIGHTBOX

    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    const imagemAmpliada = document.createElement("img");
    lightbox.appendChild(imagemAmpliada);

    // BOTÃO FECHAR

    const botaoFechar = document.createElement("button");
    botaoFechar.textContent = "×";
    botaoFechar.classList.add("fechar-lightbox");
    lightbox.appendChild(botaoFechar);

    // SETA ANTERIOR

    const botaoAnterior = document.createElement("button");
    botaoAnterior.textContent = "❮";
    botaoAnterior.classList.add("seta-lightbox", "anterior");
    lightbox.appendChild(botaoAnterior);

    // SETA PRÓXIMA

    const botaoProximo = document.createElement("button");
    botaoProximo.textContent = "❯";
    botaoProximo.classList.add("seta-lightbox", "proximo");
    lightbox.appendChild(botaoProximo);

    // CONTADOR

    const contador = document.createElement("p");
    contador.classList.add("contador-lightbox");
    lightbox.appendChild(contador);

    document.body.appendChild(lightbox);

    // ATUALIZA A FOTOGRAFIA

    function mostrarFoto(indice) {

        fotoAtual = (indice + fotos.length) % fotos.length;

        imagemAmpliada.src = fotos[fotoAtual].src;
        imagemAmpliada.alt = fotos[fotoAtual].alt;

        contador.textContent =
            `${fotoAtual + 1} de ${fotos.length}`;
    }

    // ABRE A FOTOGRAFIA

    fotos.forEach((foto, indice) => {

        foto.addEventListener("click", () => {

            mostrarFoto(indice);
            lightbox.classList.add("ativo");

        });

    });

    // NAVEGAÇÃO PELAS SETAS

    botaoAnterior.addEventListener("click", () => {
        mostrarFoto(fotoAtual - 1);
    });

    botaoProximo.addEventListener("click", () => {
        mostrarFoto(fotoAtual + 1);
    });

    // ARRASTAR PARA OS LADOS NO CELULAR

    lightbox.addEventListener("touchstart", (evento) => {

        toqueInicial = evento.changedTouches[0].screenX;

    }, { passive: true });

    lightbox.addEventListener("touchend", (evento) => {

        toqueFinal = evento.changedTouches[0].screenX;

        const distancia = toqueFinal - toqueInicial;

        if (Math.abs(distancia) > 50) {

            if (distancia < 0) {
                mostrarFoto(fotoAtual + 1);
            } else {
                mostrarFoto(fotoAtual - 1);
            }

        }

    }, { passive: true });

    // FECHAR LIGHTBOX

    botaoFechar.addEventListener("click", () => {
        lightbox.classList.remove("ativo");
    });

    lightbox.addEventListener("click", (evento) => {

        if (evento.target === lightbox) {
            lightbox.classList.remove("ativo");
        }

    });

    // FECHAR COM ESC E NAVEGAR PELO TECLADO

    document.addEventListener("keydown", (evento) => {

        if (!lightbox.classList.contains("ativo")) return;

        if (evento.key === "Escape") {
            lightbox.classList.remove("ativo");
        }

        if (evento.key === "ArrowRight") {
            mostrarFoto(fotoAtual + 1);
        }

        if (evento.key === "ArrowLeft") {
            mostrarFoto(fotoAtual - 1);
        }

    });

}

// FILTROS DO ÁLBUM

botoesFiltro.forEach((botao) => {

    botao.addEventListener("click", () => {

        const categoria = botao.dataset.filtro;

        botoesFiltro.forEach((item) => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        cartoes.forEach((cartao) => {

            const categoriaFoto = cartao.dataset.categoria;

            if (categoria === "todos" ||
                categoria === categoriaFoto) {

                cartao.style.display = "";

            } else {

                cartao.style.display = "none";

            }

        });

        const lightbox = document.querySelector(".lightbox");

        if (lightbox) {
            lightbox.classList.remove("ativo");
        }

    });

});
