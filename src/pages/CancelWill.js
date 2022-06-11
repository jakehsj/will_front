import { Container, CssBaseline, Grid } from "@mui/material";
import HeadBar from "../components/HeadBar/HeadBar";
import CancelCard from '../components/WillCard/CancelCard';
import {ethers} from 'ethers';
import {useState, useEffect} from 'react';
import nftabi from '../utils/NFT.json';
import abi from '../utils/WillController.json';


function CancelPage() {
  const [Data,setData] = useState([{name:'loading',image:''}]);

  const getData = async() => {
    console.log('hello');
    setData([]);
    const contractAddress = '0xb3125fD2b563D8Bf003380269F0BBa2211402De5';
    const contractABI = abi;
    try{
      const {ethereum} = window;

      if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum); //we use metamask node to talk with ethereum nodes
          const signer = provider.getSigner(); //abstraction of ethereum account
          const willControllerContract = new ethers.Contract(contractAddress, contractABI, signer); //abi provides detalis about contract
          let i;
          let curAddress = await signer.getAddress();
          let tmpData = [];
          for(i=0;i<4;i++){
            try{
              let recipient = await willControllerContract.willToWiller(i);
              let status = await willControllerContract.getWillStatus(i);
              if(recipient === curAddress && status===0){
                let tmpObject = {};
                tmpObject.id=i;
                tmpData.push(tmpObject);
                console.log(tmpData);
              }
            }catch{
              break;
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
          <Container maxWidth="false" component="main" sx={{ height: "100vh", backgroundColor:'#000' }}>
            <Grid container spacing={2}>
                {Data.map((data, index) => (
                <Grid item key={index} xs={10} sm={4} lg={3}>
                    <CancelCard data={data}/>
                </Grid>
                ))}
            </Grid>
          </Container>
      </div>
    );
  }
  
  export default CancelPage