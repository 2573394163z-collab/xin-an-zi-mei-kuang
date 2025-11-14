export function formatNumber(num) {
  if (Number.isInteger(num)) {
    return Math.round(num);
  } else {
    return num.toFixed(1);
  }
}


// 保留小数后两位，不四舍五入
export function truncatedNumber(number) {
  return Math.floor(number * 100) / 100
}

export const sliceArr = (arr, size) => {
  const arr2 = [];
  for (let i = 0; i < arr.length; i = i + size) {
    arr2.push(arr.slice(i, i + size));
  }
  return arr2;
}
