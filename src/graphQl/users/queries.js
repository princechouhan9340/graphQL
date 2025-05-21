
export const queries =  `
    getUser(email: String!): User
    getUsers: [User]
    loginUser(email: String! password: String!): Token
`