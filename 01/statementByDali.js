/*
invoice  {
    customer: String
    performances: [performance]
}
plays  [play]

return result string
*/

// 1. return type 이나 param type 명시되면 좋을 듯
// -> example
/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexadecimal format.
 * @param {string} color2 - The second color, in hexadecimal format.
 * @return {string} The blended color.
 */
export function blend(color1, color2) {}

// 2. statement -> getStatement
// 함수는 동사 + 명사 행위나 의도를 나타내면 더 좋을 듯
// 3. destructuring 활용 해서 프로퍼티들을 좀 나눈다
// 4. for of -> 보다 Array instance methods가 가독성 밑 조작이 편의하다.

// 5. thisAmout 구하는 switchCase를 분리하자

//6. 행위별로 함수를 분리한다.
// 6.1 토탈 어마운트 계산
// 6.2 포인트 적립
// 6.3 청구내역 출력
// ETC `
// format  new Intl -> 잘 모름 일단 넘어가자

function statment({ performances, customer }, plays) {
  const initStatement = `청구 내역 (고객명: ${customer})\n`
  const format = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  const getAmountByType = (type, audience) => {
    switch (type) {
      case 'tragedy': {
        let amount = 40000
        if (audience > 30) {
          amount += 1000 * (audience - 30)
        }
        return amount
      }
      case 'comedy': {
        let amount = 30000
        if (audience > 20) {
          amount += 10000 + 500 * (audience - 20)
        }
        return (amount += 300 * audience)
      }
      default: {
        throw new Error(`알 수 없는 장르 ${type}`)
      }
    }
  }

  const toatalAmount = performances.reduce((acc, { playID, audience }) => {
    const { type } = plays[playID]
    const amount = getAmountByType(type, audience)
    return amount + acc
  }, 0)

  const volumeCredits = performances.reduce((acc, { audience, playID }) => {
    const { type } = plays[playID]
    let credits = acc + Math.max(audience - 30, 0)
    if (type === 'comedy') {
      credits += Math.floor(audience / 5)
    }
    return credits
  }, 0)

  const printStatementsByPeformance = performances.reduce((acc, { audience, playID }) => {
    const { type, name } = plays[playID]
    result += `${name}: ${format(getAmountByType(type, audience) / 100)} (${audience} 석) \n`
  }, ``)
  return `
        ${initStatement}
        ${printStatementsByPeformance}
        총액 ${format(totalAmount / 100)}
        적립포인트 ${volumeCredits()} \n
    `
}
