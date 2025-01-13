class Todo {
  constructor () {
    const main = document.querySelector("main .wrap");
    this.dateList = main.querySelector(".dateListWrap ul");
    this.todo = main.querySelectorAll(".todoWrap article");
    this.todoTitle = main.querySelectorAll(".todoTitleWrap h2");
    this.todoInput = main.querySelectorAll(".formWrap input");
    this.regBtn = main.querySelectorAll(".regBtn");
    this.todoList = main.querySelectorAll("[class^= todoListWrap]");

    this.todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
    this.todoId = JSON.parse(localStorage.getItem("todoId")) || 0;
    this.editTodoId = null;
    this.currentDate = null; // 현재 선택된 날짜
  }

  TodoEvent() {
    this.dateGenerate();
    this.manageTodoData();
    this.displayTodoList();
  }

  dateGenerate() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const date = newDate.getDate();
    
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

        this.regTodo(props)
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
        <button>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    todoItem.innerHTML = todoItemContent;
    todoItem.id = todoItemData.key
    
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

  resetInput() {
    this.todoInput.forEach((input) => {
      input.value = ""
    })
  }
  /**
   * 일단 로컬에 저장해야하는 데이터는
   * title 할일 내용
   * done 완료 여부
   * date 날짜
   * 어떤 article의 ul에 들어가야하는지 id값
   * 할일 자체 아이디값
   */
}

const todo = new Todo();
todo.TodoEvent();
