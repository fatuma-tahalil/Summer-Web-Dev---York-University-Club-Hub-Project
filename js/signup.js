document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) {
        return;
    }

    const defaultClubs = [
        { name: "York Computer Science Society", category: "Technology", description: "A hub for CS students to collaborate, code, and grow professionally." },
        { name: "York Debate Club", category: "Academic", description: "Sharpen your argumentation and public speaking skills." },
        { name: "African Students Association", category: "Cultural", description: "Celebrating African heritage, culture, and community at York." },
        { name: "York Robotics Club", category: "Technology", description: "Design, build, and program robots with fellow engineers." },
        { name: "York Soccer Club", category: "Sports", description: "Casual and competitive soccer for all skill levels." },
        { name: "Film & Photography Society", category: "Arts", description: "Explore visual storytelling through film and photography." },
        { name: "South Asian Students Alliance", category: "Cultural", description: "Building community and celebrating South Asian culture on campus." },
        { name: "York Pre-Law Society", category: "Academic", description: "Helping aspiring lawyers prepare for law school and legal careers." },
        { name: "York Basketball Association", category: "Sports", description: "Join weekly pick-up games and inter-club tournaments." },
        { name: "York Fine Arts Collective", category: "Arts", description: "A space for painters, sculptors, and visual artists to create." },
    ];

    let clubs = JSON.parse(localStorage.getItem('yorkClubsData')) || defaultClubs;

    const clubSelect = document.getElementById('club-name');
    if (clubSelect) {
        clubSelect.innerHTML = '<option value="" disabled selected>Select a club</option>';

        clubs.forEach(club => {
            const option = document.createElement('option');
            option.value = club.name;
            option.textContent = club.name;
            clubSelect.appendChild(option);
        });

        clubSelect.addEventListener('change', function () {
            const selectedClub = clubs.find(c => c.name === this.value);
            if (selectedClub) {
                document.getElementById('club-category').value = selectedClub.category;
                document.getElementById('club-description').value = selectedClub.description;
            }
        });
    }

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const clubName = document.getElementById('club-name').value;
        const clubCategory = document.getElementById('club-category').value;
        const clubDescription = document.getElementById('club-description').value;
        const studentName = document.getElementById('student-name').value.trim();
        const studentId = document.getElementById('student-id').value.trim();
        const studentEmail = document.getElementById('student-email').value.trim();
        const studentYear = document.getElementById('student-year').value;
        const studentReason = document.getElementById('student-reason').value.trim();

        const errorElement = document.getElementById('signup-error');
        const submitButton = document.getElementById('submit-btn');
        const originalButtonHTML = submitButton.innerHTML;

        errorElement.textContent = '';

        if (!studentEmail.endsWith('@my.yorku.ca') && !studentEmail.endsWith('@yorku.ca')) {
            errorElement.textContent = 'Please use a valid @my.yorku.ca or @yorku.ca email address.';
            return;
        }

        if (!/^\d+$/.test(studentId)) {
            errorElement.textContent = 'Student ID must contain only numbers.';
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = "Submitting...";

        const params = new URLSearchParams();
        params.append("clubName", clubName);
        params.append("clubCategory", clubCategory);
        params.append("clubDescription", clubDescription);
        params.append("studentName", studentName);
        params.append("studentId", studentId);
        params.append("email", studentEmail);
        params.append("yearOfStudy", studentYear);
        params.append("reasonToJoin", studentReason);

        const webAppUrl = "https://script.google.com/macros/s/AKfycbxREMLz1EpU2Q1TObM91v238BTFfZvzQ3nZ3LIV08k6IHQkWcWe9Z0_DKSdXspcqOi1/exec";

        fetch(webAppUrl, {
            method: "POST",
            body: params
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Server responded with status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.result !== "success") {
                    throw new Error(data.message || "Unknown server error");
                }

                signupForm.style.display = 'none';
                const successElement = document.getElementById('form-success');
                if (successElement) {
                    successElement.style.display = 'block';
                }

                signupForm.reset();

                const container = document.querySelector('.signup-container');
                if (container) {
                    container.scrollIntoView({ behavior: 'smooth' });
                }
            })
            .catch(error => {
                console.error("Error submitting form: ", error);
                errorElement.textContent = "There was an error submitting your form. Please try again.";
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHTML;
            });
    });
});