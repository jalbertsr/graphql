import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import fetch from 'node-fetch'

const BASE_URL = 'http://localhost:3000'

function getPersonByURL (relativeURL) {
  fetch(`${BASE_URL}/${relativeURL}`)
    .then(res => res.json())
    .then(res => res.person)
}
const PersonType = new GraphQLObjectType({
  name: 'Person',
  decription: '...',

  field: () => ({
    firstName: {
      type: GraphQLString,
      resolve: (person) => person.first_name
    },
    lastName: {
      type: GraphQLString,
      resolve: (person) => person.last_name
    },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    id: { type: GraphQLString },
    friends: {
      type: GraphQLList(PersonType),
      resolve: (person) =>
        person.friends.map(getPersonByURL)
    }

  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) =>
        getPersonByURL(`people/${args.id}`)
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
})
