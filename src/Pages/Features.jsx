import React, { Component } from 'react';
// import FeatureBox from './FeatureBox';
import featureimage1 from '../images/feature_1.png';
import featureimage2 from '../images/feature_2.png';
import featureimage3 from '../images/feature_3.png';
import '../App.css'


const FeatureBox=(props) => (
    <div className = 'a-box' >
    	<div className='a-b-img'>
    		<img src={props.image} alt=""/>
    	</div>
    	<div className='s-b-text'>
    		<h2> {props.title} </h2>
    		<p></p>
    	</div>
    </div >
)



class Feature extends Component {
    render() {
        return (
            <div id='features'>
                <div className='a-container'>
                    <FeatureBox image={featureimage1} title='Insanely Fast' />
                    <FeatureBox image={featureimage2} title='Always Ready' />
                    <FeatureBox image={featureimage3} title='No Maintenence' />
                </div>
            </div>
        );
    }
}

export default Feature;