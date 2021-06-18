import MUIDataTable from "mui-datatables";
import xtype from 'xtypejs'
import { useState } from 'react'
import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import ScrollArea from 'react-scrollbar';
import { MenuItem, Paper, TableContainer } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import TablePage from '../Pages/TablePage';
import PaginationComponent from '../Pages/TablePage';
import BasicTable from '../Pages/TablePage'
import Pagination from "@material-ui/lab/Pagination";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Multiselect from 'multiselect-react-dropdown';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeftTwoToneIcon from '@material-ui/icons/RotateLeftTwoTone';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import CsvDownloader from 'react-csv-downloader';
import axios from 'axios';


const useStyles1 = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    tableHead: {
        backgroundColor: '#e57373',
        color:"red",
    }
  });

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
        maxWidth: 500,
    },
}));

function SimpleTable(props) {
    const classes1 = useStyles1();
    const classes = useStyles();
    // data after uploading csv
    const [rows, setRows] = useState(props.rows);
    const [cols, setCols] = useState(props.cols);
    const [dtype, setDtype] = useState(props.dtype);
    const [nulls, setNulls] = useState(props.nulls);
    console.log("rows",rows)
    console.log("cols",cols)
    console.log("dtype",props.dtype)
    console.log("nulls",props.nulls)

    const [showRows, setShowRows] = useState([]);
    const [showCols, setShowCols] = useState([]);
    const [showDtype, setShowDtype] = useState([]);
    const [showNulls, setShowNulls] = useState([]);


    // paginaiton variables
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // sorting variables
    const [orderDirection, setOrderDirection] = useState("");
    const [valueToOrderBy, setValueToOrderBy] = useState("");

    // table function variables
    const [dropColumn, setDropColumn] = useState([]);
    const [toggle, setToggle] = useState({
        flagToggle: false,
        top: false,
        last: false,
        uploaded: false,
        dropColumnApi: false,
    })

    // reset function variable
    const [resetRows, setResetRows] = useState(props.rows);
    const [resetCols, setResetCols] = useState(props.cols);
    const [resetDtype, setResetDtype] = useState(props.dtype);
    const [resetNulls, setResetNulls] = useState(props.nulls);

    // toggle function variable
    const [dataRows, setDataRows] = useState(props.rows);
    const [dataCols, setDataCols] = useState(props.cols);
    const [dataDtype, setDataDtype] = useState(props.dtype);
    const [dataNulls, setDataNulls] = useState(props.nulls);
    



    const handleRequestSort = (event, props) => {
        console.log("Event:",event);
        console.log("props:",props);

        const isAscending = (valueToOrderBy === event && orderDirection === "asc");
        console.log("isAsc:", isAscending)
        // setValueToOrderBy(props);
        console.log("OrderDirectionBefore:",orderDirection)
        setOrderDirection(isAscending ? "desc" : "asc");
        console.log("OrderDirectionAfter:",orderDirection)
    }

    // Pagination Handler
    const handleChangePage = (event, newPage) => {
        // console.log("next page")
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //------------------//

    // Table data renderer
    function getRowData(rows) {
        return (
            rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
                    <TableRow key={row.name}>
                        {
                            Object.values(row).map((item) => {
                                return (
                                    <TableCell component="th" scope="row">{item}</TableCell>
                                )
                            })
                        }
                    </TableRow>
                ))
        )
    }

    function getHeader(cols) {
        return (
            cols.map((col, index) => {
                return (
                    <TableCell key={index}><TableSortLabel  onClick={()=>handleRequestSort(col.name)}>{col.name}</TableSortLabel></TableCell>
                )
            })
        )
    }

    function getNulls(x){
        return (
            Object.values(x).map((item, index)=>{
                // console.log(item.null)
                return (
                    <TableCell key={index}>{item.null}% Null</TableCell>
                )
            })
        )
    };

    function getDtype(x){
        return (
            Object.values(x).map((item, index)=>{
                // console.log(item.dtype)
                return (
                    <TableCell key={index}>{item.dtype}</TableCell>
                )
            })
        )
    };
    //--------------------//

    // Drop Column Handler
    const handleChangeDropColumn = (event) => {
        // console.log("Drop Column:", event.target.value)
        setDropColumn(event.target.value);
    }

    // Api shooter to drop column
    const handleClickDropButton = () => {
        // alert(dropColumn)
        // console.log("dropColumn:",dropColumn)
        var answer = window.confirm("Would you like to drop following columns?");
        if (answer) {
            axios({
                method: "post",
                url: "http://localhost:5000/table",
                data: {
                    "dropcolumn": dropColumn,
                    "rows": rows,
                    "cols": cols
                },
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (res) {
                    // console.log(res)
                    // console.log("data Rows:", res.data.Rows)
                    // console.log("data Columns:", res.data.Columns)
                    // console.log("data Nulls:", res.data.Nulls)
                    // console.log("data dtype:", res.data.Dtypes)
                    setDataRows(res.data.Rows)
                    setDataCols(res.data.Columns)
                    setDataDtype(res.data.Dtypes)
                    setDataNulls(res.data.Nulls)
                })
                setDropColumn([])
                setToggle({
                    "dropColumnApi": true,
                    "top": false,
                    "last": false,
                    "uploaded": false
                })
        }
        else {
            setToggle({
                "top": false,
                "last": false,
                "uploaded": false
            })
        }
    }

    const handleChangeUploadData = (e) => {
        // alert("Upload data")
        if (toggle.dropColumnApi == "False"){
            return (
                setShowRows(rows),
                setShowCols(cols),
                setShowDtype(dtype),
                setShowNulls(nulls)),
                setToggle({
                    top:false,
                    last:false,
                    uploaded: true,
                })
        }
        else{
            return(
                setShowRows(dataRows),
                setShowCols(dataCols),
                setShowDtype(dataDtype),
                setShowNulls(dataNulls),
                setToggle({
                    top:false,
                    last:false,
                    uploaded: true,
                })

            )
        }
    };

    // top 10 rows state handler
    const handleChangeTopRows = (e) => {
        if (toggle.dropColumnApi === "False"){
            setShowRows(rows.slice(0,10))
            setShowCols(cols)
            setShowDtype(dtype)
            setShowNulls(nulls)
        }
        else{
            setShowRows(dataRows.slice(0,10))
            setShowCols(dataCols)
            setShowDtype(dataDtype)
            setShowNulls(dataNulls)
        }
        // setRows(dataRows.slice(0,10))
        // setCols(dataCols)
        // setDtype(dataDtype)
        // setNulls(dataNulls)
        setToggle({
            flagToggle: true,
            top: true,
            last: false,
            uploaded: false,
        })
    }

    // last 10 rows state handler
    const handleChangeLastRows = (e) => {
        if (toggle.dropColumnApi === "False"){
            setShowRows(rows.slice(rows.length-10, rows.length))
            setShowCols(cols)
            setShowDtype(dtype)
            setShowNulls(nulls)
        }
        else{
            setShowRows(dataRows.slice(dataRows.length-10, dataRows.length))
            setShowCols(dataCols)
            setShowDtype(dataDtype)
            setShowNulls(dataNulls)
        }
        setToggle({
            flagToggle: true,
            top: false,
            last: true,
            uploaded: false,
        })
    }
    
    // reset data handler
    const handleChangeResetButton = (e) => {
        // alert("Data Reset")
        // const d = prompt("Data will be reset")
        var answer = window.confirm("Reset data to uploaded data?");
        if (answer){
            setShowRows(resetRows)
            setShowCols(resetCols)
            setShowDtype(resetDtype)
            setShowNulls(resetNulls)
            setToggle({
                flagToggle: false,
                top: false,
                last: false,
                uploaded: false,
                dropColumnApi: false,
            })
            setDropColumn([])
        }
        else{
            setDropColumn([])
        }  
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };


    return (
        <>
        <React.Fragment>
            <div>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={toggle.uploaded} onChange={(e) => handleChangeUploadData(e)} name="Uploaded Data" color="primary" />}
                            label="Uploaded Data"
                        />
                        <FormControlLabel
                            control={<Switch checked={toggle.top} onChange={(e) => handleChangeTopRows(e)} name="Top Rows" />}
                            label="Top Rows"
                        />
                        <FormControlLabel
                            control={<Switch checked={toggle.last} onChange={(e) => handleChangeLastRows(e)} name="Last Rows" />}
                            label="Last Rows"
                        />
                        <Button onClick={() => { handleChangeResetButton() }}><RotateLeftTwoToneIcon /></Button>
                        <CsvDownloader
                            filename="myfile"
                            extension=".csv"
                            separator=","
                            columns={dataCols}
                        // datas={dataRows}
                        >
                            <CloudDownloadIcon />
                        </CsvDownloader>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Select Columns to Drop</InputLabel>
                            <Select
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                multiple
                                value={dropColumn}
                                onChange={handleChangeDropColumn}
                                input={<Input />}
                                // onClose={handleOnCloseDropColumn}
                                // renderValue={dropColumn}
                                MenuProps={MenuProps}
                            >
                                {
                                    cols.map((item) => (
                                        <MenuItem value={item.name}>{item.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Button onClick={()=>{handleClickDropButton()}}>Drop</Button>
                    </FormGroup>

                <Paper className={classes1.root}>
                    <TableContainer className={classes1.container}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes1.tableHead}>
                                    <TableRow>
                                        {/* {
                                            toggle.dropColumnApi ?
                                                (
                                                    getNulls(dataNulls)
                                                )
                                                :
                                                (
                                                    getNulls(nulls)
                                                )
                                        } */}
                                        {getNulls(showNulls)}
                                    </TableRow>
                                    <TableRow>
                                        {/* {
                                            toggle.dropColumnApi ?
                                                (
                                                    getDtype(dataDtype)
                                                )
                                                :
                                                (
                                                    getDtype(dtype)
                                                )
                                        } */}
                                        {getDtype(showDtype)}
                                    </TableRow>
                                    <TableRow>
                                        {/* {
                                            toggle.dropColumnApi ?
                                                (
                                                    getHeader(dataCols)
                                                )
                                                :
                                                (
                                                    getHeader(cols)
                                                )
                                        } */}
                                        {getHeader(showCols)}
                                    </TableRow>
                            </TableHead>
                                <TableBody>
                                    {/* {
                                        toggle.dropColumnApi ?
                                        (
                                            toggle.flagToggle ? 
                                            (
                                                toggle.top ? 
                                                (
                                                    getRowData(dataRows.slice(0,10) )
                                                    // console.log("Show Top 10 Data")
                                                ) 
                                                : 
                                                (
                                                    getRowData(dataRows.slice(dataRows.length-10, dataRows.length))
                                                    // console.log("Show Last 10 data")
                                                )
                                            ) 
                                            : 
                                            (
                                                getRowData(dataRows)
                                            ) 
                                        )
                                        :
                                        (
                                            toggle.flagToggle ? 
                                            (
                                                toggle.top ? 
                                                (
                                                    getRowData(rows.slice(0,10) )
                                                    // console.log("Show Top 10 Data")
                                                ) 
                                                : 
                                                (
                                                    getRowData(rows.slice(rows.length-10, rows.length))
                                                    // console.log("Show Last 10 data")
                                                )
                                            ) 
                                            : 
                                            (
                                                getRowData(rows)
                                            )
                                        )
                                    } */}
                                    {/* {
                                        toggle.flagToggle ?
                                            (
                                                toggle.top ? 
                                                (
                                                    getRowData(rows.slice(0,10) )
                                                    // console.log("Show Top 10 Data")
                                                ) 
                                                : 
                                                (
                                                    getRowData(rows.slice(rows.length-10, rows.length))
                                                    // console.log("Show Last 10 data")
                                                )
                                            )
                                            :
                                            (
                                                toggle.dropColumnApi ? (getRowData(dataRows)):(getRowData(rows))
                                            )
                                    } */}
                                    {getRowData(showRows)}
                                </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </React.Fragment>
        </>
    );
}

export default SimpleTable



