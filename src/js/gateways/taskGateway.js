const apiUser = "jvelasco93";
const API_BASE = "https://playground.4geeks.com/todo";

export class UserNotFoundError extends Error {
    constructor(userName) {
        super(`User ${userName} not found`)
        this.name = "UserNotFoundError"
    }
}

export const taskGateway = {
    async getUserWithTodos(userName = apiUser, options = {}) {
        const { signal } = options;
        const url = `${API_BASE}/users/${encodeURIComponent(userName)}`;
        const response = await fetch(url, { method: "GET", signal });

        if (response.status === 404) {
            throw new UserNotFoundError(userName)
        }

        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.detail || `HTTP ${response.status}`);
        }
        return response.json();
    },

    async createTodo(label, username = apiUser) {
        const url = `${API_BASE}/todos/${encodeURIComponent(username)}`
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label })
        })
        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.detail || `HTTP ${response.status}`)
        }
        return response.status === 201 ? response.json() : null;
    },

    async deleteTask(id) {
        const url = `${API_BASE}/todos/${encodeURIComponent(id)}`
        const response = await fetch(url, {
            method: "DELETE",
        })
        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.detail || `HTTP ${response.status}`)
        }
        return;
    },

    async createUser(userName = apiUser) {
        const url = `${API_BASE}/users/${encodeURIComponent(userName)}`
        const response = await fetch(url, { method: "POST" })
        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.detail || `HTTP ${response.status}`)
        }
        return await response.json();
    }


}
