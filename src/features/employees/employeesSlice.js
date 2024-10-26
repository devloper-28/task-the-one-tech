// src/features/employees/employeesSlice.js
const ADD_EMPLOYEE = 'employees/addEmployee';
const REMOVE_EMPLOYEE = 'employees/removeEmployee';
const MODIFY_EMPLOYEE = 'employees/modifyEmployee';

// Initial state
const initialState = {
  employees: []
};

// Reducer
const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };
    case REMOVE_EMPLOYEE:
      return { ...state, employees: state.employees.filter(emp => emp.id !== action.payload) };
    case MODIFY_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? { ...emp, ...action.payload } : emp
        )
      };
    default:
      return state;
  }
};

// Action creators
export const addEmployee = (employee) => ({ type: ADD_EMPLOYEE, payload: employee });
export const removeEmployee = (id) => ({ type: REMOVE_EMPLOYEE, payload: id });
export const modifyEmployee = (employee) => ({ type: MODIFY_EMPLOYEE, payload: employee });

// Export the reducer as default
export default employeesReducer;
