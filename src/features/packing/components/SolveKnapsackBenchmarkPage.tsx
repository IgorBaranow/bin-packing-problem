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
import { useTranslation } from "react-i18next"; // Translation hook
import * as XLSX from "xlsx"; // For Excel file creation
import AppNavbar from "./AppNavbar";

// Register Chart.js components
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
  const itemCounts = Array(100).fill(100); // Assuming 100 of each item

  useEffect(() => {
    if (chartData) {
      console.log("Chart Data updated:", chartData);
    }
  }, [chartData]);

  const runBenchmark = () => {
    setLoading(true);

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
        console.log("Final benchmark results:", e.data.finalResult);
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

  const generateExcelFile = () => {
    if (!chartData.labels || !chartData.datasets[0].data) {
      console.error("Chart data is incomplete. Cannot generate Excel file.");
      return;
    }

    const headers = ["Capacity", "Execution Time (ms)"];
    const rows = chartData.labels.map((label, index) => [
      label,
      chartData.datasets[0].data[index],
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Benchmark Results");

    XLSX.writeFile(workbook, "benchmark_results.xlsx");
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
          <>
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
            <Box textAlign="center" mt={5}>
              <Button
                onClick={generateExcelFile}
                variant="outlined"
                color="secondary"
                sx={{
                  width: "170px",
                  height: "35px",
                  fontSize: "0.8rem",
                }}
              >
                {t("downloadResultsButton")}
              </Button>
            </Box>
          </>
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
