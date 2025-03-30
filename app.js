import initialData from './data.js';
import { router } from './router.js';
import { showModal, hideModal } from './utils.js';
import { calculatePoints } from './components/standings.js';

// Globálny stav aplikácie
let currentUser = null;
let currentParticipant = null;

// Naplnenie dát z initialData
let { currentStandings, constructorStandings, participantTips, grandPrixList } = initialData;

// Hlavné funkcie
function fillTipovackaTable() {
    const tableContainer = document.getElementById('tipovacka-table-container');
    if (!tableContainer) return;
    
    calculatePoints();
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Por.</th>
                    <th>Meno</th>
                    <th>🏆 1. miesto</th>
                    <th>🥈 2. miesto</th>
                    <th>🥉 3. miesto</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    participantTips.forEach((participant, index) => {
        tableHTML += `
            <tr ${index === 0 ? 'class="first-place"' : ''}>
                <td>${index + 1}</td>
                <td>${participant.name}</td>
                <td class="${getTeamClass(getDriverTeam(participant.drivers[0]))}">${participant.drivers[0]}</td>
                <td class="${getTeamClass(getDriverTeam(participant.drivers[1]))}">${participant.drivers[1]}</td>
                <td class="${getTeamClass(getDriverTeam(participant.drivers[2]))}">${participant.drivers[2]}</td>
                <td>${participant.points}</td>
            </tr>
        `;
    });
    
    tableHTML += `</tbody></table>`;
    tableContainer.innerHTML = tableHTML;
}

// Inicializácia aplikácie
document.addEventListener('DOMContentLoaded', () => {
    // Pridanie event listenerov pre modálne okná
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-overlay')) {
            hideModal();
        }
    });
    
    // Inicializácia routera
    router();
    
    // Globálne funkcie pre HTML
    window.showParticipantDetails = (name) => {
        import('./components/participants.js').then(module => {
            module.showParticipantDetails(name);
        });
    };
    
    window.showAddParticipantModal = () => {
        import('./components/participants.js').then(module => {
            module.showAddParticipantModal();
        });
    };
});

// Exporty
export { 
    currentUser, 
    currentParticipant,
    currentStandings,
    constructorStandings,
    participantTips,
    grandPrixList,
    fillTipovackaTable
};