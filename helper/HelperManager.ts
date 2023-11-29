import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UuidAlternative from "./UuidAlternative";

interface IOmit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

interface IFlattenResult {
  [key: string]: any;
}

class HelperManager {
  public static hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  public static comparePassword(hashPassword: string, password: string) {
    return hashPassword && hashPassword
      ? bcrypt.compareSync(password, hashPassword)
      : false;
  }

  public static generateToken(id: number) {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.JWT_KEY ?? ""
    );
    return token;
  }

  public static delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static upperCaseFirstLetter = (param: string) => {
    if (this.isValid(param)) {
      return "";
    }
    const input = param.toLowerCase();
    const output = input.charAt(0).toUpperCase() + input.slice(1);
    return output;
  };

  public static upperCaseEveryFirstLetter = (param: string) => {
    const output = param
      .split(" ")
      .map((str) => this.upperCaseFirstLetter(str))
      .join(" ");
    return output;
  };

  public static isValid = (param: unknown) => {
    if (
      param === false ||
      param === null ||
      param === undefined ||
      (param instanceof Object && Object.keys(param).length === 0) ||
      (Array.isArray(param) && param.length === 0) ||
      param === "" ||
      Number.isNaN(param)
    ) {
      return false;
    }

    return true;
  };

  public static isValidExtend = (param: unknown) => {
    if (
      param === false ||
      param === null ||
      param === undefined ||
      (param instanceof Date && Number.isNaN(param.getTime())) || // Add this line to check invalid dates
      (!(param instanceof Date) &&
        param instanceof Object &&
        Object.keys(param).length === 0) || // Exclude Date instances from empty object check
      (Array.isArray(param) && param.length === 0) ||
      param === "" ||
      Number.isNaN(param) ||
      param === 0
    ) {
      return true;
    }

    if (typeof param === "string") {
      const date = new Date(param);
      if (Number.isNaN(date.getTime())) {
        // check if date is invalid
        return true;
      }
    }

    return false;
  };

  public static handleLongName = (textString: string, limit: number) => {
    if (this.isValid(textString)) {
      return "";
    }
    if (textString.length >= limit && !this.isValid(textString))
      return textString.substring(0, limit - 3) + "...";
    return textString;
  };

  public static delayer = (number: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, number);
    });
  };

  public static getUniqueItemArr = <T>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  };

  public static pickFnc = <T, G extends keyof T>(
    object: T,
    keys: G[]
  ): Pick<T, G> => {
    return Object.assign(
      {},
      ...keys.map((key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
          return { [key]: object[key] };
        }
      })
    );
  };

  public static omitFnc: IOmit = (obj, ...keys) => {
    const rest = {} as {
      [K in keyof typeof obj]: (typeof obj)[K];
    };
    let key: keyof typeof obj;
    for (key in obj) {
      if (!keys.includes(key)) {
        rest[key] = obj[key];
      }
    }
    return rest;
  };

  public static removeDuplicates = <T extends Object>(
    originalArray: T[],
    prop: keyof T
  ) => {
    const newArray = [];
    const lookupObject: any = {};

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (const u in lookupObject) {
      newArray.push(lookupObject[u]);
    }
    return newArray;
  };

  public static shallowEqual = <T extends Object>(
    objectOne: T,
    objectTwo: T
  ) => {
    const keys1 = Object.keys(objectOne);
    const keys2 = Object.keys(objectTwo);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (
        JSON.stringify(objectOne[key as keyof T]) !==
        JSON.stringify(objectTwo[key as keyof T])
      ) {
        return false;
      }
    }
    return true;
  };

  public static validNumberPadString = (inputString: string) => {
    const output: string[] = [];
    const validValue = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (const character of inputString.split("")) {
      for (const validCharacter of validValue) {
        if (character === validCharacter) {
          output.push(character);
        }
        if (
          (character === "." && !output.includes(character)) ||
          (character === "," && !output.includes(character))
        ) {
          if (character === "." && !output.includes(",")) {
            output.push(character);
          }
          if (character === "," && !output.includes(".")) {
            output.push(".");
          }
        }
      }
    }
    if (output[0] === "." || output[0] === ",") {
      output.shift();
    }
    return output.join("");
  };

  public static randomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  public static isValidEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  public static idGenerator = UuidAlternative;

  public static groupBy = <T>(xs: T[], key: keyof T): Record<string, T[]> => {
    return xs.reduce(function (rv: Record<string, T[]>, x: T) {
      (rv[x[key] as string] = rv[x[key] as string] || []).push(x);
      return rv;
    }, {});
  };

  public static hex2rgba = (hex: string, alpha: number): string => {
    hex = hex.replace("#", "");

    const r: number = parseInt(
      hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
      16
    );
    const g: number = parseInt(
      hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
      16
    );
    const b: number = parseInt(
      hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
      16
    );

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  };

  public static containsSpecialChars = (password: string) => {
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(password);
  };

  public static isNumeric(value: any) {
    return /^-?\d+$/.test(value);
  }

  public static occurrences(
    string: string,
    subString: string,
    allowOverlapping = false
  ) {
    string += "";
    subString += "";
    if (subString.length <= 0) return string.length + 1;

    let n = 0,
      pos = 0;
    const step = allowOverlapping ? 1 : subString.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }

  public static wrapArray<T>(arr: T[], max: number): T[][] {
    const subArrays: T[][] = [];
    for (let i = 0; i < arr.length; i += max) {
      subArrays.push(arr.slice(i, i + max));
    }
    return subArrays;
  }

  public static flattenObj(obj: Record<string, any>): IFlattenResult {
    const result: IFlattenResult = {};

    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        const flattenedTemp = HelperManager.flattenObj(obj[key]);
        for (const keyChild in flattenedTemp) {
          result[`${key}.${keyChild}`] = flattenedTemp[keyChild];
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }
}

export default HelperManager;
