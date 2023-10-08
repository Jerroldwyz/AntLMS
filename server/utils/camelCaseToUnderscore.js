export const camelCaseToUnderscore = (obj) => {
  const newObj = {}
  for (const key in obj) {
    const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
    newObj[newKey] = obj[key]
  }
  return newObj
}
