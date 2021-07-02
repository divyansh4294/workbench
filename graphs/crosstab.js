import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios'
import React, { Component } from 'react'
import { useState, useEffect } from 'react';


function Crosstab(){
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [rows1, setRows1] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [rows3, setRows3] = useState([]);
    const [rows4, setRows4] = useState([]);
    const [cols, setCols] = useState([]);
    const [cols1, setCols1] = useState([]);
    const [checked, setChecked] = useState([])
    const [xname, setXname] = useState()
    const [yname, setYname] = useState()
    const [zname, setZname] = useState()
    const [x1, setX1] = useState()
    const [y1, setY1] = useState()

    useEffect(() => {
        Axios.get('http://127.0.0.1:5000/api/cross').then(function (response) {
            console.log(response)
            setData(response.data)
            setRows(response.data.result[0])
            setRows1(response.data.result[1])
            setRows2(response.data.result[2])
            setRows3(response.data.result[3])
            setRows4(response.data.result[4])
            setCols(response.data.cat[0])
            setCols1(response.data.cat[1])
            setXname(response.data.columns[0])
            setYname(response.data.columns[1])
            setZname(response.data.columns[2])
            setX1(response.data.columns[3])
            setY1(response.data.columns[4])
        })


            console.log('xname', xname)
            console.log('yname', yname)
            console.log('zname', zname) 
            console.log('xrows', rows)
            console.log('yrows', rows1)
            console.log('zrows', rows2)            //     setRows(data.head)
        
    },
        []);

    const options={
        chart: {
            type: 'column',
            // align:'center',
            // spacingBottom: 15,
            // spacingTop: 10,
            // spacingLeft: 10,
            // spacingRight: 10,
            // backgroundColor: 'black',

        },
        align:'center',
        credits:{
            enabled:false

        },
        title: {
            text: 'cross tab'
        },
        xAxis: {
            categories: cols,cols1
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total food consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( 
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'black'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: xname,
            data: rows
        }, {
            name: yname,
            data: rows1
        }, {
            name: zname,
            data: rows2

        },
        // {
        //     name: x1,
        //     data: rows1
        // },{
        //     name: y1,
        //     data: rows1
        // },
    ]   
           
     }

    return(
        <div style={{ display: 'flex', maxWidth: 900 }}>
            <HighchartsReact
                containerProps={{ style: { height: "10%", innerWidth: "50%" } }}
                highcharts={Highcharts}
                options={options}
            />

        </div>
    )
}

export default Crosstab