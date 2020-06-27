import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user/user.service";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

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
    },
    routes:{
        only:[
            "createManyBase",
            "createOneBase",
            "getManyBase",
            "getOneBase",
            "updateOneBase",
        ],
        createManyBase:{
            decorators:[
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator'),
            ]
        },
        createOneBase:{
            decorators:[
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator'),
            ]
        },
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
        updateOneBase:{
            decorators:[
            UseGuards(RoleCheckerGuard),
            AllowToRoles('administrator'),
            ]
        }
    }
})
export class UserController{
    constructor(public service: UserService){}
}