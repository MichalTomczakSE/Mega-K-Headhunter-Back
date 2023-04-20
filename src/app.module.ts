import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./config/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: ["dist/**/**.entity{.ts,.js}"],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
