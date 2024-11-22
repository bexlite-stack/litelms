function lineChartComponent() {
  return {
    chart: null,
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    dataset: [12, 19, 3, 5, 2, 3, 9],

    init() {
      const ctx = document.getElementById("lineChart").getContext("2d");

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Weekly Data",
              data: this.dataset,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {},
          scales: {
            x: {
              title: {
                display: true,
                text: "Days of the Week",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Values",
              },
            },
          },
        },
      });
    },
  };
}
