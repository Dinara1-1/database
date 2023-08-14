let ingredientList = JSON.parse(localStorage.getItem("ingredientList"));

let ingredients1 = [
   {
     id: 1,
     name: 'Спагетти',
     quantity: 400,
     unit: 'г',
     calories: 400
   },
   {
     id: 2,
     name: 'Говяжий фарш',
     quantity: 500,
     unit: 'г',
     calories: 1000
   },
   {
     id: 3,
     name: 'Томатный соус',
     quantity: 500,
     unit: 'мл',
     calories: 100
   },
   {
     id: 4,
     name: 'Феттучини',
     quantity: 500,
     unit: 'г',
     calories: 600
   },
   {
     id: 5,
     name: 'Куриная грудка',
     quantity: 600,
     unit: 'г',
     calories: 800
   },
   {
     id: 6,
     name: 'Сыр Пармезан',
     quantity: 200,
     unit: 'г',
     calories: 400
   },
   {
     id: 7,
     name: 'Брокколи',
     quantity: 300,
     unit: 'г',
     calories: 100
   },
   {
     id: 8,
     name: 'Морковь',
     quantity: 200,
     unit: 'г',
     calories: 50
   },
   {
     id: 9,
     name: 'Болгарский перец',
     quantity: 200,
     unit: 'г',
     calories: 50
   },
   {
     id: 10,
     name: 'Грибы',
     quantity: 300,
     unit: 'г',
     calories: 50
   },
   {
     id: 11,
     name: 'Лук',
     quantity: 200,
     unit: 'г',
     calories: 50
   }
];

//инициализация таблицы
function addRows () {
   ingredientList.forEach((item) => {
      addRow(item);
   });
}
 
//добавление строк в таблицу
function addRow(userData) {
   const idEl = document.createElement("td");
   idEl.innerText = userData?.id;
   
   const nameEl = document.createElement("td");
   nameEl.innerText = userData?.name;
   
   const quantityEl = document.createElement("td");
   quantityEl.innerText = userData?.quantity;
   
   const unitEl = document.createElement("td");
   unitEl.innerText = userData?.unit;
 
   const caloriesEl = document.createElement("td");
   caloriesEl.innerText = userData?.calories;
 
   const actionEl = document.createElement("td");
 
   const editEl = document.createElement("div");
   editEl.innerText = "Редактировать";
   editEl.classList.add("table-btn", "edit-btn");
   editEl.onclick = function () {
      updateForm(userData);
      };
   
   const removeEl = document.createElement("div");
   removeEl.innerText = "Удалить";
   removeEl.classList.add("table-btn", "remove-btn");
   removeEl.onclick = function () {
      removeRow(userData); 
   };
     
   actionEl.append(editEl, removeEl);
 
   // создание строки с id и добавление в неё ячеек
   const row = document.createElement("tr");
   row.setAttribute("id", userData?.id + "-row");
   row.classList.add("data-row");
   row.append(idEl, nameEl, quantityEl, unitEl, caloriesEl, actionEl);
   $(".table").append(row);
}
 
 

function removeRow(userData) {
   $("#" + userData?.id + "-row").remove();
   const index = ingredientList.findIndex(n => n.id === userData?.id);
   if (index !== -1) {
    ingredientList.splice(index, 1);
   }
   localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
}
 
 
function adduser(data) {
   data.id = ingredientList.length + 1;
   ingredientList.push(data);
   localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
   addRow(data);
}

 function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1) + min);
 }

   
function clearForm() {
   $("#name").val(function () {
    return "";
   });
   $("#quantity").val(function () {
    return "";
   });
   $("#unit").val(function () {
    return "";
   });
   $("#calories").val(function () {
    return "";
   });
}
 
 
function updateForm(userData) {
   // returnAddBtn();
   selectedRowId = userData?.id;
   // с помощью метода children мы получаем дочерние элемента (ячейки таблицы) строки с id '{n}-row'
   const cells = $("#" + selectedRowId + "-row").children();
   $("#name").val(function () {
    return cells[1].innerText;
   });
   $("#quantity").val(function () {
    return cells[2].innerText;
   });
   $("#unit").val(function () {
    return cells[3].innerText;
   });
   $("#calories").val(function () {
    return cells[4].innerText;
   });
   
   // изменение текста кнопки "Добавить" на "Изменить"
   $(".submit-btn").val(function () {
    return "Изменить";
   });
   
   // добавление новой кнопки для отмены
   const cancelEl = document.createElement("input");
   cancelEl.classList.add("submit-btn", "submit-btn-red");
   cancelEl.setAttribute("type", "button");
   cancelEl.setAttribute("value", "Отменить");
   cancelEl.onclick = function () {
    returnAddBtn();
   };
   $(".submit-btn-wrapper").append(cancelEl);
}
   
// изменение записи в массиве
function updateUser(data) {
   ingredientList.map((item) => {
      if (item.id === data.id) {
         return data;
      }
       return item;
     });
   localStorage.setItem("ingredientList", JSON.stringify(ingredientList));
   updateRow(userData);
   returnAddBtn()
}
   
   // изменение данных в строке
function updateRow(userData) {
   const cells = $("#" + selectedRowId + "-row").children();
   cells[1].innerText = userData.name;
   cells[2].innerText = userData.quantity;
   cells[3].innerText = userData.unit;
   cells[4].innerText = userData.calories;
}
   
   // удаление кнопки "Отмена" и изменение кнопки "Изменить" на кнопку "Добавить"
function returnAddBtn() {
   clearForm();
   $(".submit-btn-red").remove();
   $(".submit-btn").val(function () {
    return "Добавить";
   });
   selectedRowId = null;
}
   
$(document).ready(function () {
   addRows();
     
   $("#newform").submit(function (event) {
     const formData = new FormData(event.target);
     const data = Object.fromEntries(formData);
     const value = $("#submitBtn").val();
     if (value === "Добавить") {
       data.id = ingredientList.length + 1;
       adduser(data);
     } else if (value === "Изменить") {
       updateRow(data);
     }
     clearForm();
     return false;
   });
});
