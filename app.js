const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const winston = require('./config/winston');
const env = require('./config/env');
const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/graphql', graphqlHTTP({  
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

(async () => {
  const URI = `mongodb://localhost:27017/${env.database}`;
  await mongoose.connect(URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
  })
  .then(() => {
    console.log('connected to the db');
  })
  .catch(err => {
    console.error('connection failed ' + err);
  });
})();
  
app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});

module.exports = app;