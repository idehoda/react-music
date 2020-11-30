import React from 'react';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from './reducer';

export const SongContext = React.createContext({
    song: {
        id: '91424d1b-97bd-4d3a-b75d-0d33c450db6c',
        artist: 'NITROOO',
        title: 'Cheat Codes [Monstercat Release]',
        thumbnail: 'https://img.youtube.com/vi/mdaCDsN1FJ0/0.jpg',
        url: 'https://www.youtube.com/watch?v=mdaCDsN1FJ0',
        duration: 212
    },
    isPlaying: false
})


function App() {
    const initialSongState = React.useContext(SongContext);
    const [ state, dispatch ] = React.useReducer(songReducer, initialSongState);
    const greatedThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const greatedThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

    return (
    <SongContext.Provider value={{ state, dispatch }}>
        <Hidden only='xs'>
            <Header />
        </Hidden>

        <Grid container spacing={3}>
            <Grid 
                style={{ paddingTop: greatedThanSm ? 80 : 10 }}
                item 
                xs={12} 
                md={7}
            >
                <AddSong />
                <SongList />
            </Grid>
            <Grid  
                style={ greatedThanMd ? { 
                    position: 'fixed',
                    width: '100%',
                    right: 0,
                    top: 70
                } : {
                    position: 'fixed',
                    width: '100%',
                    left: 0,
                    bottom: 0
                }}
                item xs={12} 
                md={5}
            >
                <SongPlayer />
            </Grid>
        </Grid>
    </SongContext.Provider>
    )
}

export default App;