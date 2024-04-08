import { useEffect } from "react";
import { Chart } from "chart.js";
function Doughnut({ industryExperience }) {
  useEffect(() => {
    console.log(industryExperience, "industryExperience");
    // Extracting labels and data from the input data
    if (industryExperience != null) {
      const labels = industryExperience.map((item) => item.industry);
      const data = industryExperience.map((item) => item.percentage);

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "doughnut",

        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              borderColor: [
                "#FC6161",
                "#A981FF",
                "#6082FC",
                "#FC9860",
                "#96F387",
              ],
              backgroundColor: [
                "#FC6161",
                "#A981FF",
                "#6082FC",
                "#FC9860",
                "#96F387",
              ],
            },
          ],
        },

        options: {
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              radius: 2, // Use dots instead of default shapes
            }, // Position the legend on the right
          },
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        },
      });
    }
  }, []);

  return (
    <>
      {industryExperience ? (
        <canvas id="myChart"></canvas>
      ) : (
        <div className=""> Not Added</div>
      )}
    </>
  );
}

export default Doughnut;
