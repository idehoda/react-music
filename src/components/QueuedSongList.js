import React from 'react';
import { Typography, IconButton, makeStyles, Avatar, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

function QueuedSongList( { queue } ) {
    const greatedThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    return greatedThanMd && (
        <div style={{ margin: '10px 0'}}>
            <Typography color='textSecondary' variant='button'>
                Queue ({queue.length})
            </Typography>
            {queue.map((song, i) => (
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
    const [ addOrRemoveFromQueue ] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    });
    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: 'Song' }}
        });
    }
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
                <IconButton onClick={handleAddOrRemoveFromQueue}>
                    <Delete color='error' />
                </IconButton>
        </div>
    )
}

export default QueuedSongList;