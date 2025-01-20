import { Row } from "antd";
import { FC } from "react";
import { Catalog } from "../pages/blogs/Catalog";

const catalog = ["Mới nhất", "Series", "Trending"];
export const BodyLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main-page max-w-[1200px] w-full mx-auto flex pt-4">
      <div className="left-content-container w-96">
        <Catalog data={catalog} />
      </div>
      <div className="w-full p-4 min-h-screen">{children}</div>
    </div>
  );
};
