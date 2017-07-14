# Learning GraphQL by Example!

So you have heard about GraphQL! Awesome stuff isn't it, I like it too :). If you are 
completely new to GraphQL and are looking for a nice way to learn GraphQL that goes
a little further then just 'Hello World' then you have come to the right place :). Please do note
that this workshop revolves completely around the server side implementation. Client side
usage of GraphQL API's might be something to create later in a separate workshop.
 
_Please note that this is an evolving (and a working in progress) tutorial and might grow in content over time._

This project might be in a stage where you are now, you have created a nice REST API
and are thinking about possibly expanding it with a GraphQL endpoint as well. As we
are mostly concerned about the GraphQL implementation the REST API is provided for
you to create the assignments on.

The prerequisites for this workshop are:

- Basic [Javascript](https://www.javascript.com/) knowledge
- Basic [NodeJS](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/) knowledge

Let's start with a quick overview of our application.

The core frameworks we use to build our REST API are:

- [Express](https://expressjs.com/) is used as our web framework of choice
- [Winston](https://github.com/winstonjs/winston) is used as our logging framework
- [RequestJS](https://github.com/request/request) to call our external service
- [PokeAPI](https://pokeapi.co/) is used as our endpoint to retrieve our data

To test and develop our application we a few frameworks to make everything easier and better to maintain:

- [MochaJS](https://mochajs.org/) as our core testing framework
- [SuperTest](https://github.com/visionmedia/supertest) for HTTP assertions
- [Nock](https://github.com/node-nock/nock) to mock (and record) our responses
- [Istanbul](https://github.com/gotwarlost/istanbul) to get some nice code coverage too
- [Nodemon](https://github.com/remy/nodemon) to instantly reload the application on code changes
- [EsLint](http://eslint.org/) to lint our code

Here are some pre-made scripts that can be used right away:

Start the application (available under http://localhost:3000/api/pokemon if using default configuration) 

```
$ npm start 
```

Start the application in development mode (by default with **mocked** responses)

```
$ npm run development
```

Run all the tests (in with mocked responses)
 
```
$ npm test
```

Run all tests against the real endpoint and record all responses

```
$ npm run test-and-record
```

Lint our code

```
npm run lint
```

It is quite a complete sample application, however the functionality that it contains 
is rather basic for but we will start to extend it with the assignments below. However before we 
go straight into the assignments let's first start with some GraphQL resources. There are quite a few
great resources that you can use to gain some basic knowledge on what GraphQL is and how to start 
implementing it. Here are just a few that you should start with in my opinion:

- [GraphQL's](http://graphql.org/learn/) own documentation is really good! Should be your first resource to visit :).
- [Apollo GraphQL Server](http://dev.apollodata.com/tools/graphql-server/index.html) as this is the implementation that 
we will be using for our application
- [Introduction Video](https://youtu.be/UBGzsb2UkeY) a great way to get introduced to GraphQL
- [GraphQL at Facebook](https://www.youtube.com/watch?v=etax3aEe2dA) something to watch if you think GraphQL is not ready for production use :)

# Assignments

### #1 Read documentation and watch video content

Not much to add here :) before we continue first read up on the basics with the provided links which should
not take you more then an hour. However if you like the practical approach more (like me) just skip on to the
next assignment :).

### #2 Clone / Branch & Install

Clone this repo, create your own working branch (or just fork this repo instead) and start by installing all the
required dependencies that you will need for this project. 
  
- [GraphQL](https://www.npmjs.com/package/graphql) 
- [Apollo GraphQL server](http://dev.apollodata.com/tools/graphql-server/index.html)
- [Apollo GraphQL tools](http://dev.apollodata.com/tools/graphql-tools/index.html)

```
$ npm install body-parser graphql graphql-server-express graphql-tools --save
```

### #3 Create a GraphQL Schema

Create a schema for your GraphQL API using GraphQL tools as documented [here](http://dev.apollodata.com/tools/graphql-tools/generate-schema.html).
Let's initially start with just listing our pokemon, so create a Schema that should be able to parse
the GraphQL query below:

```
query listPokemon {
  pokemon {
    id
    name
  }
}
```

### #4 Create a GraphQL resolver

Create a resolver for your schema to resolve the pokemon from the endpoint. Use the documentation [here](http://dev.apollodata.com/tools/graphql-tools/resolvers.html)
to setup your resolver and link it to your schema. Don't forget that you can reuse [the pokemon client](lib/pokemon/client.js) 
to perform the interaction with the endpoint.

### #5 Add your GraphQL endpoint to express

Configure a new [express router](https://expressjs.com/en/guide/routing.html) and configure Apollo's GraphQL server on this route 
as documented [here](http://dev.apollodata.com/tools/graphql-server/setup.html).

Your GraphQL endpoint should be configured on /api/pokemon/graphql.

Make sure that you also enable [Graph*i*QL](https://github.com/graphql/graphiql) in the server as we will be using this
AMAZING utility to manually test our GraphQL API.

Graph*i*QL should be made available on /api/pokemon/graphql/graphiql.

### #6 Test 

You should have your GraphQL endpoint up and running at this stage! Test it by playing with GraphiQL.

### #7 Add the ability to retrieve details of a single pokemon

Expand your GraphQL API, this time we want to be able to retrieve details on a pokemon with the query below.

```
# Example basic query
query getPokemon {
  pokemon(id: 1) {
    id
    name
    stats {
      name
    }
  }
}
```

Adjust your schema and resolvers accordingly.

### #8 Testing

Create a new test suite, testing your GraphQL API.

### #9 Mock using Apollo Tools

Mock your entire GraphQL API as described [here](http://dev.apollodata.com/tools/graphql-tools/mocking.html). Add a new 
npm script **start-mock** that starts up with a new environment variable MOCK_GRAPHQL. If this variable is set to true the GraphQL API
should be using mocked values. As a bonus write your own mock generators to generate real pokemon names.

### #10 Add a mutation

Add a way to retrieve favorite pokemon (sorted by number of votes) and a way to vote for your 
favorite pokemon. Read more about mutations [here](http://graphql.org/learn/queries/).

The schema should be updated to be able to retrieve the favorites count on a specific pokemon as well as 
add a mutation to update the favorites count:

The following query should retrieve the favCount of pokemon 1.

```
query listPokemon {
  pokemon(id: 1){
    id
    name
    favCount
  }
}
```

The following mutation should increment the favCount of pokemon 1 by 1.

```
mutation incrementCounter {
  incrementFavorite(id: 1) {
    id
  }
}
```

### TODO

**TODO** _Add more steps (subscriptions/dataloader/etc)_

