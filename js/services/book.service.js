'use strict'

const STORAGE_KEY = 'books'
const gBookNames = ['A Tale of Two Cities', 'The Little Prince', 'Harry Potter and the Philosophers Stone', 'And Then There Were None', 'Dream of the Red Chamber','The Hobbit','The Lion, the Witch and the Wardrobe','She: A History of Adventure','The Da Vinci Code','Harry Potter and the Chamber of Secrets','Harry Potter and the Prisoner of Azkaban']
var gBooks
var gFilterBy = 'ALL'
const PAGE_SIZE = 5
var gPageIdx = 0
var queryStringParams
createBooks()

function createBooks() {
    var Books = loadFromStorage(STORAGE_KEY)
    if (!Books) {
        Books = []
        for (var i = 0; i < gBookNames.length; i++) {
            Books.push({
                id: makeId(),
                name: gBookNames[i].toUpperCase(),
                price: getRandomInt(100, 501),
                desc: makeLorem(),
                rate: getRandomInt(0, 11)
            })
        }
    }

    gBooks = Books
    saveBooksToStorage()
}
function nextPage(elNext,elPrev) {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        elNext.setAttribute("disabled","disabled")
    }
    else if(gPageIdx * PAGE_SIZE<gBooks.length && elPrev.getAttribute("disabled")){
        elPrev.removeAttribute("disabled")
    }
    console.log(elNext)
}
function prevPage(elPrev,elNext){
    gPageIdx--
    if (gPageIdx<0) {
        gPageIdx =0
        //    console.log(elPrev)
        elPrev.setAttribute("disabled","disabled")
    }
    else if(gPageIdx>0 && elNext.getAttribute("disabled")){
        elNext.removeAttribute("disabled")
    }
    console.log(elPrev)
}

function saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
function addBook(name, price) {
    gBooks.push({ id: makeId(), name: name.toUpperCase(), price: price, desc: makeLorem(), rate: getRandomInt(0, 11) })
}
function removeBook(bookId) {
    gBooks.splice(gBooks.findIndex(book => +book.id === bookId), 1)
}
function getBookById(bookId) {
    return gBooks.find(book => +book.id === bookId)
}
function updateBook(bookId, bookPrice) {
    var idx = gBooks.findIndex(book => +book.id === bookId)
    var currBook = gBooks[idx]
    currBook.price = bookPrice
}
function addRate(bookId) {
    var book = getBookById(bookId)
    if (book.rate >= 0 && book.rate < 10) book.rate++
}
function minusRate(bookId) {
    var book = getBookById(bookId)
    if (book.rate > 0 && book.rate <= 10) book.rate--
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}


function getBooksForDisplay() {
    var books
    console.log(gFilterBy)
    if (gFilterBy.name !== '' && gFilterBy.name !== ' ') {
        if (gFilterBy.maxPrice && gFilterBy.minRate) {
            books = gBooks.filter(book => book.price < gFilterBy.maxPrice && book.rate > gFilterBy.minRate && book.name.includes(gFilterBy.name))
        }
        else {
            books = gBooks
        }
    }
    else {
        if (gFilterBy.maxPrice && gFilterBy.minRate) {
            books = gBooks.filter(book => book.price < gFilterBy.maxPrice && book.rate > gFilterBy.minRate)
        }
        else {
            books = gBooks
        }
    }
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    console.log(books)
    return books
}
















