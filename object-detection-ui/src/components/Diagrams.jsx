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
      const labels = data.map((item) => new Date(item.timestamp * 1000).toLocaleString());
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

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <canvas id="barChart" width="800" height="400"></canvas>
      </div>
      <div>
        <canvas id="lineChart" width="800" height="400"></canvas>
      </div>
      <div>
        <canvas id="doughnutChart" width="800" height="400"></canvas>
      </div>
      <div>
        <canvas id="radarChart" width="800" height="400"></canvas>
      </div>
    </div>
  );
};

export default Diagrams;