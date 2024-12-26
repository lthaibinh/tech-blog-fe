'use client';
import React, { useState, useEffect, Dispatch, FC } from "react";
import ReactDOM from "react-dom";
import { Drawer, Button, Space, DrawerProps } from "antd";
import clsx from "clsx";

interface IProps extends DrawerProps {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>
    children?: React.ReactNode
}
export const ResizableDrawer: FC<IProps> = ({open, setOpen, ...props}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(400);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onMouseDown = () => {
    setIsResizing(true);
  };

  const onMouseUp = () => {
    setIsResizing(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      let offsetRight =
        document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
      const minWidth = 50;
      const maxWidth = 600;
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        setWidth(offsetRight);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer
        title="Drawer with extra actions"
        placement={"right"}
        onClose={onClose}
        width={width}
        open={open}
        closable={false}
        extra={
            <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
        className={clsx({
            'select-none': isResizing
        })}
        {...props}
      >
        <div
          style={{
            position: "absolute",
            width: "5px",
            padding: "4px 0 0",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 100,
            cursor: "ew-resize",
            backgroundColor: "#f4f7f9"
          }}
          onMouseDown={onMouseDown}
        />
        {props.children}
      </Drawer>
    </>
  );
};
