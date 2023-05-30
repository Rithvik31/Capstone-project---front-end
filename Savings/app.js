const form = document.getElementById('savingsForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const category = document.getElementById('category').value;
  const goal = parseFloat(document.getElementById('goal').value);
  const currAmt = parseFloat(document.getElementById('currAmt').value);
  const target = document.getElementById('target').value;
  const processedDate = document.getElementById('processedDate').value;
  const userId = parseInt(document.getElementById('userId').value);

  const data = {
    category: category,
    goal: goal,
    currAmt: currAmt,
    target: target,
    processedDate: processedDate,
    userDto: {
      id: '1'
    }
  };

  axios.post('http://localhost:8080/savings/', data)
    .then(response => {
      console.log('Savings data posted successfully:', response.data);
      form.reset();
    })
    .catch(error => {
      console.error('Error posting savings data:', error);
    });
});

function setupSavingsTable() {
    const table = document.getElementById('tableSavings')


    apiFetchAllSavings(table)
}

setupSavingsTable()
let k=1;
function propulateSavingsData(table, invoices) {
    // Sort invoices by date in descending order
    invoices.sort((a, b) => new Date(b.invDt) - new Date(a.invDt));
  
  
    for (const invoice of invoices) {
      const { id, category, goal, currAmt, target } = invoice;
  
    //   // Check if the checkbox is checked
    //   if (financeType !== 'INVESTMENT') {
    //     continue; // Skip the row if it's not an investment and the checkbox is checked
    //   }
  
      const row = table.insertRow();
      row.insertCell(0).innerHTML = k++;
      row.insertCell(1).innerHTML = category;
      row.insertCell(2).innerHTML = goal;
      row.insertCell(3).innerHTML = currAmt;
      row.insertCell(4).innerHTML = target;
      row.insertCell(5).innerHTML = `<a class='ms-2 btn-danger btn' onclick='showConfirmDeleteModal(${id})'>Delete</a>
      <a class="ms-2 btn-info btn" onclick="showUpdateModal(${id}, '${category}', ${goal}, ${currAmt}, '${target}')">Update</a>
      `;
  
    }
  }
  

function apiFetchAllSavings(table) {
    axios.get('http://localhost:8080/savings/')
        .then(res => {
            const { data } = res
            console.log(data)  
            const { sts, msg, bd } = data

            propulateSavingsData(table, bd)
        })
        .catch(err => console.log(err))
}





function showConfirmDeleteModal(id) {
    console.log('clicked ' + id)
    const myModalEl = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()

    const btDl = document.getElementById('btDl')
    btDl.onclick = () => {
        apiCallDeleteInvoice(id, modal)
    }
}


function apiCallDeleteSavings(id, modal) {
    const url = `http://localhost:8080/savings/${id}`
    location.reload();

    axios.delete(url)
        .then(res => res.data) // you converted complete response in to our business reponse
        // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below

        .then( ({ sts, msg, bd }) =>  modal.hide() )
        .catch(console.log)

}


function showUpdateModal(id, category, goal, currAmt, target) {
    const updateModal = document.getElementById('updateModal');
    const modal = new bootstrap.Modal(updateModal);
    modal.show();
  
    // Populate the form fields with the existing data
    document.getElementById('updateId').value = id;
    document.getElementById('updateCategory').value = category;
    document.getElementById('updateGoal').value = goal;
    document.getElementById('updateCurrAmt').value = currAmt;
    document.getElementById('updateTarget').value = target;
  
    // Add event listener to the update form submit button
    document.getElementById('updateForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const updatedData = {
        id: id,
        category: document.getElementById('updateCategory').value,
        goal: parseFloat(document.getElementById('updateGoal').value),
        currAmt: parseFloat(document.getElementById('updateCurrAmt').value),
        target: document.getElementById('updateTarget').value,
        userDto: {
          id: '1'
        }
      };
  
      apiCallUpdateSavings(updatedData, modal);
    });
  }

  function apiCallUpdateSavings(data, modal) {
    const url = 'http://localhost:8080/savings/';
    axios.put(url, data)
      .then(response => {
        console.log('Savings data updated successfully:', response.data);
        modal.hide();
        location.reload(); // Refresh the page to update the savings table
      })
      .catch(error => {
        console.error('Error updating savings data:', error);
      });
  }
  