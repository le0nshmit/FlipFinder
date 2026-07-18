function displayListing(data) {
    console.log(data);
    const listingsContainer = document.getElementById('listings');

    if (!listingsContainer) return;

    listingsContainer.innerHTML = '';

    for (const item of data || []) {
        const row = document.createElement('div');

        const listingData = {
            title: item?.title || 'Untitled',
            price: item?.price?.value || 0,
            currency: item?.price?.currency,
            image: item?.image?.imageUrl || '',
            date: item?.itemCreationDate || '',
            url: item?.itemWebUrl || '',
        };


        const currencies = {
            'USD': '$',
            'GBP': '£',
            'EUR': '€'
        };

        if (listingData.currency in currencies) {
            listingData.price = `${currencies[listingData.currency]}${listingData.price}`;
        }

        row.className = 'relative w-full h-50 flex';

        row.innerHTML = `
            <div class="w-[15%] h-full">
                <a href="${listingData.url}" target="_blank">
                    <img class="h-full w-full object-cover cursor-pointer p-6 rounded-4xl" src="${listingData.image}" alt="listing">
                </a>
            </div>

            <div class="w-[15%] h-full py-6 flex flex-col items-start gap-2 text-white">
                <p class="text-2xl font-bold truncate">${listingData.title}</p>
                <p class="text-xl">${listingData.price}</p>
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

async function runSearch(search, filters = null) {
    const apiURL = '/api/search';

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search, filters })
        });

        const result = await response.json();

        if (result.success) {
            displayListing(result.data);
        }
    } catch (error) {
        console.error('Network Error:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('q');
    const filtersParam = params.get('filters');

    let filters = null;
    if (filtersParam) {
        try {
            filters = JSON.parse(filtersParam);
        } catch (error) {
            console.error('Invalid filters param:', error);
        }
    }

    if (search) {
        runSearch(search, filters);
    }
});

window.addEventListener('search:updated', (event) => {
    const { search, filters } = event.detail;
    runSearch(search, filters);
});