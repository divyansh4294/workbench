import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios'
import React, { Component } from 'react'
import { useState, useEffect } from 'react';
// import  App from'./App.css'

function Scatter() {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);
    const [checked, setChecked] = useState([])
    const [xname, setXname] = useState()
    const [yname, setYname] = useState()
    // const history =useHistory();



    useEffect(() => {
        Axios.get('http://127.0.0.1:5000/api/chart').then(function (response) {
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
    const options = {
        chart: {
            type: 'scatter',
            // backgroundColor:'black',
        },
        credits:{
            enabled:false

        },
        title: {
            text: 'Scatter Plot'
        },

        xAxis: {
            // categories:rows.values[50],
            // categories:rows[0,100],
            // type:'category',
            title: {
                text: xname
            }
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
            data:rows
        }]
        



    }


    return (
        
        <div className="APP" style={{ display: 'flex', maxWidth: 900 }}>
            <HighchartsReact
                containerProps={{ style: { height: "10%", innerWidth: "50%" } }}
                highcharts={Highcharts}
                options={options}
            />

        </div>


    )
}

export default Scatter