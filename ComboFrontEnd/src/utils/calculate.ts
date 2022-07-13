// 更改日期格式
export const Formatter = (value) => {
  const date = new Date(value);
  const Year = date.getFullYear() + "-"; // 获取完整的年份(4位,1970)
  const Month =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-"; // 获取月份(0-11,0代表1月,用的时候记得加上1)
  const day = date.getDate() + 1 < 10 ? "0" + date.getDate() : date.getDate(); // 获取日(1-31)
  return `${Year}${Month}${day}`;
};

/** 删除某项数组 */
export const removeArray = (_arr: any, _obj: any) => {
  let length = _arr.length
  for (let i = 0; i < length; i++) {
    if (_arr[i] === _obj) {
      if (i === 0) {
        _arr.shift() //删除并返回数组的第一个元素
        return _arr
      } else if (i === length - 1) {
        _arr.pop()  //删除并返回数组的最后一个元素
        return _arr
      } else {
        _arr.splice(i, 1) //删除下标为i的元素
        return _arr
      }
    }
  }
}

/** 重组 */
export const recombinationArr = (res, title) => {
  let tempArr: any = [];
  let afterData: any = [];
  for (let k = 0; k < res.length; k++) {
    if (tempArr.indexOf(res[k][title]) === -1) {
      afterData.push({
        title: res[k][title],
        rows: [res[k]],
      });
      tempArr.push(res[k][title]);
    } else {
      for (let j = 0; j < afterData.length; j++) {
        if (afterData[j].title == res[k][title]) {
          afterData[j].rows.push(res[k]);
          break;
        }
      }
    }
  }
  return afterData;
}

/**
 * 
 * @param params 
 * @param data1 
 * @param data2 
 * @param data3 
 * @returns [min,max]
 */
export const range = (params: string | number, data1?: any[], data2?: any[], data3?: any[]): number[] => {
  let min;
  let min1;
  let min2;
  let min3;
  let max;
  let max1;
  let max2;
  let max3;

  if (data1) {
    const arr1 = data1.map((v: { [x: string]: any; }) => {
      return v[params];
    });
    min1 = arr1.sort((a: number, b: number) => a - b)[0];
    max1 = arr1.sort((a: number, b: number) => a - b)[arr1.length - 1];
  }
  if (data2) {
    const arr2 = data2.map((v: { [x: string]: any; }) => {
      return v[params];
    });
    min2 = arr2.sort((a: number, b: number) => a - b)[0];
    max2 = arr2.sort((a: number, b: number) => a - b)[arr2.length - 1];
  }
  if (data3) {
    const arr3 = data3.map((v: { [x: string]: any; }) => {
      return v[params];
    });
    min3 = arr3.sort((a: number, b: number) => a - b)[0];
    max3 = arr3.sort((a: number, b: number) => a - b)[arr3.length - 1];
  }
  if (data1 && data2 && data3) {
    if (min1 <= min2 && min1 <= min3) {
      min = min1;
    } else if (min2 <= min1 && min2 <= min3) {
      min = min2;
    } else {
      min = min3;
    }

    if (max1 > max2 && max2 > max3) {
      max = max1;
    } else if (max2 > max3 && max2 > max1) {
      max = max2;
    } else {
      max = max3;
    }
  } else if (data2 && data2) {
    min = min1 < min2 ? min1 : min2;
    max = max1 > max2 ? max1 : max2;
  } else {
    min = min1;
    max = max1;
  }
  // console.log(max, min);

  let currentMin = Math.round((min - 5) / 10) * 10;
  let currentMax = Math.round((max + 5) * 0.1) * 10;
  if (currentMax >= 100) {
    currentMax = 100;
  }
  if (currentMin <= 0) {
    currentMin = 0;
  }
  return [currentMin, currentMax];
};