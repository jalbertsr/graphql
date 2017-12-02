const express = require('express')
const graphqlHTTP = require('express-graphql')
const fetch = require('node-fetch')
const DataLoader = require('dataloader')

const schema = require('./schema.js')

const app = express()

const BASE_URL = 'http://localhost:3000'

function getPersonByURL (relativeURL) {
  fetch(`${BASE_URL}/${relativeURL}`)
    .then(res => res.json())
    .then(res => res.person)
}

app.use(graphqlHTTP(res => {
  const personLoader = new DataLoader(
    keys => Promise.all(keys.map(getPersonByURL))
  )
  const loaders = {
    person: personLoader
  }
  return {
    context: { loaders },
    schema: schema,
    rootValue: root,
    graphiql: true
  }
}))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
