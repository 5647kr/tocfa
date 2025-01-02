class Finance {
  constructor () {
    const finance = document.querySelector(".finance");
    this.totalFinance = finance.querySelector(".totalFinance h2");
    this.financeForm = finance.querySelector(".financeInput form");
    this.financeType = this.financeForm.querySelector(".financeType select");
    this.financeName = this.financeForm.querySelector(".financeInputWrap .financeName")
    this.financePrice = this.financeForm.querySelector(".financeInputWrap .financePrice")
    this.regFinance = this.financeForm.querySelector(".regBtn");

    this.earnFinance = finance.querySelector(".earnFinance strong");
    this.paidFinance = finance.querySelector(".paidFinance strong");

    this.financeList = finance.querySelector(".monthFinanceList ul")

    this.financeArr = JSON.parse(localStorage.getItem("financeArr")) || [];
    this.financeId = JSON.parse(localStorage.getItem("financeId")) || 0;
    this.editFinanceId = null;
  }

  financeEvent() {
    this.displayFinanceList();
    this.validateInput();

    this.regFinance.addEventListener("click", (e) => {
      e.preventDefault();
      
      this.regFinance.value === "register" ? this.regFinanceEvent() : this.updateFinanceEvent(this.editFinanceId);
    })
  }

  validateInput() {
    this.financeName.addEventListener("input", (e) => {
      if(this.financeName.value.length > 10) {
        this.financeName.value = this.financeName.value.slice(0, 10)
      }
    })

    this.financePrice.addEventListener("input", () => {
      this.financePrice.value = this.financePrice.value.replace(/[^0-9]/g, "")

      if(this.financePrice.value.length > 10) {
        this.financePrice.value = this.financePrice.value.slice(0, 10)
      }
    })
  }
  
  regFinanceEvent() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const type = this.financeType.value;
    const name = this.financeName.value.trim();
    const price = this.financePrice.value.trim();

    // validation: financeName이 비어있거나 10글자 이상일 경우
    if (name === "" || name.length > 10) {
      alert("이름은 1자 이상 10자 이하로 입력해주세요.");
      return; // 입력값이 유효하지 않으면 함수 종료
    }

    // validation: financePrice가 비어있거나 숫자가 아닐 경우
    if (price === "" || isNaN(price)) {
      alert("가격은 숫자로 입력해주세요.");
      return; // 입력값이 유효하지 않으면 함수 종료
    }

    // validation: 가격은 음수나 0을 허용하지 않도록
    if (parseFloat(price) <= 0) {
      alert("가격은 0보다 큰 숫자여야 합니다.");
      return;
    }

    const financeItem = {
      id: this.financeId,
      date: `${month}/${day}`,
      type: type,
      name: name,
      price: price
    }

    this.financeArr.push(financeItem);

    localStorage.setItem("financeArr", JSON.stringify(this.financeArr))
    localStorage.setItem("financeId", JSON.stringify(++this.financeId))

    this.displayFinanceList();
    this.resetInputForm();
  }

  createListItem(item) {
    const financeItem = document.createElement("li");
    const financeItemContent = `
      <time class="date">${item.date}</time>
      <p class="name">${item.name}</p>
      <p class="price">
        ${item.type === "earn" ? `+${parseInt(item.price).toLocaleString()}` : `-${parseInt(item.price).toLocaleString()}`}
      </p>
      <div>
        <button class="editBtn">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="deleteBtn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `

    financeItem.id = item.id;
    financeItem.innerHTML = financeItemContent;
    this.financeList.append(financeItem);

    this.manageFinanceItem(financeItem);
  }

  displayFinanceList() {
    this.financeList.innerHTML = "";  // 기존 리스트 초기화
    const today = new Date();
    const newMonth = today.getMonth() + 1;
  
    // 이번 달의 financeItem들만 필터링
    const thisMonthFinance = this.financeArr.filter((financeItem) => {
      const monthFinance = parseInt(financeItem.date.split("/")[0]);
      return monthFinance === newMonth;
    });
  
    // 필터링된 항목들을 리스트에 추가
    thisMonthFinance.forEach((financeItem) => {
      this.createListItem(financeItem);
    });
  
    // 이번 달 항목들만을 전달하여 재정 상태 계산
    this.calculateFinance(thisMonthFinance);
  }

  manageFinanceItem(financeItem) {
    const editBtn = financeItem.querySelector(".editBtn");
    const deleteBtn = financeItem.querySelector(".deleteBtn");

    editBtn.addEventListener("click", () => this.editFinanceItem(financeItem.id))
    deleteBtn.addEventListener("click", () => this.deleteFinanceItem(financeItem.id))
  }

  // financeItem 수정 준비 함수
  deleteFinanceItem(id) {
    this.financeArr = this.financeArr.filter(item => item.id !== parseInt(id))

    localStorage.setItem("financeArr", JSON.stringify(this.financeArr));

    const li = document.getElementById(id);
    if(li) {
      li.remove();
    }

    this.displayFinanceList();
  }

  // financeItem 수정 준비 함수
  editFinanceItem(id) {
    const editItem = this.financeArr.find(item => item.id === parseInt(id));

    if(editItem) {
      this.financeType.value = editItem.type;
      this.financeName.value = editItem.name;
      this.financePrice.value = editItem.price;

      this.regFinance.value = "edit"

      this.editFinanceId = editItem.id
    }
  }

  // 수정한 finance 로컬 스토리지에 저장하여 반영
  updateFinanceEvent(id) {
    const updateItem = this.financeArr.find(item => item.id === parseInt(id));

    if(updateItem) {
      updateItem.type = this.financeType.value;
      updateItem.name = this.financeName.value;
      updateItem.price = this.financePrice.value;

      localStorage.setItem("financeArr", JSON.stringify(this.financeArr));

      this.displayFinanceList();

      this.regFinance.value = "register";

      this.editFinanceId = null

      this.resetInputForm();
    }
  }

  // 인풋 초기화 함수
  resetInputForm() {
    this.financeName.value = "";
    this.financePrice.value = "";
  }

  // financeItem 계산하여 총값 표시하는 함수
  calculateFinance(filteredItems) {
    const earnPrices = [];
    const paidPrices = [];
  
    // 필터링된 항목들을 순회하며 수입과 지출 가격을 구분하여 배열에 담음
    filteredItems.forEach(item => {
      if (item.type === "earn") {
        earnPrices.push(parseFloat(item.price));  // 수입은 양수로
      } else if (item.type === "paid") {
        paidPrices.push(parseFloat(item.price));  // 지출은 음수로
      }
    });
  
    // 수입과 지출 각각의 합 계산
    const totalEarn = earnPrices.reduce((acc, price) => acc + price, 0);
    const totalPaid = paidPrices.reduce((acc, price) => acc + price, 0);
  
    // 총 재정 상태 계산
    const totalFinance = totalEarn - totalPaid;

    totalFinance >= 0 ? this.totalFinance.style.color = "var(--sub-color)" : this.totalFinance.style.color = "var(--error-color)"
  
    // 화면에 출력
    this.earnFinance.textContent = `+${parseInt(totalEarn).toLocaleString()}`;
    this.paidFinance.textContent = `-${parseInt(totalPaid).toLocaleString()}`;
    this.totalFinance.textContent = `${parseInt(totalFinance).toLocaleString()}`;
  }
}

const finance = new Finance();
finance.financeEvent();