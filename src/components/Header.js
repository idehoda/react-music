import React from 'react';
import { Toolbar, Typography, AppBar, makeStyles } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(2)
    }
}))

function Header() {
    const classes = useStyles();
    return (
        <AppBar color="primary" position='fixed'>
            <Toolbar>
                <HeadsetTwoTone />
                <Typography className={classes.title} variant='h6' component='h1'>
                    Music share
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;