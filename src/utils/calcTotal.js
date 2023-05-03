export const calcTotalPrice = (orderGoods) => {
  const totalPrice = orderGoods.reduce((acc, item) => {
    return acc + item.count * item.price
  }, 0)
  return totalPrice
}

export const calcTotalCount = (orderGoods) => {
  const totalCount = orderGoods.reduce((acc, item) => {
    return acc + item.count
  }, 0)
  return totalCount
}
