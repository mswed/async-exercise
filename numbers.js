const multipleNumbers = document.getElementById('multiple-numbers')
const multipleFacts = document.getElementById('multiple-facts')
const BASEURL = ' http://numbersapi.com';
const favNum = 13;
const MIN = 7;
const MAX = 12;

// Async Fav number fact
async function getFavNumberFact() {
    try {
        let trivia = await axios.get(`${BASEURL}/${favNum}`, {params: {json: true}})
        console.log('Favorite number fact:')
        console.log(trivia.data.text)
        return trivia.data.text
    } catch (e) {
        console.log(e)
        return e
    }

}

getFavNumberFact()

// Multiple numbers in a single query

async function getMultipleNumbersTrivia() {
    try {
        let res = await axios.get(`${BASEURL}/${MIN}..${MAX}`, {params: {json: true}})
        console.log('Facts about multiple numbers:')
        console.log(res.data)
        console.log(typeof res.data)
        for (const num in res.data) {
            const number = document.createElement('li');
            number.innerText = res.data[num];
            multipleNumbers.append(number)
        }
    } catch (e){
        console.log(e)
    }

}

getMultipleNumbersTrivia()


async function getMultipleFacts() {
    const facts = []
    for (let i = 0; i < 4; i++) {
        const fact =  axios.get(`${BASEURL}/${favNum}`, {params: {json: true}})
        facts.push(fact)
    }

    for (const fact of facts) {
        const text = await fact;
        const factElement = document.createElement('li');
        factElement.innerText = text.data.text
        multipleFacts.append(factElement)
    }
}

getMultipleFacts()
