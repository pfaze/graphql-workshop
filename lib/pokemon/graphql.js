const {makeExecutableSchema} = require('graphql-tools');

const resolvers = {
    Query: {
        async pokemon(parent, {id}, {api, validator}) {
            console.log(await api.list(0))
            if (!!id && validator.isNumeric(id)) {
                const pokemon = await api.get(id);
                console.log(pokemon)
                if(!!pokemon) {
                    return [pokemon];
                }
                return [];
            }
            return await api.list(0);
        }
    }
};

const Schema = `
type SimplePokemon {
    id: Int!
    name: String!
}

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
}

type Query {
    pokemon(id: String): [Pokemon]
}
`;

module.exports = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: resolvers
});
