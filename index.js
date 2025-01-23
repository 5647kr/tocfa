class MainPage {
  constructor() {
    const main = document.querySelector("main");
    this.start = main.querySelector("a");


    this.financeState = JSON.parse(localStorage.getItem("financeState")) || [];
    this.todoState = JSON.parse(localStorage.getItem("todoState")) || [];
    this.todoTitles = JSON.parse(localStorage.getItem("todoTitles")) || [];
  }

  mainEvent() {
    this.start.addEventListener("click", () => {
      this.generateTodoStorage();
      this.generateFinanceStorage();
    })
  }

  generateFinanceStorage() {
    const financeStateData = {
      "totalEarn": 0,
      "totalPaid": 0,
      "totalAmount": 0
    };

    for(let i = 0; i <= 11; i++) {
      this.financeState.push({ ... financeStateData });
    }

    localStorage.setItem("financeState", JSON.stringify(this.financeState));
  }


  generateTodoStorage() {
    const todoStateData = {
      "list1": "0/0", 
      "list2": "0/0",
      "list3": "0/0",
      "list4": "0/0"
    };

    for(let i = 0; i <= 11; i++) {
      this.todoState.push({ ...todoStateData });
    }
    
    localStorage.setItem("todoState", JSON.stringify(this.todoState));

    const todoTitle = ["할일 목록1", "할일 목록2", "할일 목록3", "할일 목록4"];

    this.todoTitles.push(...todoTitle);

    localStorage.setItem("todoTitles", JSON.stringify(this.todoTitles))
    
  }
}

const main = new MainPage();
main.mainEvent();
