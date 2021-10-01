let lista = JSON.parse(localStorage.getItem("lista")) || [];

import fromStorage from "./src/modules/fromStorage.js";
import fromAPI from "./src/modules/fromApi.js";

const APIbutton = document.getElementById("apibutton");
const alertDiv = document.querySelector(".erro");
const resultado = document.getElementById("resultado");




const asyncCEP = () => {
  console.log("entrou");
  const inputCEP = document.getElementById("cep").value.trim();

  if (inputCEP.length == 8) {
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
    alertDiv.innerHTML = "O CEP precisa conter 8 digitos, apenas números"
    alertDiv.classList.remove('hidden')
  }
};
APIbutton.addEventListener("click", asyncCEP);




export const toStorage = (item) => {
  localStorage.setItem("lista", JSON.stringify(item));
};
