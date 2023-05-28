document.getElementById('savingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get form values
    var category = document.getElementById('category').value;
    var goal = parseFloat(document.getElementById('goal').value);
    var currAmt = parseFloat(document.getElementById('currAmt').value);
    var target = document.getElementById('target').value;
    var userId = parseInt(document.getElementById('userId').value);
  
    // Create processedDate field with today's date
    var processedDate = new Date().toISOString().split('T')[0];
  
    // Create request payload
    var data = {
      category: category,
      goal: goal,
      currAmt: currAmt,
      target: target,
      processedDate: processedDate,
      userDto: {
        id: userId
      }
    };
  
    // Send POST request
    axios.post('http://localhost:8080/savings/', data)
      .then(function(response) {
        console.log(response.data);
        alert('Savings form submitted successfully!');
      })
      .catch(function(error) {
        console.error(error);
        alert('An error occurred while submitting the savings form.');
      });
  });
  
  // Fetch savings data from the API
  // Fetch savings data from the API
  // Fetch savings data from the API
  axios
    .get('http://localhost:8080/savings/')
    .then(function (response) {
      var savingsData = response.data;
      var tableBody = document.querySelector('#savingsTable tbody');
  
      // Iterate through each savings record
      savingsData.forEach(function (savings) {
        var row = document.createElement('tr');
  
        // Add table cells for each data field
        var categoryCell = document.createElement('td');
        categoryCell.textContent = savings.category;
        row.appendChild(categoryCell);
  
        var goalCell = document.createElement('td');
        goalCell.textContent = savings.goal;
        row.appendChild(goalCell);
  
        var currAmtCell = document.createElement('td');
        currAmtCell.textContent = savings.currAmt;
        row.appendChild(currAmtCell);
  
        var targetCell = document.createElement('td');
        targetCell.textContent = savings.target;
        row.appendChild(targetCell);
  
        var processedDateCell = document.createElement('td');
        processedDateCell.textContent = savings.processedDate
          ? new Date(savings.processedDate).toLocaleDateString()
          : '';
        row.appendChild(processedDateCell);
  
        var progressCell = document.createElement('td');
        var progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        var progress = (savings.currAmt / savings.goal) * 100;
        Progress.create(progressBar, progress); // Update this line
        progressCell.appendChild(progressBar);
        row.appendChild(progressCell);
  
        // Append the row to the table body
        tableBody.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error(error);
      alert('An error occurred while fetching the savings data.');
    });