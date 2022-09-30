const app = require('../server');

class Departmnet {
    constructor(connection, name) {
        this.connection = connection;
        this.name = name;
    }

    createDepartment() {
        console.log("\n Adding a new department \n");
        this.connection.query(
            "Insert into DEPARTMENTs?",
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
    deleteDepartment() {

    }
};

module.exports = Department;