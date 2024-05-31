/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function(grid) {
    let result = [0, 0];
    let stringArr = grid.toString().split(',');
    let hash = Array.from({length: stringArr.length}, () => 0);
  
    stringArr.forEach((element) => {
      hash[parseInt(element)-1]++;
    });
  
    hash.forEach((element) => {
      if (element === 0) {
        result[1] = hash.indexOf(element)+1;
      } else if (element === 2) {
        result[0] = hash.indexOf(element)+1;
      }
    });
  
    return result;
  }