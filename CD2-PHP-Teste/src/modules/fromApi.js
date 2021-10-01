let lista = JSON.parse(localStorage.getItem("lista")) || [];
import createElements from "./createElements.js";
import  {toStorage}  from "../../script.js"
const alertDiv = document.querySelector(".erro");

export default function fromAPI (item)  {
    const url = "http://viacep.com.br/ws/" + item + "/xml";
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        console.log(xml);
        const value = xml.getElementsByTagName("xmlcep")[0];
        if(value.getElementsByTagName('erro')[0]){
          alertDiv.innerHTML = "Este CEP não existe!"
          alertDiv.classList.remove('hidden')
        }else{
  
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
        itemPesquisado.timeStamp = new Date()
        

        if (itemPesquisado.cep)
        lista.push(itemPesquisado);
            console.log(lista)
        toStorage(lista);
        }
      })
      .catch(console.error);
  };