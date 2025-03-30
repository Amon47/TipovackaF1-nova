import { participantTips, currentStandings } from '../data.js';
import { getTeamClass, getDriverTeam, showModal } from '../utils.js';
import { currentUser } from '../app.js';

export async function renderParticipants() {
    const appContent = document.getElementById('app-content');
    
    appContent.innerHTML = `
        <div class="card animate__animated animate__fadeIn">
            <h2 class="card-title">Účastníci tipovačky</h2>
            <div id="participants-container">
                <!-- Zoznam účastníkov -->
            </div>
            <div id="participant-details">
                <!-- Detail účastníka -->
            </div>
            ${currentUser?.isAdmin ? `
                <div class="admin-actions">
                    <button onclick="showAddParticipantModal()" class="add-btn">Pridať účastníka</button>
                </div>
            ` : ''}
        </div>
    `;
    
    fillParticipantsList();
}

function fillParticipantsList() {
    const participantsContainer = document.getElementById('participants-container');
    
    let participantsHTML = `
        <div class="participants-grid">
    `;
    
    participantTips.forEach(participant => {
        participantsHTML += `
            <div class="participant-card" onclick="showParticipantDetails('${participant.name}')">
                <h3>${participant.name}</h3>
                <p>Body: ${participant.points}</p>
                <div class="top-driver ${getTeamClass(getDriverTeam(participant.drivers[0]))}">
                    ${participant.drivers[0]}
                </div>
            </div>
        `;
    });
    
    participantsHTML += `</div>`;
    participantsContainer.innerHTML = participantsHTML;
}

export function showParticipantDetails(name) {
    const participant = participantTips.find(p => p.name === name);
    if (!participant) return;
    
    const detailsContainer = document.getElementById('participant-details');
    
    let detailsHTML = `
        <div class="participant-details-card">
            <h3>${participant.name}</h3>
            <p class="total-points">Celkové body: ${participant.points}</p>
            
            <h4>Tipy na jazdcov:</h4>
            <div class="driver-tips">
                <div class="driver-tip ${getTeamClass(getDriverTeam(participant.drivers[0]))}">
                    <span class="position">1.</span> ${participant.drivers[0]}
                </div>
                <div class="driver-tip ${getTeamClass(getDriverTeam(participant.drivers[1]))}">
                    <span class="position">2.</span> ${participant.drivers[1]}
                </div>
                <div class="driver-tip ${getTeamClass(getDriverTeam(participant.drivers[2]))}">
                    <span class="position">3.</span> ${participant.drivers[2]}
                </div>
            </div>
            
            <h4>Tipy na tímy:</h4>
            <div class="team-tips">
                <div class="team-tip ${getTeamClass(participant.teams[0])}">
                    <span class="position">1.</span> ${participant.teams[0]}
                </div>
                <div class="team-tip ${getTeamClass(participant.teams[1])}">
                    <span class="position">2.</span> ${participant.teams[1]}
                </div>
                <div class="team-tip ${getTeamClass(participant.teams[2])}">
                    <span class="position">3.</span> ${participant.teams[2]}
                </div>
            </div>
    `;
    
    if (currentUser?.isAdmin) {
        detailsHTML += `
            <div class="admin-actions">
                <button onclick="showEditParticipantModal('${participant.name}')" class="btn">Upraviť</button>
                <button onclick="confirmDeleteParticipant('${participant.name}')" class="delete-btn">Vymazať</button>
            </div>
        `;
    }
    
    detailsHTML += `</div>`;
    detailsContainer.innerHTML = detailsHTML;
}

export function showAddParticipantModal() {
    const driversOptions = currentStandings.map(driver => 
        `<option value="${driver.driver}">${driver.driver} (${driver.team})</option>`
    ).join('');
    
    const teamsOptions = [...new Set(currentStandings.map(d => d.team))].map(team => 
        `<option value="${team}">${team}</option>`
    ).join('');
    
    const modalContent = `
        <h2>Pridať nového účastníka</h2>
        <div class="form-group">
            <label for="new-participant-name">Meno:</label>
            <input type="text" id="new-participant-name" required>
        </div>
        
        <h3>Tipy na jazdcov</h3>
        <div class="form-group">
            <label for="new-driver1">1. miesto:</label>
            <select id="new-driver1" required>
                ${driversOptions}
            </select>
        </div>
        <div class="form-group">
            <label for="new-driver2">2. miesto:</label>
            <select id="new-driver2" required>
                ${driversOptions}
            </select>
        </div>
        <div class="form-group">
            <label for="new-driver3">3. miesto:</label>
            <select id="new-driver3" required>
                ${driversOptions}
            </select>
        </div>
        
        <h3>Tipy na tímy</h3>
        <div class="form-group">
            <label for="new-team1">1. miesto:</label>
            <select id="new-team1" required>
                ${teamsOptions}
            </select>
        </div>
        <div class="form-group">
            <label for="new-team2">2. miesto:</label>
            <select id="new-team2" required>
                ${teamsOptions}
            </select>
        </div>
        <div class="form-group">
            <label for="new-team3">3. miesto:</label>
            <select id="new-team3" required>
                ${teamsOptions}
            </select>
        </div>
        
        <div class="form-actions">
            <button onclick="addParticipant()" class="btn">Pridať</button>
            <button onclick="hideModal()" class="btn cancel">Zrušiť</button>
        </div>
    `;
    
    showModal(modalContent);
}