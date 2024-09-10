document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '46ff10fd349cb0532a16c001f50ddc4f';
    let page = 1;
    const pageSize = 9;
    let currentTopic = '';

    function fetchNews(initialLoad = false) {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?topic=general&lang=en&country=in&apikey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        const topicUrl = currentTopic ? `&topic=${currentTopic}` : '';
        const finalUrl = `${apiUrl}${topicUrl}`;
        console.log('Fetching news from:', finalUrl); // Log the constructed URL

        fetch(finalUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const newsContainer = document.getElementById('news-container');
                if (initialLoad) {
                    newsContainer.innerHTML = ''; // Clear previous news articles
                }
                if (data && Array.isArray(data.articles)) {
                    data.articles.forEach(article => {
                        const newsItem = document.createElement('div');
                        newsItem.className = 'news-item';

                        const newsImage = document.createElement('img');
                        newsImage.src = article.image || 'default-image.jpg';
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
                } else {
                    console.error('Invalid data structure:', data);
                }
            })
            .catch(error => console.error('Error fetching the news articles:', error));
    }

    document.getElementById('load-more').addEventListener('click', () => {
        fetchNews();
        page++;
    });

    // Add event listeners to topic links
    const topicLinks = document.querySelectorAll('.topic-nav ul li a');
    topicLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            // Remove active class from all topic links
            topicLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            event.target.classList.add('active');
            // Update currentTopic and fetch news
            currentTopic = event.target.getAttribute('data-topic');
            page = 1;
            fetchNews(true);
        });
    });

    // Initial fetch
    fetchNews(true);
});
