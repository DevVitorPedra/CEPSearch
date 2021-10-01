// Recebe a lista do local storage, caso não exista cria uma array
let lista = JSON.parse(localStorage.getItem("lista")) || [];
//Importa as funções 
import fromStorage from "./src/modules/fromStorage.js";
import fromAPI from "./src/modules/fromApi.js";

const APIbutton = document.getElementById("apibutton");
const alertDiv = document.querySelector(".erro");
const resultado = document.getElementById("resultado");

//Função para fazer a pesquisa
const pesquisarCEP = () => {
  //Recebe o número inserido pelo usuário
  const inputCEP = document.getElementById("cep").value.trim();
  //Verifica se o número possui oito dígitos
  if (inputCEP.length == 8) {
    //Loop para utilizar um número convertido na pesquisa
    for (let i = 0; i <= lista.length; i++) {
      let convertedCEP = inputCEP.slice(0, 5) + "-" + inputCEP.slice(-3);
      //Verifica se a lista esta vazia e chama o método que consome a API
      if (lista == "") {
        fromAPI(inputCEP);
        alertDiv.classList.add("hidden"); 
        //Caso o item já tenho sido pesquisado, busca no local storage
      } else if (convertedCEP == lista[i].cep) {
        fromStorage(i);
        alertDiv.classList.add("hidden");
        break;
      } else {
        //Caso a lista não esteja vazia e não exista no local storage, chama a API
        fromAPI(inputCEP);
        alertDiv.classList.add("hidden");
        break;
      }
    }
    //Caso o número não esteja de acordo
  } else {
    alertDiv.innerHTML = "O CEP precisa conter 8 digitos, apenas números"
    alertDiv.classList.remove('hidden')
  }
};

//Adiciona o listener ao botão de pesquisa
APIbutton.addEventListener("click", pesquisarCEP);



//Função para adicionar a lista atualizada ao local storage
export const toStorage = (item) => {
  localStorage.setItem("lista", JSON.stringify(item));
};
