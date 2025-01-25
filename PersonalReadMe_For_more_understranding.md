Here is the full explanation of the whole making of the app for myself as well as for someone who is reading this

So we have to make a finance expense tracker api simply with javascript , nodejs, express and json

so I will not tell you from the starting , like I will begin from writing code in the server.js file, lets begin

someguidelines: I will write code in between ''' and ''' , and will explain below why I wrote this and what it means

'''
import express from "express";
import bodyParser from "body-parser";
'''
so here we are exporting the express framework which we installed earlier and which will help us to use the features of it+ we are using bodyParser for using the properties of json

const app = express(); // here we are creating a constant variable named app which we can also call express app

const PORT  = 3000; // here we are creating this because we want a port where our server will be running

app.use(bodyParser.json()) // this is used for parsing the incoming request body as json

now we have to store the data in the memory data base

let expenses = [] // make an empty array
let expensesId = 1 // initialize the expense id as 1

now we will have to create new expenses for that: 

app.post("/expenses")
