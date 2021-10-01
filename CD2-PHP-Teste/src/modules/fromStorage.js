//Importa o createElements
import createElements from "./createElements.js";
//Pega a lista do local storage
let lista = JSON.parse(localStorage.getItem("lista"));

// Função que resgata um item já pesquisado e foi salvo no local storage
export default function fromStorage (item) {
    createElements(
      lista[item].cep,
      lista[item].logradouro,
      lista[item].complemento,
      lista[item].bairro,
      lista[item].localidade,
      lista[item].uf,
      lista[item].ddd
    );
  };