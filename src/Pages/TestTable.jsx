import React, {useState} from 'react';

import { MenuItem, Paper, TableContainer, Table, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import RotateLeftTwoToneIcon from '@material-ui/icons/RotateLeftTwoTone';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
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

function TestTable(props) {
    const classes1 = useStyles1();
    const classes = useStyles();


    // First time upload and reset
    const showRows = props.rows;
    const showCols = props.cols;
    const showNulls = props.nulls;
    const showDtype = props.dtype;

    const [rows, setRows] = useState(showRows);
    const [cols, setCols] = useState(showCols);
    const [nulls, setNulls] = useState(showNulls);
    const [dtype, setDtype] = useState(showDtype);

    const [rowsApi, setRowsApi] = useState([]);
    const [colsApi, setColsApi] = useState([]);
    const [nullsApi, setNullsApi] = useState([]);
    const [dtypeApi, setDtypeApi] = useState([]);

    const [apiCall, setApiCall] = useState(0)

    // table function variables
    const [dropColumn, setDropColumn] = useState([]);
    
    const [toggle, setToggle] = useState({
        uploaded: false,
        top: false,
        last: false,
    })

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


    // paginaiton variables
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Pagination Handler
    const handleChangePage = (event, newPage) => {
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
                    // <TableSortLabel  onClick={()=>handleRequestSort(col.name)}></TableSortLabel>
                    <TableCell key={index}>{col.name}</TableCell>
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

    // Handling upload data toggler
    const handleChangeUpdatedData = (e) => {
        if (apiCall == 0){
            setRows(showRows)
            setCols(showCols)
            setNulls(showNulls)
            setDtype(showDtype)
        }
        else{
            setRows(rowsApi)
            setCols(colsApi)
            setNulls(nullsApi)
            setDtype(dtypeApi)
        }
        setToggle({
            top: false,
            last: false,
            uploaded: true,
        })
    };

    // top 10 rows state handler
    const handleChangeTopRows = (e) => {
        if (apiCall == 0){
            setRows(showRows.slice(0,10))
            setCols(showCols)
            setNulls(showNulls)
            setDtype(showDtype)
        }
        else{
            setRows(rowsApi.slice(0,10))
            setCols(colsApi)
            setNulls(nullsApi)
            setDtype(dtypeApi)
        }
        setToggle({
            top: true,
            last: false,
            uploaded: false,
        })
    }

    // last 10 rows state handler
    const handleChangeLastRows = (e) => {
        if (apiCall == 0){
            setRows(showRows.slice(showRows.length-10, showRows.length))
            setCols(showCols)
            setNulls(showNulls)
            setDtype(showDtype)
        }
        else{
            setRows(rowsApi.slice(showRows.length-10, showRows.length))
            setCols(colsApi)
            setNulls(nullsApi)
            setDtype(dtypeApi)
        }
        setToggle({
            top: false,
            last: true,
            uploaded: false,
        })
    };

    // reset data handler
    const handleChangeResetButton = (e) => {
        setRows(showRows)
        setCols(showCols)
        setNulls(showNulls)
        setDtype(showDtype)
        setToggle({
            top: false,
            last: false,
            uploaded: false,
        })
        setApiCall(0)

        // alert("Data Reset")
        // const d = prompt("Data will be reset")
        // var answer = window.confirm("Reset data to uploaded data?");
        // if (answer){
        //     setActiveCsv(1);
        //     setActiveToggle(0);
        // }
        // else{
        //     return
        // }
        // setToggle({
        //     top: false,
        //     last: false,
        //     uploaded: false,
        // })
        // if (answer){
        //     setShowRows(resetRows)
        //     setShowCols(resetCols)
        //     setShowDtype(resetDtype)
        //     setShowNulls(resetNulls)
        //     setToggle({
        //         flagToggle: false,
        //         top: false,
        //         last: false,
        //         uploaded: false,
        //         dropColumnApi: false,
        //     })
        //     setDropColumn([])
        // }
        // else{
        //     setDropColumn([])
        // }  
    };

    // Drop Column Handler
    const handleChangeDropColumn = (event) => {
        setDropColumn(event.target.value);
    }

    // Api shooter to drop column
    const handleClickDropButton = () => {
        var answer = window.confirm("Would you like to drop following columns?");
        if (answer) {
            if (apiCall == 0) {
                axios({
                    method: "post",
                    url: "http://localhost:5000/table",
                    data: {
                        "dropcolumn": dropColumn,
                        "rows": showRows,
                        "cols": showCols
                    },
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (res) {
                        setRowsApi(res.data.Rows)
                        setColsApi(res.data.Columns)
                        setNullsApi(res.data.Nulls)
                        setDtypeApi(res.data.Dtypes)
                    })
            }
            else {
                axios({
                    method: "post",
                    url: "http://localhost:5000/table",
                    data: {
                        "dropcolumn": dropColumn,
                        "rows": rowsApi,
                        "cols": colsApi
                    },
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (res) {
                        setRowsApi(res.data.Rows)
                        setColsApi(res.data.Columns)
                        setNullsApi(res.data.Nulls)
                        setDtypeApi(res.data.Dtypes)
                    })
            }
            setApiCall(1)
            setDropColumn([])
            setToggle({
                "top": false,
                "last": false,
                "uploaded": false,
            })
        }
    }

    return (
        <div>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={toggle.uploaded} onChange={(e) => handleChangeUpdatedData(e)} name="Updated Data" color="primary" />}
                    label="Updated Data"
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
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Select Columns to Drop</InputLabel>
                    <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        value={dropColumn}
                        onChange={handleChangeDropColumn}
                        input={<Input />}
                        MenuProps={MenuProps}
                    >
                        {
                            cols.map((item) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button onClick={() => { handleClickDropButton() }}>Drop</Button>
            </FormGroup>
            <Paper className={classes1.root}>
                <TableContainer className={classes1.container}>
                    <Table stickyHeader size='small'>
                        <TableHead className={classes1.tableHead}>
                            <TableRow>
                                {getNulls(nulls)}
                            </TableRow>
                            <TableRow>
                                {getDtype(dtype)}
                            </TableRow>
                            <TableRow>
                                {getHeader(cols)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getRowData(rows)}
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
    )
}

export default TestTable
