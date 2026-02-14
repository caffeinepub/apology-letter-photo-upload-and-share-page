const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export function validateImageFile(file: File): string | null {
  if (!file) {
    return 'Please select a file.';
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please select a valid image file (JPG, PNG, GIF, or WebP).';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 10MB. Please choose a smaller image.';
  }

  return null;
}
