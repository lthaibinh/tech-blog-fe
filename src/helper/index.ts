export function numberToLetter(number: number) {
    let result = '';
    // number = number - 1; // If starting from 1
    do {
      const letter = String.fromCharCode(65 + (number % 26));
      result = letter + result;
      number = Math.floor(number / 26) - 1;
    } while (number >= 0)
    return result;
  }

 export const  youtube_parser = (url: string) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : '';
}