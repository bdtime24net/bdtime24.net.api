
---

### Detailed Documentation (Use Cases)

**docs/use-cases.md**

```markdown
# BDTime24 API Use Cases

This section provides common use cases for integrating the BDTime24 API into your applications.

## 1. Display Latest News

### Use Case Description
You can use the BDTime24 API to display the latest news in your app or website.

### Step-by-Step Implementation
1. Call the `/news` endpoint to retrieve the latest news articles.
2. Display the returned articles on your platform with fields like `headline`, `description`, and `publishedAt`.

### Example API Call
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.bdtime24.net/news?limit=5"
