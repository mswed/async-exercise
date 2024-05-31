const baseURL = 'https://pokeapi.co/api/v2/pokemon'
const getPokeBtn = document.querySelector('button')
const drawnCards = document.getElementById('drawnCards')
let game = null;

class PokemonGame {
    constructor() {
        this.totalPokemons = null;
        this.allPokemons = null;
        this.selectedPokemonDetails = [];
        this.pokemons = {};
        this.getAllPoke()

    }

    async draw() {
        this.selectedPokemonDetails = [];
        this.pokemons = {};
        await this.selectRandomPoke()
        await this.buildPokemon()
        await this.getSpeciesDetails()

        console.log(this.pokemons)
        for (const p in this.pokemons) {
            if (this.pokemons.hasOwnProperty(p)) {
                console.log(`${p}: ${this.pokemons[p].species}`)
                this.buildCard(p, this.pokemons[p].image, this.pokemons[p].species)
            }
        }
    }
    async countPoke() {
        const res = await axios.get(`${baseURL}`)
        this.totalPokemons = res.data.count
    }

    async getAllPoke() {
        await this.countPoke()
        const res = await axios.get(`${baseURL}`, {params: {limit: this.totalPokemons}})
        this.allPokemons = res.data.results
    }

    async selectRandomPoke() {
        const selectedPokemons = []
        // Select three random pokemons
        for (let i = 0; i < 3; i++) {
            const selectedPokemon = this.allPokemons[Math.floor(Math.random() * this.totalPokemons)]
            selectedPokemons.push(axios.get(selectedPokemon.url))
        }

        for (let p of selectedPokemons) {
            const d = await p
            this.selectedPokemonDetails.push(d.data)
        }
    }

    buildPokemon() {
        for (const p of this.selectedPokemonDetails) {
            this.pokemons[p.name] = {'image': p.sprites.front_default, species: null}
        }
    }

    buildCard(name, image, text) {
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

    async getSpeciesDetails() {
        const additionalDetails = [];
        for (const p of this.selectedPokemonDetails) {
            let speciesText = null;
            const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${p.species.name}/`)
            console.log(species)
            for (const fte of species.data.flavor_text_entries) {
                if (fte.language.name === 'en') {
                    speciesText = fte.flavor_text
                    console.log('Selected test', speciesText)
                    break

                }

            }
            this.pokemons[p.name]['species'] = speciesText;
        }
    }
}




getPokeBtn.addEventListener('click', async () => {
    drawnCards.innerHTML = ''
    await game.draw()
})
document.addEventListener('DOMContentLoaded', function () {
    game = new PokemonGame()
})