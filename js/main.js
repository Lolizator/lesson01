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


function showTypeOf(data){
    console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let re = /\s*,\s*/;
addExpenses = addExpenses.toLowerCase().split(re);




function getExpensesMonth(a, b){
    return a + b;
}
const ExpensesMonth = getExpensesMonth(amount1, amount2);

function getAccumulatedMonth(a, b){
    return a - b;
}
const  accumulatedMonth = getAccumulatedMonth(money, ExpensesMonth);

function getTargetMonth(a, b){
    return Math.ceil(a / b);
}
const targetMonth = getTargetMonth(mission, accumulatedMonth);

function getBudgetDay(a){
    return Math.floor(a / 30);
}
const budgetDay = getBudgetDay(accumulatedMonth);

function getStatusIncome(budgetDay){
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
}
}
const statusIncome = getStatusIncome(budgetDay);




console.log("Сумма всех обязательных расходов за месяц ",ExpensesMonth );
console.log(addExpenses);
console.log("Цель будет достигнута за ", targetMonth, " месяцев(-а)");
console.log('Бюджет на день: ', budgetDay);
console.log(statusIncome);
