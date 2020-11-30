function songReducer(prevState, action) {
    switch(action.type) {
        case 'PLAY_SONG': 
            return { ...prevState, isPlaying: true }
        case 'PAUSE_SONG': 
            return { ...prevState, isPlaying: false }
        case 'SET_SONG': 
            return { ...prevState, song: action.payload.song }
        default: 
            return prevState;
    }
}

export default songReducer;