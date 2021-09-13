const APIbutton = document.getElementById("apibutton");
const alertDiv = document.querySelector(".erro");
const resultado = document.getElementById("resultado");
let lista = JSON.parse(localStorage.getItem("lista")) || [];
let dados;
console.log(lista);

const asyncCEP = () => {
  console.log("entrou");
  const inputCEP = document.getElementById("cep").value.trim();

  if (inputCEP || inputCEP.length == 8) {
    console.log("consultou");

    for (let i = 0; i <= lista.length; i++) {
      let convertedCEP = inputCEP.slice(0, 5) + "-" + inputCEP.slice(-3);
      console.log(convertedCEP);
      if (lista == "") {
        fromAPI(inputCEP);
        alertDiv.classList.add("hidden");
        console.log("from api");
      } else if (convertedCEP == lista[i].cep) {
        fromStorage(i);
        alertDiv.classList.add("hidden");
        break;
      } else {
        fromAPI(inputCEP);
        alertDiv.classList.add("hidden");
        console.log("from api");

        break;
      }
    }
  }else{
    alertDiv.classList.remove('hidden')
  }
};
APIbutton.addEventListener("click", asyncCEP);

const fromStorage = (item) => {
  createElements(
    lista[item].cep,
    lista[item].logradouro,
    lista[item].complemento,
    lista[item].bairro,
    lista[item].localidade,
    lista[item].uf,
    lista[item].ddd
  );
  console.log("from storage");
};

const fromAPI = (item) => {
  const url = "http://viacep.com.br/ws/" + item + "/xml";
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      console.log(xml);
      const value = xml.getElementsByTagName("xmlcep")[0];
      console.log(value);
      let cep = value.getElementsByTagName("cep")[0].textContent;
      let logradouro = value.getElementsByTagName("logradouro")[0].textContent;
      let complemento =
        value.getElementsByTagName("complemento")[0].textContent;
      let bairro = value.getElementsByTagName("bairro")[0].textContent;
      let localidade = value.getElementsByTagName("localidade")[0].textContent;
      let uf = value.getElementsByTagName("uf")[0].textContent;
      let ddd = value.getElementsByTagName("ddd")[0].textContent;

      createElements(cep, logradouro, complemento, bairro, localidade, uf, ddd);
      let itemPesquisado = {};
      itemPesquisado.cep = value.getElementsByTagName("cep")[0].textContent;
      itemPesquisado.logradouro =
        value.getElementsByTagName("logradouro")[0].textContent;
      itemPesquisado.complemento =
        value.getElementsByTagName("complemento")[0].textContent;
      itemPesquisado.bairro =
        value.getElementsByTagName("bairro")[0].textContent;
      itemPesquisado.localidade =
        value.getElementsByTagName("localidade")[0].textContent;
      itemPesquisado.uf = value.getElementsByTagName("uf")[0].textContent;
      itemPesquisado.ddd = value.getElementsByTagName("ddd")[0].textContent;

      lista.push(itemPesquisado);

      toStorage();
    })
    .catch(console.error);
};

function createElements(item1, item2, item3, item4, item5, item6, item7) {
  let newDivInfo = document.createElement("div");

  //cria o cep
  let newCEP = document.createElement("p");
  let newCEPNode = document.createTextNode('CEP: '+item1);
  newCEP.appendChild(newCEPNode);

  //cria a rua
  let newLogradouro = document.createElement("p");
  let newLogradouroNode = document.createTextNode(item2);
  newLogradouro.appendChild(newLogradouroNode);

  //cria o complemento
  let newComplemento = document.createElement("p");
  let newComplementoNode = document.createTextNode('Complemento: '+item3);
  newComplemento.appendChild(newComplementoNode);
  //cria o bairro
  let newBairro = document.createElement("p");
  let newBairroNode = document.createTextNode('Bairro: '+item4);
  newBairro.appendChild(newBairroNode);
  //cria a cidade
  let newLocalidade = document.createElement("p");
  let newLocalidadeNode = document.createTextNode('Localidade: '+item5);
  newLocalidade.appendChild(newLocalidadeNode);
  //cria o estado
  let newUF = document.createElement("p");
  let newUFNode = document.createTextNode('UF: '+item6);
  newUF.appendChild(newUFNode);
  //cria o ddd
  let newDDD = document.createElement("p");
  let newDDDNode = document.createTextNode('DDD: '+item7);
  newDDD.appendChild(newDDDNode);
  //adiciona todos os itens no div
  newDivInfo.appendChild(newCEP);
  newDivInfo.appendChild(newLogradouro);
  newDivInfo.appendChild(newComplemento);
  newDivInfo.appendChild(newBairro);
  newDivInfo.appendChild(newLocalidade);
  newDivInfo.appendChild(newUF);
  newDivInfo.appendChild(newDDD);
  resultado.appendChild(newDivInfo);
  newDivInfo.classList.add('card')
}

const toStorage = () => {
  localStorage.setItem("lista", JSON.stringify(lista));
};
