function isSignupUserAuthenticated() {
  const isSignupUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loggedInEmail = localStorage.getItem("loggedInEmail");

  return isSignupUserLoggedIn && Boolean(loggedInEmail);
}

function updateSignupLoginWarning(errorElement) {
  if (!isSignupUserAuthenticated()) {
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
    return JSON.parse(storedClubs);
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

function buildSignupParameters() {
  const parameters = new URLSearchParams();

  parameters.append("clubName", document.getElementById("club-name").value);
  parameters.append(
    "clubCategory",
    document.getElementById("club-category").value,
  );
  parameters.append(
    "reasonToJoin",
    document.getElementById("join-reason").value,
  );
  parameters.append("email", localStorage.getItem("loggedInEmail"));

  return parameters;
}

function setSignupSubmitting(submitButton) {
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
}

function restoreSignupButton(submitButton, originalButtonContent) {
  submitButton.disabled = false;
  submitButton.innerHTML = originalButtonContent;
}

function showSignupSuccess(signupForm) {
  signupForm.style.display = "none";
  document.getElementById("form-success").style.display = "block";
  signupForm.reset();
  document
    .querySelector(".signup-container")
    .scrollIntoView({ behavior: "smooth" });
}

async function submitSignupForm(event) {
  event.preventDefault();

  const signupForm = event.currentTarget;
  const submitButton = document.getElementById("submit-btn");
  const errorElement = document.getElementById("signup-error");

  if (!updateSignupLoginWarning(errorElement)) {
    return;
  }

  const originalButtonContent = submitButton.innerHTML;
  const webAppUrl =
    "https://script.google.com/macros/s/AKfycbxREMLz1EpU2Q1TObM91v238BTFfZvzQ3nZ3LIV08k6IHQkWcWe9Z0_DKSdXspcqOi1/exec";

  errorElement.textContent = "";
  setSignupSubmitting(submitButton);

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      body: buildSignupParameters(),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data.result !== "success") {
      throw new Error(data.message || "Unknown server error");
    }

    showSignupSuccess(signupForm);
  } catch (error) {
    console.error("Error submitting form:", error);
    errorElement.textContent =
      "There was an error submitting your form. Please try again.";
    restoreSignupButton(submitButton, originalButtonContent);
  }
}

function initializeSignupPage() {
  const signupForm = document.getElementById("signup-form");
  const clubSelect = document.getElementById("club-name");
  const submitButton = document.getElementById("submit-btn");
  const errorElement = document.getElementById("signup-error");
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

  submitButton.addEventListener("click", function () {
    updateSignupLoginWarning(errorElement);
  });

  signupForm.addEventListener("submit", submitSignupForm);
}

initializeSignupPage();
