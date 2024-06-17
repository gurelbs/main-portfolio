import { Router } from 'express'
import sendgrid from '@sendgrid/mail';
import { User } from '../modules/User.mjs'

export const sendEmailRoute = new Router()

async function sendEmail(req, res) {
  sendgrid.setApiKey(process.env['SENDGRID_API_KEY'])
  const { name, message } = req.body;
  const email = `${req.body.email}`;
  return await processUser(res, email, name, message);
}

async function processUser(res, email, name, message) {
 try {
  const userExist = await User.findOne({ email });
  if (!userExist) {
    console.log('user not exist. creating user...')
    await createUser(name, email, message);
  } else {
    await updateUser(email, name, message);
    console.log('user already exist. updating user...')
  }
  const isSent = await sendThankYouEmail(email, name);
  res.send(sendResponse(name, isSent));

 } catch (error) {
  console.log(error);
  res.send('Something went wrong');
 }
}

async function updateUser(email, name, message) {
  await User.findOneAndUpdate(
    { email },
    {
      name: userExist.name.find(n => n === name) ? userExist.name : userExist.name.concat(name),
      messages: [...new Set([...userExist.messages, message])],
    }
  )
}

async function createUser(name, email, message) {
  const newUser = await User.create({
    name: [name],
    email,
    messages: [message],
  })
  console.log(newUser)
}

async function sendThankYouEmail(name, email) {
  const [thankYouEmail] = await sendgrid.sen
  d({
    from: 'thanks@guribs.com',
    to: email,
    subject: `thanks for your message, ${name}`,
    html: `
    <div>
      <h1>i got your message, ${name}!</h1>
      <code>i will back to you as soon as possible :)\nhave a nice day!</code>
    </div>`
  });
  return thankYouEmail.statusCode === 202;
}

async function sendCopyToGmail(name, email, message) {
  const user = await User.findOne({ email });
  await sendgrid.send({
    from: email,
    to: process.env['GMAIL'],
    subject: `${name} send you a message`,
    html: `
    <div>    
      <p>message:${message.trim()}</p>
      <div>
      <h1>${name} details:</h1>
        <p>email: ${user.email}</p>
        names: <ul>
        ${user.name?.map(name => `<li>${name.trim()}</li>`)}
        </ul>
        messages: <ul>
        ${user.messages?.map(message => `<li>${message.trim()}</li>`).join('')}
        </ul>
      </div>
    </div>
    `,
  });
  console.log(`copy sent to ${process.env.GMAIL}`);
}

function sendResponse(name, isThanksEmailSent) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>thanks, ${name}</title>
  </head>
  <body>
    <div>
     <h1>${isThanksEmailSent ? `thanks for your message ${name}` : `Im Sorry, ${name}. Something went wrong...`}</h1>
      <button onClick="window.location.href = '/'">back to Homepage</button>
    </div>
  </body>
  </html>
  `;
}

sendEmailRoute.post('/', sendEmail);