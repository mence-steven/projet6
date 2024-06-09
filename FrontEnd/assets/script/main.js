/*********************** Afficher image + console *********************

async function genereProject() {
    const workFetch = await fetch ("http://localhost:5678/api/works")
    const works = await workFetch.json()
    console.log(works)
    createGallery(works)

}

genereProject()


function createGallery(works){
    for(let i = 0; i < works.length; i++ ){
        const selectedWorks = works[i]
        const selectionGallery = document.querySelector(".gallery")
        const worksElement = document.createElement("figure")
        const imageElement = document.createElement("img")
        const figCaptionElement = document.createElement("figcaption")

        imageElement.src = selectedWorks.imageUrl
        figCaptionElement.innerText = selectedWorks.title

        selectionGallery.appendChild(worksElement)
        worksElement.appendChild(imageElement)
        worksElement.appendChild(figCaptionElement)
    }
}


/********************* FIN Afficher image + console *******************/


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
        /*
        const logoModifier = document.createElement('div')
        const modifierButton = document.createElement('button');
        modifierButton.textContent = 'modifier';
        modifierButton.className = 'modifier_button'*/

        //parentFiltres.appendChild(modifierButton);

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
        /*
        button.addEventListener('click', function(event) {
            const clickedButton = event.currentTarget;
            activeFilter(clickedButton);
            filterGallery(category.id);
        });
        */
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
    /*buttons.forEach(function(btn) {
        btn.classList.remove('filtre_actif');
    });*/
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

/*********************** FIN code final API gallery + filtre ****************/

/*************** *******/