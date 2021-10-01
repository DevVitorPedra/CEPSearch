import createElements from "./createElements.js";
let lista = JSON.parse(localStorage.getItem("lista")) || [];
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
    console.log("from storage");
  };