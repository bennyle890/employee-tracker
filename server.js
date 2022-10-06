const inquirer = require('inquirer');
const Department  = require('./lib/js/department');
const Role = require('./lib/js/role');
const Employee = require('./lib/js/employee');
const connection = require('./db/connection');


// Establish connection -> connection.js file --> also welcome screen
connection.connect(function (err) {
    if (err) throw err;
    console.log('\n---- Welcome to Employee Tracker! ----\n');
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
                'Update Employee Roles',
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
const addEmployee = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the employee\'s first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s last name?',
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    name: 'employee_role',
                    choices: function (){
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].title);
                        }
                        return choiceArray;
                    }
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s manager\'s name?',
                    name: 'manager'
                }
            ])
            .then(answers => {
                let roleID;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].title === answers.employee_role) {
                        roleID = res[i].id;
                    }
                }
                const employee = new Employee(connection, answers.first_name, answers.last_name, answers.manager, roleID);
                employee.createEmployee();
            })
    })
}

// Update Roles
const updateRoles = () => {
    connection.query('SELECT first_name, last_name FROM employee',
    function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee\'s role would you like to update?',
                name: 'employee',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {

                        choiceArray.push(res[i].first_name + ' ' + res[i].last_name);
                    }
                    return choiceArray;
                }
            }
        ])
        .then(answer => {
            setNewRole(answer.employee);
        })
    })
};

// View all roles
const viewRoles = () => {
    connection.query("SELECT title, department_name, salary FROM role LEFT JOIN department ON role.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            ask();
        });
}

//Add role
const addRole = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer 
            .prompt([
                {
                    type: 'input',
                    message: 'What is the title of the role?',
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'What is the salary?',
                    name: 'salary',
                    validate: function (input) {
                        if (isNaN(input) === false) {
                            return true;
                        } else {
                            return 'Please enter a valid number.';
                        }
                    }
                },
                {
                    type: 'list',
                    message: 'What department would you like this role to be in?',
                    name: 'department',
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].department_name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(answers => {
                let department_id;
                for (let i = 0; i < res.length; i++) {
                    if (answers.department === res[i].department_name) {
                        department_id = res[i].id;
                    }
                }
                const role = new Role(connection, answers.title, answers.salary, department_id);
                role.createRole();
            })
    })
};

// View Departments
const viewDepartments = () => {
    connection.query("SELECT department_name FROM department",
    function (err, res) {
        if (err) throw err;
        console.table(res);
        ask();
    });
};

// Add Department
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the name of this department?',
                name: 'dept_name'
            }
        ])
        .then(answers => {
            const department = new Department(connection, answers.dept_name);
            department.createDepartment();
        })
};

exports.ask = ask;