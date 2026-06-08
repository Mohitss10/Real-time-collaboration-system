exports.welcomeEmailTemplate = (name) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial,sans-serif;background:#f5f7fb;padding:20px;">

    <div style="
      max-width:600px;
      margin:auto;
      background:white;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 5px 20px rgba(0,0,0,0.08);
    ">

      <div style="
        background:linear-gradient(135deg,#2563eb,#7c3aed);
        padding:40px;
        text-align:center;
        color:white;
      ">
        <h1>Welcome to Nexus 🚀</h1>
        <p>Real-Time Team Collaboration Platform</p>
      </div>

      <div style="padding:35px">

        <h2>Hello ${name},</h2>

        <p>
          Your account has been created successfully.
        </p>

        <p>
          You can now collaborate with your team,
          create projects, share documents,
          chat in real-time and boost productivity.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a
            href="https://real-time-collaboration-system-iota.vercel.app"
            style="
              background:#2563eb;
              color:white;
              text-decoration:none;
              padding:14px 28px;
              border-radius:10px;
              display:inline-block;
            "
          >
            Open Nexus
          </a>
        </div>

      </div>

      <div style="
        background:#f8fafc;
        text-align:center;
        padding:20px;
        color:#64748b;
      ">
        © 2026 Nexus Collaboration Platform
      </div>

    </div>

  </body>
  </html>
  `;
};

exports.loginEmailTemplate = (name) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial,sans-serif;background:#f5f7fb;padding:20px;">

    <div style="
      max-width:600px;
      margin:auto;
      background:white;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 5px 20px rgba(0,0,0,0.08);
    ">

      <div style="
        background:#0f172a;
        color:white;
        text-align:center;
        padding:35px;
      ">
        <h1>Login Alert 🔐</h1>
      </div>

      <div style="padding:35px">

        <h2>Hello ${name},</h2>

        <p>
          We detected a successful login to your Nexus account.
        </p>

        <p>
          If this was you, no action is required.
        </p>

        <p>
          If you don't recognize this login,
          please change your password immediately.
        </p>

      </div>

      <div style="
        background:#f8fafc;
        text-align:center;
        padding:20px;
        color:#64748b;
      ">
        Nexus Security Team
      </div>

    </div>

  </body>
  </html>
  `;
};