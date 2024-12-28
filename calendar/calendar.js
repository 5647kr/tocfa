class Calendar {
  constructor() {
    const calendar = document.querySelector(".calendar");
    this.time = calendar.querySelector(".year");
    this.year = calendar.querySelector(".year h2");
    this.month = calendar.querySelector(".year p");
    this.days = calendar.querySelectorAll("table tbody tr td");

    const date = new Date();
    this.yearValue = date.getFullYear();
    this.monthValue = date.getMonth() + 1
  }

  generateCalendar(year, month) {
    const startMonth = new Date(year, month - 1, 1);
    const monthLength = new Date(year, month, 0).getDate();
  
    let todayYear = startMonth.getFullYear();
    let todayMonth = startMonth.getMonth();
    let todayDate = startMonth.getDate();
    let todayDay = startMonth.getDay();

    for (let i = 0; i < this.days.length; i++) {
      this.days[i].innerHTML = "&nbsp;";
    }

    for (let i = todayDay; i < todayDay + monthLength; i++) {
      this.days[i].textContent = todayDate++;
    }

    this.year.textContent = todayYear;
    this.month.textContent = todayMonth + 1;
    this.time.dateTime = `${todayYear}-${todayMonth + 1}`;

    this.regScheduleEvent({todayYear, todayMonth});
  }

  moveMonthEvent() {
    const prevBtn = document.querySelector(".prevMonth");
    const nextBtn = document.querySelector(".nextMonth");

    // 이전 달로 이동
    prevBtn.addEventListener("click", () => {
      this.monthValue--;
      if (this.monthValue < 1) {
        this.monthValue = 12;
        this.yearValue--;
      }
      this.generateCalendar(this.yearValue, this.monthValue);
    });

    // 다음 달로 이동
    nextBtn.addEventListener("click", () => {
      this.monthValue++;
      if (this.monthValue > 12) {
        this.monthValue = 1;
        this.yearValue++;
      }
      this.generateCalendar(this.yearValue, this.monthValue);
    });

    this.generateCalendar(this.yearValue, this.monthValue);
  }

  regScheduleEvent(props) {
    const regScheduleForm = document.querySelector(".scheduleBg");
    this.today = regScheduleForm.querySelector(".title h3");
    this.closeBtn = regScheduleForm.querySelector(".closeBtn");

    this.days.forEach((day) => {
      day.addEventListener("click", (e) => {
        if(e.target.textContent.trim() === "") {
          return;
        } else {
          regScheduleForm.classList.add("active");
        }

        let clickYear = props.todayYear;
        let clickMonth = props.todayMonth;
        let clickDay = e.target.textContent;
        let clickDate = new Date(clickYear, clickMonth, clickDay);

        const clickWeek = clickDate.getDay();
        const week = ["일", "월", "화", "수", "목", "금", "토"];
        const weekDay = week[clickWeek];

        this.today.textContent = `${e.target.textContent} ${weekDay}요일`;
      });
    });

    // 닫기 버튼 클릭 시 팝업 숨기기
    this.closeBtn.addEventListener("click", () => {
      regScheduleForm.classList.remove("active");
    });
  }

  calendarEvent () {
    this.moveMonthEvent();
    this.regScheduleEvent({todayYear: this.yearValue, todayMonth: this.monthValue});
  }
}

const calendar = new Calendar();
calendar.calendarEvent();
