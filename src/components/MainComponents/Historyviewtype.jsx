import React from "react";
import { Select } from "antd";

const HistoryViewType = ({ handleChange }) => {
  return (
    <>
      <Select
        placeholder="Select view type"
        style={{
          minWidth: "120px",
        }}
        onChange={handleChange}
        options={[
          {
            value: "TABS",
            label: "Tabs",
          },
          {
            value: "SPLIT",
            label: "Split",
          },
        ]}
      />
    </>
  );
};
export default HistoryViewType;
