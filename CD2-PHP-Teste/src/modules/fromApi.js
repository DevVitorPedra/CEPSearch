// Recebe a lista do local storage, caso não exista cria uma array
let lista = JSON.parse(localStorage.getItem("lista")) || [];
//importa as funções
import createElements from "./createElements.js";
import  {toStorage}  from "../../script.js"
const alertDiv = document.querySelector(".erro");
//Função para busca do CEP na API externa
export default function fromAPI (item)  {
    //concatena a url da API com o CEP digitado pelo usuário
    const url = "http://viacep.com.br/ws/" + item + "/xml";
    //método fetch manipula a requisição da API
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        //parser utilizado pra manipular a resposta em formato XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const value = xml.getElementsByTagName("xmlcep")[0];

        //Verificação de erro caso o CEP não exista
        if(value.getElementsByTagName('erro')[0]){
          alertDiv.innerHTML = "Este CEP não existe!"
          alertDiv.classList.remove('hidden')
        }else{
            
        //Não havendo erro ele começa a criação das variáveis que receberão as informações
        let cep = value.getElementsByTagName("cep")[0].textContent;
        let logradouro = value.getElementsByTagName("logradouro")[0].textContent;
        let complemento = value.getElementsByTagName("complemento")[0].textContent;
        let bairro = value.getElementsByTagName("bairro")[0].textContent;
        let localidade = value.getElementsByTagName("localidade")[0].textContent;
        let uf = value.getElementsByTagName("uf")[0].textContent;
        let ddd = value.getElementsByTagName("ddd")[0].textContent;
            
        //O método createElements pega todos as informações e cria um card na tela
        createElements(cep, logradouro, complemento, bairro, localidade, uf, ddd);

        //Cria um um objeto para inserir na lista do local storage
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
        
        
        //Adiciona o objeto a lista
        lista.push(itemPesquisado);
        //Chama o metodo toStorage que adiciona a lista atualizada ao local storage
        toStorage(lista);
        }
      })
      //Caso ocorra algum erro ele mostra no console
      .catch(console.error);
  };