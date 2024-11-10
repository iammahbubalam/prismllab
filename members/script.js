// Mobile navigation toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const sideNav = document.querySelector('.side-nav');
let isNavOpen = false;

mobileToggle.addEventListener('click', () => {
  isNavOpen = !isNavOpen;
  sideNav.classList.toggle('show', isNavOpen);
});

// Modal functionality
const modal = document.getElementById('researcher-modal');
const closeModal = document.querySelector('.close-modal');

function openModal(researcher) {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div class="researcher-image-container">
      <img src="${researcher.image}" alt="${researcher.name}" class="researcher-image">
    </div>
    <div class="researcher-details">
      <h2>${researcher.name}</h2>
      <p class="researcher-title">${researcher.title}</p>
      <h3>Research Interests</h3>
      <p>${researcher.interests.join(', ')}</p>
      <h3>Education</h3>
      <ul>
        ${researcher.education.map(edu => `<li>${edu}</li>`).join('')}
      </ul>
      <h3>Recent Publications</h3>
      <ul>
        ${researcher.publications.slice(0, 3).map(pub => `<li>${pub}</li>`).join('')}
      </ul>
    </div>
  `;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalHandler);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModalHandler();
});

// Fetch and render researchers
async function fetchResearchers() {
  try {
    const response = await fetch('members.json');
    const researchers = await response.json();
    
    // Render each category
    renderResearcherCategory('directors', researchers.directors);
    renderResearcherCategory('associate_director', researchers.associate_director);
    renderResearcherCategory('coordinators', researchers.coordinators);
    renderResearcherCategory('graduate_researchers', researchers.graduate_research);
    renderResearcherCategory('undergraduate_researchers', researchers.undergraduate_research);
  } catch (error) {
    console.error('Error fetching researchers:', error);
    // Show error message on the page
    document.querySelectorAll('.researchers-grid').forEach(grid => {
      grid.innerHTML = '<p class="error-message">Failed to load researchers. Please try again later.</p>';
    });
  }
}

// onclick="openModal(${JSON.stringify(researcher).replace(/"/g, '&quot;')})" 
function renderResearcherCategory(category, researchers) {
    const grid = document.getElementById(`${category}-grid`);
    grid.innerHTML = researchers.map((researcher, index) => `
      <div class="researcher-card" 
           style="animation-delay: ${index * 0.1}s">
        <div class="researcher-info">
          <div class="researcher-image-container">
            <img src="${researcher.image}" alt="${researcher.name}" class="researcher-image">
          </div>
          <div class="researcher-social">
            ${researcher.social.google ? `<a href="${researcher.social.google}" target="_blank"><i class="fas fa-graduation-cap"></i></a>` : ''}
            ${researcher.social.linkedin ? `<a href="${researcher.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
            ${researcher.social.twitter ? `<a href="${researcher.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
            ${researcher.social.github ? `<a href="${researcher.social.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
          </div>
        </div>
        <div class="researcher-content">
          <h3 class="researcher-name">${researcher.name}</h3>
          <p class="researcher-title">${researcher.title}</p>
          <p class="researcher-description">${researcher.shortDescription || 'No description available.'}</p>
          <h3>Research Interests</h3>
          <p>${researcher.interests.join(', ')}</p>
        </div>
      </div>
    `).join('');
  }

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchResearchers);