import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req, Delete, Patch, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "src/entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { PhotoMovieService } from "src/services/photo-movie/photo-movie.service";
import { PhotoMovie } from "src/entities/photo-movie.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { EditMovieDto } from "src/dtos/movie/edit.movie.dto";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

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
            statusUserMovies:{
                eager: false
            },
            tag:{
                eager: true
            }
        }
    },
    routes:{
        only:[
            "getManyBase",
            "getOneBase",
        ],
        getManyBase:{
            decorators:[
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },
        getOneBase:{
            decorators:[
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },
    }
})
    export class MovieController{
    constructor(
        public service: MovieService,
        public photoMovieService: PhotoMovieService,
        ){}

    @Post('createFull') // http://localhost:3000/api/movie/2/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    createFullMovie(@Body() data: AddMovieDto){
        return this.service.createFullMovie(data);
    }

    @Patch(':id') // PATCH http://localhost:3000/api/movie/2/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    editFullMovie(@Param('id') id: number, @Body() data: EditMovieDto){
        return this.service.editFullMovie(id, data);
    }

    @Post(':id/upload-photo/') // http://localhost:3000/api/movie/:id/upload-photo/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    @UseInterceptors(
        FileInterceptor('photo',{
            storage: diskStorage({
                destination: StorageConfig.photoMovie.destination,
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
                fileSize: StorageConfig.photoMovie.maxSize,
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

        // Cuvanje resized fajla
        await this.createResizedImage(photo, StorageConfig.photoMovie.resize.thumb)
        await this.createResizedImage(photo, StorageConfig.photoMovie.resize.small)
        
    
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

    async createResizedImage(photo, resizeSettings){
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = StorageConfig.photoMovie.destination +
                                    resizeSettings.directory +
                                    fileName;
        await sharp(originalFilePath)
            .resize({
                fit: 'cover', // contain uz background
                width: resizeSettings.width,
                height: resizeSettings.height,
                /*background:{
                    r: 255, g:255, b:255, alpha:0.0
                }*/
            })
            .toFile(destinationFilePath);
    }
    @Delete(':movieId/deletePhoto/:photoMovieId') // http://localhost:3000/api/movie/1/deletePhoto/5/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    public async deletePhoto(
        @Param('movieId') movieId: number,
        @Param('photoMovieId') photoMovieId: number,
    ){
        const photo = await this.photoMovieService.findOne({
            movieId: movieId,
            photoMovieId: photoMovieId
        });

        if(!photo){
            return new ApiResponse('error', -4004, 'Photo not found!');
        }

        try {
            fs.unlinkSync(StorageConfig.photoMovie.destination + photo.imagePath);
            fs.unlinkSync(StorageConfig.photoMovie.destination +
                        StorageConfig.photoMovie.resize.thumb.directory +
                        photo.imagePath);
            fs.unlinkSync(StorageConfig.photoMovie.destination +
                        StorageConfig.photoMovie.resize.small.directory +
                        photo.imagePath);
        } catch (error) {
            
        }

        

        const deleteResult = await this.photoMovieService.deleteById(photoMovieId);
        if(deleteResult.affected === 0){
            return new ApiResponse('error', -4004, 'Photo not found!');
        }

        return new ApiResponse('ok', 0, 'One photo deleted!');

    }

    


}