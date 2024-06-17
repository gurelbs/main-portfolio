import { Schema, model } from 'mongoose';

const UserSchema = new Schema({ 
  name: [{type: String}],
  email: {  
    type: String, 
    require: true,
  },
  message: { 
    type: String, 
    require: true,
    created: { 
      type: Date, 
      default: Date.now() 
    },
    minLength: 1, 
    maxLength: 5000,
    required: true, 
  },

});


export const User = model('User', UserSchema)
