# 🌐 Riyansh Singh — Personal Portfolio

> **Developer • Robotics Builder • Creative Tech Enthusiast**  
> Built with pure HTML, CSS & JavaScript — no frameworks, no dependencies.

---

## 🚀 Live Site

👉 **[riiyansh-singh.github.io/portfolio](https://riiyansh-singh.github.io/portfolio)**

---

## ✨ Features

- ⚡ Fully responsive — works on mobile, tablet & desktop
- 🎨 Dark theme with animated cyan gradient accents
- 🖱️ Custom animated cursor with smooth trailing ring
- ⌨️ Typing animation cycling through roles
- 📊 Scroll progress bar
- 🔄 Animated loading splash screen
- 🗂️ Project filter tabs (Web / Robotics / Game / Other)
- 🤖 Live GitHub repos auto-fetched via GitHub API
- 📅 Date-based auto-switching journey milestones
- 🎂 Dynamic age calculated from DOB
- 📋 One-click copy email button
- 🔍 Certificate lightbox zoom
- 📬 Contact form (opens email client)
- 🔝 Back to top button
- 🔒 Password-protected admin panel

---

## 📁 Folder Structure

```
portfolio/
│
├── index.html          ← Main portfolio site
├── admin.html          ← Admin panel (password protected)
├── data.json           ← All content lives here (edit this to update site)
│
├── images/
│   ├── profile.jpeg
│   ├── turf-project.png
│   ├── funhub-project.png
│   ├── slice-frenzy.png
│   ├── robot-car.jpg
│   ├── robot-car1.jpg
│   ├── robot-hand.jpg
│   ├── robot-hand1.jpg
│   ├── cert-infosys-ai.jpeg
│   ├── cert-infosys-generative.jpeg
│   ├── cert-launchpad.jpeg
│   ├── cert-robotics-achievement.jpeg
│   └── cert-robotics-participation.jpeg
│
└── videos/
    ├── turf-demo.mp4
    ├── funhub-demo.mp4
    ├── Fruit.mp4
    ├── guitar.mp4
    ├── guitar2.mp4
    ├── singing.mp4
    ├── shot-1.mp4
    └── shot-2.mp4
```

---

## 🛠️ How to Update Content

**Never edit `index.html` directly.**  
All content is driven by `data.json` — or use the visual admin panel.

### Option 1 — Admin Panel (Easiest)

1. Open `https://riiyansh-singh.github.io/portfolio/admin.html`
2. Enter password → make changes → click **Download data.json**
3. Replace the old `data.json` in your folder
4. Push to GitHub → site updates instantly ✅

### Option 2 — Edit data.json directly

Open `data.json` in any text editor and find the relevant section:

| What to update | Key in data.json |
|---|---|
| Name, email, bio | `name`, `email`, `bio` |
| New certificate | Add to `certificates` array |
| New achievement / job | Add to `achievements` array |
| New project | Add to `projects` array |
| New video | Add to `creative_videos` array |
| Journey milestone | Add to `journey` array |
| Stats numbers | Edit `stats` array |
| Skills | Edit `skills` array |

---

## ➕ Adding New Content

### New Certificate
```json
{
  "img": "images/cert-new.jpeg",
  "label": "Certificate Name",
  "year": "2025"
}
```
Put the image in `images/` folder — old certificates are never removed.

### New Achievement / Job / Internship
```json
{
  "icon": "fas fa-briefcase",
  "title": "Software Intern at XYZ",
  "desc": "Worked on backend systems.",
  "company": "XYZ Company",
  "year": "2025"
}
```

### New Project
```json
{
  "id": "my-project",
  "title": "Project Name",
  "desc": "What it does.",
  "img": "images/project.png",
  "video": "videos/demo.mp4",
  "live": "https://your-live-link.com",
  "category": "web",
  "tags": ["HTML", "CSS", "JavaScript"]
}
```

### New Journey Milestone (simple)
```json
{
  "year": "2027",
  "title": "Started Working",
  "sub": "First full-time role."
}
```

### New Journey Milestone (auto-switching)
```json
{
  "year": "2026",
  "title_before": "B.Tech Ongoing",
  "title_after": "B.Tech Completed",
  "sub_before": "Currently studying.",
  "sub_after": "Graduated!",
  "switch_date": "2030-06-01"
}
```
→ The site automatically shows the correct text based on today's date. No code needed.

---

## 🔒 Admin Panel

| Detail | Info |
|---|---|
| URL | `/admin.html` |
| Default Password | `riyansh2006` |
| Change Password | Open `admin.html` in text editor → find `ADMIN_PASSWORD` |
| Keyboard Shortcut | `Ctrl+S` / `Cmd+S` to download data.json anytime |

---

## 🤖 GitHub Repos (Auto-Fetched)

The GitHub section fetches your public repositories live via the GitHub API every time the page loads — nothing to update manually. Just push new repos and they appear automatically.

---

## 🌍 Deployment (GitHub Pages)

1. Go to your repo → **Settings** → **Pages**
2. Source → **Deploy from branch** → `main` → `/ (root)`
3. Click **Save**
4. Your site is live at `https://riiyansh-singh.github.io/portfolio`

---

## 🧰 Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling, animations, layout |
| JavaScript (Vanilla) | All interactivity, data rendering |
| GitHub API | Live repo fetching |
| Font Awesome 6 | Icons |
| Google Fonts (Syne + DM Sans) | Typography |
| GitHub Pages | Hosting (free) |

---

## 📞 Contact

- 📧 [singhriyansh2006@gmail.com](mailto:singhriyansh2006@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/riyansh-singh-839817385)
- 🐙 [GitHub](https://github.com/riiyansh-singh)
- 📸 [Instagram](https://www.instagram.com/riiiyanshh.3)

---

<div align="center">
  <i>"Build. Break. Learn. Repeat."</i><br><br>
  Made with ❤️ by Riyansh Singh
</div>
