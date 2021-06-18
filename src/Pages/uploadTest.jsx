import React, { useState, useEffect } from 'react';

class Uploaddata extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // imageURL: 'upload sucess',
      rowData:'',
      colData:'',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    })
    .then(res => res.json())
    .then((data)=>{
      console.log("data.Rows:",data.Rows)
      console.log("data.Columns:",data.Columns)
      this.setState({rowData:data.Rows});
      this.setState({colData:data.Columns});
      this.props.parentRows(this.state.rowData);
      this.props.parentCols(this.state.colData);

      // this.sendData()
    })
  }

  render() {
    return (
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        <br />
        <button onClick={this.handleUploadImage}>Upload</button>
        </div>
    );
  }
}

export default Uploaddata;