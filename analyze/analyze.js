class Analyze {
  constructor() {
    const analyze = document.querySelector(".analyze");
    this.totalEarn = analyze.querySelector(".totalEarn strong");
    this.totalPaid = analyze.querySelector(".totalPaid strong");
    this.todoProgress = analyze.querySelector(".progress strong");

    this.monthList = analyze.querySelector(".todoState .month");
    this.todoTitle = analyze.querySelectorAll(".monthState strong");
    this.todoGraph = analyze.querySelectorAll(".monthState .graph");
    this.todoPercentage = analyze.querySelectorAll(".monthState p");

    this.financeGraph = analyze.querySelector(".financeState > canvas");

    this.currentDate = null;

    this.financeState = JSON.parse(localStorage.getItem("financeState"));
    this.todoTitles = JSON.parse(localStorage.getItem("todoTitles"));
    this.todoStates = JSON.parse(localStorage.getItem("todoState"));
  }

  analyzeEvent() {
    this.manageDateEvent();
    this.displayFinanceState();
    this.displayTotalFinance();

    this.displayTodoTitles();
    this.calculateTodoPercentage();
    this.displayTotalTodoState();
  }


  manageDateEvent() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;

    this.currentDate = `${year}/${month + 1}`

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
        
        this.currentDate = `${year}/${i + 1}`
        console.log(this.currentDate)
        
        this.calculateTodoPercentage();
      })
      
    }
  }

  displayTodoTitles() {
    this.todoTitle.forEach((todoTitle, index) => {
      todoTitle.textContent = this.todoTitles[index];
    });
  }

  manageTodoState() {
    return this.todoStates.find((data, index) => {
      if(index === parseInt(this.currentDate.split("/")[1] - 1)) {
        return data;
      }
    })
  }

  calculateTodoPercentage() {
    const data = this.manageTodoState();
  
    const rate = Object.values(data).map(item => {
      const [completed, total] = item.split('/').map(Number);
      return total > 0 ? (completed / total) * 100 : 0;
    });
  
    this.createTodoGraph(rate);
  }
  
  createTodoGraph(rate) {
    for (let i = 0; i < this.todoGraph.length; i++) {
      const chart = this.todoGraph[i].getContext("2d");

      if (chart.chart) {
        chart.chart.destroy();
      }

      // 각 비율(rate[i])을 완료된 비율과 미완료된 비율로 나누어 처리
      const completed = rate[i];  // 완료된 비율
      const notCompleted = 100 - completed;  // 미완료 비율
      
      this.todoPercentage[i].textContent = `${completed.toFixed(0)}%`;
  
      // 도넛 차트 생성
      chart.chart = new window.Chart(chart, {
        type: "doughnut",  // 도넛 차트
        data: {
          datasets: [{
            data: [completed, notCompleted],
            backgroundColor: ["#7671FA", "#07244C"],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          Animation: false,
          maintainAspectRatio: false,
          aspectRatio: 1
        }
      });
    }
  }
  
  displayTotalTodoState() {
    let totalCompleted = 0;
    let total = 0;
  
    this.todoStates.forEach((item, index) => {
      if (index < parseInt(this.currentDate.split("/")[1])) {

        Object.keys(item).forEach((key) => {
          const [completed, totalCount] = item[key].split('/').map(Number);
  
          totalCompleted += completed;
          total += totalCount;
        });
      }
        console.log(`총 완료된 개수: ${totalCompleted}`);
        console.log(`총 전체 개수: ${total}`);
    });
  
    const totalPercentage = (totalCompleted / total) * 100;
    this.todoProgress.textContent = `${totalPercentage.toFixed(0)}%`;
  }

  displayTotalFinance() {
    const totalEarn = [];
    const totalPaid = [];

    this.financeState.map((item, index) => {
      if(index <= parseInt(this.currentDate.split("/")[1] - 1)) {
        if(item.totalEarn > 0) {
          totalEarn.push(item.totalEarn)
        }
        if(item.totalPaid > 0) {
          totalPaid.push(item.totalPaid)
        }
      }
    })

    const EarnPrice = totalEarn.reduce((acc, price) => acc +  price, 0);
    const paidPrice = totalPaid.reduce((acc, price) => acc +  price, 0);

    this.totalEarn.textContent = EarnPrice;
    this.totalPaid.textContent = paidPrice;

  }

  displayFinanceState() {
    const chart = this.financeGraph.getContext("2d");

    const financeData = this.financeState.map((item, index) => {
      if(index <= parseInt(this.currentDate.split("/")[1] - 1)) {
        return item.totalAmount;
      } else {
        return 0;
      }
    })

    new window.Chart(chart, {
      type: "line",  // 차트 유형 (라인 차트)
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],  // 라벨 설정
        datasets: [{
          label: "월별 총액",  // 데이터셋 이름
          data: financeData,  // 각 월의 totalAmount 값
          backgroundColor: "#07244C",  // 배경색
          borderColor: "#7671FA",  // 선 색상
          borderWidth: 1,  // 선 두께
          fill: false,  // 그래프를 채움
        }]
      },
      options: {
        responsive: true,
        Animation: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "월별 재정",
          fontsize: 18,
          fontcolor: "#07244C"
        },
        scales: {
          y: {
            beginAtZero: true  // y축이 0부터 시작
          }
        }
      }
    });
  }
}

const analyze = new Analyze();
analyze.analyzeEvent();
