import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { get, ref } from 'firebase/database';
import Chart from 'chart.js/auto';

const Diagrams = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const detectionsRef = ref(firebase, 'detections');
      get(detectionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              newData.push(childData);
            });
            setData(newData);
            createCharts(newData);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const createCharts = (data) => {
      createBarChart(data);
      createLineChart(data);
      createDoughnutChart(data);
      createRadarChart(data);
      createPersonCountChart(data);
      createStackedBarChart(data);
    };

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const createBarChart = (data) => {
      const labels = data.map((item) => item.label);
      const confidenceValues = data.map((item) => item.confidence);

      const ctxBar = document.getElementById('barChart').getContext('2d');
      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Confidence Values',
              data: confidenceValues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const createLineChart = (data) => {
      const labels = data.map((item) => item.label);
      const confidenceValues = data.map((item) => item.confidence);

      const ctxLine = document.getElementById('lineChart').getContext('2d');
      new Chart(ctxLine, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Confidence Over Time',
              data: confidenceValues,
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const createDoughnutChart = (data) => {
      const labels = data.map((item) => item.label);
      const confidenceValues = data.map((item) => item.confidence);

      const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
      new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Confidence Values',
              data: confidenceValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
              ],
              borderColor: 'white',
              borderWidth: 1,
            },
          ],
        },
      });
    };

    const createRadarChart = (data) => {
      const labels = data.map((item) => item.label);
      const confidenceValues = data.map((item) => item.confidence);

      const ctxRadar = document.getElementById('radarChart').getContext('2d');
      new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Confidence Values',
              data: confidenceValues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        },
        options: {
          scale: {
            ticks: { beginAtZero: true },
          },
        },
      });
    };

    const createPersonCountChart = (data) => {
      const labels = data.map((item) => new Date(item.timestamp * 1000).toLocaleString());
      const personCountValues = data.map((item) => item.personCount || 0); // Assuming your data has a personCount property

      const ctxPersonCount = document.getElementById('personCountChart').getContext('2d');
      new Chart(ctxPersonCount, {
        type: 'line', // You can change the chart type based on your preference
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Person Count',
              data: personCountValues,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const createStackedBarChart = (data) => {
      const labels = data.map((item) => item.label);
      const datasets = Array.from(new Set(labels)).map((label) => ({
        label: label,
        data: data.filter((item) => item.label === label).map((item) => item.confidence),
        backgroundColor: getRandomColor(),
      }));

      const ctxStackedBar = document.getElementById('stackedBarChart').getContext('2d');
      new Chart(ctxStackedBar, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              stacked: true,
            },
          },
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="" style={{ textAlign: "Left", paddingLeft: "10px", border: "1px solid white"}}>
        <h3>Statistics</h3>
        <ul>
          <li>All detections: {data.length}</li>
          <li>Number of people: {data.filter((item) => item.label === 'person').length}</li>
          <li>Number of cars: {data.filter((item) => item.label === 'car').length}</li>
          <li>Number of bicycles: {data.filter((item) => item.label === 'bicycle').length}</li>
          <li>Number of motorbikes: {data.filter((item) => item.label === 'motorbike').length}</li>
          <li>Number of buses: {data.filter((item) => item.label === 'bus').length}</li>
          <li>Number of trucks: {data.filter((item) => item.label === 'truck').length}</li>
          <li>Number of traffic lights: {data.filter((item) => item.label === 'traffic light').length}</li>
          <li>Number of stop signs: {data.filter((item) => item.label === 'stop sign').length}</li>
        </ul>
      </div>
      <div className="diagram-container">
        <div className="chart-container">
          <canvas id="personCountChart" width="800" height="500"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="lineChart" width="800" height="400"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="barChart" width="800" height="400"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="stackedBarChart" width="800" height="400"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="doughnutChart" width="800" height="300"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="radarChart" width="800" height="300"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Diagrams;