import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EmployeeForm = ({ initialData, onSubmit, onClose,selectedEmployee  }) => {
  const [employee, setEmployee] = useState(initialData || { name: '', position: '', department: '' });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(employee);
    try {
      if (selectedEmployee) {
        // Update existing employee
        const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update employee');
        }
      } else {
        console.log("inside else")
        // Add new employee
        const response = await fetch('/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
        console.log("resssss",response)
  
        if (!response.ok) {
          throw new Error('Failed to add employee');
        }
        console.log("sssss")
        const employeesResponse = await fetch('/api/employees');
        console.log("emp;ueee", employeesResponse)
        if (!employeesResponse.ok) {
            throw new Error('Failed to fetch employees after update/add');
        }
        const employeesData = await employeesResponse.json();
        console.log("employeesData",employeesData)
        // Call the onSubmit function with the updated employees
        onSubmit(employeesData); //
      }
    } catch (error) {
      console.error(error);
    }
  
    onClose();
  };
  
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <DialogContent>
        <TextField label="Name" name="name" value={employee.name} onChange={handleChange} fullWidth />
        <TextField label="Position" name="position" value={employee.position} onChange={handleChange} fullWidth />
        <TextField label="Department" name="department" value={employee.department} onChange={handleChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
