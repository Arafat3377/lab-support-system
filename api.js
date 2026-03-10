// client/js/api.js
const API_BASE_URL = 'http://localhost:5000/api';

let authToken = localStorage.getItem('token');

const setAuthToken = (token) => {
    authToken = token;
    localStorage.setItem('token', token);
};

const getAuthToken = () => authToken;

const clearAuthToken = () => {
    authToken = null;
    localStorage.removeItem('token');
};

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return headers;
};

// دوال API

const login = async (username, password, userType) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, userType })
        });
        
        const data = await response.json();
        
        if (data.success) {
            setAuthToken(data.token);
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Connection error' };
    }
};

const verifyToken = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: getHeaders()
        });
        
        const data = await response.json();
        return data.success;
    } catch (error) {
        return false;
    }
};

const getMalfunctions = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/malfunctions`, {
            headers: getHeaders()
        });
        
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching malfunctions:', error);
        return [];
    }
};

const addMalfunction = async (malfunctionData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/malfunctions`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(malfunctionData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error adding malfunction:', error);
        return { success: false, message: 'Connection error' };
    }
};

const updateMalfunctionStatus = async (malfunctionId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/malfunctions/${malfunctionId}/status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error updating status:', error);
        return { success: false, message: 'Connection error' };
    }
};

const addMaintenanceNote = async (malfunctionId, note) => {
    try {
        const response = await fetch(`${API_BASE_URL}/malfunctions/${malfunctionId}/notes`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ note })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error adding note:', error);
        return { success: false, message: 'Connection error' };
    }
};

const getConversations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
            headers: getHeaders()
        });
        
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return [];
    }
};

const getMessages = async (conversationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/conversations/${conversationId}/messages`, {
            headers: getHeaders()
        });
        
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

const sendMessage = async (conversationId, content) => {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/conversations/${conversationId}/messages`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ content })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, message: 'Connection error' };
    }
};

const getNotifications = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications`, {
            headers: getHeaders()
        });
        
        const data = await response.json();
        return data.success ? { notifications: data.data, unreadCount: data.unreadCount } : { notifications: [], unreadCount: 0 };
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return { notifications: [], unreadCount: 0 };
    }
};

const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
            method: 'PUT',
            headers: getHeaders()
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error updating notification:', error);
        return { success: false };
    }
};

const markAllNotificationsAsRead = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
            method: 'PUT',
            headers: getHeaders()
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error updating notifications:', error);
        return { success: false };
    }
};

const getDevices = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/devices`, {
            headers: getHeaders()
        });
        
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching devices:', error);
        return [];
    }
};

const logout = () => {
    clearAuthToken();
    window.location.href = '/';
};