class Todo {
  constructor () {
    const main = document.querySelector("main .wrap");
    this.dateList = main.querySelector(".dateListWrap ul");
    this.todo = main.querySelectorAll(".todoWrap article");
    this.todoTitle = main.querySelectorAll(".todoTitleWrap h2");
    this.editTitleBtn = main.querySelectorAll(".todoTitleWrap button");
    this.todoInput = main.querySelectorAll(".formWrap input");
    this.regBtn = main.querySelectorAll(".regBtn");
    this.todoList = main.querySelectorAll("[class^= todoListWrap]");

    this.todoTitles = JSON.parse(localStorage.getItem("todoTitles")) || [
      "할일 목록1", "할일 목록2", "할일 목록3", "할일 목록4"
    ];

    this.todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
    this.todoId = JSON.parse(localStorage.getItem("todoId")) || 0;
    this.editTodoId = null;
    this.currentDate = null;

    this.todoState = JSON.parse(localStorage.getItem("todoState")) || [];
    this.todoStateId = JSON.parse(localStorage.getItem("todoStateId")) || 0;
  }

  TodoEvent() {
    this.dateGenerate();
    this.displayTodoTitles();
    this.manageTodoData();
    this.displayTodoList();
    this.saveTodoState();
  }

  displayTodoTitles() {
    this.todoTitle.forEach((todoTitle, index) => {
      todoTitle.textContent = this.todoTitles[index];
    });

    this.editTitleBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => this.editTodoTitle(index));
    })
  }

  editTodoTitle(index) {
    const currentTitle = this.todoTitles[index];
    const newTitle = prompt("제목을 수정하세요", currentTitle);

    if (newTitle !== null && newTitle.trim() !== "") {
      this.todoTitles[index] = newTitle.trim();
      localStorage.setItem("todoTitles", JSON.stringify(this.todoTitles));
      this.displayTodoTitles();
    }
  }

  dateGenerate() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const date = newDate.getDate();

    if (date === 1) {
      this.saveTodoState();

      // this.todoArr = [];
      // localStorage.setItem("todoArr", JSON.stringify(this.todoArr));
    }
    
    const startDate = new Date(year, month, 1).getDate();
    const endDate = new Date(year, month + 1, 0).getDate();

    this.currentDate = `${month + 1}/${date}`
    
    this.dateList.innerHTML = "";
  
    // 날짜 목록 생성
    for (let i = startDate; i <= endDate; i++) {
      // li 요소와 button 요소 생성
      const dateItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i;
      
      if (i === date) {
        dateItem.classList.add("active");
        dateItem.focus();
      }
      
      dateItem.appendChild(button);
  
      button.addEventListener("click", () => {
        const activeLi = this.dateList.querySelector("li.active");
        if (activeLi) {
          activeLi.classList.remove("active");
        }
        dateItem.classList.add("active");

        this.currentDate = `${month + 1}/${i}`

        this.displayTodoList();
      });
  
      this.dateList.appendChild(dateItem);
    }

    const todayLi = this.dateList.querySelector("li.active");
    if (todayLi) {
      // setTimeout(() => {
      // }, 0);
    }
  }
  
  manageTodoData() {
    this.regBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const article = e.target.closest("article");
        const key = article.className.split("-")[1]
        const title = article.querySelector("input").value.trim();
        const done = false;
        const date = this.currentDate;
        const id = this.todoId;

        const props = { key, title, done, date, id }

        if(this.editTodoId === null) {
          this.regTodo(props);
        } else {
          this.updateTodo(this.editTodoId)
        }

        this.saveTodoState() 
      })
    })
  }

  regTodo(props) {
    const todoItemData = {
      id: props.id,
      date: props.date,
      title: props.title,
      done: props.done,
      key: props.key
    }
    
    this.todoArr.push(todoItemData);
    
    localStorage.setItem("todoArr", JSON.stringify(this.todoArr))
    localStorage.setItem("todoId", JSON.stringify(++this.todoId))
    
    this.resetInput();
    this.createTodoItem(todoItemData);
  }

  createTodoItem(todoItemData) {
    const todoItem = document.createElement("li");
    const todoItemContent = `
      <input type="checkbox" id="${todoItemData.id}">
      <label for="${todoItemData.id}">${todoItemData.title}</label>
      <div class="btnWrap">
        <button class="editBtn">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="deleteBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    todoItem.innerHTML = todoItemContent;
    todoItem.id = todoItemData.id;

    const checkbox = todoItem.querySelector("input[type=checkbox]");
    checkbox.checked = todoItemData.done;

    this.manageTodoItem(todoItem);

    this.todoList.forEach((list) => {
      const listKey = list.className.split("-")[1]
      if(listKey === todoItemData.key) {
        list.appendChild(todoItem)
      }
    })
  }

  displayTodoList() {
    this.todoList.forEach((list) => {
      list.innerHTML = "";
    })
  
    const todayTodo = this.todoArr.filter((todoItem) => {
      const todayItem = todoItem.date.split("/")[1];
      return todayItem === this.currentDate.split("/")[1];
    });
    
    todayTodo.forEach((todoItemData) => {
      this.createTodoItem(todoItemData)
    })
  }

  manageTodoItem(todoItem) {
    const check = todoItem.querySelector("input[type=checkbox]");
    const editBtn = todoItem.querySelector(".btnWrap .editBtn");
    const delBtn = todoItem.querySelector(".btnWrap .deleteBtn");

    check.addEventListener("click", () => this.checkTodo(todoItem))
    editBtn.addEventListener("click", () => this.editTodo(todoItem))
    delBtn.addEventListener("click", () => this.deleteTodo(todoItem.id))
  }

  checkTodo(todoItem) {
    const checkItem = this.todoArr.find(item => item.id === parseInt(todoItem.id));

    checkItem.done = !checkItem.done;

    localStorage.setItem("todoArr", JSON.stringify(this.todoArr));

    this.saveTodoState();
  }

  editTodo(todoItem) {
    const editItem = this.todoArr.find(item => item.id === parseInt(todoItem.id));
    const editInput = Array.from(this.todoInput).find((input) => {
      return editItem.key === input.id;
    })

    if(editItem) {
      editInput.value = editItem.title;
  
      this.editTodoId = editItem.id;
    }
  }

  updateTodo(id) {
    const updateTodo = this.todoArr.find(item => item.id === parseInt(id));

    const editInput = Array.from(this.todoInput).find((input) => {
      return updateTodo.key === input.id;
    })

    if(updateTodo) {
      updateTodo.title = editInput.value;

      localStorage.setItem("todoArr", JSON.stringify(this.todoArr));

      this.displayTodoList();

      this.editTodoId = null;

      this.resetInput();

    }
  }

  deleteTodo(id) {
    this.todoArr = this.todoArr.filter(item => item.id !== parseInt(id));

    localStorage.setItem("todoArr", JSON.stringify(this.todoArr));

    const li = document.getElementById(id);
    if(li) {
      li.remove();
    }

    this.displayTodoList();

    this.saveTodoState();
  }

  saveTodoState() {
    // 기본 todoStateData 초기화
    const todoStateData = {
      "list1": "0/0", 
      "list2": "0/0",
      "list3": "0/0",
      "list4": "0/0"
    };

    this.todoState.push(todoStateData);
    
    localStorage.setItem("todoState", JSON.stringify(this.todoState))
    localStorage.setItem("todoStateId", JSON.stringify(++this.todoStateId)) 
    // 로그로 최종 결과 확인
    console.log('After Update:', todoStateData);
  }
  



  resetInput() {
    this.todoInput.forEach((input) => {
      input.value = ""
    })
  }
  /**
   * 1. 매달 1일 todoArr 초기화
   * 3. 완료한 todo count하여 로컬스토리지에 저장(삭제 또는 checkbox가 true 또는 false로 변경될때마다 업데이트 되어야 함)
   */
}

const todo = new Todo();
todo.TodoEvent();


  
// console.log('Before Update:', todoStateData);
  
// // todoArr를 순회하면서 각 item의 상태를 업데이트
// this.todoArr.forEach((item) => {
//   // item의 key가 todoStateData의 key와 일치하면
//   const key = item.key;  // 예: "list1", "list2" 등
//   if (todoStateData[key]) {
//     // 현재 "0/0" 형식의 데이터를 분해해서 숫자 추출
//     let [completed, total] = todoStateData[key].split('/').map(Number);

//     // 총 항목 수 증가
//     total++;

//     // 항목이 완료되었으면 완료된 항목 수 증가
//     if (item.done) {
//       completed++;
//     }

//     // 새로운 완료된 항목 수와 총 항목 수를 todoStateData에 반영
//     todoStateData[key] = `${completed}/${total}`;
//   }
// });