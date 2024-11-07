
export function validateCreditCardNumber(cardNumber: string): boolean {
  // Remove any non-digit characters from the card number
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  // Check if the card number is empty or not a number
  if (cleanedCardNumber === '' || isNaN(Number(cleanedCardNumber))) {
    return false;
  }

  // Perform the Luhn algorithm to validate the card number
  // Based on https://www.dcode.fr/luhn-algorithm
  let sum = 0;
  let isAlternateDigit = false;

  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cleanedCardNumber[i]);

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

export function validateCardDetails(cardNumber: string, expiryDate: string, cvv: string): boolean {
    // Check if the card number is valid
    if (!validateCreditCardNumber(cardNumber)) {
        return false;
    }

    // Check if the expiry date is in the format MM/YY
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDate.match(expiryDateRegex)) {
        return false;
    }

    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    // Extract the month and year from the expiry date
    const [expiryMonth, expiryYear] = expiryDate.split('/');
    const expiryMonthNum = Number(expiryMonth);
    const expiryYearNum = Number(expiryYear);

    // Check if the expiry date is in the future
    if (expiryYearNum < currentYear || (expiryYearNum === currentYear && expiryMonthNum < currentMonth)) {
      return false;
    }

    // Check if the CVV is a 3-digit number
    const cvvRegex = /^\d{3}$/;
    if (!cvv.match(cvvRegex)) {
        return false;
    }

  return true;
}