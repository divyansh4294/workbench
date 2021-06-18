import React, { useState } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PublishIcon from '@material-ui/icons/Publish';
import Modal from 'react-awesome-modal';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UploadCsv  from '../PopUps/UploadCsv';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SimpleTable from './SimpleTable';
import TestTable from './TestTable';
import TablePage from './TablePage';



const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginRight: "auto"
  },
  drawer: {
    width: 200
  },
  content: {
    padding: theme.spacing(3)
  },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const SimpleDrawer = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [cols, setCols] = useState('');
  const [rows, setRows] = useState('');
  const [dataType, setDataTypes] = useState('');
  const [nullPercentage, setNullPercentage] = useState('');
  const [page, setPage] = useState(0);
  const [rowReady, setRowReady] = useState(false);
  const [colReady, setColReady] = useState(false);
  const [nullReady, setNullReady] = useState(false);
  const [dtypeReady, setDtypeReady] = useState(false);


  const openPopup = () => {
    setShowPopup(!showPopup)
  }

  const closePopup = () => {
    setShowPopup(!showPopup)
    setModal1(false)
    setModal2(false)
  }

  const handleImportData = (e) => {
    setModal1(true)
    openPopup()
  }
  const handleUploadData = (e) => {
    // alert("Upload Data Clicked")
    setModal2(true)
    openPopup()

  }
  function getRow(x) {
    // console.log("getRow:",x)
    setRows(x)
    setRowReady(true);
  }

  function getCol(x) {
    // console.log("getCol:",x)
    setCols(x)
    setColReady(true);
  }

  function getNullPercentage(x) {
    // console.log("getNullPercentage;",x)
    setNullPercentage(x)
    setNullReady(true)
  }

  function getDataType(x) {
    // console.log("getDataType;",x)
    setDataTypes(x)
    setDtypeReady(true)
  }
  return (
    <div>
      <CssBaseline />
      <Drawer open={openDrawer}>
              <div className={classes.drawerHeader} style={{alignItems: 'center'}}>
                  <IconButton onClick={()=>setOpenDrawer(false)}>
                      {<ChevronLeftIcon />}
                  </IconButton>
              </div>
        <List disablePadding className={classes.drawer}>
          <ListItem button onClick={(e) => { handleImportData(e) }}>
            <ListItemIcon><ImportExportIcon /></ListItemIcon>
            <ListItemText primary="Import Data" />
          </ListItem>
          <Modal visible={modal1} width="400" height="300" effect="fadeInUp" onClickAway={() => closePopup()}>
            <div>
              <h3>Import Dataset</h3>
            </div>
          </Modal>
          <ListItem button onClick={(e) => { handleUploadData(e) }}>
            <ListItemIcon><PublishIcon /></ListItemIcon>
            <ListItemText primary="Upload Data" />
          </ListItem>
          <Modal visible={modal2} width="400" height="300" effect="fadeInUp" onClickAway={() => closePopup()}>
            <div>
              <UploadCsv
                parentRows={getRow}
                parentCols={getCol}
                parentDataType={getDataType}
                parentNullPercentage={getNullPercentage}
                actionName={closePopup} />
            </div>
          </Modal>
        </List>
      </Drawer>
      <AppBar position="static" color="white">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Explore Data
          </Typography>
          <Button color="inherit">Descriptive Analytics</Button>
          <Button color="inherit">Inferential Analytics</Button>
          <Button color="inherit">Predictive Analytics</Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        {/* {
          console.log("nullPercentage:",nullPercentage),
          console.log("dataType:",dataType),
          console.log("nullReady:",nullReady),
          console.log("dtypeReady:",dtypeReady)
        } */}
        {
            rowReady && colReady && nullReady && dtypeReady ?
            (
                // <SimpleTable cols = {cols} rows = {rows} nulls = {nullPercentage} dtype = {dataType}/>
                // <TestTable cols = {cols} rows = {rows} nulls = {nullPercentage} dtype = {dataType}/>
                // <TestTable cols = {cols} rows = {rows} nulls = {nullPercentage} dtype = {dataType}/>
                <TablePage cols = {cols} rows = {rows} nulls = {nullPercentage} dtype = {dataType}/>

                
                // <Button color="inherit" onClick={()=>{console.log("Data aya hua hai")}}>Data</Button>
            )
            :
            (
              <h3>Upload Dataset using Sidebar</h3>
                // <Button color="inherit" onClick={()=>{console.log("Data Ni Aya")}}>Data No</Button>

            )
        }
      </main>
    </div>
  );
};

export default SimpleDrawer;
