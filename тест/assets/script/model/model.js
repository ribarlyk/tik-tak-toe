class Pet {
    constructor(name, image, type, breed, age, gender, neededSum, currentSum) {
        this.image = image;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.needeSum = neededSum;
        this.currentSum = currentSum;
    }
}

class PetManager {
    constructor() {
        this.petList = DATA.map((pet) => {
            return new Pet(
                pet.name,
                pet.image,
                pet.type,
                pet.bread,
                pet.age,
                pet.sex,
                pet.neededAmount,
                pet.currentlyRisedAmount
            );
        });
        this.petTypes = this.generatepetTypes();
    }
    search = (name) => {
        return this.petList.filter((item) =>
            item.name.toLowerCase().includes(name.trim().toLowerCase())
        );
    };

    searchByType = (pet) => {
        return this.petList.filter((item) => item.type === pet);
    };

    generatepetTypes = () => {
        const result = [];

        this.petList.forEach((pet) => {
            if (!result.includes(pet.type)) {
                result.push(pet.type);
            }
        });
        return result;
    };

    removePet = (list, name) => {
        list.forEach((pet, i) => {
            if (pet.name === name) {
                list.splice(i, 1);
            }
        });
    };
}

class AdoptedPet {
    constructor(image, name, familiy, bread, gender, age, dates) {
        this.image = image;
        this.name = name;
        this.familiy = familiy;
        this.bread = bread;
        this.gender = gender;

        this.age = age;
        this.dates = dates;
    }
}

class AdoptedManager {
    adoptedList = [];
    constructor() {}

    addToList = (animal) => {
        this.adoptedList.push(
            new AdoptedPet(
                animal.image,
                animal.name,
                animal.family,
                animal.bread,
                animal.gender,
                animal.age,
                animal.dates
            )
        );
    };
}
class Donation {
    constructor(date, name, sum) {
        this.date = date;
        this.name = name;
        this.sum = sum;
    }
}

class DonationManager {
    constructor() {}
    donationHistory = [];
    addToDonationList = (date, name, sum=0) => {
        this.donationHistory.push(new Donation(date, name));
    };
}
