import { format, formatRelative, subDays } from "date-fns";

import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Divider, List, Typography, Tooltip } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  removeTransaction,
  updateTransaction,
} from "../../redux/trackerdataslices/trackerSlice";

const TransactionHistory = () => {
  const { transactionHistory } = useSelector((state) => state.expensetracker);

  const transactionDispatcher = useDispatch();

  const handleUpdateTransaction = (transaction) => {
    transactionDispatcher(updateTransaction(transaction));
  };

  const handleDeleteTransaction = (transaction) => {
    transactionDispatcher(removeTransaction(transaction));
  };

  return (
    <>
      <Divider orientation="left">Transaction History</Divider>

      <List
        header={<div>All Transactions</div>}
        bordered
        style={{ maxHeight: "320px", overflow: "auto" }}
        dataSource={transactionHistory ? transactionHistory : []}
        renderItem={(item) => (
          <List.Item>
            <div className="list-lines">
              <Tooltip 
              placement="left"
                title={() => {
                  return (
                    <>
                      <h3>Transaction Details</h3>
                      <small>Name: {item.transactionName}</small>
                      <br />
                      <small>
                        Amount: $ {item.transactionAmount?.toFixed(2)}
                      </small>
                      <br />

                      <small>
                        {" "}
                        Added On:{" "}
                        {format(new Date(item.addedOn), "MM/dd/yyyy - h:m:s")}
                      </small>
                    </>
                  );
                }}
              >
                <Typography.Text mark>{item.transactionName}</Typography.Text>
              </Tooltip>

              <div className="icon-badges">
                <div
                  style={{
                    backgroundColor:
                      item.transactionType.toUpperCase() === "EXPENSE"
                        ? "#D30000"
                        : "#122a58",
                    color: "#fff",
                    padding: "2px 12px",
                    borderRadius: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {item.transactionType.toLowerCase()} :{" "}
                  {`$  ${item.transactionAmount}`}
                </div>
                <Tooltip title="Edit Transaction">
                  <EditOutlined
                    style={{
                      color: "blue",
                      marginLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleUpdateTransaction(item);
                    }}
                  />
                </Tooltip>

                <Tooltip title="Delete Transaction">
                  <DeleteOutlined
                    style={{
                      color: "red",
                      marginLeft: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleDeleteTransaction(item);
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};
export default TransactionHistory;
