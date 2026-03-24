export const reviewSelectFields =
  "id, created_at, author_name, author_role, content, visibility, is_published";

export function toReviewPayload(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    authorName: row.author_name,
    authorRole: row.author_role || "",
    content: row.content,
    visibility: row.visibility,
    isPublished: Boolean(row.is_published),
  };
}
