import { HttpFunction } from "@google-cloud/functions-framework";

import nodemailer, { Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kalideveloper865@gmail.com",
    pass: "uayoaemfbnbxsqpb",
  },
});

// https://res.cloudinary.com/dhvr5eeh8/image/upload/v1679785321/tasty1_fakxer.png

const emailTemplate = `
  <html>
    <head>
      <style>
        /* CSS styles */
      </style>
    </head>
    <body>
    <img src="{{ imageUrl }}" alt="Company Logo">
      <h1> {{ message }}</h1>
    
    </body>
  </html>
`;
export const sendEmail = async (
  email: string,
  subject: string,
  message: string,
  imageUrl: string
) => {
  const replaceVariables = (
    template: string,
    variables: Record<string, string>
  ) => {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{ ${key} }}`, "g");
      result = result.replace(regex, value);
    }
    return result;
  };
  const emailHtml = replaceVariables(emailTemplate, { imageUrl, message });

  const mailOptions = {
    from: "kalideveloper865@gmail.com",
    to: email,
    subject: subject,
    html: emailHtml,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export const hello: HttpFunction = async (req, res) => {
  if (req.method === "POST") {
    const { imageUrl, message, email, subject } = req.body;

    if (!imageUrl || !message || !email || !subject) {
      res.send({
        message: "Please provide the right info",
        structure: { email: "", subject: "", imageUrl: "", message: "" },
      });
    } else {
      sendEmail(email, subject, message, imageUrl); // Corrected the order of arguments
      res.send({ email, subject, imageUrl, message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
