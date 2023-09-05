const initApp = () => {
  const currentValueEl = document.querySelector(".current-value");
  const previousValueEl = document.querySelector(".previous-value");
  let itemArray = [];
  const equationArray = [];
  let newNumberFlag = false;

  const numberBtn = document.querySelectorAll(".number");
  numberBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const newNumber = event.target.textContent;
      if (newNumberFlag) {
        currentValueEl.value = newNumber;
        newNumberFlag = false;
      } else {
        currentValueEl.value =
          currentValueEl.value == 0
            ? newNumber
            : `${currentValueEl.value}${newNumber}`;
      }
    });

    const operatorBtn = document.querySelectorAll(".operator");
    operatorBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (newNumberFlag) {
          previousValueEl.value = "";
          itemArray = [];
        }

        const newOperator = e.target.textContent;
        const currentValue = currentValueEl.value;

        if (!itemArray.length && currentValue == 0) return;

        if (!itemArray.length) {
          itemArray.push(currentValue, newOperator);
          previousValueEl.textContent = `
                    ${currentValue} 
                    ${newOperator}`;
          return (newNumberFlag = true);
        }

        if (itemArray.length) {
          itemArray.push(currentValue);
          const equationObj = {
            num1: parseFloat(itemArray[0]),
            num2: parseFloat(currentValue),
            op: itemArray[1],
          };

          equationArray.push(equationObj);
          const equationString = 
                `${equationObj["num1"]}
                 ${equationObj["op"]}
                 ${equationObj["num2"]}`;

          const newValue = calculate(equationString, currentValueEl);
          previousValueEl.textContent = `${newValue} ${newOperator}`;

          itemArray = [newValue, newOperator];
          newNumberFlag = true;
          console.log(equationArray);
        }
      });
    });

    const equalBtn = document.querySelector('.equals');
    equalBtn.addEventListener('click', () => {
        const currentVal = currentValueEl.value;
        let equationObj;

        if(!itemArray.length && equationArray.length) {
            const lastEquation = equationArray[equationArray.length - 1];
            equationObj = {
                num1: parseFloat(currentVal),
                num2: lastEquation.num2,
                op: lastEquation.op,
            }
        } else if(!itemArray.length) {
            return currentVal;
        } else {
            itemArray.push(currentVal);
            equationObj = {
                num1: parseFloat(itemArray[0]),
                num2: parseFloat(currentVal),
                op: itemArray[1],
            }
        }

        equationArray.push(equationObj);

        const equationString = 
                `${equationObj['num1']} ${equationObj['op']} ${equationObj['num2']}`;

        calculate(equationString, currentValueEl);

        previousValueEl.textContent = `${equationString} =`

        newNumberFlag = true;
        itemArray = [];
        console.log(equationArray);
    })

    const clearBtn = document.querySelectorAll(".clear, .clear-entry");
    clearBtn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        currentValueEl.value = 0;
        if (event.target.classList.contains("clear")) {
          previousValueEl.textContent = "";
          itemArray = [];
        }
      });
    });

    const deleteBtn = document.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
      currentValueEl.value = currentValueEl.value.slice(0, -1);
    });

    const signChangeBtn = document.querySelector(".sign-change");
    signChangeBtn.addEventListener("click", () => {
      currentValueEl.value = parseFloat(currentValueEl.value) * -1;
    });
  });
};

document.addEventListener("DOMContentLoaded", initApp);

const calculate = (equation, currentValueEl) => {
  const regex = /(^[*/=])|(\s)/g;
  equation.replace(regex, "");

  const divByZero = /(\/0)/.test(equation);
  if (divByZero) return (currentValueEl.value = 0);

  return currentValueEl.value = eval(equation);
};
