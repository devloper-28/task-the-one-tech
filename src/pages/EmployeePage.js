// src/pages/EmployeePage.js
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, removeEmployee, modifyEmployee } from '../features/employees/employeesSlice';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const EmployeePage = () => {
    const dispatch = useDispatch();
    // const employees = useSelector(state => state.employees);
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);




    console.log("employees", employees)


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/employees');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const employeesData = await response.json();
                setEmployees(employeesData);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        console.log('inside fetch empluyees')
        try {
            const response = await fetch('/api/employees');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const employeesData = await response.json();
            setEmployees(employeesData);
            return employeesData; 
        } catch (error) {
            console.error('Error fetching employees:', error);
            return []; 
        }
    };

    const handleOpen = (employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const handleSubmit = async (employeeData) => {
        if (selectedEmployee) {
            // Update existing employee
            await handleUpdateEmployee(selectedEmployee.id, employeeData);
        } else {
            console.log("inside else point")
            // Add new employee
            await handleAddEmployee(employeeData);
        }
        console.log("before fgetch employee ")
        const updatedEmployees = await fetchEmployees();
        console.log(updatedEmployees, "😅 asdasd")
        dispatch(modifyEmployee(updatedEmployees)); // Update state in Redux
        handleClose();
    };

    const handleAddEmployee = async (employeeData) => {
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });
            if (!response.ok) {
                throw new Error('Failed to add employee');
            }
            const newEmployee = await response.json();
            dispatch(addEmployee(newEmployee)); // Dispatch to Redux
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleUpdateEmployee = async (id, employeeData) => {
        try {
            const response = await fetch(`/api/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });
            if (!response.ok) {
                throw new Error('Failed to update employee');
            }
            const updatedEmployee = await response.json();
            dispatch(modifyEmployee(updatedEmployee)); // Dispatch to Redux
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`/api/employees/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            dispatch(removeEmployee(id)); // Dispatch to Redux
        } catch (error) {
            console.error('Error removing employee:', error);
        }
    };

    return (
        <div>
            <Button onClick={() => handleOpen(null)}>Add Employee</Button>
            <EmployeeList employees={employees?.employees} onEdit={handleOpen} onRemove={handleRemove} />
            {open && (
                <EmployeeForm initialData={selectedEmployee} onSubmit={handleSubmit} onClose={handleClose} />
            )}
        </div>
    );
};

export default EmployeePage;
