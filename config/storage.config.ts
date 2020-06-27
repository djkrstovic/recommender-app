export const StorageConfig = {

    photoMovie:{ // MOVIE

        destination: '../storage/photos/movie/',
        urlPrefix: '/assets/moviePhotos',
        maxAge:1000*60*60*24*7,// 7 dana
        maxSize: 1024*1024*3, // u bajtovima = 3MB // za proveru error too large file promeniti na 10 max file size
        resize: {
            thumb: {
                width: 120,
                height: 100,
                directory: 'thumb/'
            },
            small: {
                width: 320,
                height: 240,
                directory: 'small/'
            },
        }

    },
    photoEpisode:{ // EPISODE

        destination: '../storage/photos/episode/',
        urlPrefix: '/assets/episodePhotos',
        maxAge:1000*60*60*24*7,// 7 dana
        maxSize: 1024*1024*3, // u bajtovima = 3MB // za proveru error too large file promeniti na 10 max file size
        resize: {
            thumb: {
                width: 120,
                height: 100,
                directory: 'thumb/'
            },
            small: {
                width: 320,
                height: 240,
                directory: 'small/'
            },
        }

    },
    photoTvSeries:{ // TV SERIES

        destination: '../storage/photos/tv-series/',
        urlPrefix: '/assets/tvSeriesPhotos',
        maxAge:1000*60*60*24*7,// 7 dana
        maxSize: 1024*1024*3, // u bajtovima = 3MB // za proveru error too large file promeniti na 10 max file size
        resize: {
            thumb: {
                width: 120,
                height: 100,
                directory: 'thumb/'
            },
            small: {
                width: 320,
                height: 240,
                directory: 'small/'
            },
        }

    },


};

