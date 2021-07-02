// https://pastelink.net/2x1iv

// pasw:WbS!),)jqa3Nv$s*!vk4Y,;f6n=~AYM(XFfNuQkkh}KXpuu$z

import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Paper, TableContainer } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select'
import Axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown';
//import { Button } from 'react-bootstrap';
import {Button} from 'bootstrap'
// import './App.css';



// const cols1 = [
// { label: "Sepal_Length" },
// { label: "Sepal_Width" },
// { label: "Petal_Length" },
// { label: "Petal_Width" },
// { label: "Species" }]
const cols1 = [{name: 'Sepal_Length' , id:1},
{name: "Sepal_Width", id:2},
{name: "Petal_Length",id:3},
{name: "Petal_Width",id:4},
{name: "Species",id:5}]

// const rows = [
//     { "Petal_Length": 1.4, "Petal_Width": 0.2, "Sepal_Length": 5.1, "Sepal_Width": 3.5, "Species": "setosa" },
//     { "Petal_Length": 1.4, "Petal_Width": 0.2, "Sepal_Length": 4.9, "Sepal_Width": 3.0, "Species": "setosa" },
//     { "Petal_Length": 1.3, "Petal_Width": 0.2, "Sepal_Length": 4.7, "Sepal_Width": 3.2, "Species": "setosa" },
//     { "Petal_Length": 1.5, "Petal_Width": 0.2, "Sepal_Length": 4.6, "Sepal_Width": 3.1, "Species": "setosa" },
// ]

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      minHeight:100
    },
  });

function getHeader(cols) {
    return (
        cols.map((col, index) => {
            return (
                <TableCell key={index}>{col.name}</TableCell>
            )
        })
    )
}

function getRowData(rows) {
    return (
        rows.map((row) => (
            <TableRow key={row.name}>
                {
                    Object.values(row).map((item) => {
                        return (
                            <TableCell>{item}</TableCell>
                        )
                    })
                }
            </TableRow>
        ))
    )
}

function SimpleTable2 (props) {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);
    // const [delcol,getvalue]=useState([]);
    var [Filcol,getvalue]=useState();
    const [drop, setDrop]=useState();
    const [checked, setChecked] = useState(true);
    const [q,setQ]=useState("")
    const classes = useStyles();
    

    

    // const labels = {
    //     left: {
    //         title: 'left',
    //         value: 'left'
    //     },
    //     right: {
    //         title: 'right',
    //         value: 'right'
    //     },
    //     center: {
    //         title: 'center',
    //         value: 'center'
    //     },
    // }



    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/table')
            .then(resp => resp.json())
            .then(data => setData(data))
        // .then(data => setRows(data.result))
        // .then(data => setCols(data.columns))
        // console.log('rows', data.result)
        // console.log('cols', data.columns)
        // console.log("drop",drop)
    },
        []);

        const handleChange = (event) => {
            setChecked(event.target.checked);
          };
        
    const head = (e) => {
        const rows = setRows(data.head)
        const cols = setCols(data.columns)
        // console.log('head', rows)

    }

    const tail = (e) => {
        const rows = setRows(data.tail)
        const cols = setCols(data.columns)
        // console.log('head', rows)

    }

    const fulldata = (e) => {
        const rows = setRows(data.result)
        const cols = setCols(data.columns)
        // console.log('head', rows)

    }
    const delcol1=(e)=>{
        //setDelcol(Array.isArray(e)?e.map(x=>x.label):null)
        // getvalue=(Array.isArray(e)?e.map(x=>x.label):[])
        getvalue=e.map(x=>x.name)
        // getvalue=e
        console.log("delcol",getvalue)
        setDrop(getvalue)
        // console.log({Filcol})
    }

    // const onChange = (value) => {
    // console.log('value',value)}

    const save = (e) => {
        // <h1>Dropped columns </h1>
        
        console.log('Droppedcols', drop)
        Axios.post('http://127.0.0.1:5000/api/table',JSON.stringify(drop)).then(function(response){
            console.log(response);
            setData(response.data)
        })
        
    

    }
    

    return (
        <div>
            <button className="btn btn-primary btn-sm m-2" onClick={head}> Data Head</button>{' '}
            <button className="btn btn-primary btn-sm m-2" onClick={tail}> Data Tail</button>{' '}
            <button className="btn btn-primary btn-sm m-2" onClick={fulldata}> Actuall Data</button>{' '}
            {/* {/* <Select isMulti options={cols1} onChange={delcol1}></Select> */}
            <button className="btn btn-primary btn-sm m-2" onClick={save}> save</button>{' '}

            <Multiselect  options={cols1} displayValue="name" onSelect={delcol1} onRemove={delcol1}></Multiselect>

            
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {getHeader(cols)}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {getRowData(rows)}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div >
    )
}

export default SimpleTable2