let lawyerList = [];
let lawyerListIndex = 0;
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
    lawyerList = json.lawyers;
};

const submitForm = async (event) => {
    event.preventDefault();
    const city = document.getElementById("form-city").value;
    const caseType = document.getElementById("form-case-type").value;
    const minPrice = Number(document.getElementById("price-min-input").value);
    const maxPrice = Number(document.getElementById("price-max-input").value);
    const languages = Array.from(selectedLanguages);
    const description = document.getElementById("form-description").value;
    const ada = document.getElementById("ada").checked;  
    await findLawyer(city, caseType, minPrice, maxPrice, languages, description, ada);
    window.location.href = "results.html";
}

const form = document.getElementById("search-form");
if (form) {
    form.addEventListener("submit", submitForm);
}

const renderLawyer = () => {
    const currentLawyer = lawyerList[lawyerListIndex];
    const profile = document.getElementById("profile-card");
    profile.getElementById("profile-name").textContent = currentLawyer.name;
    profile.getElementById("profile-bio").textContent = currentLawyer.description;
    profile.getElementById("profile-mail").textContent = currentLawyer.email;
    profile.getElementById("profile-mail").href = `mailto:${currentLawyer.email}`;
    profile.getElementById("profile-phone").textContent = currentLawyer.phone;
    profile.getElementById("profile-phone").href = `tel:${currentLawyer.phone}`;
    profile.getElementById("profile-website").textContent = currentLawyer.website;
    profile.getElementById("profile-website").href = currentLawyer.website;
    profile.getElementById("profile-rate").textContent = `$${currentLawyer.cost}`;
    profile.getElementById("profile-location").textContent = `${currentLawyer.location}, TX`;
    profile.getElementById("profile-experience").textContent = `${currentLawyer.experience}`;
}

const nextLawyer = () => {
    lawyerListIndex = (lawyerListIndex + 1) % lawyerList.length;
    renderLawyer();
}

const previousLawyer = () => {
    lawyerListIndex = (lawyerListIndex - 1 + lawyerList.length) % lawyerList.length;
    renderLawyer();
}

document.getElementById("next-button").addEventListener("click", nextLawyer);
document.getElementById("previous-button").addEventListener("click", previousLawyer);
