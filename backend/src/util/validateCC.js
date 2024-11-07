"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardDetails = exports.validateCreditCardNumber = void 0;
function validateCreditCardNumber(cardNumber) {
    // Remove any non-digit characters from the card number
    var cleanedCardNumber = cardNumber.replace(/\D/g, '');
    // Check if the card number is empty or not a number
    if (cleanedCardNumber === '' || isNaN(Number(cleanedCardNumber))) {
        return false;
    }
    // Perform the Luhn algorithm to validate the card number
    // Based on https://www.dcode.fr/luhn-algorithm
    var sum = 0;
    var isAlternateDigit = false;
    for (var i = cleanedCardNumber.length - 1; i >= 0; i--) {
        var digit = Number(cleanedCardNumber[i]);
        if (isAlternateDigit) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isAlternateDigit = !isAlternateDigit;
    }
    return sum % 10 === 0;
}
exports.validateCreditCardNumber = validateCreditCardNumber;
function validateCardDetails(cardNumber, expiryDate, cvv) {
    // Check if the card number is valid
    if (!validateCreditCardNumber(cardNumber)) {
        return false;
    }
    // Check if the expiry date is in the format MM/YY
    var expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDate.match(expiryDateRegex)) {
        return false;
    }
    // Get current month and year
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear() % 100;
    // Extract the month and year from the expiry date
    var _a = expiryDate.split('/'), expiryMonth = _a[0], expiryYear = _a[1];
    var expiryMonthNum = Number(expiryMonth);
    var expiryYearNum = Number(expiryYear);
    // Check if the expiry date is in the future
    if (expiryYearNum < currentYear || (expiryYearNum === currentYear && expiryMonthNum < currentMonth)) {
        return false;
    }
    // Check if the CVV is a 3-digit number
    var cvvRegex = /^\d{3}$/;
    if (!cvv.match(cvvRegex)) {
        return false;
    }
    return true;
}
exports.validateCardDetails = validateCardDetails;
