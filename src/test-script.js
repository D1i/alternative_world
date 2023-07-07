//Функция для проверки длины строки.
const checkStringLength = (string, length) => {
    if (string.length <= length) {
        return true;
    }
    return false;
};

//Функция для проверки, является ли строка палиндромом

const checkForPalindrome = (string) => {
    const normalizeString = string.replaceAll(' ', '').toUpperCase();
    let result = '';
    for (let i = normalizeString.length - 1; i >= 0; i--) {
        result += normalizeString.at(i);
    }
    if (result === normalizeString) {
        return true;
    }
    return false;
};

//Функция извлекает число из строки

const getNumberFromString = (string) => {
    const checkoutString = String(string);
    let numbers;
    let result = '';
    for (const i in checkoutString) {
        numbers = parseInt(checkoutString[i], 10);
        if (!Number.isNaN(numbers)) {
            result += numbers;
        }
    }
    return result;
};

console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));
console.log(checkForPalindrome('топот'));
console.log(checkForPalindrome('ДовОд'));
console.log(checkForPalindrome('Кекс'));
console.log(getNumberFromString('2023 год'));
console.log(getNumberFromString('ECMAScript 2022'));
console.log(getNumberFromString('1 кефир, 0.5 батона'));
console.log(getNumberFromString('агент 007')); // косячок
console.log(getNumberFromString('а я томат'));
console.log(getNumberFromString(2023));
console.log(getNumberFromString(-1));
console.log(getNumberFromString(1.5));
