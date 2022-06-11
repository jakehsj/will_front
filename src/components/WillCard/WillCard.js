import { Button, Card, CardHeader, CardMedia, Popover, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import {ethers} from 'ethers';
import abi from '../../utils/WillController.json';
import nftabi from '../../utils/NFT.json';

function WillCard(props) {
    const [selected, setSelected] = useState(false);
    const [interval, setInterval] = useState();
    const [reciever, setReciever] = useState();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    async function claimWill(id) {
        const contractAddress = "0xb3125fD2b563D8Bf003380269F0BBa2211402De5";
        const contractABI = abi;
        setAnchorEl(null);
        try{
            const {ethereum} = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum); //we use metamask node to talk with ethereum nodes
                const signer = provider.getSigner(); //abstraction of ethereum account
                const willControllerContract = new ethers.Contract(contractAddress, contractABI, signer); //abi provides detalis about contract
                const willtxn = await willControllerContract.claimWIll(id,{gasLimit:300000});
                await willtxn.wait();
                // will = await willControllerContract.getWill(1);
                // console.log(will);
            } else{
                console.log("No Metamask");
            }
        }catch(error) {
            console.log(error);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
        <Card
            elevation={selected ? 10 : 1}
            onClick={handleClick}
            onMouseEnter={() => setSelected(true)}
            onMouseLeave={() => setSelected(false)}
            sx={{ borderRadius: 4, cursor: "pointer" }}
            >
            <CardHeader
                title={'Will #'+props.data.id}
                subheaderTypographyProps={{ color: "primary.main" }}
                sx={{ backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8) }}
            />
            <CardMedia component="img" image={'https://media.istockphoto.com/photos/isolated-shot-of-closed-blank-cardboard-box-on-white-background-picture-id520619762?k=20&m=520619762&s=612x612&w=0&h=_qMdHMk5deKQx5sGzofQiKw-kZ28cPPLmDzgrkrSjHE='} alt={'Will #'+props.data.id} sx={{ p: selected ? 0 : 1 }} />
        </Card>
        
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
            }}
            
        >
            <Button onClick={async() => claimWill(props.data.id)}>Claim</Button>
        </Popover>
        </>
    );
    }

export default WillCard;