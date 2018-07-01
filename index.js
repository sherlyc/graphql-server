'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video.'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds).'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video.'
    }
  },
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false,
        })
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
})

const videoA = {
  id: 'a',
  title: 'video A',
  duration: 120,
  watched: true
}

const videoB = {
  id: 'b',
  title: 'video B',
  duration: 90,
  watched: true
}

const videos = [videoA, videoB]

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
