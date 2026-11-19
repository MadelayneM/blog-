
const botaoBau = document.getElementById("abrirBau");
const instrucaoBau = document.getElementById("bauInstrucao");
const conteudoSurpresa = document.getElementById("surpresaConteudo");
const fotoSurpresa = document.getElementById("fotoSurpresa");
const mensagemSurpresa = document.getElementById("mensagemSurpresa");

const surpresas = [
    {
        imagem: "Blog-Imagens/bau.jpg.jpg",
        mensagem: "Cada sorriso seu é uma lembrança preciosa! 💙"
    }
];

botaoBau.addEventListener("click", function () {
    if (botaoBau.classList.contains("aberto")) {
        return;
    }

    const surpresa = surpresas[
        Math.floor(Math.random() * surpresas.length)
    ];

    botaoBau.classList.add("aberto");
    instrucaoBau.textContent = "Uma lembrança especial para você! ♡";

    fotoSurpresa.src = surpresa.imagem;
    mensagemSurpresa.textContent = surpresa.mensagem;
    conteudoSurpresa.hidden = false;
});
