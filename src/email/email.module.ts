import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { EmailService } from './email.service';
import mailerConfig = require('../mailerConfig');

@Module({
    imports: [MailerModule.forRoot(mailerConfig)],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {
}