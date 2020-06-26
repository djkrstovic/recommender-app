import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { PhotoMovieService } from "src/services/photo-movie/photo-movie.service";
import { PhotoMovie } from "entities/photo-movie.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';

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
            photoMovies:{
                eager: true
            },
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
    constructor(
        public service: MovieService,
        public photoMovieService: PhotoMovieService,
        ){}

    @Post('createFull') // http://localhost:3000/api/movie/createFull/
    createFullMovie(@Body() data: AddMovieDto){
        return this.service.createFullMovie(data);
    }
    @Post(':id/upload-photo/') // http://localhost:3000/api/movie/:id/upload-photo/
    @UseInterceptors(
        FileInterceptor('photo',{
            storage: diskStorage({
                destination: StorageConfig.photoDestinationMovie,
                filename: (req, file, callback)=>{
                    // "neka slika.jpg" => 20202506-5644894568-neka-slika.jpg
                    let original: string = file.originalname;

                    let normalized = original.replace(/\s+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-],/g, '');
                    let sada = new Date();
                    let datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() + 1).toString(); // jer meseci krecu od 0 do 11, a ovim se resava od 1 do 12
                    datePart += sada.getDate().toString();
                    
                    let randomPart: string =
                    new Array(10)
                        .fill(0)
                        .map(e=> (Math.random()*9).toFixed(0).toString())
                        .join('');
                    
                    let fileName = datePart + '-' + randomPart + '-' + normalized;

                    fileName = fileName.toLocaleLowerCase();

                    callback(null, fileName);

                }
            }),

            fileFilter:(req, file, callback)=>{
                //1. provera extenzije: JPG, PNG
                if(!file.originalname.match(/\.(jpg|png)$/)){
                    req.fileFilterError = 'Bad file extension!';
                    callback(null, false);
                    return;
                } 
                //2. provera tipa sadrzaja: image/jpeg, image/png (mimetype)
                if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))){
                    req.fileFilterError = 'Bad file content!';
                    callback(null, false);
                    return;
                }

                callback(null, true);
            },
            limits:{
                files: 1,
                fileSize: StorageConfig.photoMaxFileSize,
            }
    })
    )
    async uploadPhoto(
        @Param('id') movieId: number,
        @UploadedFile() photo,
        @Req() req
        ): Promise<ApiResponse | PhotoMovie>{

        if(req.fileFilterError){
            return new ApiResponse('error', -4002, req.fileFilterError);
        }

        if(!photo){
            return new ApiResponse('error', -4002, 'File not uploaded!');
        }


        // Real Mime Type check
        const fileTypeResult = await fileType.fromFile(photo.path);
        if(!fileTypeResult){
            // obrisati taj fajl
            fs.unlinkSync(photo.path)
            return new ApiResponse('error', -4002, 'Cannot detect file type!');
        }

        const realMimetype = fileTypeResult.mime;
        
        if(!(realMimetype.includes('jpeg') || realMimetype.includes('png'))){
            // obrisati taj fajl
            fs.unlinkSync(photo.path)
            return new ApiResponse('error', -4002, 'Bad file content type!');

        }
    
        // let imagePath = photo.filename; // u zapis u BP

        const newPhotoMovie: PhotoMovie = new PhotoMovie();
        newPhotoMovie.movieId = movieId;
        newPhotoMovie.imagePath = photo.filename;

        const savedPhotoMovie = await this.photoMovieService.add(newPhotoMovie);

        if(!savedPhotoMovie){

            return new ApiResponse('error', -4001);
        }

        return savedPhotoMovie;
    }

    

}