import { Controller, Post, Body, Param, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";

@Controller('api/movie')
@Crud({
    model: {
        type: Movie
    },
    params: {
        id: {
            field: 'movieId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            category:{
                eager: true
            },
            genre:{
                eager: true
            },
            tagMovies:{
                eager: true
            },
            ratingUserMovies:{
                eager: true
            },
            tag:{
                eager: true
            }
        }
    }
})
    export class MovieController{
    constructor(public service: MovieService){}

    @Post('createFull') // http://localhost:3000/api/movie/createFull/
    createFullMovie(@Body() data: AddMovieDto){
        return this.service.createFullMovie(data);
    }
    @Post(':id/upload-photo/') // http://localhost:3000/api/movie/:id/upload-photo/
    @UseInterceptors(
        FileInterceptor('photo',{
            storage: diskStorage({
                destination: StorageConfig.photos,
                filename: (req, file, callback)=>{
                    // "neka slika.jpg" => 20202506-5644894568-neka-slika.jpg
                    let original: string = file.originalname;

                    let normalized = original.replace(/\s+/g, '-')
                    let sada = new Date();
                    let datePart = '';
                    datePart += sada.getFullYear().toString;
                    datePart += (sada.getMonth() + 1).toString; // jer meseci krecu od 0 do 11, a ovim se resava od 1 do 12
                    datePart += sada.getDate().toString;
                    
                    let randomPart: string =
                    new Array(10)
                        .fill(0)
                        .map(e=> (Math.random()*9).toFixed(0).toString())
                        .join('');
                    
                    let fileName = datePart + '-' + randomPart + '-' + normalized;

                    callback(null, fileName);

                }
            })
        })
    )
    uploadPhoto(@Param('id') movieId: number, @UploadedFile() photo){
        let imagePath = photo.filename; // u zapis u BP
    }

}