

**docs/endpoints.md**

```markdown
# Endpoints Overview

## News Endpoints

### Get All News
Retrieve all the news articles available on BDTime24.

**Endpoint:**
```
GET /news
```

- Query Parameters:
  - `limit`: Number of articles to fetch.
  - `category`: Filter by category.
  - `author`: Filter by author.

### Get News by ID
Retrieve a specific news article by its unique ID.

**Endpoint:**
```
GET /news/{id}
```

## Categories Endpoint

### Get Categories
Retrieve the list of categories available on the platform.

**Endpoint:**
```
GET /categories
```

## Users Endpoint

### Get Users
Retrieve all users/authors on the platform.

**Endpoint:**
```
GET /users
```

---

**docs/errors.md**

```markdown
# Error Handling

All errors returned by the BDTime24 API follow a standard format. The API uses the following HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Example Error Response

```json
{
  "status": "error",
  "message": "Invalid API key"
}
```
```

---

This structure will provide a comprehensive guide to using the BDTime24 API, including authentication, endpoints, and error handling. Let me know if you need any more details or adjustments!