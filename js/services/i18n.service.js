'use strict'
var gCurrLang = 'en'


var gTrans = {
    'title': {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    'filter-max-price': {
        en: 'Sort by maximum price',
        he: 'מיון לפי מחיר מקסימלי',
    },
    'filter-min-rate': {
        en: 'Sort by minimum rate',
        he: 'מיון לפי תעריף מינימום'
    },
    'filter-search': {
        en: 'Search:',
        he: ':חפש',
    },
    'actions-read': {
        en: 'Read',
        he: 'לקרוא',
    },
    'actions-update': {
        en: 'Update',
        he: 'עדכן',
    },
    'actions-delete': {
        en: 'delete',
        he: 'למחוק',
    },
    'table-title': {
        en: 'Title',
        he: 'שם הספר',
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'table-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'search-placeholder': {
        en: 'search by name',
        he: 'חפש לפי שם'
    },
    'modal-description': {
        en: 'Description:',
        he: 'תיאור'
    },
    'modal-close': {
        en: 'Close',
        he: 'סגור'
    },
    'action-add-book': {
        en: 'Add Book',
        he: 'הוספת ספר',
    },
    'next-btn': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'modal-book-name': {
        en: 'Book Details',
        he: 'פרטי הספר'
    },
    'modal-add-book-name': {
        en: 'Book name',
        he: 'שם בספר'
    },
    'modal-add-book-price': {
        en: 'Book price',
        he: 'מחיר'
    },
    'modal-add': {
        en: 'Add',
        he: 'הוסף'
    },
    'prev-btn': {
        en: 'Previous Page',
        he: 'עמוד קודם'
    }

}

function doTrans() {
    // 
    // var els = document.querySelectorAll('[data-trans]'
    const els = document.querySelectorAll('[data-trans]')
    console.log(els)
    // for each el:
    els.forEach(el => {
        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal
        if (el.placeholder !== undefined) el.placeholder = translateVal
        // el.innerText = 'test'
    })
    //    get the data-trans and use getTrans to replace the innerText 
    //    ITP: support placeholder    
}

function getTrans(transKey) {
    const key = gTrans[transKey]
    // if key is unknown return 'UNKNOWN'
    if (!key) return 'UNKNOWN'
    //  get from gTrans
    let translateVal = key[gCurrLang]
    // If translation not found - use english
    if (!translateVal) translateVal = key['en']
    return translateVal
}

function setLang(lang) {
    gCurrLang = lang
}

function saveCurrLangToStorage() {
    saveToStorage('currLang',gCurrLang)
}
function loadCurrLangFromStorage(){
gCurrLang = loadFromStorage('currLang')
var elLang = document.querySelector('.lang')
elLang.value = gCurrLang
}