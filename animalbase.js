"use strict";

// -------------------- MODEL --------------------
window.addEventListener("DOMContentLoaded", start);

// empty array:
let allAnimals = [];

// const for new object:
let animal;

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // Add event-listeners to filter and sort buttons:
  document.querySelector("#button_dog").addEventListener("click", dogChosen);
  document.querySelector("#button_cat").addEventListener("click", catChosen);
  document.querySelector("#button_all").addEventListener("click", allButton);

  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

// ------------------ CONTROLLER ----------------

// prepare data/JSON:
function prepareObjects(jsonData) {
  allAnimals = jsonData.map(prepareObject); //.map makes a new array with a new element for each item i that array. Text from fullname is split into array in prepareObject().
  // (return animal) gemmes i allAnimals.

  // TODO: This might not be the function we want to call first (displayList)- BUT HOW WOULD WE SEE THE WHOLE LIST THEN???
  displayList(allAnimals);
}

function prepareObject(jsonObject) {
  // notice if there's an extra a in other references to this function (preapared)
  // make object based on prototype:
  animal = Object.create(Animal);

  // splits the fullname from JSON into an array and puts words into the new objects properties:
  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

// all button chosen:
function allButton() {
  displayList(allAnimals);
}

// cat button chosen:
function catChosen() {
  const listOfCats = allAnimals.filter(isCat);
  displayList(listOfCats);
}

// isCat function:
function isCat(animal) {
  console.log("isCat loaded");
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
}

// dog button chosen:
function dogChosen() {
  const listOfDogs = allAnimals.filter(isDog);
  displayList(listOfDogs);
}

// isDog function:
function isDog(animal) {
  console.log("isDog loaded");
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}

/* // generel filtering function:
function filterAll() {
  console.log("filterAll loaded");

  if (animal.type === "cats") {
    const listOfCats = allAnimals.filter(isCat);
    console.log(("listOfCats", listOfCats));
    displayList(listOfCats);
  } else if (animal.type === "dogs") {
    const listOfDogs = allAnimals.filter(isDog);
    console.log(listOfDogs);
    displayList(listOfDogs);
  } */

// remove eventlistener:
document.querySelector("#button_dog").removeEventListener("click", dogChosen);
document.querySelector("#button_cat").removeEventListener("click", catChosen);
document.querySelector("#button_all").removeEventListener("click", allButton);

// ---------------- VIEW ----------------------

// DISPLAY ANIMALS IN LIST:
function displayList(animals) {
  console.log("displayList loaded");
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  console.log("displayAnimal loaded");
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);

  // add eventlisteners again:
  document.querySelector("#button_dog").addEventListener("click", dogChosen);
  document.querySelector("#button_cat").addEventListener("click", catChosen);
  document.querySelector("#button_all").addEventListener("click", allButton);
}

/* // DISPLAY THE DIFFERENT LISTS:
function prepareFilteredList(list) {
  console.log("displayFilteredList loaded");

  // clear list:
  document.querySelector("#list tbody").innerHTML = "";

  // create new list:
  animal.forEach(displayFilteredList(list, animal));
}

function displayFilteredList(list, animal) {
  console.log("displayFilteredList loaded");

  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);

  // add eventlisteners again:
  document.querySelector("#button_dog").addEventListener("click", filterAll);
  document.querySelector("#button_cat").addEventListener("click", filterAll);
  document.querySelector("#button_all").addEventListener("click", filterAll);
} */
