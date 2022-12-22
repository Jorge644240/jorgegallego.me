document.querySelectorAll("link[rel='preload']").forEach(preloadLink => {
	preloadLink.rel = "stylesheet";
	preloadLink.removeAttribute("as");
});

window.onload = () => {
	if (localStorage.getItem("mode") === "dark") document.body.classList.add("dark");
};

document.body.addEventListener("click", (event) => {
	if (event.detail !== 3) return false;
	if (localStorage.getItem("mode") === "dark") localStorage.setItem("mode", "light");
	else if (localStorage.getItem("mode") === "light" || !localStorage.getItem("mode")) localStorage.setItem("mode", "dark");
	document.body.classList.toggle("dark");
});

document.querySelector("nav button").addEventListener("click", () => {
	document.querySelector(".nav-wrapper").classList.toggle("active");
});