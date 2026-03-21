document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    // Navbar Scroll logic
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('backdrop-blur-xl', 'bg-black/80', 'border-b', 'border-white/5');
        } else {
            navbar.classList.remove('backdrop-blur-xl', 'bg-black/80', 'border-b', 'border-white/5');
        }
    });

    // AUTO-TIMELINE LOGIC
    const timelineData = [
        { year: "2024", task: "High School Graduation", date: "2024-01-01" },
        { year: "2025", task: "Web Development Learning", date: "2025-01-01" },
        { year: "2026", task: "Secondary PCM Schooling", date: "2026-08-01" }, // August 2026 cutoff
        { year: "2027", task: "B.Tech Engineering", date: "2027-08-01" }
    ];

    const container = document.getElementById('timeline-container');
    const now = new Date();

    timelineData.forEach((item, index) => {
        const targetDate = new Date(item.date);
        let status = "Next";
        let style = "border-white/5 bg-zinc-900/30 opacity-50";

        if (now >= targetDate) {
            // Check if this is the currently active stage
            const nextItem = timelineData[index + 1];
            if (!nextItem || now < new Date(nextItem.date)) {
                status = "Active";
                style = "border-cyan-500 bg-cyan-500/10 active-pulse scale-105 z-10";
            } else {
                status = "Done";
                style = "border-green-500/20 bg-green-500/5 text-green-500/80";
            }
        }

        const card = `
            <div class="timeline-card p-6 rounded-[2rem] border ${style}">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-xl font-black italic opacity-30">${item.year}</span>
                    <span class="text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${status === 'Active' ? 'bg-cyan-400 text-black' : ''}">${status}</span>
                </div>
                <h4 class="font-bold text-sm uppercase italic tracking-tight">${item.task}</h4>
            </div>
        `;
        container.innerHTML += card;
    });
});

