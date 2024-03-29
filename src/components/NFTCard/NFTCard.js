import { Button, Card, CardHeader, CardMedia, Popover, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {ethers} from 'ethers';
import abi from '../../utils/WillController.json';
import nftabi from '../../utils/NFT.json';

function NFTCard({data}) {
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

    async function createWill(interval, address, id, recipent) {
        const contractAddress = "0xb3125fD2b563D8Bf003380269F0BBa2211402De5";
        const contractABI = abi;
        const nftcontractABI = nftabi;
        try{
            const {ethereum} = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum); //we use metamask node to talk with ethereum nodes
                const signer = provider.getSigner(); //abstraction of ethereum account
                const willControllerContract = new ethers.Contract(contractAddress, contractABI, signer); //abi provides detalis about contract
                const nftContract = new ethers.Contract(address, nftcontractABI, signer); 
                let approveTxn = await nftContract.approve(contractAddress,id);
                const willtxn = await willControllerContract.createWill(interval,address,id,recipent,{gasLimit:300000});
                await approveTxn.wait();
                await willtxn.wait();
                // will = await willControllerContract.getWill(1);
                // console.log(will);
            } else{
                console.log("No Metamask");
            }
        }catch(error) {
            console.log(error);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [image,setImage] = useState();
    
    const getImage = async() => {
        const response = await fetch(data.tokenUrl);

        const json = await response.json();
        setImage(json.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
        console.log(image);
    }

    useEffect(() => {
        getImage()
    },[]);

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
                title={data.name}
                subheaderTypographyProps={{ color: "primary.main" }}
                sx={{ backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8) }}
            />
            <CardMedia component="img" image={image} alt={data.name} sx={{ p: selected ? 0 : 2 }} />
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
            <Typography sx={{ p: 2 }}>Create Will</Typography>
            <TextField id="outlined-basic" label="Interval" variant="outlined" onChange = {(e) => {
                let target = e.target.value;
                setInterval(parseInt(target));
            }}/>
            <TextField id="outlined-basic" label="Receiver" variant="outlined" onChange = {(e) => {
                let target = e.target.value;
                setReciever(target);
                console.log('reciever: ',reciever)
            }}/>
            <Button onClick={async() =>  createWill(interval,'0xD69cC7bC7f7eDBf9868Bfca51920E87Df91f21FE',data.id,reciever)}>Confirm</Button>
        </Popover>
        </>
    );
    }

export default NFTCard;