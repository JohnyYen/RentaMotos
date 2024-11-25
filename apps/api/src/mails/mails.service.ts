import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
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
