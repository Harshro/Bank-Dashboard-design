'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-10-06T21:31:17.178Z',
    '2022-10-02T08:31:17.178Z',
    '2022-09-22T15:31:17.178Z',
    '2022-09-14T21:31:45.178Z',
    '2022-09-08T18:37:03.178Z',
    '2022-08-24T16:51:17.178Z',
    '2022-08-18T13:31:17.178Z',
    '2022-08-07T10:48:10.178Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-10-06T21:31:17.178Z',
    '2022-10-02T08:31:17.178Z',
    '2022-09-22T15:31:17.178Z',
    '2022-09-14T21:31:45.178Z',
    '2022-09-08T18:37:03.178Z',
    '2022-08-24T16:51:17.178Z',
    '2022-08-18T13:31:17.178Z',
    '2022-08-07T10:48:10.178Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelLoans = document.querySelector('.sucessmessage');
const labelLoanr = document.querySelector('.rejectmessage');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelUser = document.querySelector('.detail');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// labelUser.textContent= ' ';
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// back to normal after click
let sorted = false;

// adding event listener for sort button
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// displaying all movements
const displayMovements = function (acc, sort = false) {
  // emptying all container and then adding
  containerMovements.innerHTML = '';

  // adding sort function
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // looping
  movs.forEach(function (move, i) {
    // ternary operator to  see from Array whether its deposit or withdrawl
    const type = move > 0 ? 'deposit' : 'withdrawl';
    //  converting string into js objects below function (showing dates next to transcations)
    // creating and implementing dates
    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/ ${month}/ ${year}, ${hour}: ${min}`;

    // writting html elements in template literals (``)
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
    ${i + 1} ${type}
    </div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${move.toFixed(2)}</div>
    </div>
  `;

    //  adding the above html element to browser in the container
    // we are using insertAdjacentHTML (method) in json format
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// showing balance IN
const displayInBalance = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  // labelsumin is html div
  labelSumIn.textContent = `${income.toFixed(2)} € `;

  // showing balance out
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelsumout is html elemnt and math.abs is to remove negative sign
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} € `;

  //  showing intrest
  const interest = account.movements
    .filter(mov => mov > 0)
    // calculating interest
    .map(deposit => (deposit * account.interestRate) / 100)
    // bank decided to pay intrest above 1 euro
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€ `;
};

// creating short user names (computing)
const createUsernames = function (accs) {
  // for each method we are using to loop complete array
  accs.forEach(function (acc) {
    acc.username = acc.owner //owner is property used in acoounts
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

// print balance on top
const calcPrintBalance = function (accn) {
  // storing balance value
  accn.balance = accn.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${accn.balance.toFixed(2)} € `;
};

// Filter methods data transformation
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);
// for of loop
const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

// withdrawls written in arrow function FILTER method data transformation
const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);
// Reduce method data transformation (below code is to show total balance)

// acc is accumulator prebuilt inner js like other js methods

// (step 1)
// const balance = movements.reduce(function (acc, cur, i ,arr) {
//   console.log(`iteration ${i} = ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

// (step  2 with arrow method)
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// Chaining Methods
// converting euro transfers to usd
const eurToUsd = 1.1;

// chanining method
const totalDeposit = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDeposit);

//  if the bug appear in above section then how to see results step by step
// from = .map((mov, i, arr) => {
// console.log(arr);
// return mov *eurToUsd
// })

const updateUI = function (acc) {
  // task2 : Display mevements
  displayMovements(acc);
  // task3 : Display Balance
  calcPrintBalance(acc);
  // task4 : Display summuart
  displayInBalance(acc);
};
// log in event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting its an inbuilt function
  e.preventDefault();

  //  login actual user from above with (find) method
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  //  checking pin if its correct or not
  // using optional chaining to see whether account exist or not (?)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // if login details are correct displaying ui
    //  task1 : Display ui and message
    //  welcome message
    labelWelcome.textContent = `Hi, Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    // showing ui now
    containerApp.style.opacity = 100;
    //  showing dater after successful login
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();
    labelDate.textContent = `${day}/ ${month}/ ${year}, ${hour}: ${min}`;

    // task2 : Display mevements
    displayMovements(currentAccount);
    // task3 : Display Balance
    calcPrintBalance(currentAccount);
    // task4 : Display summuart
    displayInBalance(currentAccount);
    //  clearing input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    labelUser.blur();
    updateUI(currentAccount);
  }
});

// Transfering Amount
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  // amount transfer
  const amount = Number(inputTransferAmount.value);
  // recieve acc
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  // checking transfer amount and showing transactions as per
  //  in first we are seeing we have sufficicent balance in second we are looking reciever in fourth we are blockig to send money ourself

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // adding negative value to current acc when it transfer
    currentAccount.movements.push(-amount);
    // adding + amount to reciever
    receiverAcc.movements.push(amount);

    // updating ui
    updateUI(currentAccount);
  }
});

//  Closing account
// selecting button
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // checking whether the user wrote right username and pin or not
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // deleting accc
    accounts.splice(index, 1);

    // Hiding UI after deleting the acc
    containerApp.style.opacity = 0;
  }
  // making the input boxes empty
  inputCloseUsername.value = inputClosePin.value = '';
});

// Loan Amount Function with (SOME METHOD)
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //using math floor because to round of value
  const amount = Math.floor(inputLoanAmount.value);

  // Using some method here with if statement first function is for value more then zero second is for only if the 10 %
  // amount is deposited before in the acc or not.

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // adding amount in balance and transcations
    currentAccount.movements.push(amount);
    // updating in ui
    updateUI(currentAccount);
    labelLoans.textContent = `Hi, ${
      currentAccount.owner.split(' ')[0]
    } your Loan get's Approved`;
    labelLoanr.textContent = ' ';
  } else {
    labelLoans.textContent = ' ';
    labelLoanr.textContent = `Hi, ${
      currentAccount.owner.split(' ')[0]
    }  your Loan is Rejected!`;
  }
  //clearing the input values
  inputLoanAmount.value = '';
});

//  Fake login to see the ui rather then log in evertime

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
