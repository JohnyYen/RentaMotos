import { MailerService } from '@nestjs-modules/mailer';
export declare class MailsService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmail(userName: string, email: string): Promise<void>;
}
