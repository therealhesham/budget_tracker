// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/budget_tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple expense schema
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: {type:Number},
});

const Expense = mongoose.model('Expense', expenseSchema);


app.get("/",(req,res)=>{

res.sendFile(__dirname + "./public/index.html")

})

// API to get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to add a new expense
app.post('/api/expenses', async (req, res) => {
  try {
    
    const expense = new Expense({description:req.body.description,amount:req.body.amount});
    const saver = await expense.save();
    res.send(saver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
