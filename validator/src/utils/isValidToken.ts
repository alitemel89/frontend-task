export function isValidToken(token: string): boolean {
    // Remove any hyphens or spaces from the token
    const cleanedToken = token.replace(/[-\s]/g, '');
    console.log(cleanedToken)
  
    // Check if the token contains only digits
    if (!/^\d+$/.test(cleanedToken)) {
      return false;
    }
  
    // Reverse the token for easier processing
    const reversedToken = cleanedToken.split('').reverse().join('');
    console.log(reversedToken)
  
    let sum = 0;
    let double = false;
  
    for (let i = 0; i < reversedToken.length; i++) {
      const digit = parseInt(reversedToken[i], 10);
  
      if (double) {
        const doubledDigit = digit * 2;
        sum += doubledDigit > 9 ? doubledDigit - 9 : doubledDigit;
      } else {
        sum += digit;
      }
  
      double = !double;
    }
  
    // A valid Luhn algorithm result should be divisible by 10
    return sum % 10 === 0;
  }
  