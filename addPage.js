


function save() {
let id = document.getElementById("id");
let name = document.getElementById("name");
let surname = document.getElementById("surname");
let car = document.getElementById("car");
let balance = document.getElementById("balance");

let file_id = id;
let file_name = name;
let file_surname = surname;
let file_car = car;
let file_balance = balance;
   const info = [{
      id: id.value,
      name: name.value,
      surname: surname.value,
      Car: car.value,
      balance: balance.value,
   }];
   const json = JSON.stringify(info, null, 2);
   const blob = new Blob([json], { type: 'application/json' });
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = `${file_id.value}_${file_name.value}_${file_surname.value}_${file_car.value}_${file_balance.value}.json`;
   link.click();

   id.value = "";
   name.value = "";
   surname.value = "";
   car.value = "";
   balance.value = "";
}
