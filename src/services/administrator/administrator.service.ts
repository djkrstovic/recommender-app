import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { Repository } from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import * as crypto from 'crypto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>,
    ){ }

    getAll() : Promise<Administrator[]>{    // Promise<Administrator[]> vraca niz administratora
        return this.administrator.find();
    }
    
    getById(id: number) : Promise<Administrator>{   // Promise<Administrator> vraca samo jednog administratora
        return this.administrator.findOne(id);
    }
    add(data: AddAdministratorDto): Promise<Administrator>{
        // DTO => Model
        // username => username
        // password => password_hash (SHA512)
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return this.administrator.save(newAdmin);

    }

    async editById(id: number, data: EditAdministratorDto): Promise<Administrator> {
        let admin = await this.administrator.findOne(id);

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }

}
