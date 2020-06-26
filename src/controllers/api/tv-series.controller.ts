import { Controller, Body, Post, UseInterceptors, Param, UploadedFile, Req, Delete, Patch, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TvSeries } from "src/entities/tv-series.entity";
import { TvSeriesService } from "src/services/tv-series/tv-series.service";
import { AddTvSeriesDto } from "src/dtos/tv-series/add.tv-series.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { ApiResponse } from "src/misc/api.response.class";
import { PhotoTvSeries } from "src/entities/photo-tv-series.entity";
import { PhotoTvSeriesService } from "src/services/photo-tv-series/photo-tv-series.service";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { EditTvSeriesDto } from "src/dtos/tv-series/edit.tv-series.dto copy";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

@Controller('api/series')
@Crud({
    model: {
        type: TvSeries
    },
    params: {
        id: {
            field: 'tvSeriesId',
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
    },
    routes:{
        exclude: ['updateOneBase', 'replaceOneBase', 'deleteOneBase']
    }
})
export class TvSeriesController{
    constructor(
        public service: TvSeriesService,
        public photoTvSeriesService: PhotoTvSeriesService,
    ){}
    @Post('createFull') // http://localhost:3000/api/series/createFull/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    createFullTvSeries(@Body() data: AddTvSeriesDto){
        return this.service.createFullTvSeries(data);
    }

    @Patch(':id') // PATCH http://localhost:3000/api/movie/2/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    editFullTvSeries(@Param('id') id: number, @Body() data: EditTvSeriesDto){
        return this.service.editFullTvSeries(id, data);
    }

    @Post(':id/upload-photo/') // http://localhost:3000/api/series/:id/upload-photo/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    @UseInterceptors(
        FileInterceptor('photo',{
            storage: diskStorage({
                destination: StorageConfig.photoTvSeries.destination,
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
                fileSize: StorageConfig.photoTvSeries.maxSize,
            }
    })
    )

    async uploadPhoto(
        @Param('id') tvSeriesId: number,
        @UploadedFile() photo,
        @Req() req
        ): Promise<ApiResponse | PhotoTvSeries>{
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
        await this.createResizedImage(photo, StorageConfig.photoTvSeries.resize.thumb)
        await this.createResizedImage(photo, StorageConfig.photoTvSeries.resize.small)

        const newPhotoTvSeries: PhotoTvSeries = new PhotoTvSeries();
        newPhotoTvSeries.tvSeriesId = tvSeriesId;
        newPhotoTvSeries.imagePath = photo.filename;

        const savedPhotoTvSeries = await this.photoTvSeriesService.add(newPhotoTvSeries);

        if(!savedPhotoTvSeries){
            return new ApiResponse('error', -4001);
        }

        return savedPhotoTvSeries;
    }

    async createResizedImage(photo, resizeSettings){
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = StorageConfig.photoTvSeries.destination +
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

    @Delete(':tvSeriesId/deletePhoto/:photoTvSeriesId') // http://localhost:3000/api/series/2/deletePhoto/4/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    public async deletePhoto(
        @Param('tvSeriesId') tvSeriesId: number,
        @Param('photoTvSeriesId') photoTvSeriesId: number,
    ){
        const photo = await this.photoTvSeriesService.findOne({
            tvSeriesId: tvSeriesId,
            photoTvSeriesId: photoTvSeriesId
        });

        if(!photo){
            return new ApiResponse('error', -4004, 'Photo not found!');
        }

        try {
            fs.unlinkSync(StorageConfig.photoTvSeries.destination + photo.imagePath);
            fs.unlinkSync(StorageConfig.photoTvSeries.destination +
                        StorageConfig.photoTvSeries.resize.thumb.directory +
                        photo.imagePath);
            fs.unlinkSync(StorageConfig.photoTvSeries.destination +
                        StorageConfig.photoTvSeries.resize.small.directory +
                        photo.imagePath);
        } catch (error) {
            
        }

        

        const deleteResult = await this.photoTvSeriesService.deleteById(photoTvSeriesId);
        if(deleteResult.affected === 0){
            return new ApiResponse('error', -4004, 'Photo not found!');
        }

        return new ApiResponse('ok', 0, 'One photo deleted!');

    }

}