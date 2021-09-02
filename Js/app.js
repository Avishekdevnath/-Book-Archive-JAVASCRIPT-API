//////////////////// Spinner function ///////////////////

const displaySpinner = display => {
    document.getElementById('spinner-loading').style.display = display;
}



//////////////// Error Function //////////////////////////

const displayError = display  => {
    document.getElementById('error-found').style.display = display;
}



////////////// Displaying Default Content //////////////////

const displayContent = display => {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.style.display = display);
}
displayContent('none');




////////////////// Searching function ///////////////////////

const searchBook = () => {
  document.getElementById('welcome').style.display='none';

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = '';
  const url = `https://openlibrary.org/search.json?q=${searchText}`;




  ///////////////// Error Handling /////////////////////////

  if (searchText === '') {

    displayError('block');
    displayContent('none');

  } else {
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data));
    displayError('none');
    displaySpinner('block');
    displayContent('none');
  }
};



/////////////////// Displaying Result /////////////////////////

const displaySearchResult = (books) => {
  const { docs, numFound } = books;
  document.getElementById("search-count").textContent = `${numFound}`;
    
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = '';



//////////////////// Error Handling /////////////////////////
  
  if (docs.length === 0) {
        displaySpinner('none');
        displayContent('none');
        displayError('block');
    }
  
  else {
    displayContent('none');
    displayError('none');
    
    docs.forEach((book) => {
      const div = document.createElement('div');
      div.classList.add('col');

    
  /////////////////////// Book Cards Here //////////////
      
        div.innerHTML = `
      <div class="card h-100 card-design border border-success">
            <img src="https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-L.jpg" alt="${book.title}"
                class="card-img-top img-fluid" style="height: 370px; border: 1px solid green; border-radius: 10px" alt="...">
            <div class="card-body">
                <table class="table">
                    <tbody class="text-start">
                        <tr>
                            <th>Book Name</th>
                            <th>:</th>
                            <th>${book.title}</th>
                        </tr>
                        <tr>
                            <th>Author</th>
                            <th>:</th>
                            <th>${book.author_name ? book.author_name[0] : "unknown author"}</th>
                        </tr>
                        <tr>
                            <th>Publisher</th>
                            <th>:</th>
                            <th>${book.publisher ? book.publisher[0] : "unknown publisher"}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer text-center">
                <small class="text-muted">First published in ${book.first_publish_year}</small>
            </div>
        </div>
        `;

      searchResult.appendChild(div);
    });
    displaySpinner('none');
    displayContent('block');
  }
};
