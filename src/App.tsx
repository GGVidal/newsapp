/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {
  createClient,
  dedupExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from 'urql';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {RootNavigator} from './screens/Root.navigator';
import {cacheExchange} from '@urql/exchange-graphcache';
import schema from './graphql/graphql.schema.json';
import {
  AddBookmarkMutation,
  AllBookmarksQuery,
} from './graphql/__generated__/operationTypes';
import {BOOKMARKS_QUERY} from './queries/allBookmarks.graphql';

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      schema: schema as any,
      resolvers: {
        Query: {
          story: (_, args) => ({__typename: 'Story', id: args.id}),
        },
      },
      updates: {
        Mutation: {
          addBookmark: (result: AddBookmarkMutation, args, cache) => {
            if (result.addBookmark) {
              cache.updateQuery(
                {query: BOOKMARKS_QUERY},
                (data: AllBookmarksQuery | null) => {
                  if (data && data.bookmarks && result.addBookmark) {
                    data.bookmarks.push(result.addBookmark);
                  }
                  return data;
                },
              );
            }
          },
        },
      },
    }),
    fetchExchange,
  ],
});

const App = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <StatusBar hidden />
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};

export default App;
