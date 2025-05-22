
export const typeDefs = `
    type User{
        _id: ID!
        firstName: String!
        lastName: String!
        profileImg: String
        email: String!
    }
    
    type Token {
        token: String!
    }

    type Delete {
        message: String!
    }
`
