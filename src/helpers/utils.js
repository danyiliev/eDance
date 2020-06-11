export class Utils {

  static sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };
}
