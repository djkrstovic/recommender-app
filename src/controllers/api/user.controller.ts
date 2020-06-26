import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user/user.service";

@Controller('api/user')
@Crud({
    model: {
        type: User
    },
    params: {
        id: {
            field: 'userId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            statusUserMovies:{
                eager: true
            },
            statusUserEpisodes:{
                eager: true
            },
            ratingUserMovies:{
                eager: true
            },
            ratingUserEpisodes:{
                eager: true
            },
            episode:{
                eager: true
            }
        }
    }
})
export class UserController{
    constructor(public service: UserService){}
}