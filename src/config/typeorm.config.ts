import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'notesmanager',
    entities: [__dirname + './../**/*.entity.{js,ts}'],
    synchronize: true
}