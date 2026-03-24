export default function HomePage() {
  return (
    <main>
      <section>
        <h1>Champion Contact API</h1>
        <p>
          This is a tiny Next.js service for the existing portfolio contact forms.
          It accepts <code>POST</code> requests at <code>/api/contact</code>,
          stores each message in Supabase, and emails the submission to your inbox with Resend.
        </p>
      </section>

      <section>
        <h2>Expected Payload</h2>
        <ul>
          <li><code>name</code></li>
          <li><code>email</code></li>
          <li><code>phone</code></li>
          <li><code>subject</code></li>
          <li><code>message</code></li>
        </ul>
      </section>

      <section>
        <h2>Deploy</h2>
        <p>
          Deploy the <code>contact-api</code> folder to Vercel, add the environment
          variables from <code>.env.example</code>, then point the frontend API URL
          to your Vercel deployment.
        </p>
      </section>
    </main>
  );
}
