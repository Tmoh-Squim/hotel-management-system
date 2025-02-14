import { MailProps } from "@/app/types/types";
import nodemailer from "nodemailer";

export const sendMail = async (options: MailProps) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: Number(process.env.SMPT_PORT), 
        secure: process.env.SMPT_PORT === "465",
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;
