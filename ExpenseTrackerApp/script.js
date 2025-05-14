document.addEventListener("DOMContentLoaded", loadExpenses);

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

function addExpense() {
  const nameInput = document.getElementById("expenseName");
  const amountInput = document.getElementById("expenseAmount");
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid name and amount.");
    return;
  }

  const expense = { name, amount };
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);

  nameInput.value = "";
  amountInput.value = "";

  renderExpenses();
}

function deleteExpense(index) {
  const expenses = getExpenses();
  expenses.splice(index, 1);
  saveExpenses(expenses);
  renderExpenses();
}

function getExpenses() {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
}

function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  const expenses = getExpenses();
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name} 
      <strong>$${expense.amount.toFixed(2)}</strong>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalAmount.textContent = total.toFixed(2);
}

function loadExpenses() {
  renderExpenses();
}