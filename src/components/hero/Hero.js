import { WindowSharp } from '@mui/icons-material'
import React from 'react'
import MainVideo from '../../assets/video.mp4'
import './Hero.css'

const hero = () => {
    const stakeButtonClick = (e) => {
        window.location.href='/stake';
    }
    return (
        <div className='hero'>
            <div className="hero-text">
                <h1>Decentralized</h1>
                <h1><span className="blue">Inheritence </span> Protocol</h1>
                <p>NFT staking and Protection against losing wallet for millions of users of Ethereum</p>
                <div className="btn-group">
                    <button onClick={stakeButtonClick}className="btn">Go Stake</button>
                    {/* <button className="btn btn-outline">Documentation</button> */}
                    {/*<button className="btn btn-outline">FAQ</button> */}
                </div>
            </div>
        </div>
    )
}

export default hero
