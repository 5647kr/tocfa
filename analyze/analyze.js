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

    this.financeGraph = analyze.querySelector(".financeState > canvas");

    this.currentDate = null;

    this.financeState = JSON.parse(localStorage.getItem("financeState"))
  }

  analyzeEvent() {
    this.dateGenerate();
    this.manageDateEvent();
    this.displayFinanceState();
    this.displayTotalFinance();
  }

  dateGenerate() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;

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

  displayTotalFinance() {
    const totalEarn = [];
    const totalPaid = [];

    this.financeState.map((item, index) => {
      if(index <= parseInt(this.currentDate.split("/")[1] - 1)) {
        if(item.totalEarn) {
          totalEarn.push(item.totalEarn)
        } else {
          totalPaid.push(item.totalPaid)
        }
      }
    })

    console.log(totalEarn, totalPaid)

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
