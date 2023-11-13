// we are going to have game object, review object, auth object 
// think of game, review and auth as node of a graph

export const typeDefs = `#graphql
    type Game {
        # we can make field required by putting !
        # it means that id is non-nullable 
        id: ID!
        title: String!
        platform: [String!]!  # this means array fo string
        #it may happen that a game does not have any Review but if review is there
        #it cannot be nullable
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
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
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        deleteGame(id: ID!) : [Game]
        #AddGameInput is custom made argument
        addGame(game: AddGameInput): [Game]
        updatedGame(id: ID!, edits: EditGameInput): Game
    }

    # AddGameInput and EditGameInput are not same
    # as EditGameInput may not receive edit for title or platform
    input AddGameInput {
        title: String!,
        platform: [String!]!
    }

    input EditGameInput {
        title: String,
        platform: [String!]
    }
`
