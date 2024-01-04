// public/script.js
document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expensesList = document.getElementById('expensesList');

  // Fetch and display expenses
  async function fetchExpenses() {
    try {
      const response = await fetch('localhost:3001/api/expenses',{method:"GET"});
      const expenses = await response.json();

      expensesList.innerHTML = '';
      expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;
        expensesList.appendChild(expenseItem);
      });
    } catch (err) {
      console.error(err);
    }
  }

//   // Handle form submission
//   expenseForm.addEventListener('click', async (event) => {
//     event.preventDefault();

//     const description = document.getElementById('description').value;
//     const amount = parseFloat(document.getElementById('amount').value);
// console.log(description)
//     if (description && !isNaN(amount)) {
//       try {
//         await fetch('localhost:3001/api/expenses', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ description, amount }),
//         });

//         fetchExpenses();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   });

  // Initial fetch
  fetchExpenses();
});
