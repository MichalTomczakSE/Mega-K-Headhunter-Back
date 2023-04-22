import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ormConfig } from '../ormconfig';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), StudentModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
