import { HandlebarsAdapter } from '@nest-modules/mailer';

export = {
    transport: `smtp://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`,
    defaults: {
        from: process.env.ADMIN_EMAIL_NOTIFICATION_ADDRESS,
    },
    template: {
        dir: './templates/email',
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};