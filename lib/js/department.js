const app = require('../../server');

class Department {
    constructor(connection, name) {
        this.connection = connection;
        this.name = name;
    }

    createDepartment() {
        console.log("\n Adding a new department \n");
        this.connection.query(
            "INSERT INTO department SET ?",
            {
                department_name: this.name
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department added. \n");
                app.ask();
            }
        );
    }

    readDepartment() {

    }
    updateDepartment() {

    }

};

module.exports = Department;