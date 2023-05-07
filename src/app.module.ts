import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ormConfig } from '../ormconfig';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), StudentModule, UserModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
