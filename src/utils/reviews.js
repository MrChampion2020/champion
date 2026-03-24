export function getReviewAuthor(review = {}) {
  return review.authorName || review.author || review.name || "Client";
}

export function getReviewRole(review = {}) {
  return review.authorRole || review.role || "";
}

export function getReviewContent(review = {}) {
  return review.content || review.quote || review.remark || "";
}

export function formatReviewMonthYear(value) {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-NG", {
    month: "short",
    year: "numeric",
  });
}

export function getReviewInitials(review = {}) {
  return getReviewAuthor(review)
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
