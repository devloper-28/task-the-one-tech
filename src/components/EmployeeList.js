import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const EmployeeList = ({ employees, onEdit, onRemove }) => (
  <div>
    {employees?.map((employee) => (
      <Card key={employee.id} style={{ margin: '8px' }}>
        <CardContent>
          <Typography variant="h6">{employee.name}</Typography>
          <Typography variant="subtitle1">ID: {employee.id}</Typography>
          <Typography variant="subtitle1">Name: {employee.name}</Typography>
          <Typography variant="subtitle1">Position: {employee.position}</Typography>
          <Typography variant="subtitle1">Department: {employee.department}</Typography>
        </CardContent>
        <Button onClick={() => onEdit(employee)}>Edit</Button>
        <Button onClick={() => onRemove(employee.id)}>Delete</Button>
      </Card>
    ))}
  </div>
);

export default EmployeeList;
