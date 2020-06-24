import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";

@Controller('api/administrator')
export class AdministratorController{
    constructor(
        private administratorService: AdministratorService
    
    ){}
    
    @Get() // GET http://localhost:3000/api/administrator
    getAll() : Promise<Administrator[]>{
        return this.administratorService.getAll();
    }

    @Get(':id') // GET http://localhost:3000/api/administrator/2/
    getById( @Param('id') administratorId: number) : Promise<Administrator>{
        return this.administratorService.getById(administratorId);
    }

    @Put() // PUT http://localhost:3000/api/administrator
    add(@Body() data: AddAdministratorDto){
        return this.administratorService.add(data);
    }

    @Post(':id') // POST http://localhost:3000/api/administrator/2
    edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator>{
        return this.administratorService.editById(id, data);
    }
}