export function generateToken(
    availableDigits: string,
    tokenLength: number = 16
  ): string {
    const digitCount = availableDigits.length;
    let token = '';
  
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * digitCount);
      token += availableDigits[randomIndex];
  
      // Insert hyphens at the appropriate positions (e.g., after every 4 characters)
      if (i % 4 === 3 && i < tokenLength - 1) {
        token += '-';
      }
    }
  
    return token;
  }
  