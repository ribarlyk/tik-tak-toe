class ViewController {
    constructor() {
        window.addEventListener("hashchange", this.hashChangeHandler);
        window.addEventListener("load", this.hashChangeHandler); 
        this.petManager = new PetManager();
        this.adoptedManager = new AdoptedManager();
        this.donationManager = new DonationManager();
    }

    hashChangeHandler = () => {
        let hash = location.hash.slice(1) || "home"; 

        let views = ["home", "adopted", "donate"]; 

        views.forEach((view) => {
            let elem = document.getElementById(view);
            if (view === hash) {
                elem.style.display = "block";
            } else {
                elem.style.display = "none";
            }
        });

        switch (
            hash 
        ) {
            case "home":
                this.renderPets();
                break;
            case "adopted":
                this.renderAdoptedPets();
                break;
            case "donate":
                this.renderDonations();
                break;
        }
    };

    renderPet = (lists, container) => {
        container.innerHTML = "";

        lists.forEach((pet) => {
            let card = createElement("div");
            card.classList.add("card");

            let img = createElement("img", pet.image);
            img.width = 200;
            img.height = 200;

            let name = createElement("p", pet.name);
            name.classList.add("name");

            let type = createElement("p", pet.type);
            type.classList.add("type");

            let breed = createElement("p", pet.breed);
            type.classList.add("breed");

            let gender = createElement("p", pet.gender);
            gender.classList.add("gender");

            let age = createElement("p", pet.age);
            age.classList.add("age");

            let sum = createElement(
                "div",
                `Needed Sum : ${pet.currentSum}/${pet.needeSum}`
            );
            sum.classList.add("sum");

            let adoptBtn = createElement("button", "ADOPT");
            adoptBtn.addEventListener("click", (e) => {
                let date = new Date().toLocaleDateString();
                let hour = new Date().toLocaleTimeString();
                let dates = `${date} ${hour}`;
                let obj = {
                    image: pet.image,
                    name: pet.name,
                    family: pet.type,
                    bread: pet.breed,
                    gender: pet.gender,
                    age: pet.age,
                    dates,
                };
                this.adoptedManager.addToList(obj);
                console.log(this.adoptedManager.adoptedList, pet.image);
                this.petManager.removePet(this.petManager.petList, pet.name);
                this.renderPets(this.petManager.petList);
            });
            adoptBtn.classList.add("adoptBtn");
            let donateBtn = createElement("button", "DONATE");
            donateBtn.classList.add("donateBtn");
            donateBtn.addEventListener("click", (e) => {
                e.preventDefault();
                location.hash = "donate";
                let petName = document.querySelector(".petName");
                petName.textContent = pet.name;
                let formName = document.querySelector("#formName");
                let formnSum = document.querySelector("#formSum");
                let formSum = formnSum.value;
                let date = new Date().toLocaleDateString();
                let hour = new Date().toLocaleTimeString();
                let dates = `${date} ${hour}`;
                // console.log(Number(pet.currentSum) + Number(formSum))
                // console.log(Number(pet.needeSum))
                let currentSumTotal = Number(pet.currentSum) + Number(formSum);
                let neederSum = Number(pet.needeSum);
                
                let sum = 0;

                if (currentSumTotal > neederSum) {
                    sum = Number(neederSum) - Number(currentSumTotal);
                    console.log(sum);
                } else {
                    sum = Number(formSum);
                    console.log(sum);
                }

                this.donationManager.addToDonationList(
                    dates,
                    pet.name,
                    sum
                );
            });
            let result = Number(pet.needeSum) - Number(pet.currentSum);

            if (result === 0) {
                donateBtn.style.display = "none";
            } else {
                donateBtn.style.display = "";
            }

            card.append(
                img,
                name,
                type,
                breed,
                age,
                gender,
                sum,
                adoptBtn,
                donateBtn
            );

            container.appendChild(card);
        });
    };
    renderPets = () => {
        let selectSearch = document.querySelector("#select");
        selectSearch.innerHTML = "";
        this.petManager.petTypes.forEach((pet) => {
            let option = createElement("option", pet);
            option.value = pet;
            selectSearch.appendChild(option);
        });

        selectSearch.addEventListener("change", (e) => {
            let result = this.petManager.searchByType(e.target.value);
            this.renderPet(result, container);
        });

        let inputSearch = document.querySelector("#search");
        inputSearch.addEventListener("input", (e) => {
            let result = this.petManager.search(e.target.value);
            this.renderPet(result, container);
        });
        let container = document.querySelector(".homeContainer");
        this.renderPet(this.petManager.petList, container);
    };

    renderAdoptedPet = (lists, container) => {
        container.innerHTML = "";

        lists.forEach((pet) => {
            let card = createElement("div");
            card.classList.add("card");

            let img = createElement("img", pet.image);
            img.width = 200;
            img.height = 200;

            let name = createElement("p", pet.name);
            name.classList.add("name");

            let type = createElement("p", pet.type);
            type.classList.add("type");

            let breed = createElement("p", pet.breed);
            type.classList.add("breed");

            let gender = createElement("p", pet.gender);
            gender.classList.add("gender");

            let age = createElement("p", pet.age);
            age.classList.add("age");

            let date = createElement("div", pet.dates);
            date.classList.add("date");

            let leaveBtn = createElement("button", "LEAVE");
            leaveBtn.classList.add("leaveBtn");
            leaveBtn.addEventListener("click", () => {});
            card.append(img, name, type, breed, age, gender, date, leaveBtn);

            container.appendChild(card);
        });
    };
    renderAdoptedPets = () => {
        let container = document.querySelector(".adoptedContainer");
        console.log(this.adoptedManager.adoptedList, container);
        this.renderAdoptedPet(this.adoptedManager.adoptedList, container);
    };

    renderDonations = () => {
        let btn = document.querySelector("#submitBtn");
        btn.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            console.log(this.donationManager.donationHistory[0].sum);
            let tr = createElement("tr");
            let tdDate = createElement(
                "td",
                this.donationManager.donationHistory[0].date
            );
            let tdName = createElement(
                "td",
                this.donationManager.donationHistory[0].name
            );
            let tdSum = createElement(
                "td",
                this.donationManager.donationHistory[0].sum
            );
            tr.append(tdDate, tdName, tdSum);
            tbody.appendChild(tr);
            this.donationManager.donationHistory = [];
            document.querySelector("#form").reset();
        });
    };
}

let controller = new ViewController();
