import React from 'react'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden " style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}>
        {/* Background Blur */}
        <div className="absolute inset-0  blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6 text-sm font-medium  text-center">
              <a
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Terms & Conditions
              </a>

              <a
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Cookies
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-[var(--text-secondary)] text-center md:text-right">
              © 2025 Nexus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer