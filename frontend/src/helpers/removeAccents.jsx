export const removeAccents = (input) => {
    const accents = [
      ['á', 'a'],
      ['é', 'e'],
      ['í', 'i'],
      ['ó', 'o'],
      ['ú', 'u'],
      ['ü', 'u'],
      ['ñ', 'n'],
      ['Á', 'A'],
      ['É', 'E'],
      ['Í', 'I'],
      ['Ó', 'O'],
      ['Ú', 'U'],
      ['Ü', 'U'],
      ['Ñ', 'N']
    ];
  
    let output = input;
    
    for (const [accent, noAccent] of accents) {
      output = output.replace(new RegExp(accent, 'g'), noAccent);
    }
    
    return output;
  }
  