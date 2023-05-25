import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DonutChart() {
  const trackerData = useSelector((state) => state.expensetracker);

  const data = {
    labels: ["Total Balance", "Remaining Balance", "Spent So far"],
    datasets: [
      {
        label: "Amount in $",
        data: [
          trackerData?.totalBalance,
          trackerData?.remainingBalance,
          trackerData?.spentSoFar,
        ],
        backgroundColor: [
          "rgb(217, 214, 214)",
          "rgb(159, 227, 159)",
          "rgb(244, 144, 144)",
        ],
        borderWidth: 1,
        borderColor: [
          "rgb(217, 214, 214)",
          "rgb(159, 227, 159)",
          "rgb(244, 144, 144)",
        ],
      },
    ],
  };

  return (
    <>
      <Doughnut data={data} />
    </>
  );
}
