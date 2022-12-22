document.querySelector("section#about img").addEventListener("click", () => {
	window.location.href = "/about";
});

document.querySelectorAll(".project .description").forEach(projectDescription => {
	projectDescription.innerHTML = projectDescription.textContent;
});