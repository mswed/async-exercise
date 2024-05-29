const hitMeBtn = document.querySelector('button')
const cards = document.querySelector('div.cards')
const baseURL = 'https://deckofcardsapi.com/api/deck'
let endGame = false;

let deck = ''

class Deck {
    constructor() {
        this.deckID = null;
        this.newShuffle()
    }

    async newShuffle() {
        // Create a new deck and shuffle it (the api has a call for that, but I'll do it here instead

        await this.new()
        this.shuffle()
    }
    async new() {
        const res = await axios.get(`${baseURL}/new/`)
        this.deckID = res.data.deck_id

    }

    async shuffle() {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/shuffle/`)
        console.log('Shuffled the deck!')
    }
    async drawCard() {
        try {
            const res = await axios.get(`${baseURL}/${this.deckID}/draw`, {params: {count: 1}})
            const {remaining} = res.data
            const {suit, value, image} = res.data.cards[0]
            console.log(remaining)
            return {suit, value, image, remaining}
        } catch (e) {
            console.log(e)
        }


    }


}

hitMeBtn.addEventListener('click', async (e) => {
    if (endGame) {
        alert('Out of cards! Refresh the page to play again')
        return
    }

    const card = await deck.drawCard()
    const cardElement = document.createElement('img')
    cardElement.src = card.image
    cardElement.className = 'card'
    const angle = Math.floor(Math.random() * 20)

    cardElement.style.rotate = `${angle}deg`
    cards.append(cardElement)
    if (card.remaining === 0) {
        endGame = true;

    }
})



document.addEventListener('DOMContentLoaded', function () {
    deck = new Deck()
})