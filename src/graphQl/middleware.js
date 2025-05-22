export const checkAuth = (context) => {
    if(!context.user.email && !context.user._id){
        throw new error('UnAutherized')
    }
}
