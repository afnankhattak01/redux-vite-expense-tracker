import React from "react";
import { Tabs } from "antd";
const onChange = (key) => {
  // console.log(key);
};
const HistroyTabs = ({ children }) => {

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        className="end-tabs"
        items={[
          {
            label: "Transaction History",
            key: "1",
            children: children[0],
          },
          {
            label: `Transactions Doughnut Chart`,
            key: "2",
            children: children[1],
          },
        ]}
      />
    </>
  );
};
export default HistroyTabs;
