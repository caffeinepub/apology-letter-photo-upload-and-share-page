# Specification

## Summary
**Goal:** Create a simple apology-letter photo upload page that generates a shareable link, plus a public view page to display the uploaded image.

**Planned changes:**
- Build an upload flow that accepts common image formats (PNG/JPG), validates file type, and shows a preview before upload.
- Store uploaded images in the backend (single Motoko actor), returning a unique public ID per upload.
- Add a shareable URL display after upload that links to a dedicated “View shared letter” route.
- Implement the view route to fetch the image by ID, with responsive rendering plus loading, not-found, and error states.
- Apply a consistent, creative visual theme across upload and view pages (avoiding blue/purple as primary colors) and include generated static header artwork from `frontend/public/assets/generated`.

**User-visible outcome:** A user can upload a photo of an apology letter, receive a unique shareable link, and anyone with the link can open it to view the image without logging in.
