const baseURL = 'https://deckofcardsapi.com/api/deck'

function newDeck() {
    return axios.get(`${baseURL}/new/shuffle/`, {params: {deck_count: 1}})
}

function drawCard(deck) {
    return axios.get(`${baseURL}/${deck}/draw`, {params: {count: 1}})
}

// Create a new deck and draw a card
newDeck()
    .then(res => {
        console.log('Created deck:', res)
        drawCard(res.data.deck_id)
            .then(res => {
                console.log(`Drew a card from deck ${res.data.deck_id}`)
                console.log(res.data.cards[0].value)
                console.log(res.data.cards[0].suit)

            }).catch(err => console.log(err))

    })
    .catch(err => console.log(err))

// Create a new deck and draw two cards (one after the other)
const cards = []
newDeck()
    .then(res => {
        console.log('Created deck:', res)
        drawCard(res.data.deck_id)
            .then(res => {
                console.log(`Drew a card from deck ${res.data.deck_id}`)
                cards.push({value: res.data.cards[0].value, suit: res.data.cards[0].suit})
                return drawCard(res.data.deck_id)
                    .then(res => {
                        console.log(`Drew a card from deck ${res.data.deck_id}`)
                        cards.push({value: res.data.cards[0].value, suit: res.data.cards[0].suit})
                        console.log(cards)

                    })

            })
            .catch(err => console.log(err))

    })
    .catch(err => console.log(err))