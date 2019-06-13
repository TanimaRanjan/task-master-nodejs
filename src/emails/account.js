const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {

    const msg = {
        to: email,
        from: 'tanimaranjan@gmail.com',
        subject: 'Welcome to Task Master App',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
        // ,
        // html: '<strong>NodeJS App</strong>',
      };
      sgMail.send(msg);
      
}



const sendGoodByeEmail = (email, name) => {

    const msg = {
        to: email,
        from: 'tanimaranjan@gmail.com',
        subject: 'Sorry to see you go',
        text: `Good Bye, ${name}. We are sorry to see you go, could we have done something to stop you from leaving`

        // ,
        // html: '<strong>NodeJS App</strong>',
      };
      sgMail.send(msg);
      
}


module.exports = { 
    sendWelcomeEmail,
    sendGoodByeEmail
}


