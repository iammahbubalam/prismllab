// Mobile navigation toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const sideNav = document.querySelector('.side-nav');
let isNavOpen = false;

mobileToggle.addEventListener('click', () => {
  isNavOpen = !isNavOpen;
  sideNav.classList.toggle('show', isNavOpen);
});

// Fetch and render publications
async function fetchPublications() {
  try {
    const response = await fetch('papers.json');
    const publications = await response.json();
    
    renderPublications(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    // Show error message on the page
    const publicationsGrid = document.getElementById('publications-grid');
    publicationsGrid.innerHTML = '<p class="error-message">Failed to load publications. Please try again later.</p>';
  }
}

function renderPublications(publications) {
  const publicationsGrid = document.getElementById('publications-grid');

  publicationsGrid.innerHTML = publications.map((publication, index) => `
    <div class="publication-card" style="animation-delay: ${index * 0.1}s">
      <img src="${publication.thumbnail}" alt="${publication.title}" class="publication-thumbnail">
      <div class="publication-info">
        <h3 class="publication-title">${publication.title}</h3>
        <p class="publication-details">DOI: ${publication.doi} | ${publication.journal}</p>
        <p class="publication-abstract">${publication.abstract}</p>
        <a href="${publication.link}" target="_blank" class="publication-link">Full Article</a>
      </div>
    </div>
  `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchPublications);