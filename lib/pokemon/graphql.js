const {makeExecutableSchema} = require('graphql-tools');

const resolvers = {
    Query: {
        async pokemon(parent, {id}, {api, favorites}) {
            if (!!id) {
                const pokemon = await api.get(id);
                if (!!pokemon) {
                    const fav = favorites(id);
                    pokemon.favCount = fav.favCount;
                    return [pokemon];
                }
                return [];
            }
            return await api.list(0);
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
