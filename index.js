'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(`
type Video {
  id: ID,
  title: String,
  duration: Int,
  watched: Boolean

}
type Query {
  video: Video
  videos: [Video]
}

type Schema {
  query: Query
}
`);

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

const resolvers = {
  video: () => ({
    id: () => '1',
    title: () => 'bar',
    duration: () => 180,
    watched: () => true,
  }),
  videos: () => videos,

};

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
