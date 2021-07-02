import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios'
import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import addHighchartsMore from 'highcharts/highcharts-more';

addHighchartsMore(Highcharts);

function Box() {
    // const [data, setData] = useState([]);
    // const [rows, setRows] = useState([]);
    // const [cols, setCols] = useState([]);
    // const [checked, setChecked] = useState([])
    // const [xname, setXname] = useState()
    // const [yname, setYname] = useState()
    // // const history =useHistory();



    // useEffect(() => {
    //     Axios.get('http://127.0.0.1:5000/api/chart').then(function (response) {
    //         console.log(response)
    //         setData(response.data)
    //         setRows(response.data.result)
    //         setCols(response.data.columns)

    //         setXname(response.data.columns[0].name)
    //         setYname(response.data.columns[1].name)
    //     })


    //     //     console.log('xname', xname)
    //     //     setRows(data.head)
    //     //     console.log('reset', reset)
    //     //     console.log('cols', data.columns)
    //     //     console.log("drop",drop)
    // },
    //     []);
    const options = {
        chart: {
            type: "boxplot",
            // backgroundColor: 'black',
        },
        credits:{
            enabled:false

        },
        title: {
            text: 'Highcharts Box Plot '
        },
    
        legend: {
            enabled: false
        },
    
        xAxis: {
            categories: ['1', '2', '3', '4', '5'],
            title: {
                text: 'Experiment No.'
            }
        },
    
        yAxis: {
            title: {
                text: 'Observations'
            },
            // plotLines: [{
            //     value: 932,
            //     color: 'red',
            //     width: 1,
            //     label: {
            //         text: 'Theoretical mean: 932',
            //         align: 'center',
            //         style: {
            //             color: 'gray'
            //         }
            //     }
            // }]
        },
    
        series: [{
            name: 'Observations',
            // type: 'boxplot',
            data: [
                [760, 801, 848, 895, 965],
                [733, 853, 939, 980, 1080],
                [714, 762, 817, 870, 918],
                [724, 802, 806, 871, 950],
                [834, 836, 864, 882, 910]
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }, 
        // {
        //     name: 'Outliers',
        //     color: Highcharts.getOptions().colors[0],
        //     type: 'scatter',
        //     data: [ // x, y positions where 0 is the first category
        //         [0, 644],
        //         [4, 718],
        //         [4, 951],
        //         [4, 969]
        //     ],
        //     marker: {
        //         fillColor: 'white',
        //         lineWidth: 1,
        //         lineColor: Highcharts.getOptions().colors[0]
        //     },
        //     tooltip: {
        //         pointFormat: 'Observation: {point.y}'
        //     }
        // }    
        ]



    }


    return (
        <div style={{ display: 'flex', maxWidth: 900 }}>
            <HighchartsReact
                containerProps={{ style: { height: "10%", innerWidth: "50%" } }}
                highcharts={Highcharts}
                options={options}
            />

        </div>


    )
}

export default Box