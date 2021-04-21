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

const AppData = function () {
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.targetMonth = 0;
};

AppData.prototype.start = function() {
        this.buttonOn();
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        };

AppData.prototype.reset = function(){
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
        };

AppData.prototype.buttonOn = function(){
            if(salaryAmount.value !== ''){
                start.removeAttribute('disabled');
            }
        };

AppData.prototype.showResult = function(){
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

        };

AppData.prototype.getExpenses = function() {
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        };       

AppData.prototype.addExpensesBlock = function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlusBtn);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                secondPlusBtn.style.display = 'none';
            }
        };

AppData.prototype.addIncomeBlock = function(){
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, firstPlusBtn);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                firstPlusBtn.style.display = 'none';
            }
        };

AppData.prototype.getIncome = function() {
            const _this = this;
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    _this.income[itemIncome] = +cashIncome;
                }
            });

            for(let key in appData.income){
                this.incomeMonth += +this.income[key];
            }
        };

AppData.prototype.getAddExpenses = function() {
            const _this = this;
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    _this.addExpenses.push(item);
                }
            });
        };

AppData.prototype.getAddIncome = function() {
            const _this = this;
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    _this.addIncome.push(itemValue);
                }
            });
        };

AppData.prototype.getBudget = function() {
        this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth),
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        
        };

AppData.prototype.getTargetMonth = function() {
            this.targetMonth  = Math.ceil(targetAmount.value / this.budgetMonth);
            return this.targetMonth;
        };

AppData.prototype.getExpensesMonth = function() {
            for(let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        };

AppData.prototype.getStatusIncome = function() {
            if (this.budgetDay >= 1200) {
                return('У вас высокий уровень дохода');
            } else if (this.budgetDay >= 600) {
                return('У вас средний уровень дохода');
            } else if (this.budgetDay > 0) {
                return('К сожалению у вас уровень дохода ниже среднего');
            } else {
                return('Что-то пошло не так');
            }
        };

AppData.prototype.displayNumOfMonth = function() {
            if (this.targetMonth < 0) {
                console.log('Цель не будет достигнута');
            } else {
                console.log(`Цель будет достигнута через ${this.targetMonth} месяцев(-а)`);
            }
        };

AppData.prototype.calcPeriod = function(){
            return this.budgetMonth * periodSelect.value;
        };

AppData.prototype.changePeriod = function(){
            periodAmount.textContent = periodSelect.value;
        };

function returnFoo(foo) {
        return foo.bind(appData);
};
AppData.prototype. eventsListeners = function(){
    start.addEventListener('click', returnFoo(appData.start));

    cancelBtn.addEventListener('click', appData.reset);

    salaryAmount.addEventListener('input', appData.buttonOn);

    periodSelect.addEventListener('input', appData.changePeriod);

    secondPlusBtn.addEventListener('click', appData.addExpensesBlock);

    firstPlusBtn.addEventListener('click', appData.addIncomeBlock);
};

const appData = new AppData(); 

appData.eventsListeners();

    
    
    


    //appData.displayNumOfMonth();
    

   // for (const key in appData.addExpenses) {
    //    appData.addExpenses[key] = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
//}
   // console.log(appData.addExpenses.join(', '));

   // for(let key in appData) {
   //     console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
   // }

    
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

