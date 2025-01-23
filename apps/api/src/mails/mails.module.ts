import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import {MailerModule} from '@nestjs-modules/mailer'
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get('MAIL_HOST'),
        secure: false,
        auth: {
          user: config.get('MAIL_USER'),
          pass: config.get('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: `"No reply" <${config.get('MAIL_FROM')}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict:true,
        }
      },
    }),
    inject: [ConfigService]
  })
],
  controllers: [MailsController],
  exports: [MailsService],
  providers: [MailsService],
})
export class MailsModule {}
