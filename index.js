const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema.js')

const app = express()

app.use(graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
