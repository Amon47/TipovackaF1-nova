import { users } from '../data.js';
import { currentUser } from '../app.js';
import { showModal, validatePassword } from '../utils.js';
import { router } from '../router.js';

export async function renderLogin() {
    const appContent = document.getElementById('app-content');
    
    appContent.innerHTML = `
        <div class="card animate__animated animate__fadeIn login-card">
            <h2 class="card-title">Prihlásenie</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="username">Meno:</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Heslo:</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn">Prihlásiť</button>
            </form>
            <div id="login-message"></div>
        </div>
    `;
    
    setupLoginForm();
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Validácia
        if (!username) {
            showLoginMessage('Zadajte používateľské meno', 'error');
            return;
        }
        
        if (!validatePassword(password)) {
            showLoginMessage('Heslo musí mať aspoň 6 znakov', 'error');
            return;
        }
        
        // Simulácia prihlásenia
        setTimeout(() => {
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                currentUser = user;
                showLoginMessage(`Vitajte, ${username}!`, 'success');
                setTimeout(() => {
                    window.location.hash = '#/';
                }, 1000);
            } else {
                showLoginMessage('Nesprávne meno alebo heslo', 'error');
            }
        }, 500);
    });
}

function showLoginMessage(message, type) {
    const loginMessage = document.getElementById('login-message');
    loginMessage.textContent = message;
    loginMessage.className = type;
}

export function showLogoutModal() {
    const modalContent = `
        <h2>Odhlásenie</h2>
        <p>Naozaj sa chcete odhlásiť?</p>
        <div class="form-actions">
            <button onclick="logout()" class="btn">Odhlásiť</button>
            <button onclick="hideModal()" class="btn cancel">Zrušiť</button>
        </div>
    `;
    
    showModal(modalContent);
}

export function logout() {
    currentUser = null;
    hideModal();
    window.location.hash = '#/login';
}