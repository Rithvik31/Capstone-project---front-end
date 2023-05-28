// Fetch the data using Axios
axios.get('http://localhost:8080/savings/')
  .then(response => {
    const savingsData = response.data.bd; // Accessing the 'bd' property containing the array of savings data

    // Access the table body element
    const tableBody = document.querySelector('tbody');

    // Iterate over each savings object and create table rows
    savingsData.forEach(saving => {
      const row = document.createElement('tr');

      // Create table data cells and assign values
      const categoryCell = document.createElement('td');
      categoryCell.textContent = saving.category;

      const goalCell = document.createElement('td');
      const goalProgressBar = createProgressBar(saving.goal, saving.currAmt);
      goalCell.appendChild(goalProgressBar);

      const currAmtCell = document.createElement('td');
      const currAmtProgressBar = createProgressBar(saving.goal, saving.currAmt);
      currAmtCell.appendChild(currAmtProgressBar);

      const targetCell = document.createElement('td');
      targetCell.textContent = saving.target;

      const userIdCell = document.createElement('td');
      userIdCell.textContent = saving.userDto.id;

      const userNameCell = document.createElement('td');
      userNameCell.textContent = saving.userDto.name;

      const userEmailCell = document.createElement('td');
      userEmailCell.textContent = saving.userDto.email;

      // Append cells to the row
      row.appendChild(categoryCell);
      row.appendChild(goalCell);
      row.appendChild(currAmtCell);
      row.appendChild(targetCell);
      row.appendChild(userIdCell);
      row.appendChild(userNameCell);
      row.appendChild(userEmailCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to create a progress bar element
function createProgressBar(goal, currAmt) {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress';

  const progressValue = (currAmt / goal) * 100;
  progressBar.innerHTML = `
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${progressValue}%" aria-valuenow="${progressValue}" aria-valuemin="0" aria-valuemax="100">${progressValue}%</div>
  `;

  return progressBar;
}