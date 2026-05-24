# Advocate Unnati Chauhan Portfolio

React portfolio website for Advocate Unnati Chauhan, an Indian advocate working with matters across the Supreme Court, High Courts, RERA, NCLT and NCLAT.

The site includes:

- Landing page with professional introduction, education and career summary
- Services page for practice areas
- Contact Us page with address, location and enquiry form
- Sticky navbar with social links
- Footer with contact information, quick links, practice forums and legal disclaimer
- Responsive layout for desktop, tablet and mobile

## Tech Stack

- React
- Vite
- Lucide React icons
- CSS

## Project Structure

```text
.
├── index.html
├── package.json
├── package-lock.json
├── src
│   ├── main.jsx
│   └── styles.css
└── README.md
```

## Prerequisites

Install Node.js and npm on your machine.

This project was created and tested with:

- Node.js `v25.5.0`
- npm `11.8.0`

Other recent Node.js versions should also work.

## Install Dependencies

From the project folder, run:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Vite will show a local URL in the terminal, usually:

```text
http://localhost:5173/
```

Open that URL in your browser to see the website.

If port `5173` is already busy, Vite may choose another port. Use the URL shown in your terminal.

## Build for Production

To create a production build:

```bash
npm run build
```

The generated production files will be created inside:

```text
dist/
```

This project is configured for GitHub Pages under the repository path:

```text
https://utkarsh23tech.github.io/portfolio/
```

## Preview Production Build

After building, preview the production version locally:

```bash
npm run preview
```

Then open the local URL shown in the terminal.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/deploy.yml
```

The workflow builds the React app and deploys the `dist/` folder to GitHub Pages whenever you push to the `main` branch.

### One-Time GitHub Setup

1. Push this project to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. Go to `Pages`.
5. Under `Build and deployment`, set `Source` to `GitHub Actions`.
6. Save the setting if GitHub asks you to.

### Push and Deploy

Run these commands from the project folder:

```bash
git add .
git commit -m "Build advocate portfolio website"
git push origin main
```

After the push finishes:

1. Open the repository on GitHub.
2. Go to the `Actions` tab.
3. Wait for the `Deploy to GitHub Pages` workflow to complete.
4. Open:

```text
https://utkarsh23tech.github.io/portfolio/
```

### Local GitHub Pages Preview

To check the production build locally before pushing:

```bash
npm run build
npm run preview
```

Open the URL shown in the terminal.

## Content Notes

The site currently uses placeholder contact and social details:

- Email: `unnati.chauhan@example.com`
- Phone: `+91 98765 43210`
- Address: `Chamber / Consultation Office, New Delhi, India`
- LinkedIn: `https://www.linkedin.com/`
- X: `https://x.com/`
- WhatsApp: `https://wa.me/919876543210`

Update these values in:

```text
src/main.jsx
```

Look for the `contact` and `socials` constants near the top of the file.

## Education Detail Used

The education section mentions:

```text
BBA LL.B.
ICFAI University, Dehradun
Institute of Chartered Financial Analysts of India University, Dehradun
```

This was used because the intended institute appears to be ICFAI University, Dehradun.

## Legal Disclaimer

The footer includes a standard informational disclaimer for an advocate portfolio website. Before publishing, review it for compliance with applicable Bar Council of India rules and any professional requirements.

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```
