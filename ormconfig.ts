import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "./src/config/config";

export const ormConfig: TypeOrmModuleOptions = {
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
}