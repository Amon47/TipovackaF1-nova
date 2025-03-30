import { currentStandings } from './data.js';

// Pomocné funkcie
export function getTeamClass(teamName) {
    if (!teamName) return '';
    
    const normalizedTeam = teamName.toLowerCase().replace(/\s+/g, '');
    
    if (normalizedTeam.includes("mclaren")) return "team-mclaren";
    if (normalizedTeam.includes("ferrari")) return "team-ferrari";
    if (normalizedTeam.includes("redbull")) return "team-redbull";
    if (normalizedTeam.includes("mercedes")) return "team-mercedes";
    if (normalizedTeam.includes("astonmartin")) return "team-astonmartin";
    if (normalizedTeam.includes("alpine")) return "team-alpine";
    if (normalizedTeam.includes("haas")) return "team-haas";
    if (normalizedTeam.includes("racingbulls")) return "team-racingbulls";
    if (normalizedTeam.includes("williams")) return "team-williams";
    if (normalizedTeam.includes("sauber")) return "team-sauber";
    
    return '';
}

export function getDriverTeam(driverName) {
    const driver = currentStandings.find(d => d.driver === driverName);
    return driver ? driver.team : '';
}

export function showLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.classList.remove('hidden');
}

export function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.classList.add('hidden');
}

export function showModal(content) {
    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modalContent && modalOverlay) {
        modalContent.innerHTML = content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

export function hideModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validatePassword(password) {
    return password.length >= 6;
}

export function formatDate(dateString) {
    const [day, month, year] = dateString.split('.');
    return `${day}.${month}.${year}`;
}

export function calculateDriverPoints(driverName, position) {
    // Implementácia bodovacieho systému
    if (position === 1) return 25;
    if (position === 2) return 18;
    if (position === 3) return 15;
    if (position === 4) return 12;
    if (position === 5) return 10;
    if (position === 6) return 8;
    if (position === 7) return 6;
    if (position === 8) return 4;
    if (position === 9) return 2;
    if (position === 10) return 1;
    return 0;
}