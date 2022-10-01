const app = require('../../server');

class Employee {
    constructor(connection, firstName, lastName, role) {
        this.connection = connection;
        this.firstName = firstName; 
        this.lastName = lastName;
        this.role = role;
    }

    createEmployee() {
        console.log('\n Adding new employee. \n');
        this.connection.query(
            "Insert into EMPLOYEE?",
            {
                first_name: this.firstName,
                last_name: this.lastName,
                role_id: this.role
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "employee added.\n");
                app.ask();
            }
        );
    }
    readEmployee() { 
    }
        updateEmployee() {
            console.log("Updating employee role... \n");
            this.connection.query("UPDATE employee? Where ? and ?",
            [
                {
                    role_id: this.role
                },
                {
                    first_name: this.firstName
                },
                {
                    last_name: this.lastName
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "role updated.\n");
                app.ask();
            }
        );
    }

    deleteEmployee() {
    }
};

module.exports = Employee;