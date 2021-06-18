import React, { Component } from 'react';


export class UploadCsv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      rowData: '',
      colData: '',
      dataTypes: '',
      nullPercentage: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  async handleUploadImage(ev) {
    ev.preventDefault();
    const data = new FormData();
    // console.log("UploadInput:",this.uploadInput.files[0])
    data.append('file', this.uploadInput.files[0]);
    // console.log("Dat:",data)
    // data.append('filename', this.fileName.value);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then((data) => {
        // console.log("dataTypes:",data.Dtypes)
        // console.log("nullPercentage:",data.Nulls)
        this.setState({ rowData: data.Rows });
        this.setState({ colData: data.Columns });
        this.setState({ dataTypes: data.Dtypes });
        this.setState({ nullPercentage: data.Nulls });
        this.sendData();
      })
    this.props.actionName();
  }

  sendData() {
    this.props.parentRows(this.state.rowData);
    this.props.parentCols(this.state.colData);
    this.props.parentDataType(this.state.dataTypes);
    this.props.parentNullPercentage(this.state.nullPercentage);
  };
  

  render() {
    const divstyle = {
      color: "white",
      height: "300px",
      width: "400px",
      backgroundColor: '#007bff',
      padding: "10px",
      fontFamily: "Arial",
      textAlign:"center",
      // alignItems: "center",
    };
    const headerStyle = {
      color: "white",
      // backgroundColor: "#007bff",
      padding: "10px",
      fontFamily: "Arial",
      alignItems: 'center',
    };
    return (
      <div style={divstyle}>
        <h3 style={headerStyle}>Upload Dataset</h3>
        <input style={{marginLeft:"50px"}} ref={(ref) => { this.uploadInput = ref; }} type="file" />
        <p style={{margin:"10px"}}>Note: Only csv</p>
        <button style={{margin:"10px", position:"bottom"}} onClick={this.handleUploadImage}>Upload</button>
        <button style={{margin:"10px", position:"bottom"}} onClick={this.props.actionName}>Back</button>
      </div>
    )
  }
}

export default UploadCsv
