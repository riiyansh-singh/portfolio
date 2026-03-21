console.log("Portfolio Loaded Successfully 🚀");

// simple smooth scroll (optional future base)
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if(link.hash){
      e.preventDefault();
      document.querySelector(link.hash)?.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
