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

    this.scheduleArr = JSON.parse(localStorage.getItem("scheduleArr")) || [];
    this.scheduleId = JSON.parse(localStorage.getItem("scheduleId")) || 0;
    this.editScheduleId = null;
  }

  calendarEvent() {
    this.moveMonthEvent();
    this.displayRegForm();
    this.manageScheduleData();
    this.displayMonthSchedule();
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
      const currentDate = calendarDate++;
      this.days[i].innerHTML = `
        <span>${currentDate}</span>
        <ul id="${this.currentYear}${this.currentMonth}${currentDate}"></ul>
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

      this.displayMonthSchedule();
    });

    // 다음 달로 이동
    this.nextMonth.addEventListener("click", () => {
      this.currentMonth++;
      if (this.currentMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      }
      this.generateCalendar(this.currentYear, this.currentMonth);

      this.displayMonthSchedule();
    });

    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  // 등록 모달창 관리
  displayRegForm() {
    this.days.forEach((day) => {
      day.addEventListener("click", (e) => {
        const selectedDate = e.target.closest("td");
        
        if(selectedDate.innerHTML === "&nbsp;") {
          return;
        } else {
          this.schedule.classList.add("active");
        }

        const year = this.currentYear;
        const month = this.currentMonth;
        const date = parseInt(selectedDate.querySelector("span").textContent);

        const selectedDay = new Date(year, month - 1, date);
        const dayOfWeek = selectedDay.getDay();

        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayName = daysOfWeek[dayOfWeek];

        this.scheduleDate.textContent = `${date} ${dayName}요일`;

        this.scheduleList.id = `${year}${month}${date}`;

        this.displayScheduleList();
      });
    })
    
    // 모달창 닫기
    this.closeBtn.addEventListener("click", () => {
      this.schedule.classList.remove("active");
      this.displayMonthSchedule();
    })
  }

  manageScheduleData() {
    this.regBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const selectedDate = parseInt(this.scheduleDate.textContent.split(" ")[0]);

      const id = this.scheduleId;
      const date = `${this.currentYear}${this.currentMonth}${selectedDate}`;
      const title = this.regInput.value.trim();

      const props = { id, date, title }

      if(this.editScheduleId === null) {
        this.regSchedule(props);
      } else {
        this.updateSchedule(this.editScheduleId);
      }
    })
  }

  regSchedule(props) {
    if(props.title === "" || props.title.length > 20) {
      alert("일정은 1자 이상 20자 미만으로 입력해주세요.");
      return;
    }

    const scheduleItemData = {
      id: props.id,
      date: props.date,
      title: props.title
    };

    this.scheduleArr.push(scheduleItemData);

    localStorage.setItem("scheduleArr", JSON.stringify(this.scheduleArr));
    localStorage.setItem("scheduleId", JSON.stringify(++this.scheduleId));

    this.resetInput();

    this.displayScheduleList();
  }

  displayScheduleList() {
    this.scheduleList.innerHTML = "";

    this.scheduleArr.filter((item) => {
      if(item.date === this.scheduleList.id) {
        this.createScheduleItem(item);
      }
    })
  }

  createScheduleItem(item) {
    const scheduleItem = document.createElement("li");
    const scheduleItemContent =`
      <h4>${item.title}</h4>
      <div class="btnWrap">
        <button class="editBtn">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="deleteBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    scheduleItem.id = item.id;
    scheduleItem.innerHTML = scheduleItemContent;

    this.scheduleList.appendChild(scheduleItem);

    this.manageScheduleItem(scheduleItem);
  }

  manageScheduleItem(scheduleItem) {
    const editBtn = scheduleItem.querySelector(".btnWrap .editBtn");
    const delBtn = scheduleItem.querySelector(".btnWrap .deleteBtn");

    editBtn.addEventListener("click", () => this.editSchedule(scheduleItem.id))
    delBtn.addEventListener("click", () => this.deleteSchedule(scheduleItem.id))
  }

  editSchedule(id) {
    const editItem = this.scheduleArr.find(item => item.id === parseInt(id));
    
    if(editItem) {
      this.regInput.value = editItem.title;
      
      this.editScheduleId = editItem.id
    }
  }

  updateSchedule(id) {
    const updateItem = this.scheduleArr.find(item => item.id === parseInt(id));

    if(updateItem) {
      updateItem.title = this.regInput.value;

      localStorage.setItem("scheduleArr", JSON.stringify(this.scheduleArr));

      this.displayScheduleList();

      this.editScheduleId = null;

      this.resetInput();

      this.displayMonthSchedule();
    }
  }

  deleteSchedule(id) {
    this.scheduleArr = this.scheduleArr.filter(item => item.id !== parseInt(id))

    localStorage.setItem("scheduleArr", JSON.stringify(this.scheduleArr));

    const li = document.getElementById(id);
    if(li) {
      li.remove();
    }

    this.displayScheduleList();
  }

  displayMonthSchedule() {
    this.days.forEach((day) => {
      const monthSchedule = day.querySelector("ul");
      
      if (!monthSchedule) {
        return; // 또는 continue로 건너뛸 수도 있음
      }

      monthSchedule.innerHTML = "";

      this.scheduleArr.filter((item) => {
        if(item.date === monthSchedule.id) {
          const monthScheduleItem = document.createElement("li");
          monthScheduleItem.textContent = item.title;
      
          monthScheduleItem.id = item.id;

          monthSchedule.appendChild(monthScheduleItem);
        }
      })
    })
  }



  resetInput() {
    this.regInput.value = "";
  }


}

const calendar = new Calendar();
calendar.calendarEvent();
