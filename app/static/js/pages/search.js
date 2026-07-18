function displayListing(data){
    const listingsContainer = document.getElementById('listings');


    for (item in data) {
        const row = document.createElement('div');


        const listingData = {
            'title': data[item]['title'],
            'price': data[item]['price']['value'],
            'image': data[item]['image']['imageUrl'],
            'date': data[item]['itemCreationDate'],
        };


        row.className = 'relative w-full h-50 flex';

        row.innerHTML = `
            <div class="w-[15%] h-full"><img class="h-full w-full object-cover cursor-pointer p-6 rounded-4xl" src="${listingData.image}" alt="listing"></div>
            
            <div class="w-[15%] h-full py-6 flex flex-col items-start gap-2 text-white">
                <p class="text-2xl font-bold truncate">${listingData.title}</p>
                <p class="text-xl">$${listingData.price}</p>

                <p class="text-lg mt-auto">+Free Delivery</p>
            </div>

            <div class="w-[30%] h-full flex items-center gap-[5%]">
                <button class="w-[30%] h-[25%] outline text-white text-lg font-bold rounded-lg cursor-pointer hover:scale-103">View</button>
                <button class="w-[15%] h-[25%] outline text-white text-lg font-bold rounded-lg cursor-pointer hover:scale-103">♡</button>
            </div>

            <div class="flex w-auto h-full items-center justify-end text-sm text-white">
                <p>${listingData.date}</p>
            </div>

            <span class="absolute left-0 right-0 mx-auto bottom-0 w-[96.5%] outline-1 outline-white/50"></span>
        `;

        listingsContainer.appendChild(row);
    }
}

function getFilters(){
    try{
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');

        console.log(minPrice.value);
        console.log(maxPrice.value);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("q");

    const apiURL = '/api/search';

    const filters = getFilters(); 

    try{
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({search})
        });

        const result = await response.json();

        if (result.success){
            displayListing(result.data);
        } 

    } catch (error) {
    console.error('Network Error:', error);
    return {success: false, error: error.message};
    }  
    
})
    