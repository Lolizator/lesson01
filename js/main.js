'use strict';

let start = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    periodAmount = document.querySelector('.period-amount'),
    cancelBtn = document.getElementById('cancel'),
    inputsName = document.querySelectorAll('[placeholder="Наименование"]'),
    inputsNumber = document.querySelectorAll('[placeholder="Сумма"]'),
    allInputs = document.querySelectorAll('[type="text"]'),
    periodSelect = document.querySelector('.period-select');


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};
start.setAttribute('disabled', true);

    
let   appData = {
        budget: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        targetMonth: 0,
        

        start: function() {
        this.buttonOn();
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        },

        reset: function(){
            inputsName.forEach(function(item){
                item.value = item.defaultValue;
            });
            inputsNumber.forEach(function(item){
                item.value = item.defaultValue;
            });
            allInputs.forEach(function(item){
                item.value = item.defaultValue;
            });
            budgetMonthValue.value = budgetMonthValue.defaultValue;
            budgetDayValue.value = budgetDayValue.defaultValue;
            expensesMonthValue.value = expensesMonthValue.defaultValue;
            additionalExpensesValue.value = additionalExpensesValue.defaultValue;
            additionalIncomeValue.value = additionalIncomeValue.defaultValue;
            targetMonthValue.value = targetMonthValue.defaultValue;
            periodSelect.value = periodSelect.defaultValue;
            periodAmount.textContent = '1';
            start.style.display = 'block';
            cancelBtn.style.display = 'none';
            cancelBtn.textContent = 'Расчитать';
        },

        buttonOn: function(){
            if(salaryAmount.value !== ''){
                start.removeAttribute('disabled');
            }
        },

        showResult: function(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            
            periodSelect.addEventListener('input', function() {
                incomePeriodValue.value = appData.calcPeriod();
        });
        start.style.display = 'none';
        cancelBtn.style.display = 'block';
        cancelBtn.textContent = 'Сбросить';

        },

        getExpenses: function() {
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },       

        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                secondPlusBtn.style.display = 'none';
            }
        },

        addIncomeBlock: function(){
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, firstPlusBtn);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                firstPlusBtn.style.display = 'none';
            }
        },

        getIncome: function() {
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = +cashIncome;
                }
            });

            for(let key in appData.income){
                this.incomeMonth += appData.income[key];
            }
        },

        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },

        getAddIncome: function(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },

        getBudget: function() {
        appData.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth),
        appData.budgetDay = Math.floor(this.budgetMonth / 30);
        
        return appData.budgetMonth, appData.budgetDay;
        },

        getTargetMonth: function() {
            this.targetMonth  = Math.ceil(targetAmount.value / this.budgetMonth);
            return appData.targetMonth;
        },

        getExpensesMonth: function() {
            for(let key in this.expenses) {
                this.expensesMonth += +appData.expenses[key];
            }
        },

        getStatusIncome: function() {
            if (this.budgetDay >= 1200) {
                return('У вас высокий уровень дохода');
            } else if (this.budgetDay >= 600) {
                return('У вас средний уровень дохода');
            } else if (this.budgetDay > 0) {
                return('К сожалению у вас уровень дохода ниже среднего');
            } else {
                return('Что-то пошло не так');
            }
        },

        // getInfoDeposit: function(){
        //     if(appData.deposit){
        //         do{
        //             appData.percentDeposit = prompt('Какой годовой процент?', 10);
        //         }while(!isNumber(appData.percentDeposit));

        //         do{
        //             appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        //         }while(!isNumber(appData.moneyDeposit));
        //     }
        // },

        displayNumOfMonth: function() {
            if (this.targetMonth < 0) {
                console.log('Цель не будет достигнута');
            } else {
                console.log(`Цель будет достигнута через ${appData.targetMonth} месяцев(-а)`);
            }
        },

        calcPeriod: function(){
            return appData.budgetMonth * periodSelect.value;
        },

        changePeriod: function(){
            periodAmount.textContent = periodSelect.value;
        }
    };

    function returnFoo(foo) {
        return foo.bind(appData);
    }
    
    start.addEventListener('click', returnFoo(appData.start));

    cancelBtn.addEventListener('click', appData.reset);

    salaryAmount.addEventListener('input', appData.buttonOn);

    periodSelect.addEventListener('input', appData.changePeriod);

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

    

