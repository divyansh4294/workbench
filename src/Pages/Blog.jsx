import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import demo1 from '../images/LCAP-Demo1.mov';
import demo2 from '../images/LCAP-Demo2.mov';
import demo3 from '../images/LCAP-Demo3.mov';


class Blog extends Component {
    render() {
        return (
            <div className='wrapper'>
                <h2>Demo1 Video</h2>
                <h3>Showing Dataset with Pandas Operation</h3>
                <ReactPlayer
                    className='react-player fixed-center'
                    url={demo1}
                    width="100%"
                    height='70%'
                    controls={true}
                />
                <h2>Demo2 Video</h2>
                <h3>Showing Login and Register with Authentication</h3>
                <ReactPlayer
                    className='react-player fixed-center'
                    url={demo2}
                    width="100%"
                    height='70%'
                    controls={true}
                />
                <h2>Demo3 Video</h2>
                <h3>Showing working File Explorer and parallel session usage</h3>
                <ReactPlayer
                    className='react-player fixed-center'
                    url={demo3}
                    width="100%"
                    height='70%'
                    controls={true}
                />
            </div>
        );
    }
}

export default Blog;