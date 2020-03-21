function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
   
    //проверка по кол-ву скобок

   let brackets = 0
   for (let i=0; i<expr.length; i++) {
        if (!!~expr.indexOf('/ 0')) {throw new TypeError('TypeError: Division by zero.')
        }else if (expr[i]=='(') {
            brackets++
        }else if(expr[i]==')') {
            brackets--
        };
    };
    if (brackets!==0) throw new Error ("ExpressionError: Brackets must be paired");
    
    //подготовка логики

    let exprTrim = expr.trim()
    let exprArr = [];
    function getExprArr(expr) {
        if (expr.includes(' ')){
            exprArr = expr.split(/\s+/)
        } else {
            exprArr = expr.split('');
        }
    }
    getExprArr (exprTrim);
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
        // if (a==b&&a=='-'){
        if (PRIORITY[a] && signs[signs.length-2] === '-' && PRIORITY[a] === PRIORITY[b] && a !== '/' && a !== '*') {
            const x = numbers.splice(-2, 1);
            const y = numbers.splice(-2, 1);
            const op = signs.splice(-2, 1);
            const val = MATH[op](y, x);
            numbers.splice(-1, 0, val);
            signs.push(a);
        }else if (signs[signs.length-1] == '(' || PRIORITY[a]>PRIORITY[b] || signs.length == 0 ){
            signs.push(a);
        } else {            
            calculate();
            signs.push(a);
        };

    };



    function calcBrackets(a, b) {
        if (a!=='(') {
            calculate()
            calcBrackets(signs[signs.length-1], signs[signs.length-2])
        }else{
            signs.pop()

        }
    }

    //закидвыние элементов по стекам

    exprArr.forEach(element => {
        if (element=== ")") {
            calcBrackets (signs[signs.length-1], signs[signs.length-2])
        } else if (!isNaN(element)){
            numbers.push(element)
        } else if (element == '(') {
            signs.push(element);
        } else if (SIGN.includes(element) ) {
            checkPriority(element, signs[signs.length-1]);
        }        
    });

    // function restCalculator() {
    //     if (PRIORITY[signs[signs.length-1]] == PRIORITY[signs[signs.length-2]] && signs[signs.length-1] !== '*'&& signs[signs.length-1] !== '/'){
    //         const x = numbers.splice(-2, 1);
    //         const y = numbers.splice(-2, 1);
    //         const op = signs.splice(-2, 1);
    //         const val = MATH[op](y, x);
    //         numbers.splice(-1, 0, val);            
    //     }else{
    //         calculate ()
    //     }
    // }
    const restCalculator = () => {
        if (PRIORITY[signs[signs.length-1]] > PRIORITY[signs[signs.length-2]]) {
          calculate();
        } else {
          const x = numbers.shift();
          const y = numbers.shift();
          const op = signs.shift();
          numbers.unshift(MATH[op](x, y));
        }
      };

    while (signs.length != 0) {
        restCalculator ()
    }
    return numbers[0];
};

module.exports = {
    expressionCalculator
}