import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
const serverCa = [readFileSync("./DigiCertGlobalRootCA.crt.pem", "utf8")];
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host:  process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized:true,
    ca: serverCa,
  },
  entities: ['dist/**/**.entity{.ts,.js}'],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
  // migrations: ['dist/migration/*.js'],
};
