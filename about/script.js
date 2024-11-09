// Load research areas from JSON file
fetch('research-area.json')
  .then(response => response.json())
  .then(data => {
    const researchGrid = document.getElementById('researchGrid');
    
    data.research_areas.forEach(area => {
      const card = document.createElement('div');
      card.classList.add('research-card');
      
      card.innerHTML = `
        <div class="research-card-image">
          <img src="../resources/research/${area.image}" alt="${area.title}">
        </div>
        <div class="research-card-content">
          <h3>${area.title}</h3>
          <p>${area.description}</p>
        </div>
      `;
      
      researchGrid.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading research areas:', error);
    const researchGrid = document.getElementById('researchGrid');
    researchGrid.innerHTML = '<p>Failed to load research areas. Please try again later.</p>';
  });

// Animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.research-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
});

const mobileToggle = document.querySelector('.mobile-toggle');
const sideNav = document.querySelector('.side-nav');

let isNavOpen = false;

mobileToggle.addEventListener('click', () => {
  isNavOpen = !isNavOpen;
  sideNav.classList.toggle('show', isNavOpen);
});