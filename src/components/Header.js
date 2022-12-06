import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, Toolbar, Typography, ThemeProvider, Box } from '@material-ui/core';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles(() => ({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row"
    }
}));

const Header = () => {
    const classes = useStyles();
    const history = useNavigate();

    const { currency, setCurrency, user } = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography 
                            onClick={() => history("/crypto-tracker/")} 
                            className={classes.title}
                            variant="h6"
                        >
                            Crypto Tracker
                        </Typography>
                        
                        <Box className={classes.buttonBox}>
                            <Select
                                variant="outlined" 
                                style={{
                                    width: 100,
                                    height: 40,
                                    marginRight: 15,
                                    color: "white"
                                }}
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <MenuItem value={"USD"}>USD</MenuItem>
                                <MenuItem value={"SGD"}>SGD</MenuItem>
                            </Select>

                            { user ? <UserSidebar /> : <AuthModal />}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header