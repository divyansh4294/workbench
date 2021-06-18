import React from "react";
import {
  Typography,
  Box,
  OutlinedInput,
  Menu,
  MenuItem
} from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowRight from "@material-ui/icons/ArrowRight";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import '../App.css';
import Modal from 'react-awesome-modal';

export class Myproject extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      dataLoading: false,
      activeItemId: null,
      rename: false,
      contextMenuPosition: null,
      value: "",
      deleteDialogProps: null,
      isDirectory: null,
      showPopup: false,
      valueAddProject:""
    };
  }

  async componentDidMount() {
    const username = sessionStorage.username;
    const url = "http://localhost:5000/createtree/Data/" + username;
    await axios.get(url)
      .then(res => this.setState({
        data: res.data.Tree,
        dataLoading: true
      }))
  }

  textChange = event => {
    this.setState({ value: event.target.value });
  };

  keyPress = (event, path) => {
    var { data, value } = this.state;
    if (event.keyCode === 13) {
      if (value) {
        var i = 1;
        const pathArray = path.split("/");

        data.children.forEach(function iter(a) {
          if (i === pathArray.length - 1) {
            if (a.name === pathArray[i]) {
              a.name = value;
            }
          } else {
            if (a.name === pathArray[i]) {
              i += 1;
              a.children.forEach(iter);
            }
          }
        });
      }
      event.target.blur();
    }
    if (event.keyCode === 27) {
      event.persist();
      event.target.blur();
    }
  };

  toggleRename = () => {
    if (!this.state.rename) {
      this.hideContextMenu();
      setTimeout(() => {
        this.setState({ rename: true });
      }, 500);
    } else {
      this.setState({ rename: false, value: "" }, () => {
        this.setState({ activeItemId: null, isDirectory: null });
      });
    }
  };

  showContextMenu = (event, path, type) => {
    const xPos = event.clientX;
    const yPos = event.clientY;
    if (type !== "directory") {
      this.setState({ activeItemId: path }, () => {
        this.setState({ contextMenuPosition: { x: xPos, y: yPos } });
      });
    }
  };

  hideContextMenu = () => {
    this.setState({ contextMenuPosition: null, isDirectory: null });
  };

  deleteObject = () => {
    var { data, activeItemId } = this.state;
    var i = 1;
    const pathArray = activeItemId.split("/");

    data.children.forEach(function del(a) {
      if (a.name === pathArray[i]) {
        i += 1;
        if (i === pathArray.length - 1) {
          a.children.splice(
            a.children.findIndex(item => item.name === pathArray[i]),
            1
          );
        } else {
          a.children.forEach(del);
        }
      }
    });

    this.setState({
      deleteDialogProps: null,
      activeItemId: null,
      contextMenuPosition: null,
      isDirectory: null
    });
  };

  openPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  addProject() {
    console.log(this.state.valueAddProject)
    const newProjectName = this.state.valueAddProject;
    const username = sessionStorage.username;
    const folderUrl = "http://localhost:5000/createfolder/"+username+"?foldername=" + newProjectName;
    fetch(folderUrl,{
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      method:'POST'
    })
    .then(data=>{
      console.log(data)
    })
    alert("Project Added Successfully!!!")
    this.closePopup()
  }

  onClickCreateProject=(e)=>{
    alert("Create Project")
  }

  handleAddProjectChange=(event)=> {
    this.setState({valueAddProject: event.target.value});
  }

  onClickProceed = () =>{
    
  } 
  render() {
    const { data, dataLoading, rename, contextMenuPosition, activeItemId, value, isDirectory } = this.state;

    const customLabel = (data, path) => {
      if (rename) {
        return (
          <Box className="textField" display="flex">
            {path !== activeItemId && <Typography>{data.name}</Typography>}

            {path === activeItemId && (
              <OutlinedInput
                className="textField"
                margin="dense"
                autoFocus
                placeholder={data.name}
                value={value}
                fullWidth
                variant="outlined"
                onChange={event => {
                  this.textChange(event);
                }}
                onFocus={event => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onBlur={event => {
                  this.toggleRename();
                  event.stopPropagation();
                }}
                onKeyDown={event => {
                  this.keyPress(event, path);
                  event.stopPropagation();
                }}
              />
            )}
          </Box>
        );
      }

    }

    const TreeRender = (data, filePath) => {
      console.log("TreeRender Data:", data)
      var path;
      if (!filePath) {
        path = `${data.name}`;
      } else {
        path = `${filePath}/${data.name}`;
      }

      const isChildren = data.children && data.children.length > 0;

      if (!rename) {
        if (data.type === "directory") {
          if (isChildren) {
            return (
              <TreeItem 
                key={path}
                nodeId={path}
                label={<Typography className>{data.name}</Typography>}
                onContextMenu={event => {
                  this.showContextMenu(event, path, data.type);
                  // event.stopPropogation();
                  event.preventDefault();
                }}
              >
                {data.children.map((node, index) => TreeRender(node, path))}
              </TreeItem>
            );
          } else {
            return (
              <TreeItem
                key={path}
                nodeId={path}
                label={<Typography>{data.name}</Typography>}
                onContextMenu={event => {
                  this.showContextMenu(event, path, data.type);
                  // event.stopPropogation();
                  event.preventDefault();
                }}
              >
                {[""].map((node, index) => TreeRender(node, path))}
              </TreeItem>
            );
          }
        }
        return (
          <TreeItem
            key={path}
            nodeId={path}
            label={<Typography>{data.name}</Typography>}
            onContextMenu={event => {
              this.showContextMenu(event, path, data.type);
              // event.stopPropagation();
              event.preventDefault();
            }}
          />
        );
      } else {
        if (data.type === "directory") {
          if (isChildren) {
            return (
              <TreeItem
                key={path}
                nodeId={path}
                label={customLabel(data, path)}
              >
                {data.children.map((node, index) => TreeRender(node, path))}
              </TreeItem>
            );
          } else {
            return (
              <TreeItem
                key={path}
                nodeId={path}
                label={customLabel(data, path)}
              >
                {[""].map((node, index) => TreeRender(node, path))}
              </TreeItem>
            );
          }
        }
        return (
          <TreeItem key={path} nodeId={path} label={customLabel(data, path)} />
        );
      }
    };

    if (dataLoading) {
      (console.log("Data is loaded", data))
      return (
        <>
        <div className='sidebar'>
          <h3>File Explorer</h3>
          <TreeView defaultCollapseIcon={<ArrowDropDown />} defaultExpandIcon={<ArrowRight />}>
            {TreeRender(data)}
          </TreeView>
          {contextMenuPosition && (
            <Menu
              id="edit-menu"
              anchorReference="anchorPosition"
              anchorPosition={{
                top: contextMenuPosition ? contextMenuPosition.y : 10,
                left: contextMenuPosition ? contextMenuPosition.x : 10
              }}
              open={Boolean(contextMenuPosition && contextMenuPosition.x > 0)}
              onClose={this.hideContextMenu}
            >
              {activeItemId && (
                <div>
                  <MenuItem
                    onClick={event => {
                      this.toggleRename();
                      // event.stopPropagation();
                      event.preventDefault();
                    }}
                  >
                    <Typography>Rename</Typography>
                  </MenuItem>
                  <MenuItem
                    disabled={isDirectory}
                    onClick={() => this.deleteObject()}
                  >
                    <Typography>Delete</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          )}
          <Typography className="footer" variant="caption">
            Right click on file to Rename / Delete it.
          </Typography>
        </div>
        <div>
            {/* {<h1>Hi, {sessionStorage.username}</h1>} */}
            <h2>Welcome to Analytics Workbench</h2>
            <input type="button" value="Create Project" onClick={() => this.openPopup()} />
            <Modal visible={this.state.showPopup} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closePopup()}>
              <div>
                <form>
                  <h3>Enter Project Details</h3>
                  <label>
                    Project Name:<input placeholder="Enter Project Name" type="text" name="name" value={this.state.valueAddProject} onChange={(e)=>{this.handleAddProjectChange(e)}} />
                  </label>
                  {/* <label>
                    Description:<textarea placeholder="in less than 100 words" value={this.state.value} onChange={(e)=>{this.handleChange(e)}} />
                  </label> */}
                  <br/>
                  <br/>
                <button href="javascript:void(0);" onClick={() => this.closePopup()}>Back</button>
                <button href="javascript:void(0);" onClick={() => this.addProject()}>Add Project</button>
                </form>
              </div>
            </Modal>
        </div>
        <div className='proceedButton'>
          {/* <button onClick={(event) =>  window.location.href='/data'}>Proceed</button> */}
          <button onClick={(event) =>  window.location.href='/dataset'}>Proceed</button>

        </div>
        </>
      )
    } else {
      (console.log("Data is not loaded", data))
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }
  }
}

export default Myproject
