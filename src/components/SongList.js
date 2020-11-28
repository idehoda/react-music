import React from 'react';
import { 
    CardContent, CardMedia, CircularProgress, Typography, Card , IconButton, CardActions, makeStyles
} from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons'

function SongList() {
    let loading = false;
    
    const song = {
        title: 'first song title',
        artist: 'first song artist',
        thumbnail: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    } 

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50,

            }}>
                <CircularProgress />
            </div>
        )
    }
    return <div>
        {Array.from({ length: 10 }, () => song).map((song, i) => (
            <Song key={i} song={song}/>
        ))}
    </div>
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(3)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))

function Song({ song }) {
    const classes = useStyles();

    const { thumbnail, title, artist } = song;
    return (
        <Card className={classes.container}>
        <div className={classes.songInfoContainer}>
            <CardMedia image={thumbnail} className={classes.thumbnail} />
            <div className={classes.songInfo}> 
                <CardContent> 
                    <Typography gutterBottom variant='h5' component='h2'>
                        { title }
                    </Typography> 
                    <Typography gutterBottom variant='body1' component='p' color='textSecondary'>
                        { artist }
                    </Typography> 
                </CardContent>
                <CardActions>
                    <IconButton size='small' color='primary'>
                        <PlayArrow />
                    </IconButton>
                    <IconButton size='small' color='secondary'>
                        <Save />
                    </IconButton>
                </CardActions>
            </div>
        </div>
    </Card>
    )
}

export default SongList;