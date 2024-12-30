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

    // 일정 목록 불러오기
    this.schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    this.id = JSON.parse(localStorage.getItem("id")) || 0;
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
      this.days[i].textContent = calendarDate++;
    }

    this.year.textContent = calendarYear;
    this.month.textContent = calendarMonth + 1;
    this.time.dateTime = `${calendarYear}-${calendarMonth + 1}`;

    this.generateSchedule(calendarYear, calendarMonth);
  }

  moveMonthEvent() {
    // 이전 달로 이동
    this.prevMonth.addEventListener("click", () => {
      this.generateCalendar(this.currentYear, this.currentMonth--);
    });

    // 다음 달로 이동
    this.nextMonth.addEventListener("click", () => {
      this.generateCalendar(this.currentYear, this.currentMonth++);
    });

    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateSchedule(year, month) {
    this.days.forEach((today) => {
      today.addEventListener("click", (e) => {
        if (!e.target.textContent) {
          return;
        } else {
          this.schedule.classList.add("active");
        }

        let clickYear = year;
        let clickMonth = month;
        let clickDay = e.target.textContent;
        let clickDate = new Date(clickYear, clickMonth, clickDay);

        this.regSchedule(clickDate);

        this.scheduleDate.textContent = `${clickDay}일`;
      });

      this.closeBtn.addEventListener("click", () => {
        this.schedule.classList.remove("active");
      });
    });
  }

  regSchedule(clickDate) {
    this.regBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const title = this.regInput.value;
      const date = clickDate;
      
      // 일정 객체 만들기
      const scheduleItem = {
        id: this.id++,
        title: title,
        date: date,
      };

      // 일정 목록에 새 일정 추가
      this.schedules.push(scheduleItem);
      
      // localStorage에 일정 저장
      localStorage.setItem("schedules", JSON.stringify(this.schedules));
      localStorage.setItem("id", JSON.stringify(this.id));

      // 일정 리스트에 표시하기
      // this.renderSchedules();

      // 입력 필드 초기화
      this.regInput.value = "";
    });
  }

  // renderSchedules() {
  //   // 일정 목록을 새로 고침
  //   this.scheduleList.innerHTML = "";

  //   // selectedDate의 날짜와 일치하는 일정만 필터링
  //   const filteredSchedules = this.schedules.filter(schedule => {
  //     const scheduleDate = new Date(schedule.date);
  //     return scheduleDate.toDateString() === selectedDate.toDateString();  // 날짜 비교
  //   });

  //   filteredSchedules.forEach(schedule => {
  //     const scheduleItem = document.createElement("li");
  //     scheduleItem.innerHTML = `
  //       <h4>${schedule.title}</h4>
  //       <div>
  //         <button>
  //           <i class="fa-solid fa-pencil"></i>
  //         </button>
  //         <button>
  //           <i class="fa-solid fa-trash"></i>
  //         </button>
  //       </div>
  //     `;

  //     this.scheduleList.append(scheduleItem);
  //   });
  // }

  calendarEvent() {
    this.moveMonthEvent();
    this.renderSchedules(new Date());
  }
}

const calendar = new Calendar();
calendar.calendarEvent();
