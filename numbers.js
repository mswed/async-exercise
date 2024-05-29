const UL = document.querySelector('ul')
const BASEURL = ' http://numbersapi.com';
const favNum = 13;
const MIN = 7;
const MAX = 12;

function getFavNumberFact() {
    let trivia = axios.get(`${BASEURL}/${favNum}`, {params: {json: true}})
    return trivia
}

// My fav number
getFavNumberFact()
    .then(res => {
        console.log('Favorite number fact:')
        console.log(res.data.text)
    })
    .catch(err => console.log(err))

// Multiple numbers in a single query
let multipleTrivia = axios.get(`${BASEURL}/${MIN}..${MAX}`, {params: {json: true}})

multipleTrivia
    .then(res => {
        console.log('Facts about multiple numbers:')
        console.log(res.data)
    })
    .catch(err => console.log(err))

// Multiple facts about my fav number
for (let i = 0; i < 4; i++) {
    const fact = getFavNumberFact()
        .then(res => {
            const fact = document.createElement('li');
            fact.innerText = res.data.text;
            UL.append(fact)

        })
        .catch(err => console.log(err))
}
