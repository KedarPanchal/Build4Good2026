console.log("Request.js loaded");

const findLawyer = async (city, caseType, minPrice, maxPrice, languages, description, ada) => {
    const response = await fetch("http://localhost:5678/webhook/findlawyer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            priceLow: minPrice,
            priceHigh: maxPrice,
            city: city,
            caseType: caseType,
            languages: languages,
            disabilityFocused: ada,
            description: description,
        }),
    });
    const json = await response.json();  
    console.log(json);
    sessionStorage.setItem("lawyerList", JSON.stringify(json.lawyers));
};

const submitForm = async (event) => {
    event.preventDefault();
    const city = document.getElementById("form-city").value;
    const caseType = document.getElementById("form-case-type").value;
    const minPrice = Number(document.getElementById("price-min-input").value);
    const maxPrice = Number(document.getElementById("price-max-input").value);
    const languages = ["English", ...Array.from(selectedLanguages)];
    const description = document.getElementById("form-description").value;
    const ada = document.getElementById("ada").checked;  

    document.getElementById("loading-overlay").classList.add("show");
    await findLawyer(city, caseType, minPrice, maxPrice, languages, description, ada);
    document.getElementById("loading-overlay").classList.remove("show");
    window.location.href = "results.html";
}

const form = document.getElementById("search-form");
if (form) {
    form.addEventListener("submit", submitForm);
}

const lawyerList = JSON.parse(sessionStorage.getItem("lawyerList")) || [];
console.log(lawyerList);
let lawyerListIndex = 0;

const hashLawyer = (lawyer) => {
    const hashString = `${lawyer.name}-${lawyer.email}-${lawyer.phone}`;
    let hash = 0;
    for (const char of hashString) {
        hash = (hash << 5) - hash + char.charCodeAt(0);
        hash |= 0;
    }
    return hash;
}

const mulberry32 = (seed) => {
    return (min, max) => {
        seed |= 0;
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        const r = ((t ^ t >>> 14) >>> 0) / 4294967296
        return Math.floor(r * (max - min + 1)) + min;
    }
}

const renderLawyer = () => {
    const currentLawyer = lawyerList[lawyerListIndex];
    const rand = mulberry32(hashLawyer(currentLawyer));

    document.getElementById("profile-name").textContent = currentLawyer.name;
    document.getElementById("profile-bio").textContent = currentLawyer.description;
    document.getElementById("profile-mail").textContent = currentLawyer.email;
    document.getElementById("profile-mail").href = `mailto:${currentLawyer.email}`;
    document.getElementById("profile-phone").textContent = currentLawyer.phone;
    document.getElementById("profile-phone").href = `tel:${currentLawyer.phone}`;
    document.getElementById("profile-website").textContent = currentLawyer.website;
    document.getElementById("profile-website").href = currentLawyer.website;
    document.getElementById("profile-rate").textContent = `$${currentLawyer.cost}`;
    document.getElementById("profile-total-cost").textContent = currentLawyer.cost * rand(10, 30);
    document.getElementById("profile-location").textContent = currentLawyer.location;
    document.getElementById("profile-win-rate").textContent = rand(60, 99);
    document.getElementById("profile-experience").textContent = `${currentLawyer.years_of_experience}`;
}

if (document.getElementById("profile-name")) {
    renderLawyer();
}

const nextLawyer = () => {
    lawyerListIndex = (lawyerListIndex + 1) % lawyerList.length;
    renderLawyer();
}

const previousLawyer = () => {
    lawyerListIndex = (lawyerListIndex - 1 + lawyerList.length) % lawyerList.length;
    renderLawyer();
}

const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
if (nextButton && previousButton) {
    document.getElementById("next-button").addEventListener("click", nextLawyer);
    document.getElementById("previous-button").addEventListener("click", previousLawyer);
}
