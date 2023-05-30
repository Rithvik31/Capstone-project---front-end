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
var i = 1;
axios.get('http://localhost:8080/finance/user-finances')
  .then(response => {
    const data = response.data;
    data.bd.sort((a, b) => new Date(b.invDt) - new Date(a.invDt));
    for (let finance of data.bd) {
      const financeRow = financesTable.insertRow();
      financeRow.insertCell().textContent = i++;
      financeRow.insertCell().textContent = finance.financeType;
      financeRow.insertCell().textContent = finance.tag;
      financeRow.insertCell().textContent = finance.invDt;
      financeRow.insertCell().textContent = finance.amt;
      
      // set row color based on finance type
      if (finance.financeType === "income") {
        financeRow.style.color = "green";
      } else if (finance.financeType === "expense") {
        financeRow.style.color = "red";
      }
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

// document.getElementById('submit-btn').addEventListener('click', function(e) {
//   e.preventDefault();
  
//   var financeType = document.getElementById('financeType').value;
//   var tag = document.getElementById('tag').value;
//   var category = document.getElementById('category').value;
//   var investmentDate = document.getElementById('invDt').value;
//   var amount = document.getElementById('amt').value;

//   // Create a new row in the table
//   var table = document.getElementById('finance-table');
//   var newRow = table.insertRow();
  
//   // Insert cells into the new row
//   var cell1 = newRow.insertCell();
//   var cell2 = newRow.insertCell();
//   var cell3 = newRow.insertCell();
//   var cell4 = newRow.insertCell();
//   var cell5 = newRow.insertCell();

  // Set the cell values
  // cell1.innerHTML = financeType;
  // cell2.innerHTML = tag;
  // cell3.innerHTML = category;
  // cell4.innerHTML = investmentDate;
  // cell5.innerHTML = amount;

  // Clear the form fields
  // document.getElementById('finance-form').reset();
// });
