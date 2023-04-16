// Set the number of items to display per page
const itemsPerPage = 10;

// Get the data container and the pagination container
const dataContainer = document.getElementById('data-container');
const paginationContainer = document.getElementById('pagination-container');

// Get the total number of items
const totalItems = dataContainer.children.length;

// Calculate the total number of pages
const totalPages = Math.ceil(totalItems / itemsPerPage);

// Generate the pagination links
for (let i = 1; i <= totalPages; i++) {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = '#';
  link.innerText = i;
  li.appendChild(link);
  paginationContainer.appendChild(li);

  // Add an event listener to each link to display the corresponding page
  link.addEventListener('click', function(e) {
    e.preventDefault();
    showPage(i);
  });
}

// Function to display the current page and hide the rest
function showPage(pageNumber) {
  // Calculate the start and end indexes of the current page
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Loop through all the items and show or hide them based on the current page
  for (let i = 0; i < totalItems; i++) {
    const item = dataContainer.children[i];
    if (i >= startIndex && i < endIndex) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  }

  // Remove the active class from all the pagination links
  const links = document.querySelectorAll('#pagination li a');
  links.forEach(link => {
    link.classList.remove('active');
  });

  // Add the active class to the current pagination link
  links[pageNumber - 1].classList.add('active');
}

// Display the first page by default
showPage(1);
