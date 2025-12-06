//https://raw.githubusercontent.com/SashaCoders/CarMXshop//main/db.json
//https://github.com/SashaCoders/CarMXshop/blob/main/db.json

let UrlW = `https://raw.githubusercontent.com/SashaCoders/CarMXshop//main/db.json`
let toggle = document.getElementById("cart-products");
let cart = [];
let productArray = [];
// let id = ""
// let name = ""
// let surname = ""
// let Car = ""
// let balance = ""


// fetch(UrlW)
//     .then(async function (res) {
//         let data = await res.json();
//         console.log(data);
//     });

let site = document.getElementById("Dash");
fetch(UrlW)
  .then(async function (res) {
    let data = await res.json();
    console.log(data);
    productArray = data.users;
    draw(data);
    
  });

function draw(list) {

  list.users.forEach(user => {
    site.innerHTML += `
   <div class="card">
        <div class="content"> 
          <p>id: ${user.id}</p>
          <h2>name: ${user.name}</h2>
          <p>surname: ${user.surname}</p>
          <p>car: ${user.Car}</p>
          <p>balance: ${user.balance}</p>
        </div>
        <button id="${user.id}" onclick="addProductToCart(${user.id})">add cart</button>
      </div>`
  });


}


function openCart() {
  toggle.classList.toggle("hide");
}

function addProductToCart(id) {
  let product = productArray.find(function (p) {
    return p.id == id;
  });
  cart.push(product);
  drawCartProducts();
}

function drawCartProducts() {
  if (cart.length === 0) return toggle.innerHTML = 'Cart is empty';
  toggle.innerHTML = null;
  let sum = 0;
  cart.forEach(function (p) {
    toggle.innerHTML += `<p>${p.name} | ${p.price}$</p>
 <hr>
 `;
    sum += p.price;
  });
  toggle.innerHTML += `<p>Price: ${sum}$</p>
  <button onclick="buyAll()">Buy All</button>
  `;
}

