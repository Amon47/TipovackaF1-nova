import { grandPrixList } from '../data.js';
import { formatDate } from '../utils.js';

export async function renderCalendar() {
    const appContent = document.getElementById('app-content');
    
    appContent.innerHTML = `
        <div class="card animate__animated animate__fadeIn">
            <h2 class="card-title">Kalendár Veľkých cien 2025</h2>
            <div id="calendar-container">
                <!-- Kalendár sa naplní dynamicky -->
            </div>
        </div>
    `;
    
    fillCalendar();
}

function fillCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    
    let calendarHTML = `
        <table>
            <thead>
                <tr>
                    <th>Dátum</th>
                    <th>Veľká cena</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const currentDate = new Date();
    
    grandPrixList.forEach(gp => {
        const [day, month, year] = gp.date.split('.');
        const gpDate = new Date(`${year}-${month}-${day}`);
        const isPast = gpDate < currentDate;
        const isToday = gpDate.toDateString() === currentDate.toDateString();
        
        calendarHTML += `
            <tr class="${isToday ? 'current-gp' : ''}">
                <td>${gp.date}</td>
                <td>${gp.name}</td>
                <td>
                    ${isToday ? 
                        '<span class="gp-status live">LIVE</span>' : 
                        isPast ? 
                        '<span class="gp-status completed">Dokončené</span>' : 
                        '<span class="gp-status upcoming">Budúca</span>'
                    }
                </td>
            </tr>
        `;
    });
    
    calendarHTML += `</tbody></table>`;
    calendarContainer.innerHTML = calendarHTML;
}