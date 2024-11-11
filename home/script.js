// Fetch news articles from news.json and render them
fetch('./home/news.json')
  .then(response => response.json())
  .then(data => {
    const newsGrid = document.querySelector('.news-grid');

    // Sort articles by date in descending order and get the latest 4
    const latestArticles = data
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    latestArticles.forEach(article => {
      // Format the date
      const articleDate = new Date(article.date);
      const formattedDate = articleDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const articleElement = document.createElement('div');
      articleElement.classList.add('news-article');
      articleElement.innerHTML = `
        <div class="date">${formattedDate}</div>
        <div class="content">
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
        </div>
      `;
      newsGrid.appendChild(articleElement);
    });
  })
  .catch(error => {
    console.error('Error fetching news articles:', error);
    const newsGrid = document.querySelector('.news-grid');
    newsGrid.innerHTML = '<p>Failed to load news articles. Please try again later.</p>';
  });

const mobileToggle = document.querySelector('.mobile-toggle');
const sideNav = document.querySelector('.side-nav');
let isNavOpen = false;

mobileToggle.addEventListener('click', () => {
  isNavOpen = !isNavOpen;
  sideNav.classList.toggle('show', isNavOpen);
});