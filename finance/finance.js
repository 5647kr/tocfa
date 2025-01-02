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

    this.regFinance.addEventListener("click", (e) => {
      e.preventDefault();
      
      this.regFinance.value === "register" ? this.regFinanceEvent() : this.updateFinanceEvent(this.editFinanceId);
    })
  }
  
  regFinanceEvent() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const type = this.financeType.value;
    const name = this.financeName.value;
    const price = this.financePrice.value;

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
        ${item.type === "earn" ? `+${item.price}` : `-${item.price}`}
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

    console.log(editItem)
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
  
    // 화면에 출력
    this.earnFinance.textContent = `+${totalEarn}`;
    this.paidFinance.textContent = `-${totalPaid}`;
    this.totalFinance.textContent = `${totalFinance}`;
  }
}

const finance = new Finance();
finance.financeEvent();