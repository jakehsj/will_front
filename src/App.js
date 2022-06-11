import './App.css';
import Main from './pages/Main.js'
import StakePage from './pages/StakePage.js'
import WillPage from './pages/WillPage.js'
import CancelPage from './pages/CancelWill.js'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
// import contract from '';
// const contractAddress = '';
// const abi = contract.abi;
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>} />
                <Route path='stake' element={<StakePage/>} />
                <Route path='wills' element={<WillPage/>} />
                <Route path='cancel' element={<CancelPage/>}/>
            </Routes>    
        </BrowserRouter>
    )
}

export default App;