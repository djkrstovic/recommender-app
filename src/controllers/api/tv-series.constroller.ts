import { Controller, Body, Post, UseInterceptors, Param, UploadedFile } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TvSeries } from "entities/tv-series.entity";
import { TvSeriesService } from "src/services/tv-series/tv-series.service";
import { AddTvSeriesDto } from "src/dtos/tv-series/add.tv-series.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { ApiResponse } from "src/misc/api.response.class";
import { PhotoTvSeries } from "entities/photo-tv-series.entity";
import { PhotoTvSeriesService } from "src/services/photo-tv-series/photo-tv-series.service";

@Controller('api/series')
@Crud({
    model: {
        type: TvSeries
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
            photoTvSeries:{
                eager: true
            },
            category:{
                eager: true
            },
            genre:{
                eager: true
            }
        }
    }
})
export class TvSeriesController{
    constructor(
        public service: TvSeriesService,
        public photoTvSeriesService: PhotoTvSeriesService,
    ){}
    @Post('createFull') // http://localhost:3000/api/series/createFull/
    createFullTvSeries(@Body() data: AddTvSeriesDto){
        return this.service.createFullTvSeries(data);
    }

    @Post(':id/upload-photo/') // http://localhost:3000/api/series/:id/upload-photo/
    @UseInterceptors(
        FileInterceptor('photo',{
            storage: diskStorage({
                destination: StorageConfig.photoDestinationTvSeries,
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

    async uploadPhoto(@Param('id') tvSeriesId: number, @UploadedFile() photo): Promise<ApiResponse | PhotoTvSeries>{
        // let imagePath = photo.filename; // u zapis u BP

        const newPhotoTvSeries: PhotoTvSeries = new PhotoTvSeries();
        newPhotoTvSeries.tvSeriesId = tvSeriesId;
        newPhotoTvSeries.imagePath = photo.filename;

        const savedPhotoTvSeries = await this.photoTvSeriesService.add(newPhotoTvSeries);

        if(!savedPhotoTvSeries){
            return new ApiResponse('error', -4001);
        }

        return savedPhotoTvSeries;
    }
}