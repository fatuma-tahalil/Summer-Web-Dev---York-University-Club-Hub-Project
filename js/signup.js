const isSignupUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";

function updateSignupLoginWarning(errorElement) {
  if (!isSignupUserLoggedIn) {
    errorElement.textContent =
      "Please sign in before submitting a club application.";
    return false;
  }

  errorElement.textContent = "";
  return true;
}

function getAvailableClubs() {
  const defaultClubs = [
    {
      name: "York Computer Science Society",
      category: "Technology",
      description:
        "A hub for CS students to collaborate, code, and grow professionally.",
    },
    {
      name: "York Debate Club",
      category: "Academic",
      description: "Sharpen your argumentation and public speaking skills.",
    },
    {
      name: "African Students Association",
      category: "Cultural",
      description:
        "Celebrating African heritage, culture, and community at York.",
    },
    {
      name: "York Robotics Club",
      category: "Technology",
      description: "Design, build, and program robots with fellow engineers.",
    },
    {
      name: "York Soccer Club",
      category: "Sports",
      description: "Casual and competitive soccer for all skill levels.",
    },
    {
      name: "Film & Photography Society",
      category: "Arts",
      description: "Explore visual storytelling through film and photography.",
    },
    {
      name: "South Asian Students Alliance",
      category: "Cultural",
      description:
        "Building community and celebrating South Asian culture on campus.",
    },
    {
      name: "York Pre-Law Society",
      category: "Academic",
      description:
        "Helping aspiring lawyers prepare for law school and legal careers.",
    },
    {
      name: "York Basketball Association",
      category: "Sports",
      description: "Join weekly pick-up games and inter-club tournaments.",
    },
    {
      name: "York Fine Arts Collective",
      category: "Arts",
      description:
        "A space for painters, sculptors, and visual artists to create.",
    },
  ];

  const storedClubs = localStorage.getItem("yorkClubsData");
  if (!storedClubs) {
    return defaultClubs;
  }

  try {
    const clubs = JSON.parse(storedClubs);
    return Array.isArray(clubs) ? clubs : defaultClubs;
  } catch {
    return defaultClubs;
  }
}

function populateClubOptions(clubSelect, clubs) {
  clubSelect.innerHTML =
    '<option value="" disabled selected>Select a club</option>';

  clubs.forEach(function (club) {
    const option = document.createElement("option");
    option.value = club.name;
    option.textContent = club.name;
    clubSelect.appendChild(option);
  });
}

function updateSelectedClub(clubSelect, clubs) {
  const selectedClub = clubs.find(function (club) {
    return club.name === clubSelect.value;
  });

  if (!selectedClub) {
    return;
  }

  document.getElementById("club-category").value = selectedClub.category;
}

function updateReasonCharacterCount(reasonInput, characterCount) {
  characterCount.textContent = `${reasonInput.value.length} / 250`;
}

function showSignupSuccess(signupForm) {
  signupForm.style.display = "none";
  document.getElementById("form-success").style.display = "block";
  signupForm.reset();
  document
    .querySelector(".signup-container")
    .scrollIntoView({ behavior: "smooth" });
}

function submitSignupForm(event) {
  event.preventDefault();

  const signupForm = event.currentTarget;
  const errorElement = document.getElementById("signup-error");

  if (!updateSignupLoginWarning(errorElement)) {
    return;
  }

  errorElement.textContent = "";
  showSignupSuccess(signupForm);
}

function initializeSignupPage() {
  const signupForm = document.getElementById("signup-form");
  const clubSelect = document.getElementById("club-name");
  const reasonInput = document.getElementById("join-reason");
  const characterCount = document.getElementById("join-reason-count");
  const clubs = getAvailableClubs();

  populateClubOptions(clubSelect, clubs);

  clubSelect.addEventListener("change", function () {
    updateSelectedClub(clubSelect, clubs);
  });

  reasonInput.addEventListener("input", function () {
    updateReasonCharacterCount(reasonInput, characterCount);
  });

  signupForm.addEventListener("submit", submitSignupForm);
}

initializeSignupPage();
