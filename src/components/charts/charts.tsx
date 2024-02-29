import BarChart from "./barChart"
import DonutChart from "./donutChart";
import LineChart from "./lineChart";
import RadarChart from "./radarChart";

function Charts() {

    const data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
          {
            label: 'Ventes 2024',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };

      const donutData = {
        labels: ['Rouge', 'Bleu', 'Jaune'],
        datasets: [
          {
            label: 'Nombre de Votes',
            data: [11, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

       // Données pour le graphique linéaire
  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Visiteurs Uniques',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Données pour le graphique à radar
  const radarData = {
    labels: ['Manger', 'Boire', 'Dormir', 'Design', 'Coder', 'Courir', 'Nager'],
    datasets: [
      {
        label: 'Personne A',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40],
        borderWidth: 1,
      },
      {
        label: 'Personne B',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27, 100],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="flex flex-col gap-20 bg-secondary-light p-2">
        < BarChart data={data} />
        < DonutChart data={donutData} />
        < LineChart data={lineData} />
        < RadarChart data={radarData} />
    </div>
  )
}

export default Charts