"use client";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme
import { Button, Space } from "antd";
const columnDefs: ColDef[] = [
  {
    headerName: "",
    field: "numberOrderUnique",
    valueGetter: "node.rowIndex + 1",
    resizable: false,
  },
  {
    headerName: "A",
    field: "A",
    minWidth: 10,
    width: 100,
    editable: true,
    headerClass: "binhtest",
  },
  {
    headerName: "B",
    field: "B",
    minWidth: 10,
    width: 100,
    editable: true,
  },
  {
    headerName: "C",
    field: "C",
    minWidth: 10,
    width: 100,
    editable: true,
  },
];

type AgGridApi = {
  grid?: GridApi;
  column?: ColumnApi;
};

export const Grid = () => {
  const [rowData, setRowData] = React.useState<any[]>([
    {
      id: 1,
      country: "vietnam",
    },
    {
      id: 2,
      country: "english",
    },
  ]);
  const [columns, setColumns] = React.useState<ColDef[]>(columnDefs)
  const apiRef = React.useRef<AgGridApi>({
    grid: undefined,
    column: undefined,
  });
  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  React.useEffect(() => {
    // fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);
  const addRow = () => {
    setRowData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
      },
    ]);
  };
  const addCol = () => {
    setColumns((prev) => [
      ...prev,
      {
        headerName: "D",
        field: "D",
        minWidth: 10,
        width: 100,
        editable: true,
      },
    ])
  };
  return (
    <div style={{ height: "80vh" }}>
      <Space>
        <Button onClick={addRow}>add row</Button>
        <Button onClick={addCol}>add column</Button>
      </Space>
        <div
          style={{ height: "100%", width: "100%" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowSelection="multiple"
            // suppressRowClickSelection
            columnDefs={columns}
            onGridReady={onGridReady}
            rowData={rowData}
            autoSizeStrategy={{
              type: "fitCellContents",
              colIds: ["numberOrderUnique"],
            }}
          />
        </div>
     
    </div>
  );
};
