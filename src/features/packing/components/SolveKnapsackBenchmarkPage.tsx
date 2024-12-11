import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; 
import AppNavbar from "./AppNavbar";


ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function BenchmarkPage() {
  const { t } = useTranslation(); 

  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: t("executionTimeLabel"), 
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const capacities = [
    0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
  ];
  const itemCounts = Array(100).fill(100); 

  useEffect(() => {
    if (chartData) {
      console.log("Chart Data updated:", chartData);
    }
  }, [chartData]);

  const runBenchmark = () => {
    setLoading(true);

// Delete it if you want just one graph
    // setChartData({
    //   labels: [],
    //   datasets: [
    //     {
    //       label: t("executionTimeLabel"),
    //       data: [],
    //       borderColor: "rgba(75, 192, 192, 1)",
    //       backgroundColor: "rgba(75, 192, 192, 0.2)",
    //       borderWidth: 2,
    //     },
    //   ],
    // });

    const worker = new Worker(
      new URL("../utils/benchmarkWorker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    worker.postMessage({ capacities, itemCounts });

    worker.onmessage = (e: MessageEvent) => {
      if (e.data.avgTime !== undefined) {
        updateChart(e.data.capacity, e.data.avgTime);
      } else if (e.data.finalResult) {
        setLoading(false);
        worker.terminate();
      }
    };

    worker.onerror = (error) => {
      console.error("Error from worker:", error);
      setLoading(false);
    };
  };

  const updateChart = (capacity: number, avgTime: number) => {
    setChartData((prevData) => ({
      labels: [...(prevData.labels || []), capacity],
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        data: [...(dataset.data || []), avgTime],
      })),
    }));
  };

  return (
    <>
      <AppNavbar pageTitle={t("packingPageTitle")} pageLink="/" />
      <Box sx={{ width: "60%", margin: "0 auto" }}>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            textAlign: "center",
            mt: 20,
          }}
        >
          {t("benchmarkTitle")}
        </Typography>
        <Box textAlign="center">
          <Button
            onClick={runBenchmark}
            variant="contained"
            color="primary"
            sx={{
              width: "250px",
              height: "50px",
              fontSize: "1rem",
              my: 10,
            }}
            disabled={loading}
          >
            {loading ? t("running") : t("runBenchmarkButton")}
          </Button>
        </Box>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                x: {
                  title: { display: true, text: t("capacityAxis") },
                },
                y: {
                  title: { display: true, text: t("executionTimeAxis") },
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <Box
            display="flex"
            textAlign="center"
            justifyContent="center"
            alignContent="center"
          >
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("noBenchmarkData")}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
