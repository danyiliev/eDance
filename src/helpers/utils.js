export class Utils {

  static sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };

  static makeEmptyArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({});
    }

    return arr;
  }
}
