'use strict';

let money,
    income,
    addExpenses,
    deposit,
    mission,
    period;

    money = 35000;
    income = "фриланс";
    addExpenses = "Коммуналка, Еда, Интернет";
    deposit = false;
    mission = 150000;
    period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');


let re = /\s*,\s*/;
addExpenses = addExpenses.toLowerCase().split(re);
console.log(addExpenses);

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

period = Math.ceil(mission / budgetMonth);
console.log("Цель будет достигнута за ", period, " месяцев(-а)");

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}

let getExpensesMonth = function getExpensesMonth(a, b){
    let sum = a + b;
    return sum;
}

console.log(getExpensesMonth(amount1, amount2));

let getAccumulatedMonth = function getAccumulatedMonth(a, b){
    let diff = a - b;
    return diff;
}

console.log(getAccumulatedMonth(money, getExpensesMonth));