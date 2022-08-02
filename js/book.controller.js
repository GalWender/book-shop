'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    loadCurrLangFromStorage()
    onSetLang(gCurrLang)
    doTrans()
}

function renderBooks() {
    var books = getBooksForDisplay()

    var strHTMLs = `    
        <thead>
        <th>Id</th>
        <th data-trans="table-title">Title</th>
        <th data-trans="table-price">Price</th>
        <th data-trans="table-actions">Actions</th>
        <th><button data-trans="action-add-book" class="btn-page" onclick="onAddBook()">Add book</button></th>
        </thead>`
    strHTMLs += books.map(book => {
        return `
    <tbody>
    <tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}$</td>
    <td><button data-trans="actions-read" class="btn btn-read" onclick="onReadBook(${book.id})">Read</button></td>
    <td><button data-trans="actions-update" class="btn btn-update" onclick="onUpdateBook(${book.id})">Update</button></td>
    <td><button data-trans="actions-delete" class="btn btn-delete" onclick="onRemoveBook(${book.id})">Delete</button></td>
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
    doTrans()
}
function onAddBook() {
    const elModal = document.querySelector('.modal-add-book')
    elModal.classList.add('open')
}
function onSubmitBook(ev){
    ev.preventDefault()
    var elBookName = document.querySelector('[name=book-name-txt]')
    var elBookPrice = document.querySelector('[name=book-price-txt]')
    addBook(elBookName.value,elBookPrice.value)
    saveBooksToStorage()
    renderBooks()
    doTrans()
    elBookName.value=''
    elBookPrice.value=''
    document.querySelector('.modal-add-book').classList.remove('open')
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
    document.querySelector('.modal-add-book').classList.remove('open')
}
function onRemoveBook(bookId) {
    removeBook(bookId)
    saveBooksToStorage()
    renderBooks()
    doTrans()

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
    doTrans()

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
    doTrans()
}

function onPrevPage(elPrev){
    var elNext = document.querySelector('.nextBtn')
    // console.log(elNext,elPrev)
    prevPage(elPrev,elNext)
    renderBooks()
    doTrans()
}

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl') 
    else document.body.classList.remove('rtl')
    saveCurrLangToStorage()
    // renderBooks()
    doTrans()
}


