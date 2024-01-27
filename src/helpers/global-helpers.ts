export const switchTwoElementsOfArray = (array: any[], index1: number, index2: number) => {
  [array[index1], array[index2]] = [array[index2], array[index1]]
}