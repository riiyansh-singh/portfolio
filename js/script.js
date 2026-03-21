const REPO_BASE = "https://raw.githubusercontent.com/riiyansh-singh/portfolio/main";

const DATA = {
    robotics: [
        { title: "Sensor-Based Motor Car", desc: "Practical Arduino project featuring motor logic.", tech: ["Arduino", "Hardware"], image: "images/robot-car.jpg" },
        { title: "Robotic Hand Prototype", desc: "Mechanical simulation using servos.", tech: ["Servos", "Mechanics"], image: "images/robot-hand.jpg" }
    ],
    projects: [
        { title: "Slice Frenzy", cat: "Web Game", desc: "Fast-paced interactive game.", link: "https://riiyansh-singh.github.io/slice-frenzy/", image: "images/profile2.png" },
        { title: "Turf Tournament", cat: "Web App", desc: "Sports management UI tracking.", link: "https://onlineprojects-ui.github.io/The-Turf-Tournament-/index.html", image: "images/turf-project.png" },
        { title: "FunHub", cat: "Creative Web", desc: "Interactive modern UI components.", link: "https://riiyansh-singh.github.io/FunHub/", image: "images/funhub-project.png" }
    ],
    vault: [
        { title: "Infosys AI", issuer: "Infosys", image: "images/cert-infosys-ai.jpeg" },
        { title: "Generative AI", issuer: "Infosys", image: "images/cert-infosys-generative.jpeg" },
        { title: "Launchpad", issuer: "Credential", image: "images/cert-launchpad.jpeg" },
        { title: "Robotics Achievement", issuer: "STEM", image: "images/cert-robotics-achievement.jpeg" }
    ],
    videos: [
        { title: "Football Skills", file: "football.mp4", icon: "trophy" },
        { title: "Guitar Session", file: "guitar.mp4", icon: "music" },
        { title: "FunHub Demo", file: "funhub-demo.mp4", icon: "code" },
        { title: "Turf Demo", file: "turf-demo.mp4", icon: "terminal" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Scroll Navbar Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) nav.classList.add('backdrop-blur-xl', 'bg-black/80', 'border-b', 'border-white/5');
        else nav.classList.remove('backdrop-blur-xl', 'bg-black/80', 'border-b', 'border-white/5');
    });

    // 1. Robotics
    const robContainer = document.getElementById('robotics-grid');
    DATA.robotics.forEach(bot => {
        robContainer.innerHTML += `
            <div class="group bg-zinc-900/40 border border-white/5 rounded-[3.5rem] overflow-hidden p-5 transition-all hover:border-cyan-500/50">
                <div class="aspect-[16/10] rounded-[2.8rem] overflow-hidden bg-zinc-950 mb-8 border border-white/5">
                    <img src="${bot.image}" class="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
                </div>
                <div class="px-4 pb-4">
                    <h4 class="text-3xl font-black italic uppercase mb-3">${bot.title}</h4>
                    <p class="text-zinc-500 text-sm mb-6">${bot.desc}</p>
                    <div class="flex gap-2">
                        ${bot.tech.map(t => `<span class="text-[9px] font-black uppercase text-zinc-400 px-3 py-1 bg-white/5 rounded-lg border border-white/5">${t}</span>`).join('')}
                    </div>
                </div>
            </div>`;
    });

    // 2. Videos
    const vidContainer = document.getElementById('video-vault');
    DATA.videos.forEach(vid => {
        vidContainer.innerHTML += `
            <div class="group relative bg-zinc-900/50 rounded-3xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all">
                <div class="flex items-center justify-between mb-4">
                    <div class="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl"><i data-lucide="${vid.icon}"></i></div>
                    <a href="videos/${vid.file}" target="_blank" class="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black rounded-full"><i data-lucide="play" size="12" fill="currentColor"></i></a>
                </div>
                <h4 class="text-lg font-black italic uppercase">${vid.title}</h4>
                <p class="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">/${vid.file}</p>
            </div>`;
    });

    // 3. Projects
    const projContainer = document.getElementById('projects-grid');
    DATA.projects.forEach(p => {
        projContainer.innerHTML += `
            <div class="group bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden p-4 hover:border-white/20 transition-all">
                <div class="aspect-video rounded-[2.2rem] overflow-hidden bg-black mb-6">
                    <img src="${p.image}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700">
                </div>
                <div class="px-4 pb-4">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-2xl font-black italic uppercase tracking-tighter">${p.title}</h3>
                        <a href="${p.link}" target="_blank" class="p-3 bg-white text-black rounded-xl hover:bg-cyan-400"><i data-lucide="external-link" size="16"></i></a>
                    </div>
                    <p class="text-zinc-500 text-xs uppercase font-bold tracking-tight">${p.desc}</p>
                </div>
            </div>`;
    });

    // 4. Timeline Logic (PERFECTED)
    const timeContainer = document.getElementById('timeline-container');
    const now = new Date();
    const cutoff = new Date('2026-08-01');
    const isPostAug = now >= cutoff;

    const timeline = [
        { year: "2024", task: "High School Graduation", status: "Done" },
        { year: "2026", task: "Secondary PCM Schooling", status: isPostAug ? "Done" : "Active" },
        { year: "2027", task: "B.Tech Engineering", status: isPostAug ? "Active" : "Next" }
    ];

    timeline.forEach(item => {
        const style = item.status === 'Done' ? 'border-green-500/20 bg-green-500/5 text-green-500' :
                      item.status === 'Active' ? 'border-cyan-500 bg-cyan-500/10 animate-active' :
                      'border-white/5 bg-zinc-900/30 text-zinc-500';
        
        timeContainer.innerHTML += `
            <div class="p-6 rounded-[2rem] border transition-all duration-500 ${style}">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xl font-black italic opacity-20">${item.year}</span>
                    <span class="text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${item.status === 'Active' ? 'bg-cyan-400 text-black' : ''}">${item.status}</span>
                </div>
                <h4 class="font-bold text-sm uppercase italic tracking-tight">${item.task}</h4>
            </div>`;
    });

    // 5. Vault Slider
    const vaultContainer = document.getElementById('vault-slider');
    DATA.vault.forEach(cert => {
        vaultContainer.innerHTML += `
            <div class="min-w-[280px] md:min-w-[380px] snap-center bg-zinc-900/50 p-4 border border-white/5 rounded-[3rem] group">
                <div class="aspect-[1.4/1] rounded-[2.2rem] overflow-hidden bg-black mb-6 flex items-center justify-center p-4">
                    <img src="${cert.image}" class="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-all">
                </div>
                <div class="px-4">
                    <span class="text-[10px] font-black text-cyan-500 uppercase tracking-widest">${cert.issuer}</span>
                    <h4 class="text-xl font-bold uppercase italic">${cert.title}</h4>
                </div>
            </div>`;
    });

    // Slider Actions
    document.getElementById('nextBtn').onclick = () => vaultContainer.scrollBy({ left: 350, behavior: 'smooth' });
    document.getElementById('prevBtn').onclick = () => vaultContainer.scrollBy({ left: -350, behavior: 'smooth' });

    lucide.createIcons();
});

