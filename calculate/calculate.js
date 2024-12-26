class Calculate {
  constructor() {
    const article = document.querySelector("article");
    this.prevResult = article.querySelector(".prevResult ul");
    this.result = article.querySelector(".result strong");
    this.btnList = article.querySelectorAll(".btnWrap ul li button");
  }

  handleBtn() {
    this.btnList.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const value = e.target.textContent;
        const prevValue = this.result.textContent;

        this.result.textContent = prevValue === "0" ? value : prevValue + value;

        if (prevValue === "0" && ["+", "−", "×", "÷", "x²", "√"].includes(value)) {
          this.clear();
          return;
        }

        if(prevValue.length > 19) {
          this.result.textContent = this.result.textContent.slice(0, -1)
        }

        if(value === "C") {
          this.clear();
          return;
        }

        if(value === "x²") {
          this.result.textContent = prevValue + "^2"
        }

        if(value === ".") {
          this.result.textContent = prevValue + value;
        }

        if (value === "=") {
          if (prevValue === "0" || prevValue === "") {
            window.alert("값을 입력해주세요.");
            this.clear();
          } else {
            this.operate();
          }
          return;
        }
      });
    });
  }

  operate() {
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
          numbers[i] = Math.sqrt(numbers[i + 1]);
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
          numbers.splice(i + 1, 1); // 다음 숫자를 제거
          operators.splice(i, 1);   // 해당 연산자를 제거
          break;
        } else if (operators[i] === "÷") {
          numbers[i] = numbers[i] / numbers[i + 1];
          numbers.splice(i + 1, 1); // 다음 숫자를 제거
          operators.splice(i, 1);   // 해당 연산자를 제거
          break;
        }
      }
    }

    while (operators.includes("+") || operators.includes("−")) {
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
          numbers[i] = numbers[i] + numbers[i + 1];
          numbers.splice(i + 1, 1); // 다음 숫자를 제거
          operators.splice(i, 1);   // 해당 연산자를 제거
          break;
        } else if (operators[i] === "−") {
          numbers[i] = numbers[i] - numbers[i + 1];
          numbers.splice(i + 1, 1); // 다음 숫자를 제거
          operators.splice(i, 1);   // 해당 연산자를 제거
          break;
        }
      }
    };


    let resultNum = numbers[0] + "";
    this.result.innerText = resultNum;
    return resultNum
  }

  clear() {
    this.result.textContent = 0;
    this.prevResult.innerHTML = "";
  }
}

const calculate = new Calculate();
calculate.handleBtn();