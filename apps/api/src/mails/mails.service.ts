import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService){}

  async sendEmail(userName: string, email: string){
    await this.mailerService.sendMail({
      to:email,
      subject: "This Subject",
      template: './contract',
      context:{
        name: userName,
        
      }
    })
  }
  
}
