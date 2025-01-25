import express from "express";

const app = express(); // Create an express app
const PORT = 3000; // Port at which the server will run

// Middleware

app.use(express.json()) // Parse incoming request body as JSON

// In memory database for storing expenses data

let expenses = [];
let expenseId = 1;

app.get("/", (req, res) => {
    res.send("Server is running");
});


app.post("/expenses", (req,res) => {
    const { name, amount, category, date } = req.body 

    if (!name || !amount || !category || !date){
        return res.status(400).json({error: "All fileds are required "})
    }

    const newExpense = {
        id: expenseId++,
        name,
        amount: parseFloat(amount),
        category,
        date,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
})

    // Get all the expenses

app.get("/expenses", (req,res) => {
    res.json(expenses)
});

// Filter the expenses by category or date

app.get("/expenses/filter", (req,res) => {
    const {category, date} = req.query ;
    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = filteredExpenses.filter((e) => e.category === category);
    }

    if (date) {
        filteredExpenses = filteredExpenses.filter((e) => e.date === date);
    }

    res.json(filteredExpenses)
})

// update an expense by Id

app.put("/expenses/:id", (req,res) => {
    const {id} = req.params;
    const { name, amount, category, date} = req.body

    const expense = expenses.find((e) => e.id === parseInt(id));

    if(!expense){
        return res.status(404).json({error: "Expense not found"})
    }

    if (name) expense.name = name;
    if (amount) expense.amount = amount;
    if (category) expense.category = category
    if (date) expense.date = date

    res.json(expense)
});

// Delete an expense by ID

app.delete("/expenses/:id", (req,res) => {
    const {id} = req.params
    const index = expenses.findIndex((e) => e.id === parseInt(id))
    if( index===-1){
        return res.json({error: "Expense not found"})
    }

    expenses.splice(index, 1);
    res.status(204).send();
})

    
// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
