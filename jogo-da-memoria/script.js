const cards = document.querySelectorAll('.card');
let contadorCartasViradas = 0;
let virouCarta = false;
let primeiraCarta, segundaCarta;
let travar = false;

function virarCarta() {
    if (travar) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip');
    if (!virouCarta) {
        virouCarta = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    virouCarta = false;
    verificarIguais();
}

function verificarIguais() {
    if (primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desabilitarCartas();
        return;
    }

    desvirarCartas();
}

function desabilitarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    contadorCartasViradas++;
    if (contadorCartasViradas == 6) {
    reiniciar();
    }
}

function desvirarCartas() {
    travar = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetarTabuleiro();
    }, 1500);
}

function resetarTabuleiro() {
    [virouCarta, travar] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralhar() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', virarCarta)
});

function reiniciar() {
    setTimeout(() => {
        cards.forEach((card) => {
            card.addEventListener('click', virarCarta);
            card.classList.remove('flip');
        });
        contadorCartasViradas = 0;
    }, 3000
    )
}