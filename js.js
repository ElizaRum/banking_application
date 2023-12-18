"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2023-11-31T14:11:59.604Z",
    "2023-12-04T17:01:17.194Z",
    "2023-12-04T23:36:17.929Z",
    "2023-12-05T10:51:36.790Z",
  ],
  currency: "RUB",
  locale: "pt-PT",
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2023-12-03T14:43:26.374Z",
    "2023-12-04T18:49:59.371Z",
    "2023-12-05T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "es-PE",
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
  currency: "USD",
  locale: "ru-RU",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Работа с датами и временем
function formatMovementDate(date) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round((date1 - date2) / (1000 * 60 * 60 * 24));
  };
  // Переменная "Сколько прошло дней?"
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed >= 2 && daysPassed <= 4) return `Прошло ${daysPassed} дня`;
  if (daysPassed <= 7) return `Прошло ${daysPassed} дней`;

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  const hours = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// ВЫВОД НА СТРОНИЦЫ ВСЕХ ЗАЧИСЛЕНИЙ И СНЯТИЙ
// Обычно создается именно функция, т.к. для работы с какими-то переменными лучше создавать локальные области (переменнные изолированы от общего кода)
function displayMovements(acc, sort = false) {
  // добавили параметр sort
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  // добавили для сортировки снятий/зачислений
  movs.forEach(function (value, i) {
    // где i - индекс всех отсортированных элементов
    const type = value > 0 ? "deposit" : "withdrawal";
    const typeName = value > 0 ? "Зачисление" : "Снятие";
    // i-индекс (1снятие, 1 зачисление и т.д.)
    // переменная для принятия html-кода элемента табло снятия-зачисления

    // Добавление текущих даты и времени на страницу
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const html = `
  <div class="movements__row">
  <div class="movements__type movements__type--${type}">
	 ${i + 1} ${typeName}
  </div>
  <div class="movements__date">${displayDate}</div>
  <div class="movements__value">${value}₽</div>
</div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
// Вывод на строаницу всех зачислений и снятий
// Добавление нового элемента наших объектов-пользователь (логин)
// функция с параметром массива наших аккаунтов:
function createlogIn(accs) {
  //применяем на массиве метод fE для работы с каждым объектом по отдельности
  accs.forEach(function (acc) {
    // создаем новое св-во logIn для каждого объекта на основе данных из св-ва owner:
    acc.logIn = acc.owner
      // применяем метод "нижнего регистра":
      .toLowerCase()
      // создаем из полученных данных массив:
      .split(" ")
      // применяем на массиве метод map, который изменяет массив и возвращает уже новый измененный методом перебора каждого массива
      .map(function (val) {
        // результат этого перебора - массив из двух первых букв, уже измененных методом toLowerCase()
        return val[0];
      })
      // складываем оба этих массива в строку методом join без разделителя()
      .join("");
  });
}
// запускаем функцию, передавая общий массив объектов accounts:
createlogIn(accounts);
/* console.log(accounts); */

// Подсчет и вывод на страницу текущего общего баланса
function calcPrintBalance(acc) {
  acc.balance = acc.movements.reduce(function (acc, val) {
    return acc + val;
  });
  /*   acc.balance = balance; */ // так тоже можно

  labelBalance.textContent = `${acc.balance} RUB`;
}

/* Актулизация строчек "Уход", "Приход", исходя из наших массивов данных*/

function calcDisplSum(movements) {
  // Обычная:
  // const incomes = movements.filter(function (mov) {
  // Стрелочная:
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} ₽`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} ₽`;

  labelSumInterest.textContent = `${incomes + out}₽`;
}

//Все функции вызова и обновления информации:
function updateUi(acc) {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplSum(acc.movements);
}

// Время - timeout & interval

function startLogOut() {
  let time = 600;

  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0); // результатом будет остатоток (то, что не поделилось)
    labelTimer.textContent = `${min}:${seconds}`;

    if (time == 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
    }
    time--; // из переменной timeвычитаем какдлый раз по единице
  }

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

/* Метод find()
const acc = accounts.find(function (acc) {
  return acc.owner === "Anna Filimonova";
});
console.log(acc); */

// Кнопка входа в аккаунт

let currentAccount; // для присваивания значений того аккаунта, что будет введен пользователем
let timer;
btnLogin.addEventListener("click", function (e) {
  // e - просто объект-события в "addEventListener"
  e.preventDefault(); // Отмена стандартных действия браузера
  console.log("logIn");
  currentAccount = accounts.find(function (acc) {
    return acc.logIn === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;

    // Установка текущей даты
    // вариант первый (длинный)
    /*    
	 const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, 0); // padStart() позволяет указать первым аргументом то, сколько символов в стороке должно быть, а вторым - какой конкретно символ  оставить, если символов мельше. Но чтобы его использовать, нужно завернуть выражение в конструкцию, чтобы сначала высчиталась строка, а уже на ней применять вышеуказанный метод
    const date = `${now.getDate()}`.padStart(2, 0);
    const hours = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0); 
	labelDate.textContent = `${date}/${month}/${year} ${hours}:${minutes}`;
	  */

    // Вариант второй (предпочтительный, локализованный)

    const local = navigator.language;
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      seconds: "numeric",
      timeZoneName: "long",
      hour12: false,
    };
    labelDate.textContent = Intl.DateTimeFormat(local, options).format(
      new Date()
    );
    inputLoginPin.value = inputLoginUsername.value = ""; // убираем данные, когда уже зашли в личный кабинет
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOut();
    updateUi(currentAccount);
  }
});

// Кнопка перевода средств
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const reciveAcc = accounts.find(function (acc) {
    return acc.logIn === inputTransferTo.value;
  }); // перевод кому
  const amount = Number(inputTransferAmount.value); // сумма перевода
  console.log(amount, reciveAcc);
  // Условия отправки: нельзя отправить минусовую ссумы, а также больше, чем есть на текущем счете
  if (
    reciveAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciveAcc.logIn !== currentAccount.logIn
  ) {
    console.log("Платеж прошел");
  }
  reciveAcc.movementsDates.push(new Date().toISOString());
  currentAccount.movements.push(-amount);
  reciveAcc.movements.push(amount);

  currentAccount.movementsDates.push(new Date().toISOString()); // дата при переводе  средств
  clearInterval(timer); // одновление таймера при действиях
  timer = startLogOut();
  updateUi(currentAccount);
  inputTransferTo.value = inputTransferAmount.value = ""; // убираем данные, когда уже зашли в личный кабинет
});

// Закрытие (удаление) аккаунта текущего
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.logIn &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.logIn === currentAccount.logIn;
    });
    console.log(index);
    accounts.splice(index, 1); // index - начальная точка, второй параметр - сколько нужно удалить элементов
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

// Кнопка внесения денег на текущий счет
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString()); // дата при внесение новых средств
    clearInterval(timer); // одновление таймера при действиях
    timer = startLogOut();
    updateUi(currentAccount);
  }
  inputLoanAmount.value = "";
});

// Складывание всех денег на всех аккаунтах через метод массивов flat()

/* const accMov = accounts.map(function (acc) {
  return acc.movements;
});
console.log(accMov);
const allMov = accMov.flat();
console.log(allMov);
const allBalance = allMov.reduce(function (acc, mov) {
  return acc + mov;
}, 0);
console.log(allBalance); */

// то же, но проще:

/* const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); */

//Метод sort() для сортировок массивов

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/* labelBalance.addEventListener("click", function () {
  console.log(document.querySelectorAll(".movements__value")); // это псевдоколекция
  Array.from(document.querySelectorAll(".movements__value"), function (val, i) {
    return (val.innerText = val.textContent.replace("", "RUB"));
  }); //превращаем псевдомассив в массив
}); */
