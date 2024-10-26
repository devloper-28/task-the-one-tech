// src/miragejs/server.js
import { createServer, Model } from 'miragejs';

export function makeServer() {
    createServer({
        models: {
            employee: Model, // Define the employee model
        },
        seeds(server) {
            // Seed the database with 10 initial employees
            server.createList('employee', 10);  
        },
        routes() {
            this.namespace = 'api'; // Set API namespace

            // GET all employees
            this.get('/employees', (schema) => {
                return schema.employees.all();
            });

            // POST a new employee
            this.post('/employees', (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.employees.create(attrs); // Create and return the new employee
            });

            // PUT (update) an existing employee
            this.put('/employees/:id', (schema, request) => {
                let newAttrs = JSON.parse(request.requestBody);
                let id = request.params.id;
                let employee = schema.employees.find(id);
                return employee.update(newAttrs); // Update the employee with new attributes
            });

            // DELETE an employee
            this.del('/employees/:id', (schema, request) => {
                let id = request.params.id;
                return schema.employees.find(id).destroy(); // Remove the employee from the database
            });
        },
    });
}
