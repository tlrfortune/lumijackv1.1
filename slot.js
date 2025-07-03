
const symbols = ["cherry", "lemon", "grape", "bell", "seven", "diamond", "bonus"];
let balance = 10.00, totalWins = 0, totalLosses = 0, betAmount = 1.00;

function updateBalance() {
  document.getElementById("score").textContent = balance.toFixed(2);
}
function updateStats() {
  document.getElementById("wins").textContent = totalWins;
  document.getElementById("losses").textContent = totalLosses;
}
function spinReels() {
  if (balance < betAmount) return alert("Not enough balance!");
  balance -= betAmount;
  updateBalance();

  const rows = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => symbols[Math.floor(Math.random()*symbols.length)]));
  const ids = ["r1","r2","r3"];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
    document.getElementById(`${ids[c]}l${r+1}`).src = `assets/images/${rows[r][c]}.png`;

  if (rows.flat().every(s => s === "bonus")) {
    balance += 1000;
    document.getElementById("jackpot-popup").textContent = "💰 £1,000 BONUS JACKPOT! 💰";
    document.getElementById("jackpot-popup").style.display = "block";
    setTimeout(() => {
      document.getElementById("jackpot-popup").style.display = "none";
      document.getElementById("jackpot-popup").textContent = "🎉 JACKPOT! 🎉";
    }, 3000);
    updateBalance();
    return;
  }

  if (rows[1][0] === rows[1][1] && rows[1][1] === rows[1][2]) {
    balance += betAmount * 5;
    totalWins++;
  } else totalLosses++;

  updateStats(); updateBalance();
}
function deposit() {
  const amt = parseFloat(prompt("Deposit amount (£):"));
  if (!isNaN(amt) && amt > 0) { balance += amt; updateBalance(); }
}
function resetGame() {
  if (confirm("Reset game?")) {
    balance = 10; totalWins = 0; totalLosses = 0;
    updateBalance(); updateStats();
  }
}
function setBetFromDropdown() {
  const amount = parseFloat(document.getElementById("bet-select").value);
  if (!isNaN(amount) && amount > 0) {
    betAmount = amount;
    document.getElementById("spin-btn").textContent = `SPIN (£${betAmount.toFixed(2)})`;
  }
}
document.getElementById("spin-btn").addEventListener("click", spinReels);
document.getElementById("deposit-btn").addEventListener("click", deposit);
document.getElementById("reset-btn").addEventListener("click", resetGame);
document.getElementById("bet-select").addEventListener("change", setBetFromDropdown);
