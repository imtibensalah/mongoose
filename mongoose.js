const mongoose = require('mongoose');
require('dotenv').config({path:".env"});
const uri = process.env.MONGO_URI ;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
//creation
  const Person = require('./person');
  const newPerson=new Person({
    name:'john',
    age:30,
    favoritefood:['burger','Pasta'],
  });
//save 

const savePerson = async()=>{
try{const savedPerson=await newPerson.save()  ;

    console.log('Nouvelle personne ajoutée ',savedPerson);
}
  catch(err) {
    console.error('Erreur lors de l\'ajout :', err);
  }

};
savePerson();


// Création de plusieurs personnes avec Model.create()
const createPeople = async () => {
    try {
        const people = await Person.create([
            { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
            { name: 'Slim', age: 35, favoriteFoods: ['Steak', 'Couscous'] },
            {name:'mahdi', age:33, favoritefoods:['burger','lasagne'] },
        ]);

        console.log('Personnes créées avec succès:', people);
    } catch (error) {
        console.error('Erreur lors de la création des personnes:', error);
    }
};
createPeople();




// Utilisation de Model.find() pour rechercher dans la base de données
const findPeople = async () => {
    try {
        const people = await Person.find({}); // Recherche toutes les personnes

        console.log('Personnes trouvées:', people);
    } catch (error) {
        console.error('Erreur lors de la recherche des personnes:', error);
    }
};

findPeople();

// Utilisation de la fonction pour rechercher une personne par son _id

const findPersonById = async (personId) => {
    try {
        const person = await Person.findById(personId);

        if (person) {
            console.log('Personne trouvée par ID:', person);
        } else {
            console.log('Aucune personne trouvée avec cet ID.');
        }
    } catch (error) {
        console.error('Erreur lors de la recherche par ID:', error);
    }
};

findPersonById();

const updatePerson = async (personId) => {
    try {
        // Rechercher la personne par son _id
        const person = await Person.findById(personId);

        if (!person) {
            console.log('Personne non trouvée.');
            return;
        }

        // Modifier les détails de la personne
        person.age = 25;
        person.favoriteFoods.push('Sushi');

        // Enregistrer les modifications
        const updatedPerson = await person.save();

        console.log('Personne mise à jour avec succès:', updatedPerson);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la personne:', error);
    }
};

updatePerson();

// Utilisation de la fonction pour mettre à jour une personne par son nom
const updatePersonByName = async (personName) => {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName }, // Critère de recherche : nom de la personne
            { age: 25 }, // Nouvelles valeurs à mettre à jour
            { new: true } // Option pour renvoyer le document mis à jour
        );

        if (updatedPerson) {
            console.log('Personne mise à jour avec succès:', updatedPerson);
        } else {
            console.log('Aucune personne trouvée avec ce nom.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la personne:', error);
    }
};

// Utilisation de la fonction pour supprimer une personne par son _id
updatePersonByName();
const removePersonById = async (personId) => {
    try {
        const removedPerson = await Person.findByIdAndRemove(personId);

        if (removedPerson) {
            console.log('Personne supprimée avec succès:', removedPerson);
        } else {
            console.log('Aucune personne trouvée avec cet ID.');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la personne:', error);
    }
};


removePersonById();

