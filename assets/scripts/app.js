const addMovieModalElement = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelModelActionButton =
    addMovieModalElement.querySelector(".btn--passive");
const confrimAddMovieButton = cancelModelActionButton.nextElementSibling;
const userInputs = document.querySelectorAll("input");
const entryTextSection = document.querySelector("#entry-text");
const deleteMovieModel = document.getElementById("delete-modal");

let movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movieId === movie.id) {
            break;
        }
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    cancelMovieDeletion();
    //listRoot.removeChild(listRoot.children[movieIndex]) old way
};

const cancelMovieDeletion = () => {
    deleteMovieModel.classList.remove("visible");
    toggleBackdrop();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModel.classList.add("visible"); 

    let confrimDeleteButton = deleteMovieModel.querySelector(".btn--danger");
    const cancelDeleteButton = confrimDeleteButton.previousElementSibling;

    confrimDeleteButton.replaceWith(confrimDeleteButton.cloneNode(true));
    confrimDeleteButton = deleteMovieModel.querySelector(".btn--danger");

    cancelDeleteButton.removeEventListener("click", cancelMovieDeletion);
    cancelDeleteButton.addEventListener("click", cancelMovieDeletion);

    confrimDeleteButton.addEventListener(
        "click",
        deleteMovieHandler.bind(null, movieId)
    );

    toggleBackdrop();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    let newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener(
        "click",
        startDeleteMovieHandler.bind(null, id)
    );
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
    addMovieModalElement.classList.remove("visible");
};
const showMovieModal = () => {
    addMovieModalElement.classList.add("visible");
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const userInpt of userInputs) {
        userInpt.value = "";
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert(
            "check the rating value is between 1 and 5!! and don't input empty value"
        );
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
};

startAddMovieButton.addEventListener("click", showMovieModal);
cancelModelActionButton.addEventListener("click", cancelAddMovieHandler);
backdrop.addEventListener("click", backdropClickHandler);
confrimAddMovieButton.addEventListener("click", addMovieHandler);
