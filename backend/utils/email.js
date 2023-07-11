const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
	//Create Transporter
	try {
		const transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "e5a4f4814b57ea",
				pass: "a72f45345d493f",
			},
		});
		//Send Email
		const emailConfiguration = {
			from: "leooism10@gmail.com",
			to: emailOptions.to,
			subject: emailOptions.subject,
			html: `<!DOCTYPE html>
            <html>
            <head>
              <title>Password Reset Token</title>
              <style>
                /* Set the email width to 600px */
                body {
                  width: 600px;
                  margin: 0 auto;
                }
            
                /* Set the email header */
                header {
                  background-color: #333;
                  color: #fff;
                  padding: 20px;
                }
            
                /* Set the email body text */
                p {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 10px;
                }
            
                /* Set the email footer */
                footer {
                  background-color: #333;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <header>
                <h1>Password Reset Token</h1>
                <p>Please use this link to change your password</p>
                <a style = {width: "50px" }href="#">${`https://localhost:8000/user/passwordReset/${emailOptions.token}`}</a>
                
              </header>
              <button style = {padding: "4px", background-color: "red", color: "white"}>Change Password</button>
                
            </body>
            </html>`,
		};
		await transporter.sendMail(emailConfiguration);
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong, please try again later");
	}
};

module.exports = sendEmail;
