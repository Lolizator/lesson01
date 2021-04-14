'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};

let money = 35000,
    start = function() {
        do{
            money = prompt('Ваш месячный доход?', 35000);
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
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 100000,
        period: 12,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        targetMonth: 0,

        asking: function(){

            if(confirm('Есть ли у вас дополнительный заработок?')){
                let itemIncome, cashIncome;
                do{
                    itemIncome = prompt('Какой у вас дополнительный заработок?');
                } while((isString(itemIncome)));
                while(!isNumber(cashIncome)){
                    cashIncome = prompt('Сколько вы на этом зарабатываете?');
                }
                appData.income[itemIncome] = cashIncome;
            }

            let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
            const re = /\s*,\s*/;
            appData.addExpenses = addExpenses.toLowerCase().split(re);
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for(let i = 0; i < 2; i++) {
                let expensesKey, expensesAmount;
                do{
                    expensesKey = prompt('Введите обязательную статью расходов?');
                }while(isString(expensesKey));
                
            while (!isNumber(expensesAmount)){
                expensesAmount = prompt('Во сколько это обойдется?');
            }
            appData.expenses[expensesKey] = expensesAmount;
        }
        },

        getBudget: function() {
        appData.budgetMonth = Math.ceil(appData.budget - appData.expensesMonth),
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        
        return appData.budgetMonth, appData.budgetDay;
        },

        getTargetMonth: function() {
            appData.targetMonth  = Math.ceil(appData.mission / appData.budgetMonth);
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

        getInfoDeposit: function(){
            if(appData.deposit){
                do{
                    appData.percentDeposit = prompt('Какой годовой процент?', 10);
                }while(!isNumber(appData.percentDeposit));

                do{
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }while(!isNumber(appData.moneyDeposit));
            }
        },

        displayNumOfMonth: function() {
            if (appData.targetMonth < 0) {
                console.log('Цель не будет достигнута');
            } else {
                console.log(`Цель будет достигнута через ${appData.targetMonth} месяцев(-а)`);
            }
        },

        calcSavedMoney: function(){
            return appData.budgetMonth * appData.period;
        }
    };
    appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getInfoDeposit();

    console.log('Расходы за месяц', appData.expensesMonth);
    appData.displayNumOfMonth();
    console.log(appData.getStatusIncome());

    for (const key in appData.addExpenses) {
                appData.addExpenses[key] = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
                }
            console.log(appData.addExpenses.join(', '));

    //for(let key in appData) {
   //     console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
   // }

    

