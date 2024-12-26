import { Row } from "antd";
import { FC } from "react";

const catalog = [
  {
    name: "Mới nhất",
  },
  {
    name: "Series",
  },
  {
    name: "Trending",
  },
];
export const BodyLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main-page max-w-[1200px] w-full mx-auto flex pt-4">
      
        <div className="flex-col w-80 bg-white">
          {catalog.map((item, index) => {
            return <div key={index} className="h-10 pt-4 pl-4">{item.name}</div>;
          })}
        </div>
        <div className="w-full p-4">
        {children}
        </div>
    </div>
  );
};
