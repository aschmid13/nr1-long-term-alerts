export function chunk(array, size) {
    const chunked_arr = [];
    const copied = [...array]; // ES6 destructuring
    const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
    for (let i = 0; i < numOfChild; i++) {
      chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
  }
  
  export function chunkByKey(array, key) {
    const chunked_arr = [];
    const copied = [...array]; // ES6 destructuring
    const usedKeys = [];
    for (let i = 0; i < copied.length; i++) {
      const value = copied[i][key];
      if (!usedKeys.find(value)) {
        chunked_arr.push(copied.filter(item => item[key] === value));
        usedKeys.push(value);
      }
    }
    return chunked_arr;
  }