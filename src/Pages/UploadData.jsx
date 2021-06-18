import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PublishIcon from '@material-ui/icons/Publish';
import Grid from '@material-ui/core/Grid';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Modal from 'react-awesome-modal';

// import * as XLSX from 'xlsx';
// import xtype from 'xtypejs';
// import axios from 'axios';
import Button from '@material-ui/core/Button';
// import Table from '@material-ui/core/Table';
// import DataTable from 'react-data-table-component';
// import FixedHeaderTable from './FixedHeaderTable';
import UploadCsv  from '../PopUps/UploadCsv';
// import TableDataset from './TableDataset';
import SimpleTable from './SimpleTable';
// import TableScrollbar from 'react-table-scrollbar';
// import TablePage from '../Pages/TablePage';

// import Pagination from "@material-ui/lab/Pagination";

// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import TableBody from '@material-ui/core/TableBody';
// import { Paper, TableContainer, TablePagination } from '@material-ui/core';
// import App1 from './SimpleTableTest';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    //   marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: theme.spacing(2),
  },
  box: {
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8
  },
  topRightBox: {
    justifyContent: "flex-end",
  }
}));

// function SimpleTable1(props){
//   const classes = useStyles();
//   const [selected, setSelected] = useState([]);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState();
//   const rows = props.rows;
//   const cols = props.cols;
//   const [dense, setDense] = useState(false);
//   const [page, setPage] = useState(2);
//   const [rowsPerPage, setRowsPerPage] = useState(100);

//   const handleChangePage = (event, newPage) => {
//     console.log("handleChangePage",event, newPage)
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     console.log("handleChangeRowsPerPage",event, event.target.value )
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   function getHeader (cols) {
//     return (
//       cols.map((col, index)=>{
//         return (
//           <TableCell key={index}>{col.name}</TableCell>
//         )
//         })
//     )
    
//   }

//   function getRowData (rows){
//     return (
//       rows
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//         .map((row) => (
//           <TableRow key={row.name}>
//             {
//               Object.values(row).map((item) => {
//                 return (
//                   <TableCell>{item}</TableCell>
//                 )
//               })
//             }
//           </TableRow>
//         ))
//     )
//   }

//   return (
//     <div>
//       <Paper>
//         <TableContainer>
//           <TableScrollbar rows={rows.length}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {getHeader(cols)}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {getRowData(rows)}
//                 {emptyRows > 0 && (
//                   <TableRow style={{ height: 53 * emptyRows }}>
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableScrollbar>
//         </TableContainer>
//         {/* <TablePagination
//           component="paper"
//           rowsPerPageOptions={[5, 10, 25]}
//           count={rows.length}
//           page={page}
//           onChangePage={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         /> */}
//       </Paper>
//     </div>

//   )
// }

export default function UploadData() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [cols, setCols] = useState('');
  const [rows, setRows] = useState('');
  const [dataType, setDataTypes] = useState('');
  const [nullPercentage, setNullPercentage] = useState('');
  const [page, setPage] = useState(0);
  const [rowReady, setRowReady] = React.useState(false);
  const [colReady, setColReady] = React.useState(false);


  const handlePageChange = (event, value) => {
    console.log(value)
    setPage(value)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    console.log("getRow:",x)
    setRows(x)
    setRowReady(true);
  }

  function getCol(x) {
    console.log("getCol:",x)
    setCols(x)
    setColReady(true);
  }

  function getNullPercentage(x) {
    // console.log("GetCol;",cols)
    setNullPercentage(x)
  }

  function getDataType(x) {
    // console.log("GetCol;",cols)
    setDataTypes(x)
  }
  function getRowData(rows) {
    return (
      rows.map((row) => (
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
          <TableCell key={index}>{col.name}</TableCell>
        )
      })
    )
  }

  function getNulls(x) {
    return (
      Object.values(x).map((item, index) => {
        // console.log(item.null)
        return (
          <TableCell key={index}>{item.null}% Null</TableCell>
        )
      })
    )
  };

  function getDtype(x) {
    return (
      Object.values(x).map((item, index) => {
        // console.log(item.dtype)
        return (
          <TableCell key={index}>{item.dtype}</TableCell>
        )
      })
    )
  };

  return (
    <>

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" noWrap>
            Explore Data
                    </Typography>
          <Grid direction="row" justify="flex-end">
            <Button className={classes.topRightBox} color="inherit">Descriptive Analytics</Button>
            <Button className={classes.topRightBox} color="inherit">Inferential Analytics</Button>
            <Button className={classes.topRightBox} color="inherit">Predictive Analytics</Button>
            <Button className={classes.topRightBox} color="inherit">Logout</Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
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
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="My Reports" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><AccountTreeIcon /></ListItemIcon>
            <ListItemText primary="My Models" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>
            <ListItemText primary="My Applications" />
          </ListItem>
        </List>
      </Drawer>
    </div>
    
      <main className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}>
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Button onClick={console.log("button 3 clicked")}>button3</Button>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        {/* <button onClick={console.log("button 3 clicked")}>b3</button> */}
      </main>
    {/* <div>
      {
        rowReady && colReady ? 
        // (<SimpleTable cols = {cols} rows = {rows} nulls = {nullPercentage} dtype = {dataType}/>)
        (
        <button onClick={ console.log("button 1 clicked")}>B1</button>
        )
        :
        // (<h1>Use Sidebar to Upload DataSet</h1>)
        (
        <button onClick={console.log("button  2 clicked")}>B2</button>
        )

      }
    </div> */}
    
    {/* <div>
      {
        <div>
          rows && cols ?
            (
              <SimpleTable cols = {cols} rows = {rows} nulls = {nullPercentage} dtype = {dataType}/>
            )
            :
            (
              <h1>Use Sidebar to Upload DataSet</h1>
            )
            </div>
        }
    </div> */}
    </>
  );
}

