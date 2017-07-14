const {makeExecutableSchema} = require('graphql-tools');

const _appendFavoriteCount = (pokemon, favorites) => {
    const fav = favorites(pokemon.id);
    pokemon.favCount = fav.favCount;
    return pokemon;
};

const resolvers = {
    Query: {
        async pokemon(parent, {id}, {api, favorites}) {
            if (!!id) {
                const pokemon = await api.get(id);
                if (!!pokemon) {
                    return [_appendFavoriteCount(pokemon, favorites)];
                }
                return [];
            }
            const pokemon = await api.list(0);
            return pokemon.map((p) => _appendFavoriteCount(p));
        }
    },
    Mutation: {
        async incrementFavorite(parent, {id}, {favorites}) {
            const fav = favorites(id);
            if (!!fav) {
                fav.increment();
                return fav;
            }
            throw new Error('Pokemon not found by provided id.');
        }
    }
};

const Schema = `
type Stat {
    name: String!
    effort: Int!
    base_stat: Int!
}

type Pokemon {
    id: Int!
    name: String!
    weight: Int
    moves: [String]
    abilities: [String]
    stats: [Stat]
    favCount: Int
}

type Mutation {
    incrementFavorite(id: Int!): Pokemon
}

type Query {
    pokemon(id: Int): [Pokemon]
}
`;

module.exports = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: resolvers
});
