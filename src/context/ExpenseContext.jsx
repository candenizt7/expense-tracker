import { createContext, useReducer, useEffect } from "react";

export const ExpenseContext = createContext();

// 1. Initial State
const initialState = {
    expenses: []
};

// 2. Reducer
function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            const newExpenses = [...state.expenses, action.payload];
            localStorage.setItem('expenses', JSON.stringify(newExpenses));
            return {
                expenses: newExpenses
            };
        }

        case 'DELETE_EXPENSE': {
            const filteredExpenses = state.expenses.filter(
                expense => expense.id !== action.payload
            );
            localStorage.setItem('expenses', JSON.stringify(filteredExpenses));
            return {
                expenses: filteredExpenses
            };
        }

        case 'UPDATE_EXPENSE': {
            const updatedExpenses = state.expenses.map(expense =>
                expense.id === action.payload.id ? action.payload : expense
            );
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            return {
                expenses: updatedExpenses
            };
        }

        case 'LOAD_EXPENSE':
            return {
                expenses: action.payload
            };
        
        default:
            return state;
    }
}

// 3. Provider
export function ExpenseProvider({ children }) {
    const [state, dispatch] = useReducer(expenseReducer, initialState);

    // İlk yüklendiğinde LocalStorage'dan oku
    useEffect(() => { 
  const saved = localStorage.getItem('expenses');
  
  if (saved) {
    const parsed = JSON.parse(saved);
    dispatch({ type: 'LOAD_EXPENSE', payload: parsed });
  }
}, []);

    // Context'e koyacağımız fonksiyonlar
    const addExpense = (expense) => {
        const newExpense = {
            ...expense,
            id: Date.now() // Unique ID
        };
        dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    };

    const deleteExpense = (id) => {
        dispatch({ type:'DELETE_EXPENSE', payload: id});
    };

    const updateExpense = (expense) => {
        dispatch({ type:'UPDATE_EXPENSE', payload: expense});
    };
    
    const value = {
        expenses: state.expenses,
        addExpense,
        deleteExpense,
        updateExpense
    };
    
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
}