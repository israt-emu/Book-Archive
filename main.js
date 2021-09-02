const bookContainer = document.getElementById("books");
const resultFound = document.getElementById("search-result");
//books load by search
const loadBooks = () => {
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  inputField.value = "";
  if (searchText === "") {
    resultFound.innerText = "Please! Search a book by name..";
    bookContainer.textContent = "";
  } else {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => searchResult(data));
  }
};
//searching result
const searchResult = (data) => {
  const books = data.docs;
  if (data.numFound === 0) {
    resultFound.innerText = "Sorry! No Results Found..";
    bookContainer.textContent = "";
  } else {
    resultFound.innerText = `Total results found ${data.numFound}. Here, Showing ${books.length} of total.`;
    displayBooks(books);
  }
};
///showing books image and informations
const displayBooks = (books) => {
  //clear previous result before displaying new result
  bookContainer.textContent = "";
  books.forEach((book) => {
    ///checking image
    const checkImage = () => {
      if (book.cover_i === undefined) {
        const noImageUrl = `image/image-1.png`;
        return noImageUrl;
      } else {
        const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        return imageUrl;
      }
    };

    //checking property
    const checkProperty = (property, propName) => {
      if (property === undefined) {
        return `No ${propName} Found`;
      } else {
        return property;
      }
    };

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100">
          <img src="${checkImage()}" class="card-img-top" height="365px" alt="..."/>
          <div class="card-body">
            <h4 class="text-primary">Book Name: ${book.title}</h4>
            <p class="fw-bold">
              Author's Name: ${checkProperty(book.author_name, "Author's")}
            </p>
            <p> Publisher: ${checkProperty(book.publisher, "Publisher's")}</p>
            <p>
            First published: ${checkProperty(
              book.first_publish_year,
              "Publish Year"
            )}
            </p>
          </div>
        </div>
`;
    bookContainer.appendChild(div);
  });
};
