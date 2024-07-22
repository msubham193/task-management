import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },

});

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // Check if there's an error message in the response
            const errorMessage = data.error || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        console.log(data);
        return data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


export const register = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
        console.log(firstname + ' ' + lastname + ' ' + email);
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Check if there's an error message in the response
            const errorMessage = data.error || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

// src/api/api.ts
export const googleAuth = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/google', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include' // Include credentials if necessary
          });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
        }

        // Redirect the user to Google for authentication
        window.location.href = `${API_URL}/auth/google`;
    } catch (error) {
        console.error('Google Auth error:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


export const getTask = async()=>{ 

    console.log(localStorage.getItem('token'));

    const response = await fetch(`${API_URL}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
}
export const addTask = async (
    title: string, 
    description: string, 
    dueDate?: string // Optional dueDate parameter
) => {
    const response = await fetch(`${API_URL}/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ 
            title, 
            description, 
            dueDate // Include dueDate in the request body if provided
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
};


export const deleteTask = async(id:any) => {

        
    const response = await fetch(`${API_URL}/tasks/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
     
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    

    return ;
}

export const updateTask = async(id:string,updatedTask) => {

    console.log(id);

    const response = await fetch(`${API_URL}/tasks/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },

        body: JSON.stringify(updatedTask)
     
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
}




