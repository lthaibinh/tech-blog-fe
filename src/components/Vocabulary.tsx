"use client";

import React, { useState } from "react";
import { Button, Drawer, FloatButton, Radio, Space } from "antd";


import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import { Grid } from "./Grid";
import { ResizableDrawer } from "./ResizableDrawer";

type AgGridApi = {
  grid?: GridApi;
  column?: ColumnApi;
};

export const Vocabulary: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ])
  const addRow = () => {
    setData(prev => [...prev,
        [
            { value: "" }, { value: "" }
        ]
    ])
  }

  const columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 70
    },
    {
      headerName: "Athlete",
      field: "athlete",
      width: 150,
      editable: true
    },
    {
      headerName: "Age",
      field: "age",
      width: 90,
      minWidth: 50,
      maxWidth: 100,
      editable: true
    },
    {
      headerName: "Country",
      field: "country",
      width: 120
    },
    {
      headerName: "Year",
      field: "year",
      width: 90
    },
    {
      headerName: "Date",
      field: "date",
      width: 110
    },
    {
      headerName: "Sport",
      field: "sport",
      width: 110
    },
    {
      headerName: "Gold",
      field: "gold",
      width: 100
    },
    {
      headerName: "Silver",
      field: "silver",
      width: 100
    },
    {
      headerName: "Bronze",
      field: "bronze",
      width: 100
    },
    {
      headerName: "Total",
      field: "total",
      width: 100
    }
  ];

  return (
    <>
      {/* <FloatButton
        className="right-3 top-24"
        type="primary"
        onClick={showDrawer}
      >
        Click me
      </FloatButton> */}

      {/* <Drawer
        title="Drawer with extra actions"
        placement={"left"}
        width={'fit-content'}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        
        <Grid />

      </Drawer> */}
      <ResizableDrawer open={open} setOpen={setOpen} >
        <Grid />
      </ResizableDrawer>
    </>
  );
};
