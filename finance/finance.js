class Finance {
  constructor () {
    const finance = document.querySelector(".finance");
    this.totalFinance = finance.querySelector(".totalFinance h2");
    this.financeForm = finance.querySelector(".financeInput form");
    this.financeType = this.financeForm.querySelectorAll(".financeType input[type=radio]");
    this.financeTitle = this.financeForm.querySelector(".financeInputWrap .financeTitle")
    this.financePrice = this.financeForm.querySelector(".financeInputWrap .financePrice")
    this.regBtn = this.financeForm.querySelector(".regBtn");

    this.earnFinance = finance.querySelector(".earnFinance strong");
    this.paidFinance = finance.querySelector(".paidFinance strong");

    this.financeList = finance.querySelector(".monthFinanceList ul")

    this.financeArr = JSON.parse(localStorage.getItem("financeArr")) || [];
    this.financeId = JSON.parse(localStorage.getItem("financeId")) || 0;
    this.editFinanceId = null;

    this.currentDate = null;

    this.financeState = JSON.parse(localStorage.getItem("financeState"))
  }

  financeEvent() {
    this.validateInput();

    this.manageFinanceData();
    this.displayFinanceList();
    this.displayFinanceState();
  }

  validateInput() {
    this.financeTitle.addEventListener("input", () => {
      if(this.financeTitle.value.length > 10) {
        this.financeTitle.value = this.financeTitle.value.slice(0, 10)
      }
    })

    this.financePrice.addEventListener("input", () => {
      this.financePrice.value = this.financePrice.value.replace(/[^0-9]/g, "")

      if(this.financePrice.value.length > 10) {
        this.financePrice.value = this.financePrice.value.slice(0, 10)
      }
    })
  }

  manageDate() {
    const newDate = new Date();
    const month = newDate.getMonth(); // 여기수정
    const date = newDate.getDate();

    this.currentDate = `${month + 1}/${date}`;
  }

  manageFinanceData() {
    this.manageDate();

    this.regBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const id = this.financeId;
      const date = this.currentDate;
      let type = null;
      const title = this.financeTitle.value.trim();
      const price = parseInt(this.financePrice.value.trim());

      const selectedType = Array.from(this.financeType).find((item) => item.checked);
      type = selectedType ? selectedType.value : null;

      const props = { id, date, type, title, price }

      if(this.editFinanceId === null) {
        this.regFinance(props);
        this.updateFinanceState();
      } else {
        this.updateFinance(this.editFinanceId);
      }
    })

    if(this.financeArr.length !== 0 && this.currentDate.split("/")[1] === "1") {
      const newMonthFinanceArr = this.financeArr.some((item) => item.date.split("/")[0] !== this.currentDate.split("/")[0]);

      if(newMonthFinanceArr) {
        this.manageFinanceList();
        this.updateFinanceState();
      }
    } else {
      this.updateFinanceState();
    }
  }

  regFinance(props) {
    // validation: financeName이 비어있거나 10글자 이상일 경우
    if (props.title === "" || props.title.length > 10) {
      alert("이름은 1자 이상 10자 이하로 입력해주세요.");
      return; // 입력값이 유효하지 않으면 함수 종료
    }

    // validation: financePrice가 비어있거나 숫자가 아닐 경우
    if (props.price === "" || isNaN(props.price)) {
      alert("가격은 숫자로 입력해주세요.");
      return; // 입력값이 유효하지 않으면 함수 종료
    }

    // validation: 가격은 음수나 0을 허용하지 않도록
    if (parseInt(props.price) <= 0) {
      alert("가격은 0보다 큰 숫자여야 합니다.");
      return;
    }

    const financeItemData = {
      id: props.id,
      date: props.date,
      type: props.type,
      title: props.title,
      price: props.price
    }

    this.financeArr.push(financeItemData);

    localStorage.setItem("financeArr", JSON.stringify(this.financeArr))
    localStorage.setItem("financeId", JSON.stringify(++this.financeId))

    this.resetInput();

    this.createFinanceItem(financeItemData);
  }

  createFinanceItem(financeItemData) {
    const financeItem = document.createElement("li");
    const financeItemContent = `
      <time class="date">${financeItemData.date}</time>
      <p class="name">${financeItemData.title}</p>
      <p class="price">
        ${financeItemData.type === "earn" ? `+${parseInt(financeItemData.price).toLocaleString()}` : `-${parseInt(financeItemData.price).toLocaleString()}`}
      </p>
      <div class="btnWrap">
        <button class="editBtn">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="deleteBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    financeItem.id = financeItemData.id;
    financeItem.innerHTML = financeItemContent;

    this.financeList.appendChild(financeItem);
    this.manageFinanceItem(financeItem);
  }

  displayFinanceList() {
    this.financeList.innerHTML = "";

    this.financeArr.forEach((item) => {
      this.createFinanceItem(item);
    })
  }

  manageFinanceItem(financeItem) {
    const editBtn = financeItem.querySelector(".btnWrap .editBtn");
    const delBtn = financeItem.querySelector(".btnWrap .deleteBtn");

    editBtn.addEventListener("click", () => this.editFinance(financeItem.id))
    delBtn.addEventListener("click", () => this.deleteFinance(financeItem.id))
  }

  editFinance(id) {
    const editItem = this.financeArr.find(item => item.id === parseInt(id));
    
    if(editItem) {
      this.financeType.value = editItem.type;
      this.financeTitle.value = editItem.title;
      this.financePrice.value = editItem.price;
      
      this.editFinanceId = editItem.id
    }
  }

  updateFinance(id) {
    const updateItem = this.financeArr.find(item => item.id === parseInt(id));

    if(updateItem) {
      let type = null;
      const selectedType = Array.from(this.financeType).find((item) => item.checked);
      type = selectedType ? selectedType.value : null;

      updateItem.type = type;
      updateItem.title = this.financeTitle.value;
      updateItem.price = parseInt(this.financePrice.value);

      localStorage.setItem("financeArr", JSON.stringify(this.financeArr));

      this.displayFinanceList();

      this.editFinanceId = null

      this.updateFinanceState();

      this.resetInput();
    }
  }

  deleteFinance(id) {
    this.financeArr = this.financeArr.filter(item => item.id !== parseInt(id))

    localStorage.setItem("financeArr", JSON.stringify(this.financeArr));

    const li = document.getElementById(id);
    if(li) {
      li.remove();
    }

    this.displayFinanceList();

    this.updateFinanceState();
  }
  
  calculateFinance() {
    const earnPrice = [];
    const paidPrice = [];

    this.financeArr.forEach((item) => {
      if(item.type === "earn") {
        earnPrice.push(item.price)
      } else {
        paidPrice.push(item.price)
      }
    })

    const totalEarn = earnPrice.reduce((acc, price) => acc +  price, 0);
    const totalPaid = paidPrice.reduce((acc, price) => acc +  price, 0);
    const totalAmount = totalEarn - totalPaid;

    return { totalEarn, totalPaid, totalAmount }
  }

  updateFinanceState() {
    const newDate = new Date();
    const stateMonth = newDate.getMonth(); // 여기수정
    let updateState = this.financeState[stateMonth];

    if(updateState) {
      updateState = {
        "totalEarn": 0,
        "totalPaid": 0,
        "totalAmount": 0
      };

      // `calculateFinance` 실행하여 계산된 값 가져오기
      const { totalEarn, totalPaid, totalAmount } = this.calculateFinance();

      // 월별 재정 상태 업데이트
      this.financeState[stateMonth] = {
        totalEarn,
        totalPaid,
        totalAmount
      };

      // 로컬스토리지에 업데이트된 상태 저장
      localStorage.setItem("financeState", JSON.stringify(this.financeState));
    }

    this.displayFinanceState();
  }

  displayFinanceState() {
    const newDate = new Date();
    const stateMonth = newDate.getMonth(); // 여기수정
    let financeState = this.financeState[stateMonth];

    this.totalFinance.textContent = `${(financeState.totalAmount).toLocaleString()}`;
    this.earnFinance.textContent = `${(financeState.totalEarn).toLocaleString()}`;
    this.paidFinance.textContent = `${(financeState.totalPaid).toLocaleString()}`;

    parseInt(this.totalFinance.textContent) < 0 ? this.totalFinance.classList.add("minus") : this.totalFinance.classList.remove("minus")
  }

  manageFinanceList() {
    const newMonth = new Date().getMonth() + 1; // 여기수정
    this.financeArr = this.financeArr.filter(item => parseInt(item.date.split("/")[0] === newMonth))

    localStorage.setItem("financeArr", JSON.stringify(this.financeArr));
  }

  // 인풋 초기화 함수
  resetInput() {
    this.financeTitle.value = "";
    this.financePrice.value = "";
  }


}

const finance = new Finance();
finance.financeEvent();
