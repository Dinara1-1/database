
let recipeList = [
  {
    id: 1,
    name: 'Спагетти Болоньезе',
    description: 'Классическое итальянское блюдо из пасты с мясным томатным соусом',
    time: 60,
    portions: 4,
    calories: 500,
  },
  {
    id: 2,
    name: 'Цыпленок Альфредо',
    description: 'Сливочная паста с курицей и сыром пармезан',
    time: 45,
    portions: 6,
    calories: 800,
  },
  {
    id: 3,
    name: 'Жаркое с овощами',
    description: 'Полезное и вкусное жаркое с овощами',
    time: 30,
    portions: 4,
    calories: 300,
  },
  {
    id: 4,
    name: 'Бефстроганов',
    description: 'Сытное и сливочное блюдо из говядины с грибами и луком',
    time: 60,
    portions: 6,
    calories: 900,
  }
]
  
  //инициализация таблицы
  function addRows () {
      recipeList.forEach((item) => {
          addRow(item);
      });
  }
  
  //добавление строк в таблицу
  function addRow(userData) {
      const idEl = document.createElement("td");
      idEl.innerText = userData?.id;
    
      const nameEl = document.createElement("td");
      nameEl.innerText = userData?.name;
    
      const descriptionEl = document.createElement("td");
      descriptionEl.innerText = userData?.description;     
      
      const timeEl = document.createElement("td");
      timeEl.innerText = userData?.time;
    
      const portionsEl = document.createElement("td");
      portionsEl.innerText = userData?.portions;
  
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
      row.append(idEl, nameEl, descriptionEl, timeEl, portionsEl, caloriesEl, actionEl);
      $(".table").append(row);
  }
  
  

  function removeRow(userData) {
      $("#" + userData?.id + "-row").remove();
      const index = recipeList.findIndex(n => n.id === userData?.id);
   if (index !== -1) {
    recipeList.splice(index, 1);
   }
      localStorage.setItem("recipeList", JSON.stringify(recipeList));
  }
  
  function adduser(data) {
    data.id = getRandomIntInclusive(0, 1000);
    recipeIng.push(data);
    localStorage.setItem("recipeList", JSON.stringify(recipeList));
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
      $("#description").val(function () {
        return "";
      });    
    $("#time").val(function () {
        return "";
      });
      $("#portions").val(function () {
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
      $("#description").val(function () {
        return cells[2].innerText;
      });    
      $("#time").val(function () {
        return cells[3].innerText;
      });
      $("#portions").val(function () {
        return cells[4].innerText;
      });

      $("#calories").val(function () {
        return cells[5].innerText;
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
      data.id = selectedRowId;
      const Users = recipeList.find((item) => item.id === data.id)
      Users.name = data.name;
      Users.description = data.description;
      Users.time = data.time;
      Users.portions = data.portions;
      Users.calories = data.calories;
      updateRow(data);
      localStorage.setItem("recipeList", JSON.stringify(recipeList));
    };
    
    // изменение данных в строке
    function updateRow(userData) {
      const cells = $("#" + selectedRowId + "-row").children();
      cells[1].innerText = userData.name;
      cells[2].innerText = userData.description;    
      cells[3].innerText = userData.time;
      cells[4].innerText = userData.portions;
      cells[5].innerText = userData.calories;
      localStorage.setItem("recipeList", JSON.stringify(recipeList));
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
        data.id = getRandomIntInclusive();
        addUser(data);
      } else if (value === "Изменить") {
        updateRow(data);
      }
      clearForm();
      return false;
    });
  });


