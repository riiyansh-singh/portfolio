let D = {};

/* ── 1. INIT — load data.json then build site ─────────────── */
async function init() {
  try {
    const r = await fetch('data.json');
    D = await r.json();
  } catch(e) {
    D = fallback();
  }
  render();
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startTyping();
    fetchGitHub();
    setupObserver();
  }, 2000);
}

/* ── 2. RENDER — populate every section from data ─────────── */
function render() {
  const firstName = D.name.split(' ')[0];
  const lastName  = D.name.split(' ').slice(1).join(' ');

  // Page title + nav logo
  document.title = D.name + ' — ' + D.tagline;
  document.getElementById('hero-name').textContent = firstName;
  document.getElementById('hero-last').textContent = lastName;
  document.getElementById('nav-logo').innerHTML = firstName.slice(0,2) + '<span>.</span>';

  // Info cards
  document.getElementById('c-loc').textContent  = D.location;
  document.getElementById('c-email').textContent = D.email;
  document.getElementById('c-email-link').textContent = D.email;
  document.getElementById('c-email-link').href   = 'mailto:' + D.email;

  // Footer year
  document.getElementById('ft-year').textContent = '© ' + new Date().getFullYear() + ' ' + D.name;

  // Dynamic age (calculated from DOB every visit)
  if (D.dob) {
    const age = Math.floor((Date.now() - new Date(D.dob)) / (365.25*24*3600*1000));
    document.getElementById('hero-age').innerHTML = '<b>' + age + ' years old</b> · ' + D.tagline;
  }

  // Status — auto-switches after Aug 1 2026
  const sw = new Date('2026-08-01');
  document.getElementById('c-status').textContent =
    new Date() >= sw ? 'B.Tech CS Student' : 'Secondary School + Developer';

  // Resume button — shown only if "resume" key exists in data.json
  if (D.resume) {
    const rb = document.getElementById('resume-btn');
    if (rb) { rb.href = D.resume; rb.style.display = 'inline-flex'; }
  }

  // Social icons (only shows icons with a URL filled in)
  const icons = {
    github:'fab fa-github', linkedin:'fab fa-linkedin',
    instagram:'fab fa-instagram', twitter:'fab fa-x-twitter',
    youtube:'fab fa-youtube', discord:'fab fa-discord',
    telegram:'fab fa-telegram', website:'fas fa-globe'
  };
  const socialHTML = Object.entries(D.socials)
    .filter(([,v]) => v && v.trim())
    .map(([k,v]) => `<a href="${v}" target="_blank"><i class="${icons[k]||'fas fa-link'}"></i></a>`)
    .join('');
  document.getElementById('hero-socials').innerHTML = socialHTML;
  document.getElementById('contact-socials').innerHTML =
    socialHTML + `<a href="mailto:${D.email}"><i class="fas fa-envelope"></i></a>`;

  // Stats — auto-counted from arrays (add a project → number goes up)
  const autoStats = [
    { num: D.projects.length,     suffix: '+', label: 'Web Projects'   },
    { num: D.robotics.length,     suffix: '',  label: 'Robotics Builds' },
    { num: D.certificates.length, suffix: '',  label: 'Certificates'    },
    { num: D.achievements.length, suffix: '+', label: 'Achievements'    },
  ];
  document.getElementById('stats-strip').innerHTML = autoStats.map(s =>
    `<div class="stat-item">
       <div class="stat-num" data-target="${s.num}" data-suffix="${s.suffix}">${s.num}${s.suffix}</div>
       <div class="stat-label">${s.label}</div>
     </div>`).join('');

  // About bio + tags
  document.getElementById('about-text').innerHTML =
    D.bio.map(p => `<p>${p}</p>`).join('') +
    '<div class="tags-wrap">' + D.tags.map(t => `<span class="tag">${t}</span>`).join('') + '</div>';

  // Skill bars
  document.getElementById('skills-list').innerHTML = D.skills.map(s =>
    `<div>
       <div class="skill-header"><span>${s.name}</span><span>${s.level}%</span></div>
       <div class="skill-bar"><div class="skill-fill" data-width="${s.level}"></div></div>
     </div>`).join('');

  // Project filter tabs + cards
  const cats = ['all', ...new Set(D.projects.map(p => p.category))];
  document.getElementById('proj-tabs').innerHTML = cats.map(c =>
    `<button class="filter-btn ${c==='all'?'active':''}" onclick="buildProjects('${c}',this)">
       ${c.charAt(0).toUpperCase()+c.slice(1)}
     </button>`).join('');
  buildProjects('all');

  // Tech stack
  if (D.stack && document.getElementById('stack-grid')) {
    document.getElementById('stack-grid').innerHTML = D.stack.map((cat,i) =>
      `<div class="stack-card reveal rd${i+1}">
         <div class="stack-card-title">${cat.category}</div>
         <div class="stack-items">
           ${cat.items.map(it =>
             `<div class="stack-item">
                <i class="${it.icon}" style="color:${it.color||'var(--cyan)'}"></i>${it.name}
              </div>`).join('')}
         </div>
       </div>`).join('');
  }

  // Robotics cards
  document.getElementById('robotics-grid').innerHTML = D.robotics.map((r,i) =>
    `<div class="robot-card reveal rd${i+1}">
       <div class="robot-imgs">
         ${r.imgs.map(img =>
           `<img src="${img}" alt="${r.title}"
                onerror="this.style.minHeight='120px';this.style.background='var(--bg2)'">`
         ).join('')}
       </div>
       <div class="robot-body">
         <div class="robot-title">${r.title}</div>
         <div class="robot-desc">${r.desc}</div>
         <span class="robot-badge">${r.badge}</span>
       </div>
     </div>`).join('');

  // Creative videos
  document.getElementById('videos-grid').innerHTML = D.creative_videos.map((v,i) =>
    `<div class="video-item reveal rd${(i%4)+1}">
       <video controls src="${v.src}" preload="none"></video>
       <div class="video-label">${v.title}<small>${v.sub}</small></div>
     </div>`).join('');

  // Certificates
  document.getElementById('certs-grid').innerHTML = D.certificates.map((c,i) =>
    `<div class="cert-card reveal rd${(i%4)+1}" onclick="openLb('${c.img}')">
       <img src="${c.img}" alt="${c.label}"
            onerror="this.style.minHeight='140px';this.style.background='var(--bg2)'">
       <div class="cert-label">${c.label}<div class="cert-year">${c.year}</div></div>
     </div>`).join('');

  // Achievements
  document.getElementById('achievements-grid').innerHTML = D.achievements.map((a,i) =>
    `<div class="achieve-card reveal rd${(i%4)+1}">
       <div class="achieve-icon"><i class="${a.icon}"></i></div>
       <div class="achieve-title">${a.title}</div>
       <div class="achieve-desc">${a.desc}</div>
       <div class="achieve-year">${a.year}</div>
     </div>`).join('');

  // Journey timeline
  buildTimeline();
}

/* ── 3. BUILD PROJECTS — filter tabs + cards ──────────────── */
function buildProjects(cat, btn) {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const list = cat === 'all' ? D.projects : D.projects.filter(p => p.category === cat);
  document.getElementById('projects-grid').innerHTML = list.map((p,i) =>
    `<div class="project-card ${p.featured?'featured':''} reveal rd${i+1}">
       <img class="card-thumb" src="${p.img}" alt="${p.title}"
            onerror="this.style.minHeight='160px';this.style.background='var(--bg2)'">
       <div class="card-body">
         ${p.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured Project</div>' : ''}
         <div class="card-title">${p.title}</div>
         <div class="card-desc">${p.desc}</div>
         <div class="card-tech">${p.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
         <div class="card-actions">
           <a class="live-btn" href="${p.live}" target="_blank">
             <i class="fas fa-arrow-up-right-from-square" style="font-size:10px;margin-right:4px;"></i>Live
           </a>
           ${p.repo ? `<a class="repo-btn" href="${p.repo}" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
           ${p.video ? `<button class="video-toggle" onclick="toggleVid(this)"><i class="fas fa-play"></i> Demo</button>` : ''}
         </div>
       </div>
       ${p.video ? `<div class="card-video-wrap"><video controls src="${p.video}" preload="none"></video></div>` : ''}
     </div>`).join('');
  setupObserver();
}

/* ── 4. BUILD TIMELINE — auto-switches on switch_date ─────── */
function buildTimeline() {
  const now = new Date();
  document.getElementById('timeline').innerHTML = D.journey.map((j,i) => {
    let title = j.title || '';
    let sub   = j.sub   || '';
    if (j.switch_date) {
      const sd = new Date(j.switch_date);
      title = now >= sd ? j.title_after  : j.title_before;
      sub   = now >= sd ? j.sub_after    : j.sub_before;
    }
    return `<div class="t-item reveal rd${i+1}">
      <div class="t-dot">${j.year}</div>
      <div class="t-content">
        <div class="t-year">${j.year}</div>
        <div class="t-title">${title}</div>
        <div class="t-sub">${sub}</div>
      </div>
    </div>`;
  }).join('');
}

/* ── 5. FETCH GITHUB — live repo cards from API ───────────── */
async function fetchGitHub() {
  const user = D.github_username || 'riiyansh-singh';
  const grid = document.getElementById('github-grid');
  const load = document.getElementById('github-loading');
  const langColors = {
    JavaScript:'#f7df1e', HTML:'#e44d26', CSS:'#264de4',
    Python:'#3572A5', TypeScript:'#2b7489', 'C++':'#f34b7d',
    Arduino:'#00979d', C:'#555'
  };
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error();
    const repos = await res.json();
    load.style.display = 'none';
    grid.innerHTML = repos.map(r =>
      `<div class="repo-card reveal">
         <div class="repo-name">${r.name}</div>
         <div class="repo-desc">${r.description || 'No description yet.'}</div>
         <div class="repo-meta">
           ${r.language ? `<span><span class="lang-dot" style="background:${langColors[r.language]||'#00e5ff'}"></span>${r.language}</span>` : ''}
           <span><i class="fas fa-star" style="color:#ffd700;font-size:11px;"></i> ${r.stargazers_count}</span>
           <span><i class="fas fa-code-fork" style="font-size:11px;"></i> ${r.forks_count}</span>
         </div>
         <a href="${r.html_url}" target="_blank" class="repo-link">
           <i class="fab fa-github"></i> View Repo
         </a>
       </div>`).join('');
    setupObserver();
  } catch(e) {
    load.innerHTML = `<p style="color:var(--muted)">Could not load repos.
      <a href="https://github.com/${user}" target="_blank" style="color:var(--cyan)">View on GitHub →</a></p>`;
  }
}

/* ── 6. CURSOR ────────────────────────────────────────────── */
const cur = document.getElementById('cursor');
const crg = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});
(function tick(){
  rx += (mx-rx)*.12; ry += (my-ry)*.12;
  crg.style.left=rx+'px'; crg.style.top=ry+'px';
  requestAnimationFrame(tick);
})();
document.addEventListener('mouseover', e => {
  const scale = e.target.closest('a,button') ? '2.5' : '1';
  cur.style.transform  = `translate(-50%,-50%) scale(${scale})`;
  crg.style.transform  = `translate(-50%,-50%) scale(${e.target.closest('a,button')?'1.5':'1'})`;
});

/* ── 7. SCROLL — progress bar + nav + back-to-top ─────────── */
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  document.getElementById('progress-bar').style.width =
    (scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
  document.getElementById('btt').classList.toggle('show', scrollY > 400);
});

/* ── 8. SCROLL REVEAL + SKILL BARS + COUNTERS ─────────────── */
function setupObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.width + '%');
        e.target.querySelectorAll('[data-target]').forEach(animCounter);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

function animCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(t);
  }, 35);
}

/* ── 9. TYPING ANIMATION ──────────────────────────────────── */
const phrases = [
  'Web Developer.', 'Freelancer on Fiverr.',
  'Arduino & Robotics Builder.', 'JavaScript Developer.',
  'Video Editor & Musician.', 'Football Player 🥅.'
];
let pi=0, ci=0, del=false;
function startTyping() {
  const el = document.getElementById('typing-text');
  function tick() {
    const p = phrases[pi];
    if (!del) {
      el.textContent = p.slice(0, ++ci);
      if (ci === p.length) { del=true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = p.slice(0, --ci);
      if (ci === 0) { del=false; pi=(pi+1)%phrases.length; }
    }
    setTimeout(tick, del ? 40 : 70);
  }
  tick();
}

/* ── 10. LIGHTBOX — certificate zoom ──────────────────────── */
function openLb(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ── 11. VIDEO TOGGLE — expand/collapse demo video ────────── */
function toggleVid(btn) {
  const wrap = btn.closest('.card-body').nextElementSibling;
  const open = wrap.classList.toggle('open');
  btn.innerHTML = open ? '<i class="fas fa-times"></i> Close' : '<i class="fas fa-play"></i> Demo';
  if (!open) wrap.querySelector('video').pause();
}

/* ── 12. COPY EMAIL ───────────────────────────────────────── */
function copyEmail() {
  navigator.clipboard.writeText(D.email || 'singhriyansh2006@gmail.com').then(() => {
    const b = document.querySelector('.copy-btn');
    b.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => b.innerHTML = '<i class="fas fa-copy"></i>', 2000);
  });
}

/* ── 13. CONTACT FORM — opens mailto ──────────────────────── */
function sendForm() {
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const sub   = document.getElementById('cf-sub').value.trim() || 'Portfolio Contact';
  const msg   = document.getElementById('cf-msg').value.trim();
  if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
  window.location.href = `mailto:${D.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent('From: '+name+' ('+email+')\n\n'+msg)}`;
  const el = document.getElementById('form-msg');
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}

/* ── 14. FALLBACK DATA — used if data.json fails to load ──── */
function fallback() {
  return {
    name:"Riyansh Singh", dob:"2007-08-29",
    tagline:"Developer & Creative Builder",
    location:"Agra, India", email:"singhriyansh2006@gmail.com",
    github_username:"riiyansh-singh", resume:"resume.pdf",
    bio:["Building real-world skills in <b>web development, robotics, and creative tech</b>."],
    socials:{github:"https://github.com/riiyansh-singh",linkedin:"https://www.linkedin.com/in/riyansh-singh-839817385",instagram:"https://www.instagram.com/riiiyanshh.3"},
    skills:[{name:"HTML & CSS",level:85},{name:"JavaScript",level:70},{name:"Arduino",level:75}],
    tags:["Arduino","Web Dev","JavaScript","Robotics","Video Editing","Creative Tech","Guitar"],
    stack:[],
    projects:[
      {id:"slice",title:"Slice Frenzy",desc:"Fruit-slicing game built with vanilla JS and Canvas API.",img:"images/slice-frenzy.png",video:"videos/Fruit.mp4",live:"https://riiyansh-singh.github.io/slice-frenzy/",repo:"https://github.com/riiyansh-singh/slice-frenzy",category:"web",tags:["JavaScript","Canvas"],featured:true},
      {id:"turf",title:"Turf Tournament",desc:"Sports tournament website UI.",img:"images/turf-project.png",video:"videos/turf-demo.mp4",live:"https://onlineprojects-ui.github.io/The-Turf-Tournament-/index.html",repo:"",category:"web",tags:["HTML","CSS","JS"],featured:false},
      {id:"funhub",title:"FunHub",desc:"Creative web UI experiments.",img:"images/funhub-project.png",video:"videos/funhub-demo.mp4",live:"https://riiyansh-singh.github.io/FunHub/",repo:"",category:"web",tags:["HTML","CSS","JS"],featured:false}
    ],
    robotics:[
      {title:"Sensor-Based Motor Car",desc:"Arduino solo project, proximity sensors, autonomous obstacle avoidance.",imgs:["images/robot-car.jpg","images/robot-car1.jpg"],badge:"Arduino · Solo"},
      {title:"Robotic Arm",desc:"Multi-joint servo motor movement.",imgs:["images/robot-hand.jpg","images/robot-hand1.jpg"],badge:"Arduino · Team"}
    ],
    creative_videos:[
      {src:"videos/guitar.mp4",title:"Guitar Practice",sub:"Session 1"},
      {src:"videos/guitar2.mp4",title:"Guitar Practice",sub:"Session 2"},
      {src:"videos/singing.mp4",title:"Singing Clip",sub:"Vocals"},
      {src:"videos/shot-1.mp4",title:"Cinematic Shot",sub:"Story 1"},
      {src:"videos/shot-2.mp4",title:"Cinematic Shot",sub:"Story 2"}
    ],
    certificates:[
      {img:"images/cert-infosys-ai.jpeg",label:"Infosys AI",year:"2025"},
      {img:"images/cert-infosys-generative.jpeg",label:"Generative AI",year:"2025"},
      {img:"images/cert-launchpad.jpeg",label:"Launchpad",year:"2025"},
      {img:"images/cert-robotics-achievement.jpeg",label:"Robotics Achievement",year:"2025"},
      {img:"images/cert-robotics-participation.jpeg",label:"Robotics Participation",year:"2025"}
    ],
    achievements:[
      {icon:"fas fa-trophy",title:"National Football Camp",desc:"Selected as goalkeeper & left defender.",year:"2024"},
      {icon:"fas fa-robot",title:"Robotics Build Award",desc:"Sensor-based motor car project.",year:"2025"},
      {icon:"fas fa-certificate",title:"Infosys AI Cert",desc:"Completed AI & Generative AI courses.",year:"2025"},
      {icon:"fas fa-code",title:"3 Live Projects",desc:"All deployed and publicly accessible.",year:"2025"}
    ],
    journey:[
      {year:"2024",title:"High School Completed",sub:"Academic foundation laid."},
      {year:"2025",title:"Robotics & Web Dev",sub:"Builds, projects & certifications."},
      {year:"2026",title_before:"Secondary School (PCM) Ongoing",title_after:"Secondary School (PCM) Completed",sub_before:"Pushing forward every day.",sub_after:"Milestone reached.",switch_date:"2026-08-01"},
      {year:"NEXT",title_before:"B.Tech Engineering (Planned)",title_after:"B.Tech Engineering (CS) — Started",sub_before:"The chapter I'm working toward.",sub_after:"CS engineer in the making.",switch_date:"2026-08-01"}
    ]
  };
}

/* ── KICK OFF ─────────────────────────────────────────────── */
init();
