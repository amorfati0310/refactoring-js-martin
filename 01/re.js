function statment(invoice, plays) {
  const statmentData = {}
  statmentData.customer = inovice.customer
  statmentData.performances = inovice.performances.map(enrichPerformance)
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    return result
  }
  return renderPlainText(statmentData, invoice, plays)
}
function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience} 석) \n`
  }
  result += `총액 ${usd(totalAmount())}`
  result += `적립포인트 ${totalVolumeCredits()} \n`
  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }

  function amountFor(perf) {
    let result = 0
    switch (perf.play.type) {
      case 'tragedy': {
        result = 40000
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30)
        }
        break
      }
      case 'comedy': {
        result = 30000
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20)
        }
        result += 300 * perf.audience
        break
      }
      default: {
        throw new Error(`알 수 없는 장르 ${perf.play.type}`)
      }
    }
    return result
  }

  function totalAmount() {
    let result = 0
    for (let perf of data.performances) {
      result += amountFor(perf)
    }
    return result
  }

  function totalVolumeCredits() {
    for (let perf of data.performances) {
      // 포인트를 적립한다
      volumeCredits += Math.max(perf.audience - 30, 0)
      // 희극 관객 5명 마다 추가 포인트를 제공한다.
      if ('comedy' === perf.play.type) {
        volumeCredits += Math.floor(perf.audience / 5)
      }
    }
  }

  function playFor(perf) {
    return plays[perf.playID]
  }
}
