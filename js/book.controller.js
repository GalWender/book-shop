'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    var books = getBooksForDisplay()

    var strHTMLs = `    
        <thead>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
        <th><button onclick="onAddBook()">Add book</button></th>
        </thead>`
    strHTMLs += books.map(book => {
        return `
    <tbody>
    <tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}$</td>
    <td><button onclick="onReadBook(${book.id})">Read</button></td>
    <td><button onclick="onUpdateBook(${book.id})">Update</button></td>
    <td><button onclick="onRemoveBook(${book.id})">Delete</button></td>
    </tr>
    </tbody>
    `
    }).join('')

    const elTable = document.querySelector('table')
    elTable.innerHTML = strHTMLs
}
function onUpdateBook(bookId) {
    var bookPrice = prompt('whats the price of the book?')
    updateBook(bookId, bookPrice)
    saveBooksToStorage()
    renderBooks()
}
function onAddBook() {
    var bookName = prompt('whats the name of the book?')
    var bookPrice = +prompt('what is the price of the book?')
    addBook(bookName, bookPrice)
    saveBooksToStorage()
    renderBooks()

}
function onReadBook(bookId) {
    var book = getBookById(bookId)
    const elModal = document.querySelector('.modal')
    const elh4 = document.querySelector('h4')
    const elRate = document.querySelector('.rateValue')
    const elMinus = document.querySelector('.minusRateBtn')
    const elAdd = document.querySelector('.addRateBtn')
    elMinus.setAttribute('onclick', `onMinusRate(${bookId})`)
    elAdd.setAttribute('onclick', `onAddRate(${bookId})`)
    elRate.innerText = book.rate
    elh4.innerText = book.desc
    elModal.classList.add('open')
}
function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}
function onRemoveBook(bookId) {
    removeBook(bookId)
    saveBooksToStorage()
    renderBooks()

}

function onAddRate(bookId) {
    var book = getBookById(bookId)
    const elRateValue = document.querySelector('.rateValue')
    addRate(bookId)
    saveBooksToStorage()
    elRateValue.innerText = book.rate
}
function onMinusRate(bookId) {
    var book = getBookById(bookId)
    const elRateValue = document.querySelector('.rateValue')
    minusRate(bookId)
    saveBooksToStorage()
    elRateValue.innerText = book.rate
}

function onSetFilter() {
    const elMaxPrice = document.querySelector('[name="max-price-range"]')
    const elMinRate = document.querySelector('[name="min-rate-range"]')
    const elSearch = document.querySelector('[name="search-txt"]')
    setFilter({ maxPrice: elMaxPrice.value, minRate: elMinRate.value, name: elSearch.value.toUpperCase() })
    saveBooksToStorage()
    renderBooks()

    var queryStringParams = `?maxPrice=${elMaxPrice.value}&minRate=${elMinRate.value}&name=${elSearch.value}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}
function onSetSearchFilter(ev) {
    ev.preventDefault()
    onSetFilter()
}

function renderFilterByQueryStringParams() {
    queryStringParams = new URLSearchParams(window.location.search)
    setFilter({ maxPrice: queryStringParams.get('maxPrice'), minRate: queryStringParams.get('minRate'), name: queryStringParams.get('name') })
}

function onNextPage(elNext) {
    var elPrev = document.querySelector('.prevBtn')
    // console.log(elPrev)
    nextPage(elNext,elPrev)
    renderBooks()
}
function onPrevPage(elPrev){
    var elNext = document.querySelector('.nextBtn')
    // console.log(elNext,elPrev)
    prevPage(elPrev,elNext)
    renderBooks()
}


