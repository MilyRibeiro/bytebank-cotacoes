import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');
const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1,
      borderColor: 'rgb(60, 179, 113)'
    }]
  },
});

// setInterval(() => conectaAPI(), 5000);

// async function conectaAPI() {
//   const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
//   const conectaTraduzido = await conecta.json();
//   console.log(conectaTraduzido);
//   let tempo = geraHorario();
//   let valor = conectaTraduzido.USDBRL.ask;
//   adicionarDados(graficoParaDolar, tempo, valor);
//   imprimeCotacao("dolar", valor);
// };

function geraHorario() {
  let data = new Date();
  let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  // console.log(data);
  // console.log(horario);
  return horario;
};

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  });

  grafico.update();
};

// Gráfico para o Dólar:
let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;
  // imprimeCotacao("dolar", valor);
  selecionaCotacao("dolar", valor);
  adicionarDados(graficoParaDolar, tempo, valor);
});

// Gráfico para o Iene:
const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1
    }]
  }
});

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage("iene");
workerIene.addEventListener("message", evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;
  adicionarDados(graficoParaIene, tempo, valor);
  // imprimeCotacao("iene", valor);
  selecionaCotacao("iene", valor);
});

// Gráfico para o Won:
const graficoWon = document.getElementById('graficoWon');
const graficoParaWon = new Chart(graficoWon, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Won',
      data: [],
      borderWidth: 1,
      fill: false,
      borderColor: 'rgb(199, 21, 133)'
    }]
  }
});

let workerWon = new Worker('./script/workers/workerWon.js');
workerWon.postMessage('won');

workerWon.addEventListener("message", evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;
  adicionarDados(graficoParaWon, tempo, valor);
  selecionaCotacao("won", valor);
});


// Gráfico para o Euro:
const graficoEuro = document.getElementById('graficoEuro');
const graficoParaEuro = new Chart(graficoEuro, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Euro',
      data: [],
      borderWidth: 1,
      fill: false,
      borderColor: 'rgb(75, 100, 192)',
    }]
  }
});

let workerEuro = new Worker('./script/workers/workerEuro.js');
workerEuro.postMessage('euro');

workerEuro.addEventListener("message", evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;
  adicionarDados(graficoParaEuro, tempo, valor);
  selecionaCotacao("euro", valor);
});

// Gráfico para o Libra:
const graficoLibra = document.getElementById('graficoLibraEsterlina');
const graficoParaLibra = new Chart(graficoLibra, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Libra',
      data: [],
      borderWidth: 1,
      fill: false,
      borderColor: 'rgb(0, 206, 209)',
    }]
  }
});

let workerLibra = new Worker('./script/workers/workerLibra.js');
workerLibra.postMessage('libra');

workerLibra.addEventListener("message", evento => {
  let tempo = geraHorario();
  let valor = evento.data.ask;
  adicionarDados(graficoParaLibra, tempo, valor);
  selecionaCotacao("libra", valor);
});
