let buscados =[]
 export default function createElements(item1, item2, item3, item4, item5, item6, item7) {
      let alreadyExists = buscados.find(element=> element ===item1)

      if (alreadyExists){
          console.log("já esta na tela")
      }else{
     buscados.push(item1)
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
}