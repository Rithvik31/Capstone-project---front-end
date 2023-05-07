const financesTable = document.getElementById('finances').getElementsByTagName('tbody')[0];
const rows = financesTable.rows;
for (let i = 1; i < rows.length; i++) { // skip the header row
  const financeType = rows[i].cells[1].textContent.trim();

  if (Type === "INCOME") {
    rows[i].style.color = "red";
  } else {
    rows[i].style.color = "black";
    }
  }
var i=1;
axios.get('http://localhost:8080/finance/user-finances')
  .then(response => {
    const data = response.data;
    data.bd.sort((a, b) => new Date(a.invDt) - new Date(b.invDt)); // sort by invDt
    for (let finance of data.bd) {
      const financeRow = financesTable.insertRow();
      financeRow.insertCell().textContent = i++;
      financeRow.insertCell().textContent = finance.financeType;
      financeRow.insertCell().textContent = finance.tag;
      financeRow.insertCell().textContent = finance.invDt;
      financeRow.insertCell().textContent = finance.amt;
    }
  })
  .catch(error => console.error(error));

  const incomeEndpoint = 'http://localhost:8080/finance/total-income';
const expensesEndpoint = 'http://localhost:8080/finance/total-expenses';

// Fetch data from endpoints using Axios
axios.all([
  axios.get(incomeEndpoint),
  axios.get(expensesEndpoint)
]).then(axios.spread((incomeResponse, expensesResponse) => {
  const income = incomeResponse.data;
  const expenses = expensesResponse.data;

  // // Calculate the total income and expenses
  // const totalIncome = income.reduce((acc, curr) => acc + curr, 0);
  // const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);

  // Create the donut chart using Chart.js
  const donutChart = new Chart('donut-chart', {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        data: [income, expenses],
        backgroundColor: ['#36A2ED', '#FF6384'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
})).catch(error => {
  console.log('Error fetching data:', error);
});