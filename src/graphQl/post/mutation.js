export const mutations = `
    createPost(title:String! content:String!) : Post
    updatePost(title:String! content:String!) : Post
    deletePost(_id:ID!) : DeletePost
`