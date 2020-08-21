export class Utils {
  static sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  static makeEmptyArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({});
    }

    return arr;
  }

  static isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isObject(obj) {
    let type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
  }

  static leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  }
}
