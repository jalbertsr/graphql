import { 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: () => 
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
})
