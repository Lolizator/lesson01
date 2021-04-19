'use strict';

const start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    firstPlusBtn = btnPlus[0],
    secondPlusBtn = btnPlus[1],
    depositCheck = document.getElementById('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional-income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    income = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');





const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};

    
const   appData = {
        budget: 0,
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

        start: function() {
        if(salaryAmount.value === ''){
            alert('Ошибка, поле "Месячный доход" должно быть заполнено');
            return;
        }
        
        appData.budget = salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();

        //appData.asking();
        //appData.getExpensesMonth();
        //appData.getBudget();
        },

        getExpenses: function() {
            expensesItems.forEach(function(item){
                console.log(item);
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },       

        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            console.log(expensesItems[0].parentNode);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
            let expensesItem = document.querySelectorAll('.expenses-items');
            if(expensesItem.length === 3){
                secondPlusBtn.style.display = 'none';
            }
        },



        addIncomeBlock: function(){
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            console.log(incomeItems[0].parentNode);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, firstPlusBtn);
            let incomeItem = document.querySelectorAll('.income-items');
            if(incomeItem.length === 3){
                firstPlusBtn.style.display = 'none';
            }
        },

        getIncome: function() {
            incomeItems.forEach(function(item){
                console.log(item);
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.expenses[itemIncome] = cashIncome;
                }
            });
        },

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

        //     let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
        //     const re = /\s*,\s*/;
        //     appData.addExpenses = addExpenses.toLowerCase().split(re);
        //     appData.deposit = confirm('Есть ли у вас депозит в банке?');

        //     for(let i = 0; i < 2; i++) {
        //         let expensesKey, expensesAmount;
        //         do{
        //             expensesKey = prompt('Введите обязательную статью расходов?');
        //         }while(isString(expensesKey));
                
        //     while (!isNumber(expensesAmount)){
        //         expensesAmount = prompt('Во сколько это обойдется?');
        //     }
        //     appData.expenses[expensesKey] = expensesAmount;
        // }
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

    start.addEventListener('click', appData.start);

    secondPlusBtn.addEventListener('click', appData.addExpensesBlock);

    firstPlusBtn.addEventListener('click', appData.addIncomeBlock);


    //appData.displayNumOfMonth();
    

   // for (const key in appData.addExpenses) {
    //    appData.addExpenses[key] = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
//}
   // console.log(appData.addExpenses.join(', '));

   // for(let key in appData) {
   //     console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
   // }

    

