import {Box, useTheme} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {mockDataContacts} from "../../data/mockData";
import { Member } from "../../schema";

import Header from "../../components/Header";
const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field:"id", headerName:"ID", flex:0.5},
        {field:"name", headerName:"Name", flex:1, cellClassName:"name-column--cell"},
        {field:"email", headerName:"Email", flex:1},
        {field:"address", headerName:"Address", flex:3},
        {field:"phone1", headerName:"Phone Number1", flex:1},
        {field:"phone2", headerName:"Phone Number2", flex:1},
        {field:"dueDate", headerName:"Due Date", flex:1, type:"number", headerAlign:"left", align:"left"},
        {field:"classKind", headerName:"Class Kind", flex:1},
    ];

    return (
        <Box m="20px">
            <Header title="CONTACTS" subtitle="List of Contacts for Future Reference"/>
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border : "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom : "none",
                },
                "& .name-column-cell": {
                    color : colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor : colors.blueAccent[700],
                    borderBottom : "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor : colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop : "none",
                    backgroundColor : colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color : `${colors.grey[100]} !important`,
                },
            }}>
                <DataGrid
                    rows={mockDataContacts}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />     
            </Box>
        </Box>
    );
}

export default Contacts;
