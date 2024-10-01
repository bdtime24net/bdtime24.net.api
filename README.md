# BDTime24 API Documentation

The **BDTime24 API** enables developers to integrate BDTime24's news content into their applications. This API provides access to news articles, categories, and users/authors.

## Features
- Fetch the latest news articles
- Retrieve news by specific categories
- Get user and author information
- Filter news by author or category

---

## Base URL
```
https://api.bdtime24.net
```

---

## Authentication
The API requires an API key for authentication.

**Request Example:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.bdtime24.net/news
```

---

