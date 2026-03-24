<div align="center">

# ⚡ Riyansh Singh — Portfolio

**Developer • Robotics Builder • Creative Tech Enthusiast • Goalkeeper**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-riiyansh--singh.github.io-00e5ff?style=for-the-badge&labelColor=060608)](https://riiyansh-singh.github.io/portfolio)
[![GitHub](https://img.shields.io/badge/GitHub-riiyansh--singh-ffffff?style=for-the-badge&logo=github&labelColor=060608)](https://github.com/riiyansh-singh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Riyansh_Singh-0077b5?style=for-the-badge&logo=linkedin&labelColor=060608)](https://www.linkedin.com/in/riyansh-singh-839817385)
[![Instagram](https://img.shields.io/badge/Instagram-riiiyanshh.3-e4405f?style=for-the-badge&logo=instagram&labelColor=060608)](https://www.instagram.com/riiiyanshh.3)

<br>

*"Build. Break. Learn. Repeat."*

</div>

---

## 👋 About Me

Developer from **Agra, India** — building toward a B.Tech in Computer Science.

Started with **Arduino and robotics** — wiring sensors, controlling motors, building things that physically move. That hands-on foundation led me into **web development**, where I've shipped multiple live projects. Beyond tech, I was selected for a **national-level football camp** as a goalkeeper and left defender.

This portfolio is where all of it lives — code, hardware, creative work, and the full journey.

---

## 🔥 What's Inside

| Section | Description |
|---|---|
| **Hero** | Name, live status, location, socials, typing animation |
| **About** | Bio, animated skill bars, tag chips |
| **Stats** | Live counters — projects, builds, certs, achievements |
| **Projects** | Web projects with live links, tech tags, demo videos |
| **Robotics** | Arduino hardware builds with photos |
| **GitHub** | Public repos auto-fetched live via GitHub API |
| **Creative Work** | Music, singing, cinematic video clips |
| **Certificates** | All credentials with lightbox zoom |
| **Achievements** | Awards, positions, milestones |
| **Journey** | Timeline with date-based auto-switching milestones |
| **Contact** | Email form + social links |

---

## ⚙️ How It Works

This portfolio is **fully data-driven** — `index.html` reads everything from `data.json` and builds the entire site automatically.

```
index.html      ←  The site (never touch this)
data.json       ←  All your content (only file you ever edit)
images/         ←  Photos, thumbnails, certificates
videos/         ←  Demo clips, creative videos
```

**No backend. No database. No framework. No build step.**
Just open `data.json`, make a change, push — site updates instantly.

---

## ✏️ How to Update Anything

### 🏅 New Certificate
Add to the `certificates` array in `data.json`:
```json
{
  "img": "images/your-cert-filename.jpeg",
  "label": "Certificate Name",
  "year": "2025"
}
```
Drop the image file into the `images/` folder. Old certificates are never removed — they stack.

---

### 🏆 New Achievement / Job / Internship / Position
Add to the `achievements` array:
```json
{
  "icon": "fas fa-briefcase",
  "title": "Role or Achievement Title",
  "desc": "Short description of what it involved.",
  "company": "Organisation Name",
  "year": "2026"
}
```
Pick any [Font Awesome icon](https://fontawesome.com/icons) for the `icon` field.

---

### 💻 New Project
Add to the `projects` array:
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "desc": "What it does in one line.",
  "img": "images/thumbnail.png",
  "video": "videos/demo.mp4",
  "live": "https://your-live-link.com",
  "category": "web",
  "tags": ["HTML", "CSS", "JavaScript"]
}
```
Leave `video` blank (`""`) if there's no demo clip.

---

### 🛣️ New Journey Milestone

**Simple entry:**
```json
{
  "year": "2027",
  "title": "What happened",
  "sub": "A short detail."
}
```

**Auto-switching entry** *(text changes on a specific date automatically):*
```json
{
  "year": "2026",
  "title_before": "Text shown before the date",
  "title_after":  "Text shown after the date",
  "sub_before":   "Supporting detail before",
  "sub_after":    "Supporting detail after",
  "switch_date":  "2026-08-01"
}
```
> The site checks today's date on every load and shows the correct text automatically.
> No code. No manual update. It just works.

---

### 📊 Update a Stat
Find the item in the `stats` array and change `num`:
```json
{ "num": 5, "suffix": "+", "label": "Web Projects" }
```

---

### 🎬 New Creative Video
Add to `creative_videos` array:
```json
{
  "src": "videos/your-clip.mp4",
  "title": "Video Title",
  "sub": "Short description"
}
```

---

## ⏱️ Journey Auto-Switch

The timeline automatically changes on **August 1, 2026** with no manual update:

| Before | After |
|---|---|
| Secondary School (PCM) Ongoing | Secondary School (PCM) Completed |
| B.Tech Engineering (Planned) | B.Tech Engineering (CS) — Started |

To add more auto-switches (e.g. when you graduate B.Tech), just add another entry with a `switch_date`.

---

## 🤖 GitHub Section — Zero Maintenance

Fetches your latest public repos live via the **GitHub REST API** on every page load.
Push a new repo → it appears on the site automatically. Nothing to update.

---

## 🧰 Tech Stack

```
HTML5, CSS3, Vanilla JavaScript     ←  No frameworks
GitHub REST API                     ←  Live repo fetching
Font Awesome 6                      ←  Icons
Google Fonts (Syne + DM Sans)       ←  Typography
GitHub Pages                        ←  Free hosting, auto-deploy on push
```

---

## 🌍 Deploying to GitHub Pages

**First-time setup:**
1. Go to repo → **Settings** → **Pages**
2. Source → **Deploy from branch** → `main` → `/ (root)`
3. Click **Save**
4. Live in ~60 seconds at `https://riiyansh-singh.github.io/portfolio`

**Every update after that:**
```bash
git add .
git commit -m "update: new certificate / project / achievement"
git push origin main
# site updates live within seconds ✅
```

> ⚠️ **Keep the repo public** if you're on a free GitHub account — GitHub Pages requires a public repo on the free plan.

---

## 📬 Contact

| | |
|---|---|
| 📧 Email | [singhriyansh2006@gmail.com](mailto:singhriyansh2006@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/riyansh-singh-839817385](https://www.linkedin.com/in/riyansh-singh-839817385) |
| 🐙 GitHub | [github.com/riiyansh-singh](https://github.com/riiyansh-singh) |
| 📸 Instagram | [instagram.com/riiiyanshh.3](https://www.instagram.com/riiiyanshh.3) |

---

<div align="center">

Built by **Riyansh Singh** — Agra, India 🇮🇳<br>
*Exploring code, robotics, and creative visuals — building real-world projects that matter.*

</div>
