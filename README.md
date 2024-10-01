---

### README.md

```markdown
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

## Endpoints

### 1. Get All News

Retrieve a list of news articles.

**Endpoint:** `GET /news`

**Query Parameters:**
- `limit` (optional): Limit the number of news articles returned.
- `category` (optional): Filter articles by category.
- `author` (optional): Filter articles by author.

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/news?limit=5&category=world"
```

---

### 2. Get News by ID

Retrieve a specific news article by its ID.

**Endpoint:** `GET /news/{id}`

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/news/12345"
```

---

### 3. Get Categories

Retrieve all available categories.

**Endpoint:** `GET /categories`

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/categories"
```

---

### 4. Get Users

Retrieve all users or authors.

**Endpoint:** `GET /users`

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/users"
```

---

## Use Cases

1. **Display Latest News in a Mobile App**

   Integrate the BDTime24 API into your news app to fetch the latest articles and present them in a list. Use the `/news` endpoint to retrieve data dynamically.

   Example: Retrieve the top 10 latest articles:
   
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        "https://api.bdtime24.net/news?limit=10"
   ```

2. **Category-Specific News Feed for a Blog**

   Create a category-based news feed on a blog website, such as tech-related articles. Use the `/news` endpoint with the `category` query parameter.

   Example: Get tech news:
   
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        "https://api.bdtime24.net/news?category=technology"
   ```

3. **Author-Specific News Filter in a Web App**

   Let users filter articles by author. Use the `/news` endpoint with the `author` parameter to filter articles written by a specific author.

   Example: Retrieve articles by John Doe:
   
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        "https://api.bdtime24.net/news?author=JohnDoe"
   ```

---

## Error Handling

The API returns a standardized error response in case of failure.

**Example Error Response:**

```json
{
  "status": "error",
  "message": "Invalid API Key"
}
```
---

## 2. Category-Based News Feed

### Use Case Description
To show news articles filtered by specific categories (e.g., technology or sports) on a website or app.

### Step-by-Step Implementation
1. Fetch categories using the `/categories` endpoint.
2. Select a category and call the `/news` endpoint with the `category` parameter.

### Example API Call
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/news?category=technology"
```

---

## 3. Author-Based News Feed

### Use Case Description
Filter news articles by a specific author to show all news written by them.

### Step-by-Step Implementation
1. Fetch the list of users/authors using the `/users` endpoint.
2. Choose an author and filter news articles using the `/news` endpoint with the `author` query parameter.

### Example API Call
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/news?author=JohnDoe"
```

---

## 4. Display News Details

### Use Case Description
Retrieve detailed information about a specific news article by its ID.

### Step-by-Step Implementation
1. Fetch news articles using `/news`.
2. Use the article ID to get detailed content using the `/news/{id}` endpoint.

### Example API Call
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/news/12345"
```


---

**docs/errors.md**

```markdown
# BDTime24 API Error Handling

The API provides consistent error messages and codes. Here are common scenarios and their responses.

## Error Status Codes

- **400 Bad Request**: The request was invalid.
- **401 Unauthorized**: The API key is missing or invalid.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server side.

### Example Error Response

**Invalid API Key:**
```json
{
  "status": "error",
  "message": "Invalid API Key"
}
```

**Resource Not Found (404):**
```json
{
  "status": "error",
  "message": "News article not found"
}
```

**Server Error:**
```json
{
  "status": "error",
  "message": "An unexpected error occurred. Please try again later."
}
```

---

This detailed structure includes the **use cases**, with examples, authentication details, and error handling, allowing users to easily understand and integrate the API.