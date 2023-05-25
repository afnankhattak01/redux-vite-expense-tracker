import { useState } from "react";
import AddTransaction from "../components/MainComponents/addtransaction";
import BudgetInfo from "../components/maincomponents/budgetinfo";
import TransactionHistory from "../components/MainComponents/TransactionHistory";
import { DonutChart } from "../components/MainComponents/donutChart";
import HistroyTabs from "../components/MainComponents/tabs";
import HistoryViewType from "../components/MainComponents/Historyviewtype";

const BuggetInformation = () => {
  const [viewType, setViewType] = useState("SPLIT");

  const handleChange = (value) => {
    setViewType(value);
  };

  return (
    <main className="mainPage">
      <div className="budget-info">
        <BudgetInfo />
      </div>
      <section className="add-transaction">
        <div className="custom-container">
          <AddTransaction />
        </div>
      </section>

      <section className="view-type-select">
        <div className="custom-container">
          <HistoryViewType handleChange={handleChange} />
        </div>
      </section>
      <section className="transaction-history">
        <div className="custom-container addtransaction-container">
          {viewType === "TABS" ? (
            <HistroyTabs>
              <div>
                <TransactionHistory />
              </div>
              <div className="first-child chld-1">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <DonutChart />
                </div>
              </div>
            </HistroyTabs>
          ) : (
            <>
              <div className="first-child">
                <TransactionHistory />
              </div>
              <div className="first-child chld-1">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <DonutChart />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BuggetInformation;
