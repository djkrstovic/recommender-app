import { Controller, Post, Body, UploadedFile, Param, UseInterceptors } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Episode } from "entities/episode.entity";
import { EpisodeService } from "src/services/episode/episode.service";
import { AddEpisodeDto } from "src/dtos/episode/add.episode.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PhotoEpisode } from "entities/photo-episode.entity";
import { PhotoEpisodeService } from "src/services/photo-episode/photo-episode.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";

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
                destination: StorageConfig.photoDestinationEpisode,
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
                    callback(new Error('Bad file extension!'), false);
                    return;
                } 
                //2. provera tipa sadrzaja: image/jpeg, image/png (mimetype)
                if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))){
                    callback(new Error('Bad file extension!'), false);
                    return;
                }

                callback(null, true);
            },
            limits:{
                files: 1,
                fieldSize: StorageConfig.photoMaxFileSize,
            }
    })
    )

    async uploadPhoto(@Param('id') episodeId: number, @UploadedFile() photo): Promise<ApiResponse | PhotoEpisode>{
        // let imagePath = photo.filename; // u zapis u BP

        const newPhotoEpisode: PhotoEpisode = new PhotoEpisode();
        newPhotoEpisode.episodeId = episodeId;
        newPhotoEpisode.imagePath = photo.filename;

        const savedPhotoEpisode = await this.photoEpisodeService.add(newPhotoEpisode);

        if(!savedPhotoEpisode){
            return new ApiResponse('error', -4001);
        }

        return savedPhotoEpisode;
    }
}