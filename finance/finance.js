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
    this.financeList.innerHTML = ""

    this.financeArr.forEach((financeItem) => {
      this.createListItem(financeItem)
    })
  }

  manageFinanceItem(financeItem) {
    const editBtn = financeItem.querySelector(".editBtn");
    const deleteBtn = financeItem.querySelector(".deleteBtn");

    editBtn.addEventListener("click", () => this.editFinanceItem(financeItem.id))
    deleteBtn.addEventListener("click", () => this.deleteFinanceItem(financeItem.id))
  }

  deleteFinanceItem(id) {
    this.financeArr = this.financeArr.filter(item => item.id !== parseInt(id))

    localStorage.setItem("financeArr", JSON.stringify(this.financeArr));

    const li = document.getElementById(id);
    if(li) {
      li.remove();
    }
  }

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

  updateFinanceEvent(id) {
    const updateItem = this.financeArr.find(item => item.id === parseInt(id));

    console.log(updateItem)

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
}

const finance = new Finance();
finance.financeEvent();