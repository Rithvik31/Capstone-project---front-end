const financesTable = document.getElementById('finances').getElementsByTagName('tbody')[0];

axios.get('http://localhost:8080/finance/user-finances')
  .then(response => {
    const data = response.data;
    for (let finance of data.bd) {
      const financeRow = financesTable.insertRow();
      financeRow.insertCell().textContent = finance.id;
      financeRow.insertCell().textContent = finance.financeType;
      financeRow.insertCell().textContent = finance.tag;
      financeRow.insertCell().textContent = finance.invDt;
      financeRow.insertCell().textContent = finance.amt;
    }
  })
  .catch(error => console.error(error));