
const symbols = ["cherry", "lemon", "grape", "bell", "seven", "diamond", "bonus"];
const columns = 5;
const rows = 3;
let reels = [];
let balance = 10.00;
const spinCost = 0.50;

function updateWallet() {
  document.getElementById("wallet").textContent = `Balance: £${balance.toFixed(2)}`;
}

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateReels() {
  reels = [];
  for (let c = 0; c < columns; c++) {
    let col = [];
    for (let r = 0; r < rows; r++) {
      col.push(getRandomSymbol());
    }
    reels.push(col);
  }
}

function displayReels() {
  const container = document.querySelector('.slot-machine');
  container.innerHTML = '';
  reels.forEach(col => {
    const colDiv = document.createElement('div');
    colDiv.className = 'reel-column';
    col.forEach(sym => {
      const symDiv = document.createElement('div');
      symDiv.className = 'reel';
      const img = document.createElement('img');
      img.src = `assets/images/${sym}.png`;
      img.alt = sym;
      symDiv.appendChild(img);
      colDiv.appendChild(symDiv);
    });
    container.appendChild(colDiv);
  });
}

function countBonusSymbols() {
  let count = 0;
  reels.forEach(col => {
    col.forEach(sym => {
      if (sym === 'bonus') count++;
    });
  });
  return count;
}

function showPopup(type) {
  const popup = document.getElementById(type === 10 ? "popup10" : "popup15");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 4000);
}

function spinReels() {
  if (balance < spinCost) {
    alert("Insufficient balance.");
    return;
  }

  balance -= spinCost;
  updateWallet();

  generateReels();
  displayReels();

  const bonusCount = countBonusSymbols();
  if (bonusCount === 3) showPopup(10);
  if (bonusCount >= 4) showPopup(15);
}

document.addEventListener("DOMContentLoaded", () => {
  updateWallet();
  const spinBtn = document.getElementById("spinButton");
  if (spinBtn) {
    spinBtn.addEventListener("click", spinReels);
  }
});
