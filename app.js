const modal = document.getElementById('modal');
const bookGrid = document.getElementById('book-grid');
let closeType = '';

// MODAL VARIABLES HERRE
const openModalButton = document.getElementById('open-modal-button');
// const closeModalButton = document.getElementById('close-modal-button');
const overlay = document.getElementById('overlay');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookReadStatus = document.getElementById('read-status');
const modalSubmitButton = document.getElementById('modal-submit');
const modalCancelButton = document.getElementById('modal-cancel');
const bookReadButtons = document.querySelectorAll('.read');
const bookNotReadButtons = document.querySelectorAll('.not-read');


bookGrid.addEventListener('click', (e) => {
  if(e.target && e.target.nodeName === 'BUTTON' && e.target.className !== 'remove-button') {
    changeStatus(e);
  } else if(e.target && e.target.nodeName === 'BUTTON' && e.target.className === 'remove-button') {
    if(confirm('Are you sure you want to delete this book?')) {
      deleteItem(e.target);
    }
  }
})

// bookReadButtons.forEach(brb => {
//   console.log(brb);
// })

// modalSubmitButton.addEventListener('click', () => {
//   console.log('i am getting clicked');
//   // createBookItem(bookTitle.value, bookAuthor.value, bookPages.value);
// })

modalSubmitButton.addEventListener('submit', () => {
  console.log(`submit got clicked`);
})


modalCancelButton.addEventListener('click', () => {
  resetModal();
  modal.close();
})

modal.addEventListener('close', (e) => {
  if(closeType === 'submit') {
    if(bookTitle.value !== '' && bookAuthor.value !== '' && bookPages.value !== '') {
      createBookItem(bookTitle.value, bookAuthor.value, bookPages.value);
    } else {
      return;
    }
  }
})


openModalButton.addEventListener('click', () => {
  modal.showModal();
})

// closeModalButton.addEventListener('click', () => {
//   // const modal = closeModalButton.closest('.modal');
//   closeType = 'clicked';
//   modal.close();
// })

bookPages.addEventListener('change', () => {
  closeType = 'submit';
})

overlay.addEventListener('click', () => {
  const modal = document.querySelectorAll('.modal.active');
  closeModal(modal[0]);
})

function openModal(modal) {
  if(modal === null) return
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if(modal === null) return
  modal.classList.remove('active');
  overlay.classList.remove('active');
}


function changeStatus(evt) {
  if(evt.target.className === 'read') {
    evt.target.innerHTML = 'Not Read';
    evt.target.className = 'not-read';
  } else {
    evt.target.className = 'read';
    evt.target.innerHTML = 'Read';
  }
}

function deleteItem(evt) {
  try {
    evt.parentElement.remove();
  } catch(err) {
    console.log('not working');
  }
}

function createBookItem(title,author,pages) {
  const gridItem = document.createElement('div');
  gridItem.className = 'grid-item';
  
  const gridCloseButton = document.createElement('button');
  gridCloseButton.className = 'remove-button';
  // const gridText = document.createTextNode('X');
  // gridCloseButton.appendChild(gridText);
  gridCloseButton.innerHTML = 'X';
  
  gridBookTitle = document.createElement('div');
  gridBookTitle.className = 'title';
  gridBookTitleText = document.createElement('p');
  gridBookTitleText.innerHTML = title;
  gridBookTitle.appendChild(gridBookTitleText);

  gridBookAuthor = document.createElement('div');
  gridBookAuthor.className = 'author';
  gridBookAuthorText = document.createElement('p');
  gridBookAuthorText.innerHTML = author;
  gridBookAuthor.appendChild(gridBookAuthorText);

  gridBookPages = document.createElement('div');
  gridBookPages.className = 'pages';
  gridBookPagesText = document.createElement('p');
  try {
    if(pages === '1') {
      gridBookPagesText.innerHTML = `${pages} page`
    } else {
      gridBookPagesText.innerHTML = `${pages} pages`
    }
    gridBookPages.appendChild(gridBookPagesText);
  } catch(err) {
    console.log(err);
  }
  
  
  gridBookStatus = document.createElement('div');
  gridBookStatus.className = 'status';
  gridBookStatusButton = document.createElement('button');
  try {
    if(bookReadStatus.checked) {
      gridBookStatusButton.className = 'read';
      gridBookStatusButton.innerHTML = 'Read';
    } else {
      gridBookStatusButton.className = 'not-read';
      gridBookStatusButton.innerHTML = 'Not Read';
    }
    gridBookStatus.appendChild(gridBookStatusButton);
  } catch(err) {
    console.log(err);
  }

  
  
  gridItem.appendChild(gridCloseButton);
  gridItem.appendChild(gridBookTitle);
  gridItem.appendChild(gridBookAuthor);
  gridItem.appendChild(gridBookPages);
  gridItem.appendChild(gridBookStatus);

  bookGrid.appendChild(gridItem);
  resetModal();
  closeType = null;
}

function resetModal() {
  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
}