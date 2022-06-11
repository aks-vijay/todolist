// require modules
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

// init express
const app = express();
app.set('view engine', 'ejs');

// use
app.use(bodyParser.urlencoded({extended:true}));

// apply static for public
app.use(express.static("public"));

// to get the next to do list from user
let todoItems = [];
let workItems = [];

// GET
app.get("/", function(req, res){
    
    // exported from date.js
    let day = date();

    // render the result to EJS
    res.render("list", {listTitle: day, toDoListItems: todoItems});
    
})

// POST -- Capture the data from request and push it to the array
// redirect to home route
app.post("/", function(req, res) {
    todoItem = req.body.todo;

    if (req.body.list === "Work") {
        workItems.push(todoItem);
        res.redirect("/work");
    }
    else {
        todoItems.push(todoItem);
        res.redirect("/");
    }
})

// GET /work
app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", toDoListItems: workItems})
})

// listen to port
const port = process.env.port || 3000;
app.listen(port, function() {
    console.log(`Sever started at port ${port}`)
})