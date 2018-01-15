import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Main App export
export default class ApolloApp extends React.Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <SafeAreaView>
          <MovieDetails />
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}
 
// Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr' }),
  cache: new InMemoryCache().restore({})
});
 
// Example query from https://www.graph.cool/
const MOVIE_QUERY = gql`
{
  allMovies {
    title
    actors {
      name
    }
  }
}
`;
 
// MovieDetails Component
const MovieDetails = graphql(MOVIE_QUERY)(({ data }) => {
  const { loading, allMovies } = data

  if (loading) return <View><Text>loading...</Text></View>

  return (
    <View style={{ padding: 10 }}>
      {allMovies.map(({ title, actors }) => (
        <Text key={title}>
          {title}: {actors.map(({ name }) => name).join(', ')}
          {'\n'}
        </Text>
      ))}
    </View>
  )
});