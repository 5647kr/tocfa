class Todo {
  constructor () {
    const main = document.querySelector("main .wrap");
    this.dateList = main.querySelector(".dateListWrap ul");
    this.todo = main.querySelectorAll(".todoWrap article");
    this.todoTitle = main.querySelectorAll(".todoTitleWrap h2");
    this.todoInput = main.querySelectorAll(".formWrap input");
    this.todoList = main.querySelectorAll(".todoListWrap");
  }

  TodoEvent() {
    this.dateGenerate();
  }

  dateGenerate() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const date = newDate.getDate();
    
    const startDate = new Date(year, month, 1).getDate();
    const endDate = new Date(year, month + 1, 0).getDate();
    
    this.dateList.innerHTML = '';
  
    // 날짜 목록 생성
    for (let i = startDate; i <= endDate; i++) {
      // li 요소와 button 요소 생성
      const dateItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i;
      
      if (i === date) {
        dateItem.classList.add('active');
      }
      
      dateItem.appendChild(button);
  
      button.addEventListener('click', () => {
        const activeLi = this.dateList.querySelector('li.active');
        if (activeLi) {
          activeLi.classList.remove('active');
        }
        dateItem.classList.add('active');
      });
  
      this.dateList.appendChild(dateItem);
    }
  }
  
}

const todo = new Todo();
todo.TodoEvent();