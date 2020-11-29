import React from 'react';
import { 
    TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles
} from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { ADD_SONG } from '../graphql/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}))

const defaultSongState = {
    duration: 0,
    title: '',
    artist: '',
    thumbnail: ''
}

function AddSong() {
    const classes = useStyles();
    const [ addSong, { error } ] = useMutation(ADD_SONG);
    const [ dialog, setDialog ] =  React.useState(false);
    const [ playable, setPlayable ] =  React.useState(false);
    const [ url, setUrl ] = React.useState('');
    const [ song, setSong ] = React.useState(defaultSongState);

    React.useEffect(() => {
        const isPlayable = SoundcloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
        setPlayable(isPlayable);
    }, [url])
    
    function handleCloseDialog() {
        setDialog(false)
    }
    function handleChangeSong(e) {
        const { name, value } = e.target;
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }))
    }
    async function handleAddSong() {
        const { url, thumbnail, duration, title, artist } = song;
        try {
            await addSong({ 
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                    duration: duration > 0 ? duration : null
                }
            })
            handleCloseDialog();
            setSong(defaultSongState);
            setUrl('');
        } catch (error) {
            console.error('error adding song :(')  
        }
    }
    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer);
        } else if (nestedPlayer.getCurrentSound){
            songData = await getSoundCloudInfo(nestedPlayer);
        }
        setSong({...songData, url});
    }
    function handleError(field) {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);
    }
    function getYoutubeInfo(player) {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }
    function getSoundCloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound( songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }
    const { thumbnail, artist, title } = song;

    return (
        <div className={classes.container}>
            <Dialog 
                className={classes.dialog}
                open={dialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle> Edit song </DialogTitle>
                <DialogContent> 
                    <img 
                        className={classes.thumbnail} 
                        src={thumbnail}
                        alt="song thumbnail"
                    />
                    <TextField error={handleError('title')} helperText={handleError('title') && 'Fill out tltle'} onChange={handleChangeSong} value={title} margin='dense' name='title' label='Title' fullWidth />
                    <TextField error={handleError('artist')} helperText={handleError('artist') && 'Fill out artist'} onChange={handleChangeSong} value={artist} margin='dense' name='artist' label='Artist' fullWidth />
                    <TextField error={handleError('thumbnail')} helperText={handleError('thumbnail') && 'Fill out thumbnail'} onChange={handleChangeSong} value={thumbnail} margin='dense' name='thumbnail' label='Thumbnail' fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color='secondary'>Cancel</Button>
                    <Button onClick={handleAddSong} variant='outlined' color='primary'>Add song</Button>
                </DialogActions>
            </Dialog>
            <TextField
                onChange={e => setUrl(e.target.value)}
                value={url}
                className={classes.urlInput}
                placeholder="Add youtube or soundCLoud url"
                fullWidth
                margin="normal"
                type="url"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Link />
                        </InputAdornment> 
                    )
                }}
            />
            <Button
                disabled={!playable}
                className={classes.addSongButton}
                onClick={() => setDialog(true)}
                variant='contained'
                color='primary'
                endIcon={<AddBoxOutlined />}
            >
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong}/>
        </div>
    )
}

export default AddSong;