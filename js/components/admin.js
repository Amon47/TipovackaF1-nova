import { currentStandings, constructorStandings } from '../data.js';
import { showModal } from '../utils.js';
import { currentUser } from '../app.js';

export async function renderAdminPanel() {
    if (!currentUser?.isAdmin) {
        window.location.hash = '#/';
        return;
    }
    
    const appContent = document.getElementById('app-content');
    
    appContent.innerHTML = `
        <div class="card animate__animated animate__fadeIn">
            <h2 class="card-title">Administrátorský panel</h2>
            
            <div class="admin-sections">
                <div class="admin-section">
                    <h3>Jazdci</h3>
                    <button onclick="showEditDriversModal()" class="btn">Upraviť jazdcov</button>
                    <button onclick="showAddDriverModal()" class="add-btn">Pridať jazdca</button>
                </div>
                
                <div class="admin-section">
                    <h3>Tímy</h3>
                    <button onclick="showEditTeamsModal()" class="btn">Upraviť tímy</button>
                    <button onclick="showAddTeamModal()" class="add-btn">Pridať tím</button>
                </div>
                
                <div class="admin-section">
                    <h3>Veľké ceny</h3>
                    <button onclick="showEditGPsModal()" class="btn">Upraviť VC</button>
                    <button onclick="showAddGPModal()" class="add-btn">Pridať VC</button>
                </div>
            </div>
        </div>
    `;
}

export function showEditDriversModal() {
    let driversHTML = `
        <h2>Upraviť jazdcov</h2>
        <table>
            <thead>
                <tr>
                    <th>Poz.</th>
                    <th>Meno</th>
                    <th>Tím</th>
                    <th>Body</th>
                    <th>Akcie</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    currentStandings.forEach(driver => {
        driversHTML += `
            <tr>
                <td>${driver.position}</td>
                <td><input type="text" value="${driver.driver}"></td>
                <td>
                    <select>
                        <option value="McLaren" ${driver.team === "McLaren" ? "selected" : ""}>McLaren</option>
                        <option value="Ferrari" ${driver.team === "Ferrari" ? "selected" : ""}>Ferrari</option>
                        <option value="Red Bull Racing" ${driver.team === "Red Bull Racing" ? "selected" : ""}>Red Bull</option>
                        <option value="Mercedes" ${driver.team === "Mercedes" ? "selected" : ""}>Mercedes</option>
                        <option value="Aston Martin" ${driver.team === "Aston Martin" ? "selected" : ""}>Aston Martin</option>
                        <option value="Alpine" ${driver.team === "Alpine" ? "selected" : ""}>Alpine</option>
                        <option value="Haas" ${driver.team === "Haas" ? "selected" : ""}>Haas</option>
                        <option value="Racing Bulls" ${driver.team === "Racing Bulls" ? "selected" : ""}>Racing Bulls</option>
                        <option value="Williams" ${driver.team === "Williams" ? "selected" : ""}>Williams</option>
                        <option value="Kick Sauber" ${driver.team === "Kick Sauber" ? "selected" : ""}>Kick Sauber</option>
                    </select>
                </td>
                <td><input type="number" value="${driver.points}" min="0"></td>
                <td><button onclick="removeDriver('${driver.driver}')" class="delete-btn">X</button></td>
            </tr>
        `;
    });
    
    driversHTML += `</tbody></table>`;
    
    driversHTML += `
        <div class="form-actions">
            <button onclick="saveDrivers()" class="btn">Uložiť</button>
            <button onclick="hideModal()" class="btn cancel">Zrušiť</button>
        </div>
    `;
    
    showModal(driversHTML);
}

export function showEditTeamsModal() {
    let teamsHTML = `
        <h2>Upraviť tímy</h2>
        <table>
            <thead>
                <tr>
                    <th>Poz.</th>
                    <th>Tím</th>
                    <th>Body</th>
                    <th>Akcie</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    constructorStandings.forEach(team => {
        teamsHTML += `
            <tr>
                <td>${team.position}</td>
                <td><input type="text" value="${team.team}"></td>
                <td><input type="number" value="${team.points}" min="0"></td>
                <td><button onclick="removeTeam('${team.team}')" class="delete-btn">X</button></td>
            </tr>
        `;
    });
    
    teamsHTML += `</tbody></table>`;
    
    teamsHTML += `
        <div class="form-actions">
            <button onclick="saveTeams()" class="btn">Uložiť</button>
            <button onclick="hideModal()" class="btn cancel">Zrušiť</button>
        </div>
    `;
    
    showModal(teamsHTML);
}