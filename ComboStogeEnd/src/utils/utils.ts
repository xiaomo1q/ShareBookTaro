/**
 * 去除对象空值
 * @param obj 
 * @returns 
 */
 export const removeProperty = (obj) => {
  Object.keys(obj).forEach(item => {
    if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
  })
  return obj
}