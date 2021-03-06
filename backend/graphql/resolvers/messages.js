const Message =require('../../models/messageSchema')

module.exports={
   
    Mutation:{
      async createMessage(_,{messageInput:{text,username}}){
       const newMessage = new Message({
           text:text,
           username:username,
           createdBy:username,
           createdAt:new Date().toISOString()
       })

       const res = await newMessage.save();
       console.log(res);
       return{
           id:res.id,
           ...res._doc
       }
      } 
    },
    
    Query:{
      message:(_,ID)=>{ 
        // console.log(ID.id);
        const id=JSON.stringify(ID)
        console.log(id);
         return Message.findById(id)
        }
    }
}