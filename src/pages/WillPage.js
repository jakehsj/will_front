import { Container, CssBaseline, Grid } from "@mui/material";
import HeadBar from "../components/HeadBar/HeadBar";
import WillCard from '../components/WillCard/WillCard';
import {ethers} from 'ethers'
import {useState, useEffect} from 'react';
import nftabi from '../utils/NFT.json';
import abi from '../utils/WillController.json';


function WillPage() {

  const [Data,setData] = useState([{name:'loading',image:''}]);

  const getData = async() => {
    console.log('hello');
    setData([]);
    const contractAddress = '0xb3125fD2b563D8Bf003380269F0BBa2211402De5';
    const contractABI = abi;
    const nftContractAddress = "0xD69cC7bC7f7eDBf9868Bfca51920E87Df91f21FE";
    const nftContractABI = nftabi;
    try{
      const {ethereum} = window;

      if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum); //we use metamask node to talk with ethereum nodes
          const signer = provider.getSigner(); //abstraction of ethereum account
          const willControllerContract = new ethers.Contract(contractAddress, contractABI, signer); //abi provides detalis about contract
          const nftContract = new ethers.Contract(nftContractAddress,nftContractABI,signer);
          let i;
          let curAddress = await signer.getAddress();
          let tmpData = [];
          for(i=0;i<5;i++){
            try{
              let recipient = await willControllerContract.willToRecipient(i);
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
            <Grid container spacing={10}>
                {Data.map((data, index) => (
                <Grid item key={index} xs={10} sm={4} lg={3}>
                    <WillCard data={data}/>
                </Grid>
                ))}
            </Grid>
          </Container>
      </div>
    );
  }
  
  export default WillPage