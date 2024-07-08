const cashInput = document.getElementById('cash');
const changeText = document.getElementById('change-due');
const button = document.getElementById('purchase-btn');

const price = 19.5;
const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

const conversion = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  'ONE HUNDRED': 100,
};

const calculateTotalCash = (cid) => Number(cid.reduce((acc, cur) => acc + cur[1], 0).toFixed(2));

const moneyChecker = (changeDue, statusCheck) => {
  const results = {
    status: statusCheck,
    change: [],
  };

  for (let i = cid.length - 1; i >= 0; i--) {
    const denom = cid[i][0];
    const denomValue = conversion[denom];
    const denomTotal = cid[i][1];

    if (changeDue >= denomValue && denomTotal > 0) {
      const amountToReturn = Math.min(denomTotal, Math.floor(changeDue / denomValue) * denomValue);
      if (amountToReturn > 0) {
        changeDue = (changeDue - amountToReturn).toFixed(2);
        cid[i][1] -= amountToReturn;
        results.change.push(`${denom}: $${amountToReturn.toFixed(2)}`);
      }
    }
  }

  if (changeDue > 0) {
    results.status = 'INSUFFICIENT_FUNDS';
    results.change = [];
  }

  changeText.textContent = `Status: ${results.status} ${results.change.join(' ')}`;
};

button.addEventListener('click', () => {
  const cash = Number(cashInput.value);
  const changeDue = (cash - price).toFixed(2);
  const totalCash = calculateTotalCash(cid);

  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  if (cash === price) {
    changeText.textContent = 'No change due - customer paid with exact cash';
    return;
  }

  if (totalCash < changeDue) {
    changeText.textContent = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  if (totalCash === changeDue) {
    moneyChecker(changeDue, 'CLOSED');
  } else {
    moneyChecker(changeDue, 'OPEN');
  }
});
