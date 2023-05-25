import { useSelector } from "react-redux";
const BudgetInfo = () => {
  const { totalBalance, remainingBalance, spentSoFar } = useSelector(
    (state) => state.expensetracker
  );

  return (
    <div className="main-container  custom-container">
      <h2>My Budget Planner</h2>
      <div className="main-info-columns">
        <div>
          <h4>Total Balance : $ {totalBalance}</h4>
        </div>
        <div>
          <h4>Spent so far: $ {spentSoFar}</h4>
        </div>
        <div>
          <h4>Remaining: $ {remainingBalance}</h4>
        </div>
      </div>
    </div>
  );
};

export default BudgetInfo;
