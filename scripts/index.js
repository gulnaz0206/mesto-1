import initialCards from './data.js';

const cardsContainer = document.querySelector('.elements');

/*профиль*/
const popupProfile = document.querySelector('.popup__edit_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = document.querySelector('.popup__close-button');
const popupProfileForm = document.querySelector('.popup__edit_form');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupSubmitButton = document.querySelector('.popup__submit-button');

/*карточка*/
const popupAddCard = document.querySelector('.popup__create_card');
const popupOpenAddCardElement = document.querySelector('.profile__button');
const popupPlaceName = document.querySelector('.popup__input_type_place');
const popupPlaceLink = document.querySelector('.popup__input_type_link');
const popupCreateButton = document.querySelector('.popup__create-button');
const popupCloseCardElement = document.querySelector('.popup__close-button');
const popupAddCardForm = document.querySelector('#add-form');

/*картинка*/
const popupPicture = document.querySelector('#popup-picture');
const popupImage = document.querySelector('.popup__image');
const popupPlaceName = document.querySelector('.popup__description');
const popupPlaceLink = document.querySelector('.popup__close-button');

const handleDeleteCard = (event) => {
    event.target.closest('element').remove();
}

const handleLikeCard = (event) => {
    event.target.closest('element__like').classList.toggle('element__like_active');
}

const createCard = (card) => {
    const cardElement = cardTemplate.cloneNode(true);

    const cardPicture = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__caption');
    cardPicture.src = card.link;
    cardPicture.alt = card.name;
    cardTitle.textContent = card.name;

    const deleteButtonElement = cardElement.querySelector('.card__delete-button');
    deleteButtonElement.addEventListener('click', handleDeleteCard);

    const likeButtonElement = cardElement.querySelector('.element__like');
    likeButtonElement.addEventListener('click', handleLikeCard);

    cardPicture.addEventListener('click', () => {
        popupImageBig.src = card.link;
        popupImageBig.alt = card.name;
        popupHeadingBig.textContent = card.name;
        openPopup(popupBig);
    })

    return cardElement;
}

const renderInitalCards = (item) => {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => {
    renderInitalCards(item);
})

const openPopup = function (popup) {
    popup.classList.add('popup_opened');
}
popupOpenButtonElement.addEventListener('click', function () {
    openPopup(popupProfile)
});
popupOpenAddCardElement.addEventListener('click', function () {
    openPopup(popupAddCard);
});

const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
}

popupCloseButtonElement.addEventListener('click', function () {
    closePopup(popupProfile)
});
popupCloseCardElement.addEventListener('click', function () {
    closePopup(popupAddCard)
});

popupBigImageCloseButton.addEventListener('click', function () {
    closePopup(popupBig);
})

function submitProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfile);
}

function submitFormCard(event) {
    event.preventDefault();
    renderInitalCards({
        name: popupPlaceName.value,
        link: popupPlaceLink.value,
    });
    event.target.reset();
    closePopup(popupAddCard)
}

popupOpenButtonElement.addEventListener('click', function () {
    openPopup(popupProfile);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
});

popupCloseButtonElement.addEventListener('click', function () {
    closePopup(popupProfile)
});
popupProfileForm.addEventListener('submit', submitProfileInfo);

popupBigImageCloseButton.addEventListener('click', function () {
    closePopup(popupBig)
});

popupProfile.addEventListener('click', closePopupOverlayClick);
popupAddCard.addEventListener('click', closePopupOverlayClick);
popupBig.addEventListener('click', closePopupOverlayClick);

popupAddCardForm.addEventListener('submit', submitFormCard);