import { Container, CssBaseline, Grid } from "@mui/material";
import HeadBar from "../components/HeadBar/HeadBar";
import {ethers} from 'ethers';
import {useState, useEffect} from 'react';


import NFTCard from "../components/NFTCard/NFTCard";
import abi from '../utils/NFT.json';


function StakePage() {
  const [Data,setData] = useState([{name:'loading',image:''}]);

  const getData = async() => {
    setData([]);
    const contractAddress = "0xD69cC7bC7f7eDBf9868Bfca51920E87Df91f21FE";
    const contractABI = abi;
    try{
      const {ethereum} = window;

      if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum); //we use metamask node to talk with ethereum nodes
          const signer = provider.getSigner(); //abstraction of ethereum account
          const nftContract = new ethers.Contract(contractAddress, contractABI, signer); //abi provides detalis about contract
          let i;
          let curAddress = await signer.getAddress();
          console.log(curAddress);
          let tmpData = [];
          for(i=1;i<=3;i++){
            let owner = await nftContract.ownerOf(i);
            if(owner === curAddress){
              let tmpName = await nftContract.tokenURI(i);
              let tmpObject = {};
                tmpObject.name=tmpName;
              let tokenUrl = 'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/' + i.toString();
              tmpObject.tokenUrl = tokenUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
              tmpObject.id=i;
              tmpData.push(tmpObject);
            }
          }
          setData(tmpData);
          console.log(Data);
      } else{
          console.log("No Metamask");
      }
    }catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
        <CssBaseline />
        <HeadBar/>
        <Container maxWidth="false" component="main" sx={{ height: '100vh' , backgroundColor:'#000' }}>
        <Grid container spacing={10}>
            {Data.map((data, index) => (
            <Grid item key={index} xs={10} sm={4} lg={3}>
                <NFTCard data={data}/>
            </Grid>
            ))}
        </Grid>
        </Container>
    </div>
  );
}

export default StakePage