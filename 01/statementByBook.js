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

function statment(invocie, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${inovice.customer})\n`
    const format = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format

    function playFor(aPerformance){
        return plays[aPerformance.playID]
    }

    function amountFor(aPerformance, play){
        let result = 0;
        switch(play.type){
            case "tragedy": {
                result = 40000; 
                if(aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30)
                }
               break;
            }
            case "comedy": {
                result = 30000;
                if(aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20)
                }
                result += 300 * aPerformance.audience
                break;
            }
            default: {
                throw new Error(`알 수 없는 장르 ${aPerformance.type}`)
            }
        }
        return result;
    }

    for(let perf of invocie.performances) {
        // 이 부분도 궁금하다 
        // playFor amountFor 가독성 괜찮???
        // getPlay ? playFor 이런 느낌이려나 ?
        const play = playFor(perf)
        let thisAmount = amountFor(perf, play);

      
        // 포인트를 적립한다 
        volumeCredits += Math.max(perf.audience - 30, 0);

        // 희극 관객 5명 마다 추가 포인트를 제공한다.
        if('comedy' === play.type){
            volumeCredits += Math.floor(perf.audience / 5)
        }
        // 청구 내역을 출력한다. 
        result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience} 석) \n`
        totalAmount += thisAmount
    }
    result += `총액 ${format(totalAmount / 100)}`
    return result;
}
