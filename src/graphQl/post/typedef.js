
export const typeDefs = `
    scalar Date

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
        createdAt: Date!
    }

    type DeletePost {
        message: String!
    }

`