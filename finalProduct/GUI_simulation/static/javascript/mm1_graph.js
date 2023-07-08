function plotLineGraph(dataList, labelList) {
    var ctx = document.getElementById('myChart1').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {

            datasets: [{
                label: 'Graph',
                data: mql_values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.3,   //set the tension property to a value between 0 and 1
            }]
        },
        options: {
            scales: {
                xAxes: {

                display :true,
                text = 'Number of entitites',


            family: 'Comic Sans MS',

          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
                },
                yAxes: {
                    labels: entities_list,
                    scaleLabel: {

                        text: 'MQL Value'
                    }
                }
            }
        }
    });
}


function test(dataList, labelList) {
    var ctx = document.getElementById('myChart2').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: entities_list,
            datasets: [{
                label: 'Graph',
                data: mql_values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.3,   //set the tension property to a value between 0 and 1
            }]
        },
        options: {
            scales: {
                xAxes: [{

                    title: {
                        display: true,
                        text: 'Entities'
                    }

                }],
                yAxes: [{

                    title: {
                        display: true,
                        text: 'MQL Value'
                    }
                }]
            }
        }
    });
}

function downloadImage() {
    var canvas = document.getElementById('myChart');
    var link = document.createElement('a'); // temporary link element
    link.href = canvas.toDataURL('image/png'); // Set the link's href attribute to the image data URL
    link.download = 'MM1graph.png'; // Set the link's download attribute with a desired filename
    link.click();
}

function test(entities_list) {

    //mql calculation :

     const arrivalRate = 3; // Arrival rate (λ)
    const serviceRate = 5; // Service rate (μ)
    const maxEntities = 2000; // Maximum number of entities

    // Calculate MQL for different number of entities

    for (let i = 1; i <= maxEntities; i++) {
      const mql = (arrivalRate * serviceRate) / (serviceRate - arrivalRate) * (1 - Math.pow((arrivalRate / serviceRate), i));
      if(i==670)
      {console.log(mql);}


    }



}