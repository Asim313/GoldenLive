export const formatNumerWithK = (number) => {
  if(!number) return 0
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number.toString();
    }
  }

  export const truncateAfterThreeCharacters = (inputString) => {
    if(inputString) {

      if (inputString?.length <= 5) {
        return inputString;
      } else {
        const truncatedString = inputString.slice(0, 5) + '...';
        return truncatedString;
      }
    }
    else {
      return inputString
    }
  
  }
  export const truncateAfterTenCharacters = (inputString) => {
    if(inputString) {

      if (inputString?.length <= 10) {
        return inputString;
      } else {
        const truncatedString = inputString.slice(0, 10) + '...';
        return truncatedString;
      }
    }
    else {
      return inputString
    }
   
  }