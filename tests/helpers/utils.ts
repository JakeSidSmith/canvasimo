interface Each {
  (str: string, callback: (value: string, index: number) => any): void;
  (obj: any[], callback: (value: any, index: number) => any): void;
  (obj: {[i: string]: any}, callback: (value: any, key: string) => any): void;
}

interface Some {
  (str: string, callback: (value: string, index: number) => any): void;
  (obj: any[], callback: (value: any, index: number) => any): void;
  (obj: {[i: string]: any}, callback: (value: any, key: string) => any): void;
}

export const each: Each = (
  obj: any[] | string | {[i: string]: any},
  callback: (value: any, key: number | string) => any
): void => {
  if (Array.isArray(obj) || typeof obj === 'string') {
    for (let i = 0; i < obj.length; i += 1) {
      callback(obj[i], i);
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        callback(obj[key], key);
      }
    }
  }
};

export const some: Some = (
  obj: any[] | string | {[i: string]: any},
  callback: (value: any, key: number | string
) => any): boolean => {
  if (Array.isArray(obj) || typeof obj === 'string') {
    for (let i = 0; i < obj.length; i += 1) {
      if (callback(obj[i], i)) {
        return true;
      }
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (callback(obj[key], key)) {
          return true;
        }
      }
    }
  }

  return false;
};
