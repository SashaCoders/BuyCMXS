let conteiner_cards = document.getElementById("conteiner");
let url = 'https://raw.githubusercontent.com/SashaCoders/CarMXshop//main/db.json';
let toggle = document.getElementById("cart-products");
let cart = JSON.parse(localStorage.getItem('product')) || [];
let productArray = [];
let originalData = [];      // оригінал
let filteredData = [];      // фільтровані



fetch(url)
  .then(async function (res) {
    let json = await res.json();
    originalData = json.users;
    filteredData = [...originalData];
    productArray = json.users;
    draw(filteredData);
    initZoom();
  });


// відрисовка
function draw(list) {
  conteiner_cards.innerHTML = "";

  list.forEach(user => {

    conteiner_cards.innerHTML += `
      <div class="card">
        <div class="content">
          <div class="plate_img">
            <img src="images/L.jpg" class="img">
          </div>
          <p>id: ${user.id}</p>
          <h2>name: ${user.name}</h2>
          <p>surname: ${user.surname}</p>
          <p>car: ${user.Car}</p>
          <p>balance: ${user.balance}</p>
        </div>
         <button id="${user.id}" class="buy" onclick="addProductToCart( ${user.id})">add cart</button>
      </div>
    `;
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
  localStorage.setItem('product', JSON.stringify(cart));
  drawCartProducts();
}

function drawCartProducts() {
  if (cart.length === 0) return toggle.innerHTML = 'Cart is empty';
  toggle.innerHTML = null;
  let sum = 0;
  cart.forEach(function (p) {
    toggle.innerHTML += `<p class="good">${p.name} | ${p.balance}$</p>

 `;

    sum += p.balance;
  });
  toggle.innerHTML += `<p class="Balance">Balance: ${sum}$</p>
  <button onclick="buyAll()" class="buyAll">Buy All</button>
  `;

}


function buyAll() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let total = cart.reduce((sum, item) => sum + (item.balance || 0), 0);
  alert(`You bought ${cart.length} items for $${total}`);

  cart = [];
  localStorage.removeItem('product');
  drawCartProducts();

}










// пошук по імені 

$(".btn_search").click(function (event) {
  event.preventDefault();

  let nameSearch = $("#name-filter").val().toLowerCase().trim();
  let carSearch = $("#car-filter").val().toLowerCase().trim();
  let balanceSearch = $("#balance-filter").val().toLowerCase().trim();

  let filteredData = originalData.filter((user) => {

    // Беремо значення незалежно від того, з якої букви
    let nameValue = (user.name || user.Name || "").toLowerCase();
    let carValue = (user.car || user.Car || "").toLowerCase();
    let balanceValue = String(user.balance || user.Balance || "");

    let okName = !nameSearch || nameValue.includes(nameSearch);
    let okCar = !carSearch || carValue.includes(carSearch);
    let okBalance = !balanceSearch || balanceValue.includes(balanceSearch);

    return okName && okCar && okBalance;
  });

  draw(filteredData);
});


// зум на картинках

function initZoom() {
  const images = document.querySelectorAll(".plate_img .img");

  images.forEach(img => {
    const container = img.parentElement;

    let scale = 1;
    let pos = { x: 0, y: 0 };
    let dragging = false;
    let start = { x: 0, y: 0 };
    let zoomActive = false;

    img.addEventListener("click", e => {
      zoomActive = !zoomActive;

      if (zoomActive) {
        dragging = true;
        img.style.cursor = "grabbing";
        start.x = e.clientX - pos.x;
        start.y = e.clientY - pos.y;
      } else {
        dragging = false;
        img.style.cursor = "grab";
      }
    });

    window.addEventListener("mousemove", e => {
      if (!dragging) return;

      pos.x = e.clientX - start.x;
      pos.y = e.clientY - start.y;

      limitPosition();
      updateTransform();
    });

    container.addEventListener("wheel", e => {
      if (!zoomActive) return;

      e.preventDefault();

      const rect = img.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      const prevScale = scale;
      scale *= delta;

      if (scale < 1) scale = 1;
      if (scale > 5) scale = 5;

      pos.x -= (offsetX / prevScale - offsetX / scale);
      pos.y -= (offsetY / prevScale - offsetY / scale);

      limitPosition();
      updateTransform();
    }, { passive: false });

    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        scale = 1;
        pos.x = 0;
        pos.y = 0;
        dragging = false;
        zoomActive = false;
        img.style.cursor = "grab";
        updateTransform();
      }
    });

    function updateTransform() {
      img.style.transform = `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`;
    }

    function limitPosition() {
      const rect = container.getBoundingClientRect();
      const imgWidth = rect.width * scale;
      const imgHeight = rect.height * scale;

      if (imgWidth > rect.width) {
        const minX = rect.width - imgWidth;
        const maxX = 0;
        if (pos.x / scale < minX) pos.x = minX * scale;
        if (pos.x / scale > maxX) pos.x = maxX * scale;
      } else pos.x = 0;

      if (imgHeight > rect.height) {
        const minY = rect.height - imgHeight;
        const maxY = 0;
        if (pos.y / scale < minY) pos.y = minY * scale;
        if (pos.y / scale > maxY) pos.y = maxY * scale;
      } else pos.y = 0;
    }
  });
}





// копіювання контактів
function copyEmail(id) {
  const element = document.getElementById(id);
  const email = element.getAttribute("data-email");

  if (email) {
    navigator.clipboard.writeText(email)
      .then(() => {
        alert('Email скопійовано!');
      })
      .catch(err => {
        console.error('Помилка копіювання: ', err);
      });
  }
}
function copyTelephone(id) {
  const element = document.getElementById(id);
  const telephone = element.getAttribute("data-telephone");

  if (telephone) {
    navigator.clipboard.writeText(telephone)
      .then(() => {
        alert('Telephone скопійовано!');
      })
      .catch(err => {
        console.error('Помилка копіювання: ', err);
      });
  }
}


// навігація для мобільних телефонів
function toggle_nav() {
  $(".btn_nav_show").click(function () {
    $(".nav").css("display", "flex");
    $(".btn_nav_hide").css("display", "flex");
    $(".btn_nav_show").css("display", "none");
  });
  $(".btn_nav_hide").click(function () {
    $(".nav").css("display", "none");
    $(".btn_nav_hide").css("display", "none");
    $(".btn_nav_show").css("display", "flex");
  });
} toggle_nav();

// плашка пошуку
function toggle_conteiner_div_search() {

  $(".hide_conteiner_div_search").click(function () {
    console.log("hide")
    $(".plate_search").css("display", "none");
  });

  $(".show_conteiner_div_search").click(function () {
    console.log("show")
    $(".plate_search").css("display", "flex");
  });





} toggle_conteiner_div_search();


drawCartProducts();
