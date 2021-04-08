'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 35000 ,
    income = "фриланс",
    addExpenses = "Коммуналка, Еда, Интернет",
    deposit = false,
    mission = 150000,
    period = 12;

const start = function() {
    do{
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

function showTypeOf(data){
    console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const expenses = [];

const getExpensesMonth = function(){
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
                
        let exp = prompt('Во сколько это обойдется?');
        
        while (!isNumber(exp)){
            exp = prompt('Во сколько это обойдется?');
        }
        sum += Number(exp);
    }
    console.log(expenses);
    return sum;
};

const expensesMonth = getExpensesMonth();


const re = /\s*,\s*/;
addExpenses = addExpenses.toLowerCase().split(re);


function getAccumulatedMonth(a, b){
    return a - b;
}
const  accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

function getTargetMonth(a, b){
    if(Math.ceil(a / b) < 0){
        console.log('Цель не будет достигнута');   
    } else {
        return Math.ceil(a / b);
    }
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





console.log("Сумма всех обязательных расходов за месяц ",expensesMonth );
console.log(addExpenses);
console.log('Бюджет на день: ', budgetDay);
console.log(statusIncome);
