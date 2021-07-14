/*
 * @Author: your name
 * @Date: 2021-07-12 14:26:26
 * @LastEditTime: 2021-07-14 21:13:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /frontend-study/week01/encode64.js
 */

const UNIT_CODE = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
  "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", 
  "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
  "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
  "Y", "Z", "~", "|"
];

const DIVIDE = BigInt(64);

const caculateIntegerPart = (integerValue) => {
  let INTEGER = BigInt(integerValue);
  let INTEGER_PART = "";
  while(INTEGER !== 0n) {
    const REMAINDER = INTEGER % DIVIDE;
    INTEGER_PART = UNIT_CODE[REMAINDER] + INTEGER_PART;
    INTEGER = (INTEGER - REMAINDER) / DIVIDE;
  }
  return INTEGER_PART + "";
}
const caculateDecimalPart = (decimal) => {
  if (decimal) {
    let count = (decimal + "").length;
    let times = 0;
    let res = "";
    while(decimal !== 0 && count >= 0 && times < 12) {
      const value = decimal * 64;
      const int = Math.floor(value);
      decimal = value - int;
      res += UNIT_CODE[int] + "";
      if (count === 0) {
        times++;
      } else {
        count--;
      }
    }
    return res;
  }
  return "";
}

let encode64 = (num) => {
  num += "";
  // 取出 整数部分、小数部分、Exponent部分
  const [, sign = "+", integer, , decimal = 0, , sign = "+", exponentValue = 0 ] = /^(\+|-)?(\d*)(?:(\.)(\d+))?(?:(e)(?:(\+|-)(\d+)))?/.exec(num);
  let integerValue = (integer === "0" ? "" : integer) + "";
  let decimalValue = decimal + ""; 
  if (sign === "+") {
    integerValue += decimalValue.slice(0, exponentValue);
    decimalValue = decimalValue.slice(exponentValue);
  }
  const INTEGER_PART = (sign === "+" ? "0" : "1") + caculateIntegerPart(integerValue);
  if (decimalValue) {
    const DECIMAL_PART = caculateDecimalPart(+decimalValue);
    return INTEGER_PART + "." + DECIMAL_PART;
  } else {
    return INTEGER_PART;
  }
}

module.exports = {
  encode64
}