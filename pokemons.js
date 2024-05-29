const baseURL = 'https://pokeapi.co/api/v2/pokemon'
const getPokeBtn = document.querySelector('button')
const drawnCards = document.getElementById('drawnCards')

function getAll() {
    return axios.get(`${baseURL}`, {params: {limit: 1302}})
}

const selectedPokemons = []

function buildCard(name, image, text) {
    const column = document.createElement('div')
    column.className = 'col-4'
    const card = document.createElement('div')
    card.className = 'card'
    const cardImage = document.createElement('img')
    cardImage.src = image
    cardImage.style = 'width: 100%'
    const container = document.createElement('div')
    container.className = 'container'
    const cardText = document.createElement('div')
    cardText.innerHTML = `<h4><b>${name}</b></h4>
                    <p>${text}</p>`

    column.append(card)
    card.append(cardImage)
    card.append(container)
    container.append(cardText)
    drawnCards.append(column)

}
function drawPokemons() {
    drawnCards.innerHTML = ''
    getAll().then(res => {
        const selection = selectRandomPoke(res.data.results)

        Promise.all(selection)
            .then(pokemons => {
                for (poke of pokemons) {
                    const name = poke.data.name;
                    const image = poke.data.sprites.front_default
                    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${poke.data.species.name}/`)
                        .then(res => {
                            for (fte of res.data.flavor_text_entries) {
                                if (fte.language.name === 'en') {
                                    const species_text = fte.flavor_text
                                    buildCard(name, image, species_text)
                                    return
                                }
                            }
                            buildCard(name, image, 'No english description found')
                        })
                }
            })
            .catch(err => console.log(err))
    })
}

function selectRandomPoke(pokemons) {
    const selectedPokemons = []
    for (let i = 0; i < 3; i++) {
        const selectedPokemon = pokemons[Math.floor(Math.random() * 1302)]
        selectedPokemons.push(axios.get(selectedPokemon.url))
    }

    return selectedPokemons;
}

function getSpeciesText(species_name, name) {
    const species = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${species_name}/`)
        .then(res => {
            for (fte of res.data.flavor_text_entries) {
                if (fte.language.name === 'en') {
                    return [name, fte.flavor_text]
                } else {
                    return [name, null]
                }
            }
        })
}

getAll()
    .then(res => {
        for (let i = 0; i < 3; i++) {
            const selectedPokemon = res.data.results[Math.floor(Math.random() * 1302)]
            selectedPokemons.push(axios.get(selectedPokemon.url))
        }
        Promise.all(selectedPokemons)
            .then(pokemons => {
                for (poke of pokemons) {
                    const name = poke.data.name
                    const species = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${poke.data.species.name}/`)
                        .then(res => {
                            for (fte of res.data.flavor_text_entries) {
                                if (fte.language.name === 'en') {
                                    console.log(`${name}: ${fte.flavor_text}`)
                                    return
                                }
                            }

                            console.log(name, 'No english description found')
                        })
                }
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

getPokeBtn.addEventListener('click', drawPokemons)
document.addEventListener('DOMContentLoaded', function () {
    getAll()
        .then(res => {
            deck = res.data.deck_id
        })
        .catch(err => console.log(err))
})