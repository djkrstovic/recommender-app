import { Controller, Post, Body, UploadedFile, Param, UseInterceptors, Req } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Episode } from "src/entities/episode.entity";
import { EpisodeService } from "src/services/episode/episode.service";
import { AddEpisodeDto } from "src/dtos/episode/add.episode.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PhotoEpisode } from "src/entities/photo-episode.entity";
import { PhotoEpisodeService } from "src/services/photo-episode/photo-episode.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Controller('api/episode')
@Crud({
    model: {
        type: Episode
    },
    params: {
        id: {
            field: 'episodeId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            photoEpisodes:{
                eager: true
            },
            tvSeries:{
                eager: true
            },
            ratingUserEpisodes:{
                eager: true
            },
            tagEpisodes:{
                eager: true
            },
            tag:{
                eager: true
            }
        }
    }
})
export class EpisodeController{
    constructor(
        public service: EpisodeService,
        public photoEpisodeService: PhotoEpisodeService,
        ){}
    @Post('createFull') // http://localhost:3000/api/episode/createFull/
    createFullEpisode(@Body() data: AddEpisodeDto){
        return this.service.createFullEpisode(data);
    }

    
    @Post(':id/upload-photo/') // http://localhost:3000/api/episode/:id/upload-photo/
    @UseInterceptors(
        FileInterceptor('photo',{
            storage: diskStorage({
                destination: StorageConfig.photoEpisode.destination,
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
                fileSize: StorageConfig.photoEpisode.maxSize,
            }
    })
    )

    async uploadPhoto(
        @Param('id') episodeId: number,
        @UploadedFile() photo,
        @Req() req
        ): Promise<ApiResponse | PhotoEpisode>{
        // let imagePath = photo.filename; // u zapis u BP

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
        await this.createResizedImage(photo, StorageConfig.photoEpisode.resize.thumb)
        await this.createResizedImage(photo, StorageConfig.photoEpisode.resize.small)

        const newPhotoEpisode: PhotoEpisode = new PhotoEpisode();
        newPhotoEpisode.episodeId = episodeId;
        newPhotoEpisode.imagePath = photo.filename;

        const savedPhotoEpisode = await this.photoEpisodeService.add(newPhotoEpisode);

        if(!savedPhotoEpisode){
            return new ApiResponse('error', -4001);
        }

        return savedPhotoEpisode;
    }

    async createResizedImage(photo, resizeSettings){
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = StorageConfig.photoEpisode.destination +
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
}