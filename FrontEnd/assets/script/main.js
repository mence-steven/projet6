/************************* code final API gallery + filtre ******************/

document.addEventListener('DOMContentLoaded', async function() {

    const [works, categories] = await Promise.all([
        fetch("http://localhost:5678/api/works").then(res => res.json()),
        fetch("http://localhost:5678/api/categories").then(res => res.json())
    ]);
         
    console.log(works);
    console.log(categories);

    createGallery(works);
    createFilters(categories);
    

    createFiltersModal(categories); // Nouvelle fonction pour remplir le <select>
   
});

// Création galleries
function createGallery(works) {
    const selectionGallery = document.querySelector(".gallery");

    works.forEach(work => {
        const worksElement = document.createElement("figure");
        worksElement.dataset.categoryId = work.categoryId;
        const imageElement = document.createElement("img");
        const figCaptionElement = document.createElement("figcaption");

        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        figCaptionElement.innerText = work.title;

        worksElement.appendChild(imageElement);
        worksElement.appendChild(figCaptionElement);
        selectionGallery.appendChild(worksElement);
    });
}


// Création categories 
function createFilters(categories) {
    const parentFiltres = document.querySelector('.filtres');

    const token = localStorage.getItem("token");
    if (token) {
        const btnModifier = document.querySelector('.btn_modifier')
        const bandeau = document.querySelector('.bandeau')
        btnModifier.style.display = 'flex'
        bandeau.style.display = 'flex'

    }

    else {
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.className = 'filtre bouton_0 filtre_actif';

    allButton.addEventListener('click', function() {
        activeFilter(this);
        filterGallery(null);
    });
 
    parentFiltres.appendChild(allButton);

 
    categories.forEach((category, index) => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.className = 'filtre bouton_' + (index + 1);
        button.dataset.categoryId = category.id;
      
        button.addEventListener('click', function() {
            activeFilter(this);
            filterGallery(category.id);
        });
 
        parentFiltres.appendChild(button);
    });
}
}


// nom css
function activeFilter(activeButton) {
    const buttons = document.querySelectorAll('.filtres button');
    buttons.forEach(btn => btn.classList.remove('filtre_actif'));
    activeButton.classList.add('filtre_actif');
}


// trie catégorie
function filterGallery(categoryId) {
    const figures = document.querySelectorAll('.gallery figure');
    figures.forEach(figure => {
        if (categoryId === null || figure.dataset.categoryId == categoryId) {
            figure.style.display = 'block';
        } else {
            figure.style.display = 'none';
        }
    });
}

/********************** FIN code final API gallery + filtre ****************/

/************************************ Modal ********************************/
const btnClose = document.querySelector('.btn_close');
const modal = document.querySelector('.modal');
const btnModifier = document.querySelector('.btn_modifier');
const btnAjouterUnePhoto = document.querySelector('.ajouter_galerie');
const modalAjout = document.querySelector('.modal_ajout');
const faRetour = document.querySelector('.retour_croix .fa-arrow-left');
const faCroix = document.querySelector('.retour_croix .fa-xmark');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

/*
header.addEventListener('click',() => {
    modal.style.display = 'none';
    modalAjout.style.display = 'none';
});
*/

// ouvre modal
btnModifier.addEventListener('click',() => {
    modal.style.display = 'flex';
    
});

// ferme modal
btnClose.addEventListener('click',() => {
    modal.style.display = 'none';
});

//change page modal
btnAjouterUnePhoto.addEventListener('click', () => {
    modal.style.display = 'none';
    modalAjout.style.display = 'flex';
});

// retour fleche de modalAjout a modal
faRetour.addEventListener('click',() => {
    modal.style.display = 'flex';
    modalAjout.style.display = 'none';
});

// ferme modalAjout
faCroix.addEventListener('click', () => {
    modalAjout.style.display = 'none';
});






/********************************** Fin Modal ******************************/
/*********************************** Supp work *******************************/

document.addEventListener('DOMContentLoaded', async function() {
    const works = await fetch("http://localhost:5678/api/works").then(res => res.json());
    displayGalleryPhoto(works);
});

// Affiche image
function displayGalleryPhoto(works) {
    const galeriePhotoDiv = document.querySelector('.container_galerie');

    works.forEach(work => {
        const figure = document.createElement('figure');
        figure.dataset.workId = work.id;

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-regular fa-trash-can';
        //<i class="fa-solid fa-trash-can"></i>
        //<i class="fa-regular fa-trash-can"></i>
        deleteIcon.addEventListener('click', function() {
            deleteWork(work.id, figure);
        });

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        figure.appendChild(deleteIcon);
        figure.appendChild(img);

        galeriePhotoDiv.appendChild(figure);
    });
}

// Supprimer un work
async function deleteWork(workId, figureElement) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Pas de token');
        return;
    }

    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
        }
    });

    if (response.ok) {
        figureElement.remove();
    } else {
        console.error('Error supp img');
    }
}
/*********************************** Fin Supp work *******************************/

/************************************ajout ****************************************************/


/*
document.addEventListener('DOMContentLoaded', function () {
    const logoImage = document.querySelector('.logo_image');
    const imagePc = document.getElementById('image_pc');

    logoImage.addEventListener('click', () => {
        imagePc.click();
    });

    // Affiche image
    imagePc.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            
        } else {
            alert('Fichier image non valide');
        }
    });
});
*/

document.addEventListener('DOMContentLoaded', function () {
    const logoImage = document.querySelector('.logo_image');
    const imagePc = document.getElementById('image_pc');
    const logoImagePreview = document.querySelector('.logo_image_preview');

    logoImage.addEventListener('click', () => {
        imagePc.click();
    });

    imagePc.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const imageUrl = URL.createObjectURL(file);

            logoImage.style.display = 'none';
            let imgPreview = logoImagePreview.querySelector('img');
            if (!imgPreview) {
                imgPreview = document.createElement('img');
                logoImagePreview.appendChild(imgPreview);
            }
            imgPreview.src = imageUrl;
            //logoImagePreview.style.display = 'flex';

        } else {
            alert('Fichier image non valide');
        }
    });
});




// creation filtre categorie dans modal
function createFiltersModal(categories) {
    const categorySelect = document.getElementById('categorie');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}


/*********************test  */

// envoie title categoryId file vers data/api
document.querySelector('.btn_valide').addEventListener('click', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const categoryId = document.getElementById('categorie').value;
    const imageInput = document.getElementById('image_pc');
    const file = imageInput.files[0];


    if (!file) {
        alert('Veuillez ajouter une image');
        return;
    }
    
    if (!title){
        alert('Veuillez taper un titre');
        return;
    }

    if (!categoryId){
        alert('Veuillez selectionner une catergorie');
        return;
    }

   

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', categoryId);
    formData.append('image', file);

    try {
        const token = localStorage.getItem('token');

        const response = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
            body: formData
        });


        if (response.ok) {
            alert('Ajouté à gallery');
            modalAjout.style.display = 'none';

            const newWork = await response.json();
            displayGalleryPhoto([newWork]);
        } else if (response.status === 400) {
            // Mauvaise demande
            alert('Requête incorrecte.');
        } else if (response.status === 401) {
            alert('Non autorisé.');
        } else if (response.status === 500) {
            alert('Erreur inattendue.');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});