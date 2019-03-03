/* CHAMANDO A FUNÇÃO DE CALLBACK DO SERVIDOR E PREPARANDO O AMBIENTE*/
function X({ data }){
  const { recommendation, reference, widget } = data;
  divCreator(reference.item, 'first', 'fisrt', 'first-container', false);
  recommendation.forEach(element => {
    console.log(element)
    divCreator(element, 'mySlide', 'mySlide', 'slideshow-container', true);
  });
  this.initLis();
}

/* BLOCO QUE CRIA AS DIVS*/
function divCreator(element, classId ,className, containerName, secondContainer){

  let firstDiv = document.createElement('div');
  firstDiv.id = classId;
  firstDiv.className = className;
  let image = document.createElement('img');
  let imgLink = document.createElement('a');
  imgLink.appendChild(image);

  if(secondContainer){
    let myLi = document.createElement('li');
    myLi.className = 'myLi';
    document.getElementsByTagName('ul')[0].appendChild(myLi);
    myLi.appendChild(firstDiv);
  }
  else {document.getElementsByClassName(containerName)[0].appendChild(firstDiv);}

  firstDiv.appendChild(imgLink);

  //img
  image.src = "http:" + element.imageName;
  image.className = "customStyle";
  image.title = "Ver Produto";

  //link to image
  imgLink.className = "imgLink";
  imgLink.href = "http:" + element.detailUrl;
  imgLink.target = "_blank'";

  let innerDiv = document.createElement('div');
  innerDiv.className = 'block-2';

  firstDiv.appendChild(innerDiv);
  innerDiv.innerHTML = element.name;

  let innerDiv2 = document.createElement('div');
  innerDiv2.className = 'block-3';

  if(element.oldPrice){
    let innerDiv3 = document.createElement('div');
    innerDiv3.className = 'block-4';
    innerDiv2.appendChild(innerDiv3);
    innerDiv3.innerHTML = `<strong>De ${element.oldPrice}</strong>`;
    innerDiv2.innerHTML += `por`;

  }

  innerDiv.appendChild(innerDiv2);
  innerDiv2.innerHTML += `<strong>${element.price}</strong>`;

  let innerDiv4 = document.createElement('div');
  innerDiv4.className = 'block-5';
  innerDiv2.appendChild(innerDiv4);
  innerDiv4.innerHTML = `${element.productInfo.paymentConditions}<br>sem juros`;
}

/**
 * Iniciando os li`s para que aparecam os 3 primeiros produtos recomendados
 * na tela e dando o hide nos outros
 */
function initLis(){
  let all_li = [...document.querySelectorAll(".myLi")];
  for(let i = 0; i < all_li.length ; i++){
    if(i < 3) all_li[i].className = "myLi";
    else all_li[i].className = "myLi myLi--hide";
  }
  return console.log("iniciado com sucesso", all_li);
}
/**
 * chamada do botao prev que faz o shift das imagens para a esquerda
 */
function shiftLeft() {
  const myLis = document.querySelectorAll(".myLi"); //pega todas as <li>
  const tmpNode = myLis[0];
  myLis[0].className = "myLi move-out-from-left";
  setTimeout(function () {
    if(myLis.length > 3){
      tmpNode.classList.add("myLi--hide");
      myLis[3].className = "myLi move-to-position3-from-left";
    }
    myLis[1].className = "myLi move-to-position1-from-left";
    myLis[2].className = "myLi move-to-position2-from-left";
    myLis[0].remove();

    document.querySelector(".card__container").appendChild(tmpNode);

  }, 200)
}
/**
 * chamada do botao next que faz o shift das imagens para a direita
 */
function shiftRight() {
  const myLis = document.querySelectorAll(".myLi"); //pega todas as <li>
  myLis[2].className = "myLi move-out-from-right";
  setTimeout(function() {
    const noOfCards = myLis.length;
    if (noOfCards > 2) {
      myLis[2].className = "myLi myLi--hide";
    }
    const tmpNode = myLis[noOfCards - 1];
    tmpNode.classList.remove("myLi--hide");
    myLis[noOfCards - 1].remove();
    let parentObj = document.querySelector(".card__container");
    parentObj.insertBefore(tmpNode, parentObj.firstChild);
    tmpNode.className = "myLi move-to-position1-from-right";
    myLis[0].className = "myLi move-to-position2-from-right";
    myLis[1].className = "myLi move-to-position3-from-right";
  }, 200);

}
