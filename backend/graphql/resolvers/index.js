const messageResolver =require('./messages')
const userResolver= require('./users')

module.exports={
    Query:{
      ...messageResolver.Query,  
      ...userResolver.Query  
    },
    Mutation:{
      ...messageResolver.Mutation,
      ...userResolver.Mutation
    }
}
