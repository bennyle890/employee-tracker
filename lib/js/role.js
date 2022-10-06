const app = require('../../server');

class Role {
    constructor(connection, title, salary, department_id) {
        this.connection = connection;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    createRole() {
        console.log("\n Adding new role. \n");
        this.connection.query(
            "INSERT INTO role SET ?",
            {
                title: this.title,
                salary: this.salary,
                department_id: this.department_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role added.\n");
                app.ask();
            }
        );
    }

    readRole() {

    }
    updateRole() {

    }
}

module.exports = Role;