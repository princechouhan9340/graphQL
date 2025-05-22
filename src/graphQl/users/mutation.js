

export const mutations =`
    createUser(firstName: String! lastName: String! email: String! password: String!): User
    updateUser(firstName: String! lastName: String! email: String! password: String! profileImg: String): User
    deleteUser(email: String!): Delete
`