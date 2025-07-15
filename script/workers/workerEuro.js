addEventListener("message", evento => {
  // extract person passed from main thread from event object
  let moeda = evento.data;
  conectaAPI(moeda);
  setInterval(() => conectaAPI(), 5000);
});

async function conectaAPI(moeda) {
  const conecta = await fetch("https://economia.awesomeapi.com.br/last/EUR-BRL");
  const conectaTraduzido = await conecta.json();

  postMessage(conectaTraduzido.EURBRL);
};