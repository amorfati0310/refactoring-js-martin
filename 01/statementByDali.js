/*
invoice  {
    customer: String
    performances: [performance]
}
plays  [play]

return result string
*/

// 1. return type 이나 param type 명시되면 좋을 듯  
// 2. statement -> getStatement 
// 함수는 동사 + 명사 행위나 의도를 나타내면 더 좋을 듯 
// 3. invoice 에서 perofrmance만 필요하다




// ETC `
// format  new Intl -> 잘 모름 일단 넘어가자 

function statment({performances}, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${inovice.customer})\n`
    const format = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format

    for(let perf of performances) {
        const play = plays[perf.playID]
        let thisAmount = 0;

        switch(play.type){
            case "tragedy": {
                thisAmount = 40000; 
                if(perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30)
                }
                break;
            }
            case "comedy": {
                thisAmount = 30000; 
                if(perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20)
                }
                thisAmount += 300 * perf.audience
                break;
            }
            default: {
                throw new Error(`알 수 없는 장르 ${play.type}`)
            }
        }
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
    return result
}
