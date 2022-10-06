INSERT INTO department (department_name)
VALUES ('Sales'),
('Web Development'),
('HR'),
('Legal'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Junior Developer', 75000, 2), 
('Senior Developer', 120000, 3),
('Salesperson', 60000, 4),
('Legal Team Lead', 250000, 5),
('Accountant', 125000, 6),
('Lawyer', 190000, 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
('Mike', 'Chan', 2),
('Kevin', 'Tupik', 3),
('Sean', 'New', 4),
('Tom', 'Allen', 5),
('Kristina', 'Do', 6),
('Jane', 'Doe', 7);

