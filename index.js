import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import db from "./db.js";
//types defined for graphql
import { typeDefs } from "./schema.js";

const resolvers = {
    //we write resolver function f or every type
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

console.log ('Server ready at port ', 4000)