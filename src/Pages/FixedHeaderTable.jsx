import React, { useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import MUIDataTable from "mui-datatables";
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import FontIcon from '@material-ui/icons/FontIcon';l

// const options = {
//     responsive: "scroll"
// }

createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#2aa198',
    },
    background: {
        default: '#002b36',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const handleChange = () => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected");
};

const handleClearRows = () => {
    this.setToggledClearRows({ toggledClearRows: !this.toggledClearRows})
};

const sortIcon = <ArrowDownward />

function FixedHeaderTable(props) {
    const [toggledClearRows, setToggledClearRows] = useState(false);
    const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' },
    { id: 2, title: 'Conan the Barbarian', year: '1982' },
    { id: 3, title: 'Conan the Barbarian', year: '1982' },
    { id: 4, title: 'Conan the Barbarian', year: '1982' }];
    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Year',
            selector: 'year',
            sortable: true,
            right: true,
        },
    ];
    return (
        <div>
            {/* <MUIDataTable
                // title={"Dataset"}
                data={props.data}
                columns={props.columns}
                options={options}
            /> */}
            <h3>DataSet</h3>
            {/* <DataTable
                title="Arnold Movies"
                columns={columns}
                data={data}
                selectableRows
                selectableRowsComponent={Checkbox}
                selectableRowsComponentProps={{ inkDisabled: true }}
                // sortIcon={<FontIcon>arrow_downward</FontIcon>}
                onSelectedRowsChange={handleChange}
            /> */}

            <DataTable
            pagination
            // paginationRowsPerPageOptions
            // highlightOnHover
            columns={props.columns}
            data={props.data}
            selectableRows // add for checkbox selection
            // selectableRowsComponent={Checkbox}
            // sortIcon={sortIcon}
            // onSelectedRowsChange={handleChange}
            // clearSelectedRows={toggledClearRows}

            // Clicked
            // Selected={handleChange}
            // theme="solarized"
          />
        </div>
    )
}

export default FixedHeaderTable


// ...

// const handleChange = (state) => {
//   // You can use setState or dispatch with something like Redux so we can use the retrieved data
//   console.log('Selected Rows: ', state.selectedRows);
// };

// class MyComponent extends Component {
//   render() {
//       return (
//         <DataTable
//           title="Arnold Movies"
//           columns={columns}
//           data={data}
//           selectableRows // add for checkbox selection
//           Clicked
//           Selected={handleChange}
//         />
//     )
//   }
// };

