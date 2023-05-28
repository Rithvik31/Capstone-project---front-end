const form = document.querySelector('#finance-form');
const result = document.querySelector('#result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //const userId = document.querySelector(1).value;
    const financeType = document.querySelector('#financeType').value;
    const tag = document.querySelector('#tag').value;
    const invDt = document.querySelector('#invDt').value;
    const amt = document.querySelector('#amt').value;

    axios.post('http://localhost:8080/finance/user', {
        userId: 1,
        financeType: financeType,
        tag: tag,
        invDt: invDt,
        amt: amt
    })
        .then(res => {
            result.textContent = 'Finance Info Added!';
            alert('Finance added successfully!');
            document.getElementById('finance-form').reset();
        })
        .catch(err => {
            result.textContent = 'Error Occured!';
        })
});

function submitForm(event) {
    event.preventDefault();
    const userId = document.getElementById(1).value;
    const financeType = document.getElementById('financeType').value;
    const tag = document.getElementById('tag').value;
    const invDt = document.getElementById('invDt').value;
    const amt = document.getElementById('amt').value;
    const finance = {
        userId,
        financeType,
        tag,
        invDt,
        amt
    };
    axios.post('http://localhost:8080/finance/user', finance)
        .then((response) => {
            console.log(response);
            alert('Finance added successfully!');
            document.getElementById('finance-form').reset();
        })
        .catch((error) => {
            console.log(error);
        });
}


const expensesCategories = ['Food', 'Rent', 'Utilities', 'Transportation', 'Entertainment'];
const incomeCategories = ['Salary', 'Bonus', 'Gift', 'Investment', 'Other'];

financeTypeSelect.addEventListener('change', () => {
    if (financeTypeSelect.value === 'INCOME') {
      tagSelect.innerHTML = `
        <option value="">Select Category</option>
        <option value="Salary" class="income-option">Salary</option>
        <option value="Investments" class="income-option">Investments</option>
        <option value="Bonus" class="income-option">Bonus</option>
      `;
    } else if (financeTypeSelect.value === 'EXPENSES') {
      tagSelect.innerHTML = `
        <option value="">Select Category</option>
        <option value="Food" class="expenses-option">Food</option>
        <option value="Rent" class="expenses-option">Rent</option>
        <option value="Utilities" class="expenses-option">Utilities</option>
      `;
    }else if (financeTypeSelect.value === 'INVESTMENT') {
      tagSelect.innerHTML = `
        <option value="">Select Category</option>
        <option value="Stocks" class="investment-option">Stocks</option>
        <option value="Bonds" class="investment-option">Bonds</option>
        <option value="Real Estate" class="investment-option">Real Estate</option>
        <option value="Other" class="investment-option">Other</option>
      `;
      
      const otherOption = document.createElement('option');
      otherOption.value = 'Other';
      otherOption.classList.add('investment-option');
      otherOption.text = 'Enter by User';
      tagSelect.appendChild(otherOption);
    }
  });
  