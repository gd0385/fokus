const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const startPauseBtnImg = document.querySelector('#start-pause img');
const startPauseBtnTxt = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector('#alternar-musica');

const temporizador = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoEsgotado = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// mantem a música tocando em loop
musica.loop = true;

// switch para tocar ou pausar música

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

// click dos botões Foco, Desanso curto e Descanso longo

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});

function alterarContexto(contexto) {

    mostraTempo();

    botoes.forEach(botao => botao.classList.remove('active'));

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto": 
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo": 
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

// botão de início ou pausa do temporizador

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoEsgotado.play();
        alert('Tempo esgotado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostraTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    startPauseBtnImg.setAttribute('src', '/imagens/pause.png');
    startPauseBtnTxt.textContent = 'Pausar';
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    startPauseBtnImg.setAttribute('src', '/imagens/play_arrow.png');
    startPauseBtnTxt.textContent = 'Começar';
    intervaloId = null;
}

// mostrador do temporizador

function mostraTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostraTempo();