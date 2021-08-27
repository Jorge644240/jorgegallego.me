document.querySelector(".expand-menu").addEventListener("click", () => {
    const menu = document.querySelector("nav .links");
    if (menu.style.display == "none" || !menu.style.display) menu.style.display = "block";
    else menu.style.display = "none";
});

window.onresize = () => {
    const menu = document.querySelector("nav .links");
    const fa = document.querySelectorAll(".icons i");
    if (window.innerWidth <= 700) {
        menu.style.display = "none";
        for (let icon of fa) {
            icon.classList.replace("fa-5x", "fa-4x");
        }
        document.querySelector("#education .card img").width = document.querySelector("#education .card img").height = "120";
    }
    else {
        menu.style.display = "block";
        for (let icon of fa) {
            icon.classList.replace("fa-4x", "fa-5x");
        }
        document.querySelector("#education .card img").width = document.querySelector("#education .card img").height = "200";
    }
}

document.querySelector(".bi-arrow-down-short").addEventListener("click", () => {
    document.querySelector("nav .links .link:first-of-type").click();
});

for (let summary of document.querySelectorAll(".accordion .summary")) {
    summary.addEventListener("click", () => {
        if (document.querySelector(".summary.active") && document.querySelector(".summary.active") !== summary) document.querySelector(".summary.active").click();
        summary.classList.toggle("active");
        if (summary.children[1].classList.contains("bi-chevron-down")) {
            summary.children[1].classList.replace("bi-chevron-down", "bi-chevron-up");
        } else if (summary.children[1].classList.contains("bi-chevron-up")) {
            summary.children[1].classList.replace("bi-chevron-up", "bi-chevron-down");
        }
        summary.nextElementSibling.children[0].classList.toggle("show");
    });
}

function expand(id) {
    document.querySelector(`.accordion#${id} .summary`).click();
}

window.onload = () => {
    const fa = document.querySelectorAll(".icons i");
    if (window.innerWidth <= 700) {
        for (let icon of fa) {
            icon.classList.replace("fa-5x", "fa-4x");
        }
        document.querySelector("#education .card img").width = document.querySelector("#education .card img").height = "120";
    }
    const index = document.querySelector("#contact form select").selectedIndex;
    document.querySelector("#contact form textarea").placeholder = messages[index];
}

const messages = {
    0: "I'm interested in your Front End development service. I am looking for a portfolio/business/ecommerce website and want you to implement the code for it.",
    1: "I'm interested in your Back End development service. I am looking for a blog/ecommerce website and would like you to create the website's logic.",
    2: "I'm interested in your Full Stack development service. I am looking for a portfolio/business/ecommerce/blog website and would like you to create it."
}

document.querySelector("#contact form select").addEventListener("change", () => {
    const index = document.querySelector("#contact form select").selectedIndex;
    document.querySelector("#contact form textarea").placeholder = messages[index];
});

document.querySelector("#portfolio > button").addEventListener("click", () => window.location.href = "/portfolio");