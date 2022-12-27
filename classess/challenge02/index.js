// Use .innerHTML to render a Buy! button inside the div container

const divContainer = document.querySelector("#container");

divContainer.innerHTML = "<button onclick='buy()'>Buy</button>";

function buy() {
  divContainer.innerHTML += "<p>Thank you for buying!</p>";
}
