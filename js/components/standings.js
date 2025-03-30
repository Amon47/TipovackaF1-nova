import { currentStandings, constructorStandings } from '../data.js';
import { getTeamClass } from '../utils.js';

export async function renderStandings() {
    const appContent = document.getElementById('app-content');
    
    appContent.innerHTML = `
        <div class="card animate__animated animate__fadeIn">
            <h2 class="card-title">Aktuálne poradie jazdcov</h2>
            <div id="current-standings-container">
                <!-- Tabuľka sa naplní dynamicky -->
            </div>
        </div>
        
        <div class="card animate__animated animate__fadeIn">
            <h2 class="card-title">Konštruktérsky pohár</h2>
            <div id="constructor-standings-container">
                <!-- Tabuľka sa naplní dynamicky -->
            </div>
        </div>
    `;
    
    fillStandings();
}

function fillStandings() {
    const standingsBody = document.getElementById('current-standings-container');
    const constructorBody = document.getElementById('constructor-standings-container');
    
    // Vytvorenie tabuľky pre jazdcov
    let driversTable = `
        <table>
            <thead>
                <tr>
                    <th>Poz.</th>
                    <th>Jazdec</th>
                    <th>Tím</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    currentStandings.forEach(driver => {
        const teamClass = getTeamClass(driver.team);
        driversTable += `
            <tr class="${teamClass}">
                <td>${driver.position}</td>
                <td>${driver.driver}</td>
                <td>${driver.team}</td>
                <td>${driver.points}</td>
            </tr>
        `;
    });
    
    driversTable += `</tbody></table>`;
    standingsBody.innerHTML = driversTable;
    
    // Vytvorenie tabuľky pre tímy
    let teamsTable = `
        <table>
            <thead>
                <tr>
                    <th>Poz.</th>
                    <th>Tím</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    constructorStandings.forEach(team => {
        const teamClass = getTeamClass(team.team);
        teamsTable += `
            <tr class="${teamClass}">
                <td>${team.position}</td>
                <td>${team.team}</td>
                <td>${team.points}</td>
            </tr>
        `;
    });
    
    teamsTable += `</tbody></table>`;
    constructorBody.innerHTML = teamsTable;
}