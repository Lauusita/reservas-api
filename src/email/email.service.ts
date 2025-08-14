import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

const transporter = nodemailer.createTransport({
    host: process.env.AWS_EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.AWS_EMAIL_USER,
      pass: process.env.AWS_EMAIL_PASSWORD,
    },
});

@Injectable()
export class MailService {

  compileTemplate(templateName: string, context: Record<string, any>): string {
    const filePath = path.join(__dirname, 'templates', `${templateName}.html`);
    const source = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(source);
    return template(context);
  }

  async sendEmail (to: string, subject: string, text: string, html?: string) {
    try {
      const mailOptions = {
        from: process.env.AWS_EMAIL,
        to,
        subject,
        text,
        html,
        attachments: []
      };

      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}


