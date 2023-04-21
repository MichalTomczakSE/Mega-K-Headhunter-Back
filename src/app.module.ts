import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ormConfig } from "../ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
