class Finance {
  constructor () {
    const finance = document.querySelector(".finance");
    this.totalFinance = finance.querySelector(".totalFinance h2");
    this.financeForm = finance.querySelector(".financeInput form");
    this.financeType = this.financeForm.querySelector(".financeType select");
    this.financeName = this.financeForm.querySelector(".financePrice .financeName")
    this.financePrice = this.financeForm.querySelector(".financePrice .financePrice")
    this.regFinance = this.financeForm.querySelector("button");

    this.earnFinance = finance.querySelector(".earnFinance strong");
    this.paidFinance = finance.querySelector(".paidFinance strong");

    this.financeList = finance.querySelector(".monthFinanceList ul")
  }

  regFinanceEvent() {
    this.regFinance.addEventListener("click", (e) => {
      e.preventDefault();
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const type = this.financeType.value;
      const name = this.financeName.value;
      const price = this.financePrice.value;

      const financeItem = {
        date: `${month}/${day}`,
        type: type,
        name: name,
        price, price
      }

      this.regStorageEvent(financeItem)
      this.resetInputForm();
    })
  }

  // 로컬스토리지 저장 함수
  regStorageEvent(financeItem) {
    const financeArr = JSON.parse(localStorage.getItem("financeList")) || [];
    const financeId = JSON.parse(localStorage.getItem("financeId")) || 0;

    financeArr.push(financeItem);

    localStorage.setItem("financeList", JSON.stringify(financeArr));
    localStorage.setItem("financeId", JSON.stringify(financeId));

    this.createListItem(financeItem)
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
        <button>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `

    financeItem.innerHTML = financeItemContent;
    this.financeList.append(financeItem);
  }

  DisplayListItem() {
    
  }

  // 인풋 초기화 함수
  resetInputForm() {
    this.financeName.value = "";
    this.financePrice.value = "";
  }
}

const finance = new Finance();
finance.regFinanceEvent();