export class AddStatusUserEpisodeDto {
    userId    : number;
    episodeId    : number;
    status    : 'gledao' | 'zeli da gleda' | 'ne zeli da gleda';
}

