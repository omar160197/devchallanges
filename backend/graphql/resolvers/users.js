const User = require("../../models/userSchema");

const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
  Mutation: {
    async registerUser(_,{ registerInput: { username, email, password, phone, bio }}) {
      //see if this user is already exists
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new ApolloError(
          "this user is already exists" + email,
          "USER_ALREADY_EXISTS"
        );
      }
      //encryption passord
      const salt = bcrypt.genSaltSync(10);
      var encryptedPassword = bcrypt.hashSync(password, salt);

      //build out mongoose model
      const newUser = new User({
        username: username,
        email: email,
        phone: phone,
        bio: bio,
        password: encryptedPassword,
      });


      //create our jwt
      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.SECRET
      );
      newUser.token = token;

console.log(newUser);

      //save the new user
      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },


    
    async loginUser(_, { loginUserInput: { email, password } }) {
      //check if email exists
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        throw new ApolloError(
          "this email is not exists" + email,
          ' "USER_NOT_EXISTS"'
        );
      }

      //check password
      if (checkUser) {
        const validPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        console.log(validPassword);
        if (!validPassword) {
          throw new ApolloError(
            "this password is inCorrect",
            "PASSWORD_NOT_CORRECT"
          );
        } else {
          const token = jwt.sign(
            { user_id: checkUser._id, email },
            process.env.SECRET
          );

          checkUser.token = token;
          return {
            id: checkUser.id,
            ...checkUser._doc,
          };
        }
      }
    },

    async updateUser(_,{updateUserInput:{username,phone,bio,password,email}}){
      console.log(email); 

     const user = await User.findOne({email})
       //encryption passord
       const salt = bcrypt.genSaltSync(10);
       var encryptedPassword = bcrypt.hashSync(password, salt);

     user.username=username
     user.phone=phone
     user.bio=bio
     user.password=encryptedPassword
   
     const res = await user.save()
     return {
       id: res.id,
       ...res._doc,
     };
     },
  },


  


  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
