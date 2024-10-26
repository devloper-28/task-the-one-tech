// src/store.js
import { createStore } from 'redux';
import employeesReducer from '../features/employees/employeesSlice';

const store = createStore(employeesReducer);

export default store;
