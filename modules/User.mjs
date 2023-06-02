import { Schema, model } from 'mongoose';

const UserSchema = new Schema({ 
  name: [{type: String}],
  email: {  
    type: String, 
    unique: true,
    require: true,
    validate: {
      validator: v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v),
      message: '{VALUE} is not a valid email address'
    } 
  },
  messages: [{ 
    type: String, 
    require: true,
    validate: {
      validator: v => !!v.length,
      message: '{VALUE} message is to short.'
    },
    created: { 
      type: Date, 
      default: Date.now() 
    },
    minLength: 1, 
    maxLength: 5000,
    required: true, 
  }],

});


export const User = model('User', UserSchema)
