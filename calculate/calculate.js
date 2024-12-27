class Calculate {
  constructor() {
    const article = document.querySelector("article");
    this.recordResult = article.querySelector(".prevResult ul");
    this.result = article.querySelector(".result strong");
    this.formula = article.querySelector(".result p");
    this.btnList = article.querySelectorAll(".btnWrap ul li button");
  }

  handleBtn() {
    this.btnList.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const value = e.target.textContent;
        const resultValue = this.result.textContent;

        if (resultValue === "0" && ["+", "−", "×", "÷", "x²"].includes(value)) {
          this.clear();
          return;
        }

        if(resultValue.length > 19) {
          this.result.textContent = this.result.textContent.slice(0, -1)
        }

        if(value === "C") {
          this.clear();
          return;
        }

        if(resultValue === "0" && value !== ".") {
          this.result.textContent = value;
        } else if(value === ".") {
          const lastNumber = this.result.textContent.split(/[+\−×÷]/).pop();
          if (!lastNumber.includes(".")) {
            this.result.textContent += value;
          }
        } else if(value === "x²") {
          this.result.textContent = resultValue + "^2"
        } else {
          this.result.textContent = resultValue + value
        }

        if (value === "=") {
          if(!/[+\−×÷^√]/.test(resultValue)) {
            window.alert("연산자를 입력해주세요.");
            this.result.textContent = this.result.textContent.slice(0, -1);
            return;
          }

          if(resultValue === "0" || resultValue === "") {
            window.alert("값을 입력해주세요.");
            this.clear();
          } else {
            this.operate();
            this.record();
          }
          return;
        }
      });
    });
  }

  operate() {
    this.result.textContent = this.result.textContent.slice(0, -1);

    let operators = this.result.textContent.match(/[+\−×÷x^√]/g);
    let numbers = this.result.textContent.split(/[+\−×÷=^√]/g).map(Number); 

    while (operators.includes("^") || operators.includes("√")) {
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "^") {
          numbers[i] = numbers[i] ** 2;
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          break;
        } else if (operators[i] === "√") {
          numbers[i] = Math.sqrt(numbers[i + 1]) * numbers[i];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          break;
        }
      }
    }
  
    while (operators.includes("×") || operators.includes("÷")) {
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "×") {
          numbers[i] = numbers[i] * numbers[i + 1];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          break;
        } else if (operators[i] === "÷") {
          numbers[i] = numbers[i] / numbers[i + 1];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1); 
          break;
        }
      }
    }

    while (operators.includes("+") || operators.includes("−")) {
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
          numbers[i] = numbers[i] + numbers[i + 1];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          break;
        } else if (operators[i] === "−") {
          numbers[i] = numbers[i] - numbers[i + 1];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          break;
        }
      }
    };

    this.formula.textContent = this.result.textContent;
    let resultNum = numbers[0] + "";
    this.result.textContent = resultNum;
  }

  clear() {
    this.result.textContent = 0;
    this.formula.textContent = "";
    this.recordResult.textContent = "";
  }

  record() {
    const formula = this.formula.textContent;
    const answer = this.result.textContent;


    const formulaLi = document.createElement("li");
    const answerLi = document.createElement("li");

    formulaLi.innerText = formula;
    answerLi.innerText = "=" + answer;

    this.recordResult.appendChild(formulaLi);
    this.recordResult.appendChild(answerLi);
  }
}

const calculate = new Calculate();
calculate.handleBtn();