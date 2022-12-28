let myLeads = [];

// 1. Turn the myLeads string into an array
// myLeads = JSON.parse(myLeads)

// 2. Push a new value to the array
// myLeads.push("www.lead2.com")

// 3. Turn the array into a string again
// myLeads = JSON.stringify(myLeads)

// 4. Console.log the string using typeof to verify that it's a string
// console.log(typeof myLeads)

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteEl = document.querySelector("#delete-btn");
const divItens = document.querySelector("#div-itens");
const separateDivider = document.querySelector("#separate-el");
const errorEl = document.querySelector("#error");
const btnTextInput = document.querySelector("#btn-input");
let removeLiBtn = document.querySelector(".close-btn");
const inputElValue = inputEl.value;

const minChars = 1;

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage != null) {
  removeHiddenClass();
}

inputEl.focus();

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

if (leadsFromLocalStorage === null) {
  deleteEl.disabled = true;
}

btnTextInput.addEventListener("click", () => {
  inputEl.value = "";
});

inputEl.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    inputBtn.click();
  }
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);

  inputEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  deleteEl.disabled = false;

  renderLeads();

  removeHiddenClass();

  inputBtn.disabled = true;

  inputEl.focus();
});

deleteEl.addEventListener("click", function () {
  addHiddenClass();
  localStorage.clear("myLeads");
  myLeads = [];
  deleteEl.disabled = true;
  renderLeads();
  inputEl.focus();
});

function renderLeads() {
  let listItems = "";

  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
      <li class="li-item-el">
        <button class="close-btn" id="remove-li-el">
          X
        </button>${i + 1} -
        <a href="${myLeads[i]}" target="_blank">
        ${myLeads[i]}
        </a>        
      </li>
      `;
  }

  ulEl.innerHTML = listItems;
}

function removeHiddenClass() {
  if (divItens.classList.contains("hidden")) {
    divItens.removeAttribute("class", "hidden");
    separateDivider.removeAttribute("class", "hidden");
    divItens.setAttribute("class", "itens-container");
  }
}

function addHiddenClass() {
  divItens.setAttribute("class", "hidden");
  separateDivider.setAttribute("class", "hidden");
}

const setError = (length) => {
  const message = `Please enter ${minChars - length} more character(s).`;
  errorEl.innerHTML = message;
  errorEl.style.display = "block";
  inputEl.classList.add("errorInput");
};

const hideError = () => {
  errorEl.style.display = "none";
  inputEl.classList.remove("errorInput");
};

inputEl.addEventListener("keyup", () => {
  const enteredLength = inputEl.value.length;

  if (enteredLength >= minChars) {
    inputBtn.disabled = false;
    return hideError();
  }

  setError(enteredLength);
  inputBtn.disabled = true;
});
