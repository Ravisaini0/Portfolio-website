# Portfolio Website Frontend

A modern, responsive personal portfolio website for Ravi Saini, built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui components.

The frontend includes the public portfolio website and a protected admin dashboard that can manage the portfolio content through the Spring Boot backend.

## Live Demo

[View Live Website](https://portfolio-website-ravisaini0s-projects.vercel.app/)

## What Was Added / Updated

- Added a professional admin login page.
- Hidden the public website navbar/footer from admin pages.
- Fixed the admin back button so it works cleanly and does not overlap with the navbar.
- Added a full admin dashboard with separated tabs for each content area.
- Added file upload support for profile, projects, and certificates instead of only image URLs.
- Added success/error messages after every save, update, upload, or delete action.
- Connected dynamic portfolio sections to backend APIs.
- Kept default portfolio content visible when backend content is empty.
- Fixed project rendering so existing/default projects still show and new admin projects are appended.
- Added backend asset URL handling for uploaded files.

## Public Website Sections

- Home / Hero
- About
- Work Experience
- Technical Skills
- Projects / Work
- Certificates
- Contact

## Admin Dashboard Sections

The admin dashboard is available at:

```text
http://localhost:3000/admin
```

Admin can manage:

- Profile information
- Profile image upload
- About section heading and description
- About cards with add, edit, update, and delete
- Work experience entries with add, edit, update, and delete
- Skills section heading and description
- Individual skills with category, name, level, add, edit, update, and delete
- Projects with title, description, technologies, GitHub URL, live URL, and image upload
- Certificates with details and file/image upload
- Contact form messages

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide React icons
- Framer Motion

## Backend Connection

API configuration is handled in:

```text
lib/api.ts
```

Development API URL:

```text
http://localhost:8081
```

Uploaded files are displayed using backend asset paths such as:

```text
/uploads/file-name.png
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the website:

```text
http://localhost:3000
```

Open admin:

```text
http://localhost:3000/admin
```

## Build

```bash
npm run build
```

## Start Production Build

```bash
npm run start
```

## Important Notes

- Start the backend first on port `8081` before using admin save/upload features.
- Admin routes require a valid JWT token from backend login.
- Public website sections use backend content when available and fallback content when backend is empty.
- Uploaded images/files are served by the backend from the `uploads` folder.
