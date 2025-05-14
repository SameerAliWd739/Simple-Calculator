    const display = document.getElementById('display');
    const historyPanel = document.getElementById('historyPanel');
    const historyList = document.getElementById('historyList');

    function toggleHistory() {
      historyPanel.classList.toggle('open');
    }

    function appendNumber(num) {
      if (display.innerText === '0' || display.innerText === 'Error') {
        display.innerText = num;
      } else {
        display.innerText += num;
      }
    }

    function appendOperator(op) {
      const lastChar = display.innerText.slice(-1);
      if ("+-*/".includes(lastChar)) {
        display.innerText = display.innerText.slice(0, -1) + op;
      } else {
        display.innerText += op;
      }
    }

    function clearDisplay() {
      display.innerText = '0';
    }

    function deleteChar() {
      if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
      } else {
        display.innerText = '0';
      }
    }

    function calculate() {
      try {
        let expression = display.innerText.replace(/÷/g, '/').replace(/×/g, '*');
        let result = eval(expression);
        addToHistory(expression + " = " + result);
        display.innerText = result;
      } catch {
        display.innerText = 'Error';
      }
    }

    function percent() {
      try {
        let value = eval(display.innerText) / 100;
        addToHistory(display.innerText + " % = " + value);
        display.innerText = value;
      } catch {
        display.innerText = 'Error';
      }
    }

    function squareRoot() {
      try {
        let value = Math.sqrt(eval(display.innerText));
        addToHistory("√(" + display.innerText + ") = " + value);
        display.innerText = value;
      } catch {
        display.innerText = 'Error';
      }
    }

    function square() {
      try {
        let value = Math.pow(eval(display.innerText), 2);
        addToHistory("(" + display.innerText + ")² = " + value);
        display.innerText = value;
      } catch {
        display.innerText = 'Error';
      }
    }

    function inverse() {
      try {
        let value = 1 / eval(display.innerText);
        addToHistory("1/(" + display.innerText + ") = " + value);
        display.innerText = value;
      } catch {
        display.innerText = 'Error';
      }
    }

    function addToHistory(entry) {
      const item = document.createElement("div");
      item.classList.add("history-item");
      item.innerText = entry;
      item.onclick = () => {
        let equation = entry.split("=")[0].trim();
        display.innerText = equation;
        toggleHistory(); // close drawer on click
      };
      historyList.prepend(item);
    }

    // Keyboard support
    document.addEventListener('keydown', function (e) {
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        appendOperator(e.key);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Backspace') {
        deleteChar();
      } else if (e.key === 'Escape') {
        clearDisplay();
      }
    });
