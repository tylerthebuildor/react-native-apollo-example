import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'
 
// Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr' }),
  cache: new InMemoryCache().restore({})
})
 
// Example query from https://www.graph.cool/
const MOVIE_QUERY = gql`
{
  Movie(id: "cixos5gtq0ogi0126tvekxo27") {
    id
    title
    actors {
       name
    }
  }
}
`
 
// Our App
const App = graphql(MOVIE_QUERY)(({ data }) => {
  const { loading, Movie } = data
  // Loading
  if (loading) return <View><Text>loading...</Text></View>
  
  // Loaded
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>
        {Movie.title}:
      </Text>
      <Text>
        {Movie.actors.map(({ name }) => name).join(', ')}
      </Text>
    </View>
  )
})
 
export default class ApolloApp extends React.Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <SafeAreaView>
          <App />
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}

