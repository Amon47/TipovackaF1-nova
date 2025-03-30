import { calculatePoints, fillTipovackaTable } from '../app.js';

export async function renderHome() {
    const appContent = document.getElementById('app-content');
    
    calculatePoints();
    
    appContent.innerHTML = `
        <div class="card animate__animated animate__fadeIn">
            <h2 class="card-title">Vitajte v F1 Tipovačke 2025</h2>
            <p>Tipujte na víťazov Formuly 1 a súťažte so svojimi priateľmi!</p>
            
            <div id="tipovacka-table-container">
                <!-- Tabuľka sa naplní dynamicky -->
            </div>
        </div>
    `;
    
    fillTipovackaTable();
}