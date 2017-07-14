const favorites = [];

/**
 * Holder for pokemon favorites
 */
class Favorite {

    /**
     * Default constructor
     * @param {object} pokemon the pokemon model
     */
    constructor(pokemon) {
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.favCount = 0;
    }

    /**
     * Add a count to favorite this pokemon
     */
    increment() {
        this.favCount++;
    }

}

module.exports = (pokemon) => {
    pokemon.then((r) => r.forEach((p) => favorites.push(new Favorite(p))));
    return (id) => {
        return favorites.find((p) => p.id == id);
    };
};