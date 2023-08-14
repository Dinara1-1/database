let recipeList = JSON.parse(localStorage.getItem("recipeList"));

let recList = [
    {
      id: 1,
      name: "Омлет",
      description: "Блюдо из смеси взбитых яиц и молока, зажаренной на сковороде",
      time: "20 мин",
      portions: 3,
      ingredients: "Молоко, яйца",
      calories: 300,
    },
    {
      id: 2,
      name: "Салат",
      description: "Холодное блюдо, состоящее из одного вида или смеси разных видов сочетающихся между собой нарезанных продуктов в заправке",
      time: "30 мин",
      portions: 3,
      ingredients: "Огурцы, помидоры",
      calories: 120,
    },
    {
      id: 3,
      name: "Паста с курицей",
      description: "Простой и вкусный способ приготовления пасты с куриным филе",
      time: "1,5 ч",
      portions: 3,
      ingredients: "Спагетти, куриное филе",
      calories: 750,
    },
    {
      id: 4,
      name: "Рис со свининой",
      description: "Рассыпчатый рис с жареной свининой и овощами",
      time: "2 ч",
      portions: 3,
      ingredients: "Рис, свинина",
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
  
      const ingredientsEl = document.createElement("td");
      ingredientsEl.innerText = userData?.ingredients;
  
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
        removeRowFromTable(userData); 
      };
      
      actionEl.append(editEl, removeEl);
  
      // создание строки с id и добавление в неё ячеек
      const row = document.createElement("tr");
      row.setAttribute("id", userData?.id + "-row");
      row.classList.add("data-row");
      row.append(idEl, nameEl, descriptionEl, timeEl, portionsEl, ingredientsEl, caloriesEl, actionEl);
      $(".table").append(row);
  }
  
  function removeRowFromTable(userData) {
      const result = confirm("Вы действительно хотите удалить запись?")
      if (result) {
          recipeList = recipeList.filter((item) => item.id !== userData.id);
          removeRow(userData)
      }
  }
  
  function removeRow(userData) {
      $("#" + userData?.id + "-row").remove();
  }
  
  function adduser(data) {
    data.id = recipeList.length + 1;
    recipeList.push(data);
    localStorage.setItem("recipeList", JSON.stringify(recipeList));
    addRow(data);
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
      $("#ingredients").val(function () {
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
      $("#ingredients").val(function () {
        return cells[5].innerText;
      });
      $("#calories").val(function () {
        return cells[6].innerText;
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
      recipeList.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
    
      updateRow(userData);
    }
    
    // изменение данных в строке
    function updateRow(userData) {
      const cells = $("#" + selectedRowId + "-row").children();
      cells[1].innerText = userData.name;
      cells[2].innerText = userData.description;
      cells[3].innerText = userData.time;
      cells[4].innerText = userData.portions;
      cells[5].innerText = userData.ingredients;
      cells[6].innerText = userData.calories;
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
        data.id = recipeList.length + 1;
        adduser(data);
      } else if (value === "Изменить") {
        updateRow(data);
      }
      clearForm();
      return false;
    });
  });
  
  
