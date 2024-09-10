function fetchNews(initialLoad = false) {
    const apiUrl = `fetchNews?page=${page}&pageSize=${pageSize}`;
    const categoryUrl = currentCategory ? `&category=${currentCategory}` : '';
    const finalUrl = `${apiUrl}${categoryUrl}`;
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
            } else {
                console.error('Invalid data structure:', data);
            }
        })
        .catch(error => console.error('Error fetching the news articles:', error));
}
