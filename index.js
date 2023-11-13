import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import db from "./db.js";
//types defined for graphql
import { typeDefs } from "./schema.js";

const resolvers = {
    //we write resolver function for every type
    // in Query resolver, we write functions for starting point for graph 
    Query: {
        //games is taken from type Query mentioned
        // in schema
        games() {
            //it will return array of game object
            return db.games
            /*
                for this particular query we 
                will write
                games {
                    title
                }
                Apollo server will only send title 
                and not entire object
            */
        },
        authors() {
            return db.authors
        }, 
        reviews() {
            return db.reviews
        }, 
        //we have access to three arguments automatically
        //first argument => parent
        //second argument => args

        review(parent, args, context) {
            return db.reviews.find((review) => review.id === args.id)
        },
        game(parent, args, context) {
            return db.games.find((game) => game.id === args.id)
        },

        author(parent, args, context) {
            return db.authors.find((author) => author.id === args.id)
        }
    }, 
    Game: {
        //here parent will be game 
        // it will be called when nested query is called
        //whose parent is "game"
        reviews(parent, args, context) {
            return db.reviews?.filter((review) => {
                return review.game_id === parent.id
            }) 
        }
        /*
            query gameQuery ($id: ID!){
                game(id: $id) {
                    id
                    title
                    reviews {
                        rating content
                    }
                }
            }

        */
    }, 
    Author: {
        reviews(parent, args, content) {
            return db.reviews.filter ((review) => {
                return review?.author_id === parent.id
            })
        }
    },

    Review: {
        author(parent){
            return db.authors.find ((author) => author.id === parent.author_id)
        },
        
        game(parent){
            return db.games.find ((game) => game.id === parent.game_id)
        }
    }, 
    Mutation: {
        deleteGame(parent, args, context) {
            db.games = db.games.filter ((game) => game.id !== args.id)
            return db.games
        },
        addGame(parent, args, context) {
            db.games.push ({...args.game, id:'100'})
            return db.games
        },
        updatedGame(_, args){
            db.games = db.games.map ((g) => {
                if (g.id === args.id) {
                    return {...g, ...args.edits}
                }
                return g
            })
            return db.games.find ((game) => game.id === args.id)
        }
    }
}

//server setup
//ApolloServer takes in two arguments 
const server = new ApolloServer({
    //first argument => typeDefs => data that we want 
    //to be available in graph
    typeDefs, resolvers

    //second argument => resolvers 
})


// starting Apollo server
const {url} = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})

console.log (url, 4000)