const REPO_BASE = "https://raw.githubusercontent.com/riiyansh-singh/portfolio/main";

const PORTFOLIO_DATA = {
    robotics: [
        { title: "Sensor Motor Car", desc: "Arduino logic & sensor integration.", image: "images/robot-car.jpg", tech: "Hardware" },
        { title: "Robotic Hand", desc: "Mechanical simulation using servos.", image: "images/robot-hand.jpg", tech: "Mechanics" }
    ],
    projects: [
        { title: "Slice Frenzy", desc: "Interactive JS game.", image: "images/profile2.png", link: "https://riiyansh-singh.github.io/slice-frenzy/" },
        { title: "Turf Tournament", desc: "Sports management UI.", image: "images/turf-project.png", link: "https://onlineprojects-ui.github.io/The-Turf-Tournament-/index.html" },
        { title: "FunHub", desc: "Creative web app.", image: "images/funhub-project.png", link: "https://riiyansh-singh.github.io/FunHub/" }
    ],
    videos: [
        { title: "Football", file: "football.mp4", icon: "trophy" },
        { title: "Guitar", file: "music", icon: "music" },
        { title: "FunHub", file: "funhub-demo.mp4", icon: "code" },
        { title: "Turf", file: "turf-demo.mp4", icon: "terminal" }
    ],
    certificates: [
        { title: "Infosys AI", image: "images/cert-infosys-ai.jpeg" },
        { title: "Generative AI", image: "images/cert-infosys-generative.jpeg" },
        { title: "Launchpad", image: "images/cert-launchpad.jpeg" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Render Robotics
    const roboticsContainer = document.getElementById('robotics-grid');
    PORTFOLIO_DATA.robotics.forEach(bot => {
        roboticsContainer.innerHTML += `
            <div class="group bg-zinc-900/40 border border-white/5 rounded-[3.5rem] overflow-hidden p-5 transition-all hover:border-cyan-500/50">
                <div class="aspect-[16/10] rounded-[2.8rem] overflow-hidden bg-zinc-950 mb-8 border border-white/5">
                    <img src="${bot.image}" class="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
                </div>
                <div class="px-4 pb-4">
                    <h4 class="text-3xl font-black italic uppercase mb-3">${bot.title}</h4>
                    <span class="text-[9px] font-black uppercase text-zinc-400 px-3 py-1 bg-white/5 rounded-lg border border-white/5">${bot.tech}</span>
                </div>
            </div>`;
    });

    // 2. Render Videos
    const videoContainer = document.getElementById('video-vault');
    PORTFOLIO_DATA.videos.forEach(vid => {
        videoContainer.innerHTML += `
            <div class="group relative bg-zinc-900/50 rounded-3xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all">
                <div class="flex items-center justify-between mb-4">
                    <div class="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl"><i data-lucide="${vid.icon}"></i></div>
                    <a href="videos/${vid.file}" target="_blank" class="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black rounded-full"><i data-lucide="play" size="12"></i></a>
                </div>
                <h4 class="text-lg font-black italic uppercase">${vid.title}</h4>
            </div>`;
    });

    // 3. Render Projects
    const projectsContainer = document.getElementById('projects-grid');
    PORTFOLIO_DATA.projects.forEach(p => {
        projectsContainer.innerHTML += `
            <div class="group bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden p-4 hover:border-white/20 transition-all">
                <div class="aspect-video rounded-[2.2rem] overflow-hidden bg-black mb-6">
                    <img src="${p.image}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700">
                </div>
                <div class="px-4 pb-4 flex justify-between items-center">
                    <h3 class="text-2xl font-black italic uppercase tracking-tighter">${p.title}</h3>
                    <a href="${p.link}" target="_blank" class="p-3 bg-white text-black rounded-xl"><i data-lucide="external-link" size="16"></i></a>
                </div>
            </div>`;
    });

    // 4. Render Certificates Slider
    const certContainer = document.getElementById('cert-slider');
    PORTFOLIO_DATA.certificates.forEach(cert => {
        certContainer.innerHTML += `
            <div class="min-w-[300px] md:min-w-[400px] snap-center bg-zinc-900/50 p-4 border border-white/5 rounded-[3rem] group">
                <div class="aspect-[1.4/1] rounded-[2.2rem] overflow-hidden bg-black mb-6 flex items-center justify-center p-4">
                    <img src="${cert.image}" class="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-700">
                </div>
                <h4 class="text-xl font-bold uppercase italic px-4">${cert.title}</h4>
            </div>`;
    });

    // 5. Automatic Timeline Logic
    const timelineContainer = document.getElementById('timeline-container');
    const now = new Date();
    const timeline = [
        { year: "2024", task: "High School Graduation", date: "2024-01-01" },
        { year: "2025", task: "Web & Freelance", date: "2025-01-01" },
        { year: "2026", task: "Secondary PCM Schooling", date: "2026-08-01" },
        { year: "2027", task: "B.Tech Engineering", date: "2027-08-01" }
    ];

    timeline.forEach((item, idx) => {
        const targetDate = new Date(item.date);
        let status = "Next";
        let style = "border-white/5 bg-zinc-900/30";

        if (now >= targetDate) {
            const nextItem = timeline[idx + 1];
            if (!nextItem || now < new Date(nextItem.date)) {
                status = "Active";
                style = "border-cyan-500 bg-cyan-500/10 animate-pulse-cyan";
            } else {
                status = "Done";
                style = "border-green-500/20 bg-green-500/5 text-green-500";
            }
        }

        timelineContainer.innerHTML += `
            <div class="p-6 rounded-[2rem] border transition-all duration-500 ${style}">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xl font-black italic opacity-20">${item.year}</span>
                    <span class="text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${status === 'Active' ? 'bg-cyan-400 text-black' : ''}">${status}</span>
                </div>
                <h4 class="font-bold text-sm uppercase italic tracking-tight">${item.task}</h4>
            </div>`;
    });

    // 6. Slider Controls
    const slider = document.getElementById('cert-slider');
    document.getElementById('slide-left').onclick = () => slider.scrollBy({ left: -400, behavior: 'smooth' });
    document.getElementById('slide-right').onclick = () => slider.scrollBy({ left: 400, behavior: 'smooth' });

    lucide.createIcons(); // Re-run for dynamic icons
});

