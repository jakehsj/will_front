import {CssBaseline} from '@mui/material';
import HeadBar from '../components/HeadBar/HeadBar';
import Hero from '../components/hero/Hero';
// import contract from '';
// const contractAddress = '';
// const abi = contract.abi;
function Main() {

    return (
        <div className='main-app'>
            <CssBaseline />
            <HeadBar/>
            <Hero />
        </div>
    )
}

export default Main;