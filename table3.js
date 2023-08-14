let recipeIng = [
  {
   id: 1,
   recipe_id: 1,
   ingredient_id: 1
  },
  {
   id: 2,
   recipe_id: 1,
   ingredient_id: 2
  },
  {
   id: 3,
   recipe_id: 1,
   ingredient_id: 3
  },
  {
   id: 4,
   recipe_id: 2,
   ingredient_id: 4
  },
  {
   id: 5,
   recipe_id: 2,
   ingredient_id: 5
  },
  {
   id: 6,
   recipe_id: 2,
   ingredient_id: 6
  },
  {
   id: 7,
   recipe_id: 3,
   ingredient_id: 7
  },
  {
   id: 8,
   recipe_id: 3,
   ingredient_id: 8
  },
  {
   id: 9,
   recipe_id: 3,
   ingredient_id: 9
  },
  {
   id: 10,
   recipe_id: 4,
   ingredient_id: 2
  },
  {
   id: 11,
   recipe_id: 4,
   ingredient_id: 10
  },
  {
   id: 12,
   recipe_id: 4,
   ingredient_id: 11
  },
];
 
 //инициализация таблицы
function addRows () {
   recipeIng.forEach((item) => {
     addRow(item);
   });
}
 
 //добавление строк в таблицу
function addRow(userData) {
   const idEl = document.createElement("td");
   idEl.innerText = userData?.id;
  
   const recipe_idEl = document.createElement("td");
   recipe_idEl.innerText = userData?.recipe_id;
   
   const ingredient_idEl = document.createElement("td");
   ingredient_idEl.innerText = userData?.ingredient_id;
 
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
   row.append(idEl, recipe_idEl, ingredient_idEl, actionEl);
   $(".table").append(row);
}


function removeRow(userData) {
   $("#" + userData?.id + "-row").remove();
   const index = recipeIng.findIndex(n => n.id === userData?.id);
   if (index !== -1) {
    recipeIng.splice(index, 1);
   }
   localStorage.setItem("recipeIng", JSON.stringify(recipeIng));
 }
 
 function adduser(data) {
    data.id = recipeIng.length + 1;
    recipeIng.push(data);
    localStorage.setItem("recipeIng", JSON.stringify(recipeIng));
    addRow(data);
 }

function clearForm() {
   $("#id").val(function () {
    return "";
   });
   $("#recipe_id").val(function () {
    return "";
   });
   $("#ingredient_id").val(function () {
    return "";
   });
}
 
 
function updateForm(userData) {
   // returnAddBtn();
   selectedRowId = userData?.id;
   // с помощью метода children мы получаем дочерние элемента (ячейки таблицы) строки с id 
'{n}-row'
   const cells = $("#" + selectedRowId + "-row").children();
   $("#id").val(function () {
    return cells[1].innerText;
   });
   $("#recipe_id").val(function () {
    return cells[2].innerText;
   });
   $("#ingredient_id").val(function () {
    return cells[3].innerText;
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
function updateuser(data) {
   recipeIng.map((item) => {
    if (item.id === data.id) {
     return data;
    }
    return item;
   });
  
   updateRow(userData);
   localStorage.setItem("recipeIng", JSON.stringify(recipeIng));
   returnAddBtn()
}
  
  // изменение данных в строке
function updateRow(userData) {
   const cells = $("#" + selectedRowId + "-row").children();
   cells[1].innerText = userData.id;
   cells[2].innerText = userData.recipe_id;
   cells[3].innerText = userData.ingredient_id;
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
    data.id = recipeIng.length + 1;
    adduser(data);
   } else if (value === "Изменить") {
    updateRow(data);
   }
   clearForm();
   return false;
  });
});

