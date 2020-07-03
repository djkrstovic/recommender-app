import * as Validator from 'class-validator';

export class AddStatusUserEpisodeDto {
    userId    : number;
    episodeId    : number;
    
    @Validator.IsNotEmpty()
    @Validator.IsIn(["gledao", "zeli da gleda", "ne zeli da gleda"])
    status    : 'gledao' | 'zeli da gleda' | 'ne zeli da gleda';
}

