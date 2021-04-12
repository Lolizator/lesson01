'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 35000,
    start = function() {
        do{
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
    };
    start();

    const appData = {
        budget: +money,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        mission: 100000,
        period: 12,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        targetMonth: 0,

        asking: function(){
            let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
            const re = /\s*,\s*/;
            appData.addExpenses = addExpenses.toLowerCase().split(re);
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for(let i = 0; i < 2; i++) {
                let expensesKey, expensesAmount;
                expensesKey = prompt('Введите обязательную статью расходов?');
            while (!isNumber(expensesAmount)){
                expensesAmount = prompt('Во сколько это обойдется?');
            }
            appData.expenses[expensesKey] = expensesAmount;
        }
        },

        getBudget: function() {
        let budgetMonth = Math.ceil(appData.budget - appData.expensesMonth),
            budgetDay = Math.floor(budgetMonth / 30);
        appData.budgetMonth = budgetMonth;
        appData.budgetDay = budgetDay;

        return appData.budgetMonth, appData.budgetDay;
        },

        getTargetMonth: function() {
            let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
            appData.targetMonth = targetMonth;
            return appData.targetMonth;
        },

        getExpensesMonth: function() {
            for(let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },

        getStatusIncome: function() {
            if (appData.budgetDay >= 1200) {
                return('У вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600) {
                return('У вас средний уровень дохода');
            } else if (appData.budgetDay > 0) {
                return('К сожалению у вас уровень дохода ниже среднего');
            } else {
                return('Что-то пошло не так');
            }
        },

        displayNumOfMonth: function() {
            if (appData.targetMonth < 0 || !isFinite(appData.targetMonth)) {
                console.log('Цель не будет достигнута');
            } else {
                console.log(`Цель будет достигнута через ${appData.targetMonth} месяцев(-а)`);
            }
        }
    };
    appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getTargetMonth();
    appData.getStatusIncome();

    console.log('Расходы за месяц', appData.expensesMonth);
    appData.displayNumOfMonth();
    console.log(appData.getStatusIncome());

    for(let key in appData) {
        console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
    }

