let lawyerList = [];
let lawyerListIndex = 0;

const findLawyer = async (city, caseType, minPrice, maxPrice, languages, description, ada) => {
    fetch("http://localhost:5678/webhook/findlawyer", {
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
    })
        .then(response => response.json())
        .then(json => lawyerList = json.lawyers);
};

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
