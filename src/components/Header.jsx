import React, { Component } from 'react'
import '../App.css';

export class Header extends Component {
    render() {
        return (
            <div className='main'>
                <div className='name'>
					<h1><span>Data Predictions in minutes</span> without writing code</h1>
					<p className='details'>The entire process of building machine learning algorithms and predicting outcomes, packed in few click.</p>
					<a href='/myproject' className='cv-btn'>Click to Start</a>
				</div>
            </div>
        )
    }
}

export default Header
