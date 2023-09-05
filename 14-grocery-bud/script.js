const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

const addItem = (e) => {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  // if(value !== '' && editFlag === false) {
  //     console.log('add item');
  // } else if (value !== '' && editFlag === true) {
  //     console.log('editing');
  // } else {
  //     console.log('empty');
  // }

  if (value && !editFlag) {
    createListItems(id, value);
    displayAlert("item added to the list", "success");
    container.classList.add("show-container");

    addToLocalStorage(id, value);
    setToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("item's name changed", "success");
    editLocalStorage(editID, value);
    setToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
};

const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);

  if (list.children.length == 0) {
    container.classList.remove("show-container");
  }

  displayAlert("item deleted from the list", "danger");
  setToDefault();
  removeFromLocalStorage(id);
};

const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
};

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
};

const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  if (items.length > 1) {
    displayAlert("items deleted", "danger");
  } else {
    displayAlert("item deleted", "danger");
  }

  container.classList.remove("show-container");
  setToDefault();
  localStorage.removeItem("grocery-list");
};

const setToDefault = () => {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
};

const addToLocalStorage = (id, value) => {
  // const grocery = {id: id, value: value};
  const grocery = { id, value }; //=> ES6
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("grocery-list", JSON.stringify(items));
};

const getLocalStorage = () => {
  return localStorage.getItem("grocery-list")
    ? JSON.parse(localStorage.getItem("grocery-list"))
    : [];
};

const removeFromLocalStorage = (id) => {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("grocery-list", JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("grocery-list", JSON.stringify(items));
};

const setUpItems = () => {
  let items = getLocalStorage();

  items = items.forEach((item) => {
    createListItems(item.id, item.value);
  });
  container.classList.add('show-container');
};

const createListItems = (id, value) => {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);

  element.innerHTML = `<p class="title">${value}</p>
                        <div class="btn-container">
                            <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
                            <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
                        </div>`;
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  list.appendChild(element);
};

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setUpItems);
