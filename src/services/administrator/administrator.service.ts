import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { Repository } from 'typeorm';

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

}
