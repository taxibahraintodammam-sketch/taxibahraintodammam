import { randomUUID } from 'crypto';

// Only images and PDFs — never HTML/SVG/JS, which a public bucket would serve
// back as active content.
const ALLOWED_TYPES: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/heic': 'heic',
    'application/pdf': 'pdf',
};

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Validates an uploaded file and returns a safe storage path, or an error.
 * The extension comes from the MIME type, never from the user's file name.
 */
export function validateUpload(file: File, folder: string): { path: string } | { error: string } {
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) return { error: 'Only JPG, PNG, WEBP, HEIC or PDF files are allowed' };
    if (file.size > MAX_UPLOAD_BYTES) return { error: 'File is too large (max 10 MB)' };
    return { path: `${folder}/${randomUUID()}.${ext}` };
}
