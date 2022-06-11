import { AssuredWorkload, Image, PersonOutline } from "@mui/icons-material";
import { AppBar, Avatar, Button, ButtonGroup, colors, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useEffect,useState } from 'react';
import {createTheme} from '@mui/material';
import { Box } from "@mui/system";
import abi from '../../utils/WillController.json'
import { ethers } from "ethers";
import { FormControlUnstyledContext } from "@mui/base";

const HeadBar = () => {

    const [currentAccount,setCurrentAccount] = useState();
    const [isReturn, setIsReturn] = useState(false);

    const checkWalletIsConnected = async() => { 
        try{
            const {ethereum} = window; //if metamask installed -> ethereum object injected to our window
      
            if(!ethereum){
              console.log("make sure you have metamask");
            } else{
              console.log("we have an ethereum object", ethereum);
            }
      
            const accounts = await ethereum.request({method: "eth_accounts"});
      
            if(accounts.length !==0) {
              const account = accounts[0];
              console.log("Found an authorized account: ", account);
              setCurrentAccount(account);
            } else{
              console.log("No authorized account found");
            }
          } catch(error){
            console.log(error);
          }
    }

    const connectWalletHandler = async() => {
        const{ethereum} = window;

        if(!ethereum) {
            alert("Install Metamask")
            return;
        }

        try{
            if(!isReturn){
                const accounts = await ethereum.request({method:'eth_requestAccounts'});
                console.log(accounts[0]);
                setCurrentAccount(accounts[0]);
            }
            if(isReturn){
                const accounts = await window.ethereum.request({
                    method: "wallet_requestPermissions",
                    params: [{
                        eth_accounts: {}
                    }]
                }).then(() => window.ethereum.request({
                    method: 'eth_requestAccounts'
                }));
                console.log(accounts[0]);
                setCurrentAccount(accounts[0]);
            }
        }catch(error){
            console.log(error);
        }
    
    }

    const [anchorEl,setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        window.location.href='/cancel';
        setAnchorEl(null);
        console.log('close')
    }

    const handleClose2 = () => {
        setIsReturn(true);
        setCurrentAccount(false);
        setAnchorEl(null);
    }

    const parseAccount = (account) => {
        let l = account.length;
        return account[0] + account[1] + account[2] + account[3] + account[4] +'...' + account[l-3]+account[l-2]+account[l-1];
    }

    const stakeButtonClick = (e) => {
        window.location.href='/stake';
    }

    const swapButtonClick = (e) => {
        window.location.href='/wills';
    }

    const mainButtonClick = (e) => {
        window.location.href='/'
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    return (
    <AppBar position='static' sx={{boxShadow:0, backgroundColor:'#000',color:'#bfbfbf'}}>
        <Toolbar >
            <Button onClick={mainButtonClick}>
                <h1 style={{ marginLeft: '1rem', color: '#00d8ff'}} >Will Protocol</h1>
            </Button>
            <Box sx={{display: 'flex', flexGrow:1, ml:7}}>
                <ButtonGroup color='inherit' variant="text" aria-label="outlined button group" >
                    <Button onClick={stakeButtonClick}>Stake</Button>
                    <Button onClick={swapButtonClick}>Redeem</Button>
                    <Button>Docs</Button>
                </ButtonGroup>
            </Box>
            {!currentAccount&&
            <Button color='inherit' onClick={connectWalletHandler}>Connect Wallet</Button>
            }
            {currentAccount&&
            <div>
                <Button
                    endIcon={<Avatar src="/broken-image.jpg" />}
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Grid container sx={{width:'120px'}}>
                        <Grid sx={{fontSize:17, color:'#bfbfbf'}}>
                            {parseAccount(currentAccount)}
                        </Grid>
                    </Grid>
                </Button>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My Wills</MenuItem>
                    <MenuItem onClick={handleClose2}>Logout</MenuItem>
                </Menu>
            </div>
            }
        </Toolbar>
    </AppBar>
    )
}

export default HeadBar;