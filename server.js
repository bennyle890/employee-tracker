const express = require('express');
const inquirer = require('inquirer');
const path = require('path');
// var mysql = require('mysql');
const connection = require('./db/connection');

const PORT = process.env.PORT || 3000;
// const app = express();

// Establish connection -> connection.js file --> also welcome screen
connection.connect(function (err) {
    if (err) throw err;
    console.log('/n---- Welcome to Employee Tracker! ----/n');
    ask();
});

// Asks What you want
const ask = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                new inquirer.Separator(),
                'EXIT'
            ]
        }
    ])

    .then(answers => {
        switch (answers.action) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Roles':
                updateRoles();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'EXIT':
                connection.end();
        }
    })

    .catch(error => {
        console.log(error);
    })
};

// View All Employees 
const viewEmployees = () => {
    connection.query("SELECT employee.id, first_name, last_name, manager, department_name, title, salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
    function (err, res) {
        if (err) throw err;
        console.table(res);
        ask();
    });
}

// Add Employee


exports.ask = ask;