import React from 'react';
import { Typography, IconButton, makeStyles, Avatar, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

function QueuedSongList() {
    const greatedThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    const song = {
        title: 'first song title',
        artist: 'first song artist',
        thumbnail: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    }
    return greatedThanMd && (
        <div style={{ margin: '10px 0'}}>
            <Typography color='textSecondary' variant='button'>
                Queue (5)
            </Typography>
            {Array.from({ length: 5}, () => song).map((song, i) => (
                <QueuedSong key={i} song={song}/>
            ))}
        </div>
    )
}
const useStyles = makeStyles({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'elipsis',
        overflow: 'hidden'
    },
    container: {
       display: 'grid',
       gridAutoFlow: 'column',
       gridTemplateColumns: '50px auto 50px',
       gridGap: 12,
       alignItems: 'center',
       marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
})
function QueuedSong({ song }) {
    const classes = useStyles();
    const { title, artist, thumbnail } = song;
    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar} src={thumbnail} alt='Song thumbnail' />
                <div className={classes.songInfoContainer}>
                    <Typography variant='subtitle2' className={classes.text}>
                        {title}
                    </Typography>
                    <Typography color='textSecondary' variant='body2'>
                        {artist}
                    </Typography>
                </div>
                <IconButton>
                    <Delete color='error' />
                </IconButton>
        </div>
    )
}

export default QueuedSongList;