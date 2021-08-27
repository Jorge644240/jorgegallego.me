if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");

function lightMode() {
    document.body.classList.remove("dark");
    document.querySelector(".color-theme i").classList.replace("bi-moon-stars-fill", "bi-sun-fill");
    document.querySelector(".color-theme i").title = "Switch to Dark Mode";
    document.querySelector(".color-theme").classList.replace("dark", "light");
    localStorage.theme = "light";
};

function darkMode() {
    document.body.classList.add("dark");
    document.querySelector(".color-theme i").classList.replace("bi-sun-fill", "bi-moon-stars-fill");
    document.querySelector(".color-theme i").title = "Switch to Light Mode";
    document.querySelector(".color-theme").classList.replace("light", "dark");
    localStorage.theme = "dark";
};

function changeColorTheme() {
    if (localStorage.getItem("theme") === "light") {
        darkMode();
    } else if (localStorage.getItem("theme") === "dark") {
        lightMode();
    }
}

if (localStorage.getItem("theme")==="dark") darkMode();

document.querySelectorAll("img").forEach((image) => image.loading = "lazy");