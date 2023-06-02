
import { config } from 'dotenv'
import { Router } from 'express'
import sendgrid from '@sendgrid/mail';
import { User } from '../modules/User.mjs'

export const sendEmailRoute = new Router()

async function sendEmail(req, res) {
      config()
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '')
      const { name, message } = req.body;
      const email = `${req.body.email}`;
      try {
        const userExist = await User.findOne({ email });
        if (userExist) {
          console.log('user already exist. updating user...')
          await User.findOneAndUpdate(
            { email },
            {
              name: userExist.name.find(n => n === name) ? userExist.name : userExist.name.concat(name),
              messages: [...new Set([...userExist.messages, message])],
            }
          )
        } else {
          console.log('user not exist. creating user...')
          const newUser = await User.create({
            name: [name],
            email,
            messages: [message],
          })
          console.log(newUser)
        }
      } catch (error) {
        console.log(error.message)
      }
    
      console.log('post saved');
      try {
        await sendgrid.send({
          from: 'thanks@guribs.com',
          to:  email ?? 'guri240@gmail.com',
          subject: `thanks for your message, ${name}`,
          html: `
          <div>
            <h1>i got your message, ${name}!</h1>
            <code>i will back to you as soon as possible :)\nhave a nice day!</code>
          </div>`
        })
        console.log(`thanks email sended to ${email}`)
    
    
        const user = await User.findOne({ email });
        await sendgrid.send({
            from: 'services@guribs.com',
            to: process.env.GMAIL,
            subject: `${name} send you a message`,
            html: `
            <div>    
              <p>message:${message.trim()}</p>
              <div>
              <h1>${name} details:</h1>
                <p>email: ${user.email}</p>
                names: <ul>
                ${user.name?.map( name => `<li>${name.trim()}</li>`)}
                </ul>
                messages: <ul>
                ${user.messages?.map( message => `<li>${message.trim()}</li>`).join('')}
                </ul>
              </div>
            </div
            `,
          })
          console.log(`copy sent to ${process.env.GMAIL}`)
      } catch (error) {
        console.error(error);
        return error.message;
      }
    
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        html,body{
          margin: 0;
        }
          body {
            background-color: #f7f7f7;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-family: "Lato", sans-serif;
            font-weight: 300;
            line-height: 1.4;
            min-height: 100vh;
            max-height: 100vh;
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding:0;
          }
          div {
            max-width: 650px;
            border-radius: 10px;
            padding: 20px;
            background-color: #fff;
            border-radius: 2px;
            -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.13);
            box-shadow: 0 1px 3px rgba(0,0,0,.13);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h1{
            font-size: 24px;
            font-weight: 300;
            line-height: 1.1;
            margin-bottom: 10px;
          }
          button{
            border: 0;
            background-color: #669;
            color: #fff;
            font-size: 16px;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 10px;
            -webkit-transition: all .2s ease;
            transition: all .2s ease;
          }
          button:hover{
            background-color: #678
          }
        </style>
        <title>thanks, ${name}</title>
      </head>
      <body>
        <div>
          <h1>thanks for your message, ${name}</h1>
          <button onClick="window.location.href = '/'">back to Homepage</button>
        </div>
      </body>
      </html>
      `);
} 

sendEmailRoute.post('/', sendEmail);