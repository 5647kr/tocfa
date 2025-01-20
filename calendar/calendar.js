class Calendar {
  constructor() {
    const calendar = document.querySelector(".calendar");
    this.time = calendar.querySelector(".year");
    this.year = calendar.querySelector(".year h2");
    this.month = calendar.querySelector(".year p");
    this.prevMonth = calendar.querySelector(".prevMonth");
    this.nextMonth = calendar.querySelector(".nextMonth");
    this.days = calendar.querySelectorAll("table tbody tr td");

    const main = document.querySelector("main .wrap");
    this.schedule = main.querySelector(".scheduleBg");
    this.scheduleDate = this.schedule.querySelector(".title h3");
    this.scheduleList = this.schedule.querySelector(".scheduleList ul");
    this.closeBtn = this.schedule.querySelector(".closeBtn");
    this.regForm = this.schedule.querySelector("form")
    this.regInput = this.schedule.querySelector("input");
    this.regBtn = this.schedule.querySelector(".regBtn");

    const date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
  }

  generateCalendar(year, month) {
    const startMonth = new Date(year, month - 1, 1);
    const monthLength = new Date(year, month, 0).getDate();
  
    let calendarYear = startMonth.getFullYear();
    let calendarMonth = startMonth.getMonth();
    let calendarDate = startMonth.getDate();
    let calendarDay = startMonth.getDay();

    for (let i = 0; i < this.days.length; i++) {
      this.days[i].innerHTML = "&nbsp;";
    }

    for (let i = calendarDay; i < calendarDay + monthLength; i++) {
      this.days[i].innerHTML = `
        <span>${calendarDate++}</span>
        <ul class="scheduleitem"></ul>
      `;
    }

    this.year.textContent = calendarYear;
    this.month.textContent = calendarMonth + 1;
    this.time.dateTime = `${calendarYear}-${calendarMonth + 1}`;
  }

  moveMonthEvent() {
    // 이전 달로 이동
    this.prevMonth.addEventListener("click", () => {
      this.currentMonth--;
      if (this.currentMonth < 1) {
        this.currentMonth = 12;
        this.currentYear--;
      }
      this.generateCalendar(this.currentYear, this.currentMonth);
    });

    // 다음 달로 이동
    this.nextMonth.addEventListener("click", () => {
      this.currentMonth++;
      if (this.currentMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      }
      this.generateCalendar(this.currentYear, this.currentMonth);
    });

    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  calendarEvent() {
    this.moveMonthEvent();
  }
}

const calendar = new Calendar();
calendar.calendarEvent();
