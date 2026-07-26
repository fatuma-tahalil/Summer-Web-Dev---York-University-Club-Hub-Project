// Default clubs
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

// Load from local storage or use defaults
// We load from storage to allow for local admin changes to club data
let clubs = JSON.parse(localStorage.getItem("yorkClubsData"));
if (!clubs) {
  clubs = defaultClubs;
  localStorage.setItem("yorkClubsData", JSON.stringify(clubs));
}

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const categoryColors = {
  Academic: "#2c5f8a",
  Cultural: "#7b3f9e",
  Sports: "#1a7a4a",
  Technology: "#b35c00",
  Arts: "#a0002a",
};

const searchInput = document.getElementById("search-name");
const categorySelect = document.getElementById("filter-category");
const searchButton = document.querySelector(".search-clubs-btn");
const clubsList = document.getElementById("clubs-list");

searchInput.addEventListener("input", filterClubs);
categorySelect.addEventListener("change", filterClubs);
searchButton.addEventListener("click", filterClubs);
clubsList.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete-club-btn");
  if (!deleteButton) return;

  deleteClub(decodeURIComponent(deleteButton.dataset.clubName));
});

function renderClubs(list) {
  const container = document.getElementById("clubs-list");
  const noResults = document.getElementById("no-results");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (list.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  container.innerHTML = list
    .map((club) => {
      const color = categoryColors[club.category] || "crimson";
      const initials = getInitials(club.name);

      // Add delete button ONLY if admin
      const deleteButtonHTML = isAdmin
        ? `<button type="button" class="delete-club-btn" data-club-name="${encodeURIComponent(club.name)}" style="background: #e31837; color: white; padding: 5px 10px; border: none; cursor: pointer; margin-top: 10px; border-radius: 4px; font-size: 0.8rem;">Delete Club</button>`
        : "";

      return `
        <div class="club-card">
            <div class="club-logo-placeholder" style="background-color:${color}">${initials}</div>
            <div class="club-info">
                <div class="club-card-top">
                    <h3 class="club-name">${club.name}</h3>
                    <span class="club-category" style="background-color:${color}">${club.category}</span>
                </div>
                <p class="club-description">${club.description}</p>
                ${deleteButtonHTML}
            </div>
        </div>`;
    })
    .join("");
}

function filterClubs() {
  const nameQuery = document
    .getElementById("search-name")
    .value.trim()
    .toLowerCase();
  const catQuery = document.getElementById("filter-category").value;

  const filtered = clubs.filter((club) => {
    const matchName = club.name.toLowerCase().includes(nameQuery);
    const matchCat = catQuery === "" || club.category === catQuery;
    return matchName && matchCat;
  });

  renderClubs(filtered);
}

// Admin Add & Delete Logic
function setupAdminFeatures() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return;

  const adminSection = document.createElement("div");
  adminSection.className = "clubs-container";
  adminSection.style.marginTop = "20px";
  adminSection.style.padding = "20px";
  adminSection.style.backgroundColor = "#f9f9f9";
  adminSection.style.border = "2px dashed #e31837";

  adminSection.innerHTML = `
        <h2 style="color: #e31837;">Admin Panel: Add New Club</h2>
        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
            <input type="text" id="new-club-name" placeholder="Club Name" style="padding: 8px;">
            <select id="new-club-category" style="padding: 8px;">
                <option value="Academic">Academic</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="Arts">Arts</option>
            </select>
            <input type="text" id="new-club-desc" placeholder="Club Description" style="padding: 8px; flex-grow: 1;">
            <button type="button" id="add-club-button" style="background: #e31837; color: white; padding: 8px 16px; border: none; cursor: pointer;">Add Club</button>
            <button type="button" id="exit-admin-button" style="background: #333; color: white; padding: 8px 16px; border: none; cursor: pointer;">Log Out</button>
        </div>
    `;

  const searchSection = document.querySelector(".clubs-search-section");
  searchSection.parentNode.insertBefore(
    adminSection,
    searchSection.nextSibling,
  );

  document
    .getElementById("add-club-button")
    .addEventListener("click", addNewClub);
  document
    .getElementById("exit-admin-button")
    .addEventListener("click", exitAdminMode);
}

function addNewClub() {
  const name = document.getElementById("new-club-name").value.trim();
  const category = document.getElementById("new-club-category").value;
  const description = document.getElementById("new-club-desc").value.trim();

  if (!name || !description) {
    alert("Please fill out all fields.");
    return;
  }

  // Add new club to the top of the array
  clubs.unshift({ name, category, description });
  localStorage.setItem("yorkClubsData", JSON.stringify(clubs));

  document.getElementById("new-club-name").value = "";
  document.getElementById("new-club-desc").value = "";

  filterClubs();
  alert("Club added successfully!");
}

function deleteClub(clubName) {
  if (!confirm(`Are you sure you want to delete "${clubName}"?`)) return;
  clubs = clubs.filter((club) => club.name !== clubName);
  localStorage.setItem("yorkClubsData", JSON.stringify(clubs));
  filterClubs();
}

function exitAdminMode() {
  localStorage.removeItem("isAdmin");
  location.reload();
}

// Initial render
renderClubs(clubs);
setupAdminFeatures();
