class Analyze {
  constructor() {
    const analyze = document.querySelector(".analyze");
    this.totalEarn = analyze.querySelector(".totalEarn strong");
    this.totalPaid = analyze.querySelector(".totalPaid strong");
    this.todoProgress = analyze.querySelector(".progress strong");

    this.monthList = analyze.querySelector(".todoState .month");
    this.todoState = analyze.querySelectorAll(".monthState > div");
    this.todoTitle = analyze.querySelectorAll(".monthState strong");
    this.todoGraph = analyze.querySelectorAll(".monthState .graph");

    this.financeGraph = analyze.querySelector(".financeState > div");

    this.currentDate = null;
  }

  analyzeEvent() {
    this.dateGenerate();
    this.manageDateEvent();
  }

  dateGenerate() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    this.currentDate = `${year}/${month + 1}`
  }

  manageDateEvent() {
    for(let i = 0; i < 12; i++) {
      const dateItem = document.createElement("li");
      const dateBtn = document.createElement("button");
      dateBtn.textContent = i + 1;
      dateItem.appendChild(dateBtn);
      this.monthList.appendChild(dateItem);

      const currentMonth = parseInt(this.currentDate.split("/")[1]);
      
      currentMonth === parseInt(dateBtn.textContent) ? dateItem.classList.add("active") : dateItem.classList.remove("active");

      if(currentMonth < parseInt(dateBtn.textContent)) {
        dateBtn.disabled = true;
        dateItem.classList.add("disabled")
      } else {
        dateBtn.disabled = false;
        dateItem.classList.remove("disabled")
      }

      dateBtn.addEventListener("click", () => {
        const activeDate = this.monthList.querySelector("li.active");

        if (activeDate) {
          activeDate.classList.remove("active");
        }
        dateItem.classList.add("active");
      })
    }
  }
}

const analyze = new Analyze();
analyze.analyzeEvent();
