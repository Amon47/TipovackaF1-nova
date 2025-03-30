import { showLoading, hideLoading } from './utils.js';
import { renderHome } from './components/home.js';
import { renderStandings } from './components/standings.js';
import { renderCalendar } from './components/calendar.js';
import { renderParticipants } from './components/participants.js';
import { renderLogin } from './components/login.js';

const routes = {
    '/': renderHome,
    '/standings': renderStandings,
    '/calendar': renderCalendar,
    '/participants': renderParticipants,
    '/login': renderLogin
};

export function router() {
    showLoading();
    
    // Získaj aktuálnu URL hash
    const path = window.location.hash.substring(1) || '/';
    
    // Získaj funkciu pre vykreslenie stránky
    const renderFunction = routes[path] || renderHome;
    
    // Vykresli stránku
    renderFunction().then(() => {
        hideLoading();
        
        // Aktualizuj aktívnu navigáciu
        updateNavActiveState(path);
    });
}

function updateNavActiveState(path) {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('data-route');
        if (path === '/' && linkPath === 'home') {
            link.classList.add('active');
        } else if (path.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Inicializácia routera
window.addEventListener('hashchange', router);
window.addEventListener('load', router);