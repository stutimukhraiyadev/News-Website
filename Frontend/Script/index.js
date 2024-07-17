document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '3f9306af94c3428eaf8b8e210f9a46e5';
    let page = 1;
    const pageSize = 9;
    let currentCategory = '';

    function fetchNews(initialLoad = false) {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        const categoryUrl = currentCategory ? `&category=${currentCategory}` : '';
        fetch(`${apiUrl}${categoryUrl}`)
            .then(response => response.json())
            .then(data => {
                const newsContainer = document.getElementById('news-container');
                if (initialLoad) {
                    newsContainer.innerHTML = ''; // Clear previous news articles
                }
                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';

                    const newsImage = document.createElement('img');
                    newsImage.src = article.urlToImage || 'default-image.jpg';
                    newsItem.appendChild(newsImage);

                    const newsContent = document.createElement('div');
                    newsContent.className = 'news-content';

                    const newsTitle = document.createElement('h3');
                    newsTitle.className = 'news-title';
                    newsTitle.textContent = article.title;
                    newsContent.appendChild(newsTitle);

                    const newsDate = document.createElement('p');
                    newsDate.className = 'news-date';
                    newsDate.textContent = `Published by ${article.source.name} on ${new Date(article.publishedAt).toLocaleDateString()}`;
                    newsContent.appendChild(newsDate);

                    const newsDescription = document.createElement('p');
                    newsDescription.className = 'news-description';
                    newsDescription.textContent = article.description;
                    newsContent.appendChild(newsDescription);

                    const readMore = document.createElement('a');
                    readMore.className = 'read-more';
                    readMore.href = article.url;
                    readMore.textContent = 'Read More';
                    readMore.target = '_blank';
                    newsContent.appendChild(readMore);

                    const bookmark = document.createElement('i');
                    bookmark.className = 'fa-regular fa-star bookmark-icon';
                    bookmark.addEventListener('click', () => {
                        alert('Article bookmarked!');
                    });
                    newsContent.appendChild(bookmark);

                    newsItem.appendChild(newsContent);
                    newsContainer.appendChild(newsItem);
                });
                if (initialLoad) {
                    page++;
                }
            })
            .catch(error => console.error('Error fetching the news articles:', error));
    }

    document.getElementById('load-more').addEventListener('click', () => {
        fetchNews();
        page++;
    });

    // Add event listeners to category links
    const categoryLinks = document.querySelectorAll('.category-nav ul li a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            // Remove active class from all category links
            categoryLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            event.target.classList.add('active');
            // Update currentCategory and fetch news
            currentCategory = event.target.getAttribute('data-category');
            page = 1;
            fetchNews(true);
        });
    });

    // Initial fetch
    fetchNews(true);
});
