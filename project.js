// 1. Despot some money
// 2. determine nuber of lines to bet on
// 3. colect bet amount
// 4. spin weel
// 5. chek if won
// 6. give out winnings
// 7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYBOLS_COUNT = {
  A: 2,
  b: 4,
  c: 6,
  d: 8,
};

const SYBOLS_VALUES = {
  A: 5,
  b: 4,
  c: 3,
  d: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, please try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, please try again.");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseInt(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, please try again.");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [Symbol, count] of Object.entries(SYBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(Symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSybols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSybols.length)
      const selectedSymbol = reelSybols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSybols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i])
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, Symbol] of row.entries()) {
      rowString += Symbol
      if (i != row.length - 1) {
        rowString += " | "
      }
    }
    console.log(rowString)
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row6++) {
    const symbols = rows[row]
    let allSame = true;
    
    for (const Symbol of symbols) {
      if (Symbol != symbols[0]){
        allSame = false
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYBOLS_VALUES[symbols[0]]
    }
  }

  return winnings;
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, lines);
console.log("You won, $" + winnings.toString());
