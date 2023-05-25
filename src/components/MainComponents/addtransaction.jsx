import { useEffect, useState } from "react";
import { Input, Select, Button, Form, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  addIncome,
  undoUpdateTransaction,
  updateTransactionData,
} from "../../redux/trackerdataslices/trackerSlice";
import { UndoOutlined } from "@ant-design/icons";

const AddTransaction = () => {
  const trackerData = useSelector((state) => state.expensetracker);
  const [form] = Form.useForm();

  const [fields, setFields] = useState([]);

  const dispatchTransaction = useDispatch();

  const onFinish = (values) => {
    let { transactionName, transactionAmount, transactionType } = values;

    let parsedTransactionAmount = parseFloat(transactionAmount);

    let data = {
      transactionName,
      transactionType,
      transactionAmount: parsedTransactionAmount,
    };
    onReset();

    if (trackerData.currentItemToUpdate) {
      return dispatchTransaction(
        updateTransactionData({
          ...data,
          id: trackerData.currentItemToUpdate.id,
        })
      );
    }

    if (transactionType.toUpperCase() === "INCOME") {
      dispatchTransaction(addIncome(data));
      return;
    }

    dispatchTransaction(addExpense(data));
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const handleUndoEdit = () => {
    dispatchTransaction(undoUpdateTransaction());
  };

  useEffect(() => {
    if (trackerData.currentItemToUpdate) {
      setFields([
        {
          name: ["transactionName"],
          value: trackerData?.currentItemToUpdate?.transactionName,
        },
        {
          name: ["transactionAmount"],
          value: trackerData?.currentItemToUpdate?.transactionAmount,
        },
        {
          name: ["transactionType"],
          value: trackerData?.currentItemToUpdate?.transactionType,
        },
      ]);
    } else {
      onReset();
    }
  }, [trackerData.currentItemToUpdate]);

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="add-transaction-form">
      <h2>Add New Transaction</h2>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        fields={fields}
        name="basic"
        form={form}
      >
        <div className="transaction-form">
          <div>
            <Form.Item
              name="transactionName"
              rules={[
                {
                  required: true,
                  message: "Please input transaction name",
                },
              ]}
            >
              <Input placeholder="Transaction Name" autoFocus />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="transactionAmount"
              rules={[
                {
                  required: true,
                  message: "Please input transaction amount",
                },
              ]}
            >
              <Input placeholder="Transaction Amount" type="number" />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="transactionType"
              rules={[
                {
                  required: true,
                  message: "Please input transaction type",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Transaction type"
                optionFilterProp="children"
                // onChange={onChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "INCOME",
                    label: "Income",
                  },
                  {
                    value: "EXPENSE",
                    label: "Expense",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="submit-unod-edit">
          <Button
            type={"primary"}
            htmlType="submit"
            danger={trackerData?.currentItemToUpdate ? true : false}
          >
            {trackerData?.currentItemToUpdate
              ? "Update Transaction"
              : "Add Transaction"}
          </Button>
          {trackerData?.currentItemToUpdate ? (
            <Tooltip title="Undo Edit">
              <UndoOutlined
                style={{
                  color: "red",
                  marginLeft: "30px",
                  cursor: "pointer",
                  fontSize: "1.7rem",
                }}
                onClick={() => {
                  handleUndoEdit();
                }}
              />
            </Tooltip>
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default AddTransaction;
