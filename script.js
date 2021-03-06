const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// SHow Loading
function loading() {
    loader.hidden = false ;
    quoteContainer.hidden = true ;
}

// Hide Loading
function complete() {
    loader.hidden = true ;
    quoteContainer.hidden = false ;
}

// Show new Quote using API
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown' ;
    }else{
        authorText.textContent = quote.author ;
    }
    
    //Check Quote Length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote') ;
    } else {
        quoteText.classList.remove('long-quote') ;
    }

    //Set Quote, Hide Loader
        quoteText.textContent = quote.text ;
        complete();
}


// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes =  await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuotes();


// ********************************************************************************

// Show new Quote using local Quotes
// function newQuote() {
//     // Pick a random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// // On Load
// newQuote() ;