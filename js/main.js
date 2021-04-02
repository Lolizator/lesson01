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


addExpenses = addExpenses.toLowerCase().split(", ");
console.log(addExpenses);

let budgetDay = money / 30 ;
console.log(budgetDay);
