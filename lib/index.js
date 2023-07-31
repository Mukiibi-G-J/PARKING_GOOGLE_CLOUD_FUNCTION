"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
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
const sendEmail = (email, subject, message, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const replaceVariables = (template, variables) => {
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
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
});
exports.sendEmail = sendEmail;
const hello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "POST") {
        const { imageUrl, message, email, subject } = req.body;
        if (!imageUrl || !message || !email || !subject) {
            res.send({
                message: "Please provide the right info",
                structure: { email: "", subject: "", imageUrl: "", message: "" },
            });
        }
        else {
            (0, exports.sendEmail)(email, subject, message, imageUrl); // Corrected the order of arguments
            res.send({ email, subject, imageUrl, message });
        }
    }
    else {
        res.status(405).send("Method Not Allowed");
    }
});
exports.hello = hello;
