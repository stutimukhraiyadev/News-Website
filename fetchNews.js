export default async function handler(req, res) {
    const { page, pageSize, category } = req.query;
    const apiKey = '3f9306af94c3428eaf8b8e210f9a46e5';
    
    const baseUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    const categoryUrl = category ? `&category=${category}` : '';
    const finalUrl = `${baseUrl}${categoryUrl}`;
  
    try {
      const response = await fetch(finalUrl);
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: data.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  }
  