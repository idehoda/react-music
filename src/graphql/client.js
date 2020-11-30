import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import { GET_QUEUED_SONGS } from './queries';

export const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://apl-music.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache(),
    typeDefs: gql`
        type Song {
            id: uuid!,
            artist: String!,
            title:  String!,
            thumbnail:  String!,
            url:  String!,
            duration: Float!
        }
        type Query {
            queue: [Song]!
        }
        input SongInput {
            id: uuid!,
            artist: String!,
            title:  String!,
            thumbnail:  String!,
            url:  String!,
            duration: Float!
        }
        type Mutation {
            addOrRemoveFromQueue(input: SongInput!): [Song]!
        }
    `,
    resolvers: {
        Mutation: {
            addOrRemoveFromQueue: (_, { input }, { cache }) => {
                const queryResult = cache.readQuery({
                    query: GET_QUEUED_SONGS
                })
                if (!queryResult) {
                    return [];
                } 
                const { queue } = queryResult;
                const isInQueue = queue.some( song => song.id === input.id);
                const newQueue = isInQueue ? 
                queue.filter(song => song.id !== input.id)
                : [ ...queue, input ];
                cache.writeQuery({
                    query: GET_QUEUED_SONGS,
                    data: { queue: newQueue }
                })
                return newQueue;
            }
        }
    }
});

const data = {
    queue: JSON.parse(localStorage.getItem('queue')) || []
};

client.writeData({ data });