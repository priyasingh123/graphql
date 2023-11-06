// we are going to have game object, review object, auth object 
// think of game, review and auth as node of a graph

export const typeDefs = `#graphql
    type Game {
        # we can make field required by putting !
        # it means that id is non-nullable 
        id: ID!
        title: String!
        platform: [String!]!  # this means array fo string
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }

    type Query {
        #first entry point is review which returns array of Review
        reviews: [Review]
        # entry point for only one review attained using id which cannot be nullable

        # query q($id: ID!) {
        # review(id: $id) {
        #     rating, 
        #     content
        # }
        # }

        
        review(id: ID!): Review
        games: [Game]
        authors: [Author]
    }

`