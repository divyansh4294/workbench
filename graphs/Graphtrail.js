import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios'
import React, { Component } from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { chart } from 'highcharts';
// import exporting from "highcharts/modules/exporting";
import { Card, CardContent } from "@material-ui/core";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


// exporting(Highcharts);
// Fullscreen(Highcharts);


// import Histogramhigh from './Histogramhigh';
// import { Chart } from "react-google-charts";

// import history from '/history';
// import Histgoogle from '/googlechart';
// import { useHistory } from "react-router-dom";


// const history =useHistory();
// 


function Graph() {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);
    const [checked, setChecked] = useState([])
    const [xname, setXname] = useState()
    const [yname, setYname] = useState()
    const handle = useFullScreenHandle();

    // const history =useHistory();



    useEffect(() => {
        Axios.get('http://127.0.0.1:5000/api/graph').then(function (response) {
            console.log(response)
            setData(response.data)
            setRows(response.data.result)
            setCols(response.data.columns)

            setXname(response.data.columns[0].name)
            setYname(response.data.columns[1].name)
        })


        //     console.log('xname', xname)
        //     setRows(data.head)
        //     console.log('reset', reset)
        //     console.log('cols', data.columns)
        //     console.log("drop",drop)
    },
        []);

    // const del =(e) =>{
    //     console.log("alert")
    // }

    // const chart1 =useRef()

    const col = (e) => {
        // console.log(e.target.value)
        var isChecked = e.target.checked;
        var item = e.target.value;
        setChecked([item])
        axios.post('http://127.0.0.1:5000/api/graph', JSON.stringify([item])).then(function (response) {
            console.log(response)
            setData(response.data)
            setRows(response.data.result)
            // setCols(response.data.columns)
            setXname(response.data.columns[0].name)
            setYname(response.data.columns[1].name)

        })
    }
    const options = {
        // colors: ['#2f7ed8','#910000','#8bbc21','#1aadce'],
        // colors:['blue'],
        chart: {
            type: 'column',
            // backgroundColor: 'black',
            // options3d: {
            //     enabled: true,
            //     alpha: 15,
            //     beta: 15,
            //     depth: 50,
            //     viewDistance: 25
            // }
            zoomType: 'x',
            exporting: {
                // allowHTML: true,
                enabled:true,
                buttons: {
                    contextButton: {
                        menuItems: ["viewFullscreen"
                        ]
                    }
                },
                // enabled: false
            }
            // FullScreen:
        },
        credits: {
            enabled: false

        },
        title: {
            text: 'iris data set',

        },

        xAxis: {
            // categories:rows.values[50],
            // categories:rows[0,100],
            // type:'category',

            title: {
                text: xname
            },
            // crosshair:true
        },

        yAxis: {
            min: 0,
            title: {
                text: yname
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: xname,

            data: rows,
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            // pointWidth:10,
            // zoneAxis: 'x',
            // zones: [{
            // value: 1,
            // color: '#ff4d40'}],
            // events:{
            //     click:function(e){
            //         alert("click function is activated",e.target.value)
            //         // console.log("alert",xname)
            //         // {del}
            //     }

            // },
            dataLabels: {
                enabled: true,
                // color:'red',
            },
            // dataSorting: {
            //     enabled: true,
            //     matchByName: true
            // },
            // responsive: {
            //     rules: [{
            //         condition: {
            //             maxWidth: 500
            //         },
            //         chartOptions: {
            //             legend: {
            //                 layout: 'horizontal',
            //                 align: 'center',
            //                 verticalAlign: 'bottom'
            //             }
            //         }
            //     }]
            // }


        }]



    }



    return (
        <div style={{ display: 'flex', maxWidth: 900 }}>

            <div>

                {
                    cols.map(item => (
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    value={item.name}
                                    onChange={col}
                                /> {item.name}
                            </label>
                        </li>
                    ))
                }
            </div>
            {/* <Histogramhigh data={data.columns}/> */}
            {/* <FullScreen handle={handle}> */}
            <Card>
                <CardContent style={{ padding: 0 }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        containerProps={{ style: { height: "400px" } }}
                        options={options}
                        allowChartUpdate
                    />
                </CardContent>
            </Card>
            {/* </FullScreen> */}
            {/* <button onClick={handle.enter}>full

            </button> */}

        </div>


    )

}
export default Graph