// checkList 

// 별도의 함수로 빼냈을 때 값을 변경시키는지 ? 
// 매개변수로서만 참조만 한다면 괜찮음 

// 하나 고친 후 테스트 코드를 돌려서 확인한다. 
// -> 변경점이 많은 후에 테스트 하면 -> 디버깅이 어렵기 때문이다 

// 조금씩 수정하여 피드백 주기를 짧게 가져간다. 

// 테스트 -> 이상 없으면 커밋한다 
// -> 난 반대네 커밋하고 -> 디버깅 했는데 습관이 _ㅇ ...
// 그리고 어느정도 피쳐개발 수준으로 커밋이 쌓이면 푸시를 한다 ->



function statment(invocie, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${inovice.customer})\n`
    const format = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format

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
        const play = plays[perf.playID]
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
