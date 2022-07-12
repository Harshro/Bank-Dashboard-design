'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Alex Popa',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-07-10T21:31:17.178Z',
    '2022-07-09T07:42:02.383Z',
    '2022-07-07T09:15:04.904Z',
    '2022-06-28T10:17:24.185Z',
    '2022-06-21T14:11:59.604Z',
    '2022-06-18T17:01:17.194Z',
    '2022-06-15T23:36:17.929Z',
    '2022-07-09T10:51:36.790Z',
  ],
 currency: 'EUR',
  locale: 'en-US', //
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-07-10T21:31:17.178Z',
    '2022-07-03T07:42:02.383Z',
    '2022-06-28T09:15:04.904Z',
    '2022-06-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-26T17:01:17.194Z',
    '2022-04-28T23:36:17.929Z',
    '2022-04-01T10:51:36.790Z',
  ],
  currency: 'Lei',
  locale: 'ro-RO',
};

const account3 = {
  owner: 'Toma Radu',
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
 currency: 'USD',
  locale: 'en-US',
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
  locale: 'ro-RO',
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
  ['Lei', 'Romanian Lei'],
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

// function for creating and showing dates
  const formatMovementDate = function(date, locale) {
    //  function for creating dates into days
    const calcDaysPassed = (date1, date2) =>
     Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

     const daysPassed = calcDaysPassed (new Date(), date);
     console.log(daysPassed);

    //  Implementing logic
     if(daysPassed === 0) return 'Today';
     if (daysPassed === 1) return 'Yesterday';
     if (daysPassed <= 7) return `${daysPassed} days ago`;

     return new Intl.DateTimeFormat(locale).format(date);
  };
  
  // creating function to show currency value as per mention in account
  const formatCur = function(value, locale, currency) {
   return  new Intl.NumberFormat(locale, {
     style: 'currency',
     currency: currency,
   }).format(value);
  }

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
   const displayDate = formatMovementDate(date, acc.locale);
   
   // currency implementing 
   const formattedMov = formatCur(move, acc.locale,
    acc.currency);
     
    // writting html elements in template literals (``)
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
    ${i + 1} ${type}
    </div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
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
  labelSumIn.textContent = formatCur(income, account.locale, account.currency);

  // showing balance out
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelsumout is html elemnt and math.abs is to remove negative sign
  labelSumOut.textContent = formatCur(Math.abs(out), account.locale, account.currency);
  

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
  labelSumInterest.textContent = formatCur(interest, account.locale, account.currency);
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
  labelBalance.textContent = formatCur(accn.balance, accn.locale, accn.currency);
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
let currentAccount, timer;
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
    }👋`;
    // showing ui now
    containerApp.style.opacity = 100;
    //  showing dater after successful login
    // Expermenting date and time with API

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    // changing language as per Browser
    // const locale = navigator.language;
    // console.log(locale);
    //  here we will show format as per we created in our acoount 
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(
      now
    );

    // task2 : Display mevements
    displayMovements(currentAccount);
    // task3 : Display Balance
    calcPrintBalance(currentAccount);
    // task4 : Display summuart
    displayInBalance(currentAccount);
    //  clearing input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    // writing timer here is because to run the time same ammount which is been mentioned not from
    // any other user timer 
    if(timer) clearInterval(timer);
   timer =  startLogOutTimer();
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
    // doing transfers
    currentAccount.movements.push(-amount);
    // adding + amount to reciever
    receiverAcc.movements.push(amount);

    // adding  dates on transfers
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    // updating ui
    updateUI(currentAccount);

    // Reseting time to be same if user transfer amount
    clearInterval(timer);
    timer = startLogOutTimer(); 
  }
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

    // function with setTimeout
    setTimeout(function () {
      // Adding movement
      currentAccount.movements.push(amount);
      // adding  dates on while taking loan
      currentAccount.movementsDates.push(new Date());
      // updating in ui
      updateUI(currentAccount);
      labelLoans.textContent = `Hi, ${
        currentAccount.owner.split(' ')[0]
      }Your Loan Get's Approved 🎉!`;
      labelLoanr.textContent = ' ';
    }, 2500);
  } else {
    labelLoanr.textContent = `Hi, ${
      currentAccount.owner.split(' ')[0]
    }Your Loan Can't be Approved Sorry 😐!`;
    labelLoans.textContent = ' ';
  }

  // Reseting time to be same if user loan amount
  clearInterval(timer);
  timer = startLogOutTimer();

  //clearing the input values
  inputLoanAmount.value = '';
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


// Creating a time function which we will add in Login Function

const startLogOutTimer = function () {
  const tick = function () {
    // converting in string first
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(Math.floor(time % 60)).padStart(2, 0);
    // In each call, Print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 5 mins completed stop time and hide ui logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started! ';
      containerApp.style.opacity = 0;
    }
    // Decreasing the time
    time--;
  };
  // seting time to 5 mins
 let time = 120;
  // calling the timer every second
  tick();
 const timer = setInterval(tick, 1000);
 return timer;
 };



//  Fake login to see the ui rather then log in evertime
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;



