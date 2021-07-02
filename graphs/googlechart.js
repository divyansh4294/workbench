import Chart from "react-google-charts";
// import React from "react";
import Axios from 'axios'
import React, { Component } from 'react'
import { useState, useEffect } from 'react';


function Histgoogle(props) {
  // const dta = this.props.data
  // console.log("dta", dta)
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [checked, setChecked] = useState([])
  const [xname, setXname] = useState()
  const [yname, setYname] = useState()
  // const history =useHistory();



  useEffect(() => {
    Axios.get('http://127.0.0.1:5000/api/plot').then(function (response) {
      console.log(response)
      setData(response.data)
      setRows(response.data.result)
      setCols(response.data.columns)

      // setXname(response.data.columns[0].name)
      // setYname(response.data.columns[1].name)
    })


    //     console.log('xname', xname)
    //     setRows(data.head)
    //     console.log('reset', reset)
    //     console.log('cols', data.columns)
    //     console.log("drop",drop)
  },
    []);

  return (
    <div style={{ display: 'flex', maxWidth: 900 }} >
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="Histogram"
        loader={<div>Loading Chart</div>}
        data={rows}
        // data={[
        //   ['Dinosaur', 'Length'],
        //   ['Acrocanthosaurus (top-spined lizard)', 12.2],
        //   ['Albertosaurus (Alberta lizard)', 9.1],
        //   ['Allosaurus (other lizard)', 12.2],
        //   ['Apatosaurus (deceptive lizard)', 22.9],
        //   ['Archaeopteryx (ancient wing)', 0.9],
        //   ['Argentinosaurus (Argentina lizard)', 36.6],
        //   ['Baryonyx (heavy claws)', 9.1],
        //   ['Brachiosaurus (arm lizard)', 30.5],
        //   ['Ceratosaurus (horned lizard)', 6.1],
        //   ['Coelophysis (hollow form)', 2.7],
        //   ['Compsognathus (elegant jaw)', 0.9],
        //   ['Deinonychus (terrible claw)', 2.7],
        //   ['Diplodocus (double beam)', 27.1],
        //   ['Dromicelomimus (emu mimic)', 3.4],
        //   ['Gallimimus (fowl mimic)', 5.5],
        //   ['Mamenchisaurus (Mamenchi lizard)', 21.0],
        //   ['Megalosaurus (big lizard)', 7.9],
        //   ['Microvenator (small hunter)', 1.2],
        //   ['Ornithomimus (bird mimic)', 4.6],
        //   ['Oviraptor (egg robber)', 1.5],
        //   ['Plateosaurus (flat lizard)', 7.9],
        //   ['Sauronithoides (narrow-clawed lizard)', 2.0],
        //   ['Seismosaurus (tremor lizard)', 45.7],
        //   ['Spinosaurus (spiny lizard)', 12.2],
        //   ['Supersaurus (super lizard)', 30.5],
        //   ['Tyrannosaurus (tyrant lizard)', 15.2],
        //   ['Ultrasaurus (ultra lizard)', 30.5],
        //   ['Velociraptor (swift robber)', 1.8],
        // ]}
        options={{
          title: '         Histogram',
         
          legend: { position: 'none' },
          bar: { gap:0 },
          colors:["green"],
          histogram: {
            // bucketSize: 2,
            // maxNumBuckets: 200,
            lastBucketPercentile: 5
            // minValue: 0,
            // maxValue: 30,
          },
          // histogram: { lastBucketPercentile: 5},
          // vAxis: { scaleType: 'mirrorLog' }
        }}
       
      />
    </div>
  )
}

export default Histgoogle