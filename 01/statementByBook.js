// checkList

// 별도의 함수로 빼냈을 때 값을 변경시키는지 ?
// 매개변수로서만 참조만 한다면 괜찮음

// 하나 고친 후 테스트 코드를 돌려서 확인한다.
// -> 변경점이 많은 후에 테스트 하면 -> 디버깅이 어렵기 때문이다

// 조금씩 수정하여 피드백 주기를 짧게 가져간다.

// 테스트 -> 이상 없으면 커밋한다
// -> 난 반대네 커밋하고 -> 디버깅 했는데 습관이 _ㅇ ...
// 그리고 어느정도 피쳐개발 수준으로 커밋이 쌓이면 푸시를 한다 ->

// 변수들 명확한 의미를 가져가자

// play 변수 제거 하기
// performance를 통해서 가져오는 값이므로 -> 굳이 매개변수로 전달할 필요가 없다
// amountFor 안에서 계산 해주자
// 긴 함수를 쪼갤 때 이런 부분을 최대한 제거해주라
// 임시변수를 질의함수로 바꾸기 ?

// 다음 변수 인라인 하기
// 가장 공감이 조금 덜한 부분
// 인라인으로 넣어준다라 ...
// playFor(perf) 이게 쓰는 부분이 많은 걸 play로 줄여서
// 여러군데 써주면 이게 더 가독성이 좋을 것 같은데 ???

const usd = (aNumber) =>
  new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100)

function playFor(aPerformance) {
  return plays[aPerformance.playID]
}
function statment(invocie, plays) {
  let result = `청구 내역 (고객명: ${inovice.customer})\n`

  function amountFor(aPerformance) {
    let result = 0
    switch (playFor(aPerformance).type) {
      case 'tragedy': {
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      }
      case 'comedy': {
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      }
      default: {
        throw new Error(`알 수 없는 장르 ${playFor(aPerformance).type}`)
      }
    }
    return result
  }

  function volumeCreditsFor(perf) {
    let result = 0
    result += Math.max(perf.audience - 30, 0)
    if ('comedy' === playFor(perf).type) {
      result += Math.floor(perf.audience / 5)
    }
    return result
  }

  // for 문 분리
  function totalAmount() {
    let totalAmount = 0
    for (let perf of invocie.performances) {
      // 청구 내역을 출력한다.
      totalAmount += amountFor(perf)
      result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} 석) \n`
    }
    return totalAmount
  }

  function totalVolumeCredits() {
    let volumeCredits = 0
    for (let perf of invocie.performances) {
      volumeCredits += volumeCreditsFor(perf)
    }
    return volumeCredits
  }
  for (let perf of invocie.performances) {
    // 청구 내역을 출력한다.
    totalAmount += amountFor(perf)
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} 석) \n`
  }

  result += `총액 ${usd(totalAmount())}`

  result += `적립포인트 ${totalVolumeCredits()} \n`
  return result
}
