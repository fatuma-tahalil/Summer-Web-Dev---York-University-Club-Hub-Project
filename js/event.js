// Basic events to start with
const defaultEvents = [

    { name: "Intro to Machine Learning Workshop", category: "Technology", club: "York Computer Science Society", date: "June 14, 2026", time: "2:00 PM – 5:00 PM", location: "Lassonde Building, Room 1006", description: "A hands-on beginner workshop covering Python, scikit-learn, and building your first ML model. Laptops required. All skill levels welcome.", poster: "ML" },
    { name: "Spring Debate Championship", category: "Academic", club: "York Debate Club", date: "June 20, 2026", time: "10:00 AM – 6:00 PM", location: "Ross Building, Room S201", description: "Inter-university debate tournament on topics of technology policy and global governance. Spectators welcome. Register by June 17.", poster: "DB" },
    { name: "African Heritage Night", category: "Cultural", club: "African Students Association", date: "June 27, 2026", time: "6:00 PM – 10:00 PM", location: "Student Centre Ballroom", description: "An evening of music, dance, food, and cultural showcases celebrating the diversity of African heritage. Free entry with York student ID.", poster: "AH" },
    { name: "Robot Wars: Campus Edition", category: "Technology", club: "York Robotics Club", date: "July 5, 2026", time: "12:00 PM – 4:00 PM", location: "Bergeron Centre, Atrium", description: "Watch student-built robots compete in an obstacle course and battle arena. Spectator event — come cheer on your favourite team!", poster: "RW" },
    { name: "5-a-Side Soccer Tournament", category: "Sports", club: "York Soccer Club", date: "July 12, 2026", time: "9:00 AM – 3:00 PM", location: "York University Track & Field", description: "Open 5-a-side tournament for all York students. Teams of five, round-robin format. Register as a team or join the free-agent pool.", poster: "SC" },
    { name: "End of Year Art Exhibition", category: "Arts", club: "York Fine Arts Collective", date: "July 18, 2026", time: "4:00 PM – 8:00 PM", location: "Accolade East, Gallery Lobby", description: "Student paintings, sculptures, and mixed-media installations on display. Light refreshments provided. All are welcome to attend.", poster: "AE" },
    { name: "Diwali Celebrations 2026", category: "Cultural", club: "South Asian Students Alliance", date: "July 25, 2026", time: "5:00 PM – 9:00 PM", location: "Student Centre Atrium", description: "Join us for Diwali festivities featuring traditional dance performances, rangoli activities, sweets, and a lamp-lighting ceremony.", poster: "DW" },
    { name: "Pre-Law Panel: Getting Into Law School", category: "Academic", club: "York Pre-Law Society", date: "August 2, 2026", time: "3:00 PM – 5:00 PM", location: "Osgoode Hall Law School, Room 1012", description: "A panel of York Law alumni and admissions advisors share tips on LSAT prep, personal statements, and the application process. Q&A included.", poster: "PL" },

];

// Load the events from local so we can add and remove any events as needed
let events = JSON.parse(localStorage.getItem('yorkEventsData'));
if (!events) {
    events = defaultEvents;
    localStorage.setItem('yorkEventsData', JSON.stringify(events));
}

const categoryColors = {
    Academic:   '#2c5f8a',
    Cultural:   '#7b3f9e',
    Sports:     '#1a7a4a',
    Technology: '#b35c00',
    Arts:       '#a0002a',
};

// Get the events list to populate the events onto the page
function renderEvents(list) {

    const container = document.getElementById('events-list');
    const noResults = document.getElementById('no-results');

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (list.length === 0) {

        container.innerHTML = '';
        noResults.style.display = 'block';

        return;

    }

    noResults.style.display = 'none';

    container.innerHTML = list.map((ev) => {

        const color = categoryColors[ev.category] || 'crimson';

        // Add delete button ONLY if admin
        const deleteButtonHTML = isAdmin

            ? `<button class="event-btn" style="background-color: #e31837; border-color: #e31837;" onclick="deleteEvent(\`${ev.name}\`)">Delete Event</button>`
            : '';

        return `

        <li class="event-item">
            <details>
                <summary class="event-summary">
                    <div class="event-poster-placeholder" style="background-color:${color}">${ev.poster}</div>
                    <div class="event-summary-info">
                    
                        <span class="event-summary-name">${ev.name}</span>
                        <span class="event-summary-meta">${ev.date} &bull; ${ev.club}</span>
                    </div>
                    
                    <span class="event-category-badge" style="background-color:${color}">${ev.category}</span>
                    <span class="event-chevron">&#9654;</span>
                </summary>

                <div class="event-details">
                    <h3>Event Details</h3>
                    <ul class="event-meta-list">
                    
                        <li><strong>Date:</strong> ${ev.date}</li>
                        <li><strong>Time:</strong> ${ev.time}</li>
                        <li><strong>Location:</strong> ${ev.location}</li>
                        <li><strong>Hosted by:</strong> ${ev.club}</li>
                        
                    </ul>
                    <p class="event-desc">${ev.description}</p>
                    
                    <div class="event-actions">
                    
                        <button class="event-btn event-btn-primary" onclick="handleSignUp('${ev.name}')">Sign Up</button>
                        <button class="event-btn event-btn-secondary" onclick="handleUpdates('${ev.name}')">Get Updates</button>
                        ${deleteButtonHTML}
                        
                    </div>
                </div>
            </details>
        </li>`;
    }).join('');
}

function filterEvents() {

    const nameQuery = document.getElementById('event-search').value.trim().toLowerCase();
    const catQuery  = document.getElementById('event-filter').value;

    const filtered = events.filter(ev => {
        const matchName = ev.name.toLowerCase().includes(nameQuery);
        const matchCat  = catQuery === '' || ev.category === catQuery;
        return matchName && matchCat;

    });

    renderEvents(filtered);
}

function handleSignUp(name) {
    alert(`You've signed up for:\n"${name}"\n\nYou'll receive a confirmation shortly.`);
}

function handleUpdates(name) {
    alert(`You'll receive updates for:\n"${name}"`);
}

// Admin Add & Delete Logic
function setupEventAdminFeatures() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) return;

    const adminSection = document.createElement('div');
    adminSection.className = 'clubs-container';
    adminSection.style.marginTop = '20px';
    adminSection.style.padding = '20px';
    adminSection.style.backgroundColor = '#f9f9f9';
    adminSection.style.border = '2px dashed #e31837';

    adminSection.innerHTML = `
        <h2 style="color: #e31837;">Admin Panel: Add New Event</h2>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <input type="text" id="new-ev-name" placeholder="Event Name" style="padding: 8px; flex-grow: 1;">
                <select id="new-ev-category" style="padding: 8px;">
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                    <option value="Arts">Arts</option>
                </select>
                <input type="text" id="new-ev-club" placeholder="Hosting Club" style="padding: 8px;">
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <input type="text" id="new-ev-date" placeholder="Date (e.g., Aug 10, 2026)" style="padding: 8px;">
                <input type="text" id="new-ev-time" placeholder="Time (e.g., 2:00 PM)" style="padding: 8px;">
                <input type="text" id="new-ev-loc" placeholder="Location" style="padding: 8px; flex-grow: 1;">
            </div>
            <input type="text" id="new-ev-desc" placeholder="Event Description" style="padding: 8px;">
            <div style="display: flex; gap: 10px;">
                <button onclick="addNewEvent()" style="background: #e31837; color: white; padding: 8px 16px; border: none; cursor: pointer;">Add Event</button>
                <button onclick="logoutAdmin()" style="background: #333; color: white; padding: 8px 16px; border: none; cursor: pointer;">Log Out</button>
            </div>
        </div>
    `;

    const searchSection = document.querySelector('.clubs-search-section');
    searchSection.parentNode.insertBefore(adminSection, searchSection.nextSibling);
}

function addNewEvent() {
    const name = document.getElementById('new-ev-name').value.trim();
    const category = document.getElementById('new-ev-category').value;
    const club = document.getElementById('new-ev-club').value.trim();
    const date = document.getElementById('new-ev-date').value.trim();
    const time = document.getElementById('new-ev-time').value.trim();
    const location = document.getElementById('new-ev-loc').value.trim();
    const description = document.getElementById('new-ev-desc').value.trim();

    if (!name || !club || !date || !time || !location || !description) {
        alert("Please fill out all fields.");
        return;
    }

    const poster = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    events.unshift({ name, category, club, date, time, location, description, poster });
    localStorage.setItem('yorkEventsData', JSON.stringify(events));

    filterEvents();
    alert("Event added successfully!");
}

function deleteEvent(eventName) {
    if (!confirm(`Are you sure you want to delete the event "${eventName}"?`)) return;
    events = events.filter(ev => ev.name !== eventName);
    localStorage.setItem('yorkEventsData', JSON.stringify(events));
    filterEvents();
}

function logoutAdmin() {
    localStorage.removeItem('isAdmin');
    location.reload();
}

// Initial render
renderEvents(events);
setupEventAdminFeatures();