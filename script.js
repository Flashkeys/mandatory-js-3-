
let body = document.querySelector("body");
let select = document.createElement("select");
let img = document.createElement("img");
let div = document.createElement("div");
let h2 = document.querySelector("h2");
let backbtn = document.querySelector("#backbtn");
let randombtn = document.querySelector("#randombtn");
const Urlpage = window.location.href.split('?')[0]; 
body.appendChild(div);
div.appendChild(select);
body.appendChild(img);

backbtn.addEventListener('click', backBoi);
startingPage();
//-------------- Starting page --------------//
function startingPage() {
  let subBreed = getSubBreed();
  let breed = getBreed();
  if (subBreed && breed) {
    loadSubBreedPage(breed, subBreed);
  } else if (breed) {
    loadBreedPage(breed);
  } else {
    loadStartPage();
  }
}
function loadStartPage(){
  randombtn.addEventListener('click', getRandomImg);
  collectDogs();
  getRandomImg();
}
function backBoi() {
    window.history.back();
}
//-------------- Loading breeds img's--------------//
function loadBreedPage(breed){
  h2.textContent = urltext(breed);
  randombtn.addEventListener('click', RandomBreedImg);
  RandomBreedImg();
  GetBreedsImgs(breed);
  GetSubImgs(breed);
}
//-------------- Url loader --------------//
function getUrlPar(){
  return new URLSearchParams(window.location.search);
}
//-------------- Render random picture --------------//
function RandomBreedImg(){
  let breed = getBreed();
  let req = new XMLHttpRequest();
  req.addEventListener('load', renderRandomImg);
  req.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random')
  req.send();
}
//-------------- Get all images --------------//
function getRandomImg() {
  let req = new XMLHttpRequest();
  req.addEventListener('load', renderRandomImg);
  req.open('GET', 'https://dog.ceo/api/breeds/image/random')
  req.send();
}
function renderRandomImg() { //----hämta en bild
  const imgUrl = JSON.parse(this.responseText).message;
  img.setAttribute('src', imgUrl);
}
//-------------- Get all breeds names --------------//
function collectDogs() {
    let req = new XMLHttpRequest();
    req.addEventListener('load', renderDogs);
    req.open('GET', 'https://dog.ceo/api/breeds/list/all')
    req.send();
  }
//-------------- Rendera all breeds --------------//
function renderDogs() { //--sida index
  let data = JSON.parse(this.responseText).message; //--nyckel message
  for (let key in data) {
    let option = document.createElement("option");
    option.textContent = urltext(key);

    select.appendChild(option);
  }
  select.addEventListener('change', setBreed);
}
function GetBreedsImgs(breed) {
    let req = new XMLHttpRequest();
    req.addEventListener('load', renderImgs);
    req.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images')
    req.send();
  }
//-------------- Rendera breeds img's --------------//
function renderImgs() {
    let data = JSON.parse(this.responseText).message; //--nyckel message
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "breeds");
    for (let key of data) {
      let newImg = document.createElement("img");
      newImg.setAttribute('src', key);
      newDiv.appendChild(newImg);
    }
    body.appendChild(newDiv);
  }
//-------------- Add breed name to Url --------------//
function setBreed() { //---select listener
  let breed = select.value;//--hämtar vald hund från listan
  let para = new URLSearchParams(window.location.search);
  para.set("breed", urltext(breed)); //--skapar en url-par.
  window.location =  Urlpage + "?" + para.toString();//-- gå till sidan
}
//-------------- Connect breed with Url --------------//
function getBreed(){
    const para = getUrlPar();
    return para.get("breed");
  }
//-------------- Url fixes --------------//
function urltext(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
//-------------- Get all Sub-breeds names and render them--------------//
function GetSubImgs(breed) {
    let req = new XMLHttpRequest();
    req.addEventListener('load', renderSub);
    req.open('GET', 'https://dog.ceo/api/breed/' + breed + '/list')
    req.send();
  }
function renderSub() {
  let data = JSON.parse(this.responseText).message; //--nyckel message
  if(data.length <= 0){
    select.style.display = "none";
    return;
  }
  for (let key of data) {
    let option = document.createElement("option");
    option.textContent = urltext(key);

    select.appendChild(option);
  }
  select.addEventListener('change', setSubBreed);
}
//-------------- Connect sub-breed with Url --------------//
function getSubBreed(){
    const para = getUrlPar();
    return para.get("subBreed");
  }