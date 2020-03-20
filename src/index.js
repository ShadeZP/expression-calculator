function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
   
    //проверка по кол-ву скобок

   let brackets = 0
   for (let i=0; i<expr.length; i++) {
        if (expr[i]=='(') {
            brackets++
        }else if(expr[i]==')') {
            brackets--
        };
    };
    if (brackets!==0) throw new Error ("ExpressionError: Brackets must be paired");
    
    //подготовка логики
//TODO СДЕЛАТЬ ПРОВЕРКУ МАССИВА НА ОТСУТСТВИЕ ПРОБЕЛОВ
    let exprArr = expr.trim().split(/\s+/);  //превращаем выражение в массив
    let numbers = [];   //стек для чисел
    let signs = []; // стек для знаков
    const SIGN = '+-*/'
    let lastSign = signs[signs.length-1];
    let previousSign = signs[signs.length-2];
    
    const PRIORITY = {
        "+" : 1,
        "-" : 1,
        "/" : 2,
        "*" : 2,
    };

    const MATH = {
        '+': (x, y) => +x + +y,
        '-': (x, y) => x - y,
        '/': (x, y) => x / y,
        '*': (x, y) => x * y,
    };

    function calculate () {
        const x = numbers.pop();
        const y = numbers.pop();
        const op = signs.pop();
        numbers.push(MATH[op](y, x));        
    };

    function checkPriority(a, b) {
        if (lastSign == '(' || PRIORITY[a]>PRIORITY[b] || signs.length == 0 ){
            signs.push(a);
        } else {            
            calculate();
            signs.push(a);
        };

    };

    //закидвыние элементов по стекам

    exprArr.forEach(element => {
        if (!isNaN(element)){
            numbers.push(element)
        } else if (element == '(') {
            signs.push(element);
        } else if (SIGN.includes(element) ) {
            checkPriority(element, signs[signs.length-1]);
        } else {
            
        }        
    });

    while (signs.length != 0) {
        calculate()
    }
    return numbers[0];
};

module.exports = {
    expressionCalculator
}