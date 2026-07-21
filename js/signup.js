// 1. Load clubs from local storage (or use defaults if empty)
const defaultClubs = [
    { name: "York Computer Science Society",      category: "Technology", description: "A hub for CS students to collaborate, code, and grow professionally." },
    { name: "York Debate Club",                   category: "Academic",   description: "Sharpen your argumentation and public speaking skills." },
    { name: "African Students Association",       category: "Cultural",   description: "Celebrating African heritage, culture, and community at York." },
    { name: "York Robotics Club",                 category: "Technology", description: "Design, build, and program robots with fellow engineers." },
    { name: "York Soccer Club",                   category: "Sports",     description: "Casual and competitive soccer for all skill levels." },
    { name: "Film & Photography Society",         category: "Arts",       description: "Explore visual storytelling through film and photography." },
    { name: "South Asian Students Alliance",      category: "Cultural",   description: "Building community and celebrating South Asian culture on campus." },
    { name: "York Pre-Law Society",               category: "Academic",   description: "Helping aspiring lawyers prepare for law school and legal careers." },
    { name: "York Basketball Association",        category: "Sports",     description: "Join weekly pick-up games and inter-club tournaments." },
    { name: "York Fine Arts Collective",          category: "Arts",       description: "A space for painters, sculptors, and visual artists to create." },
];

let clubs = JSON.parse(localStorage.getItem('yorkClubsData')) || defaultClubs;

// 2. Dynamically populate the Club Name dropdown on page load
function populateClubDropdown() {
    const clubSelect = document.getElementById('club-name');

    // Reset dropdown but keep the default disabled placeholder
    clubSelect.innerHTML = '<option value="" disabled selected>Select a club</option>';

    // Add all clubs from our database/local storage
    clubs.forEach(club => {
        const option = document.createElement('option');
        option.value = club.name;
        option.textContent = club.name;
        clubSelect.appendChild(option);
    });
}

// 3. Auto-fill the Category and Description when a club is selected
document.getElementById('club-name').addEventListener('change', function() {
    const selectedClubName = this.value;
    const selectedClub = clubs.find(c => c.name === selectedClubName);

    if (selectedClub) {
        document.getElementById('club-category').value = selectedClub.category;
        document.getElementById('club-description').value = selectedClub.description;
    }
});

// 4. Handle Form Submission & Validation
function handleSignUp() {
    // Grab all inputs
    const clubName = document.getElementById('club-name').value;
    const clubCategory = document.getElementById('club-category').value;
    const studentName = document.getElementById('student-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();
    const studentEmail = document.getElementById('student-email').value.trim();
    const studentYear = document.getElementById('student-year').value;
    const studentReason = document.getElementById('student-reason').value.trim();
    const errorElement = document.getElementById('signup-error');

    // Reset error message
    errorElement.textContent = '';

    // Check for empty fields
    if (!clubName || !clubCategory || !studentName || !studentId || !studentEmail || !studentYear || !studentReason) {
        errorElement.textContent = 'Please fill out all required fields.';
        return;
    }

    // Validate York Email format
    if (!studentEmail.endsWith('@my.yorku.ca') && !studentEmail.endsWith('@yorku.ca')) {
        errorElement.textContent = 'Please use a valid @my.yorku.ca or @yorku.ca email address.';
        return;
    }

    // Validate Student ID (Numbers only)
    if (!/^\d+$/.test(studentId)) {
        errorElement.textContent = 'Student ID must contain only numbers.';
        return;
    }

    // If validation passes, hide the form and show the success message
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';

    // Scroll to the top of the container so the user sees the success message
    document.querySelector('.signup-container').scrollIntoView({ behavior: 'smooth' });
}

// Initialize the dropdown when the script loads
populateClubDropdown();