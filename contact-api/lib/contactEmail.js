function escapeHtml(input = "") {
  return input.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

export function buildContactEmailHtml(submission) {
  const name = escapeHtml(submission.name);
  const email = escapeHtml(submission.email);
  const phone = escapeHtml(submission.phone || "-");
  const subject = escapeHtml(submission.subject);
  const message = escapeHtml(submission.message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
      <h2 style="margin-bottom: 16px;">New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br />${message}</p>
    </div>
  `;
}

export function buildContactEmailText(submission) {
  return [
    "New Portfolio Contact Message",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "-"}`,
    `Subject: ${submission.subject}`,
    "Message:",
    submission.message,
  ].join("\n");
}
