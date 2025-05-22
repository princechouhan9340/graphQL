
export const queries =  `
    getUser(_id: String!): User
    getUsers: [User]
    loginUser(email: String! password: String!): Token
`