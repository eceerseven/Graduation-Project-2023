function calculateMQL(arrivalRate, serviceRate, noOfServers) {
    var c = noOfServers;
    var p = arrivalRate / (serviceRate * c); // representing the traffic intensity
    var r = arrivalRate / serviceRate;
    // calculating P0 probability (where p<1, meaning that arrivalRate<serviceRate, lambda<mue)
    var sum = 0;
    var i = 0;
    while(i < c)
    {
          sum = sum + (Math.pow(c*p, i))/ factorial(i);
          i=i+1;
    }
   // i represents the customer in the system at a given moment, representing n in the equations
      // first part of the P0 equation

    // second part of the P0 equation
    sum = sum + (Math.pow((c*p), c) / (factorial(c) * (1 - p)));

    var P0 = (Math.pow((sum), (-1)));

    // Calculate MQL
    var part_add = ((arrivalRate)*(serviceRate))/(Math.pow((c*(serviceRate))-arrivalRate,2));
    var mql = (1/(factorial(c-1))) * Math.pow(r,c) * part_add * P0;
    mql = mql + (arrivalRate/serviceRate);
    console.log("Mql value:" + mql);
    return mql;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;   }
    return n * factorial(n - 1);
}

function plotMQLChart(lamda , mue, server) {
    // Set up input values for the MQL function
    console.log("Inside the mmc_graph.js : ");
    console.log("Mue value selected (min): " + mue);
    console.log("Lambda: " + lamda);
    console.log("Number of servers: " + server);
    var arrivalRate = lamda;
    var serviceRate = mue;
    var noOfServers = server;

    // Calculate MQL values for different servers
    const mqlValues = [];
    for (let i = 1; i <= noOfServers; i++) {
        const mql = calculateMQL(arrivalRate, serviceRate, i);
        mqlValues.push(mql.toFixed(2));
    }

    // Set up chart data and options
    const chartData = {
        labels: Array.from({ length: noOfServers }, (_, i) => i + 1),
        datasets: [{
        label: 'Mean Queue Length (MQL)',
        data: mqlValues,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
        }]
    };
    const chartOptions = {
        scales: {
            x: {
                title: {
                display: true,
                text: 'Number of Servers'
                }
            },
            y: {
                title: {
                display: true,
                text: 'MQL'
            },
            suggestedMin: 0,
            suggestedMax: Math.max(...mqlValues) * 1.1,

            }
        }
    };

    // Creating a new chart and displaying it on the page
    const chart = new Chart('mql-chart', {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}