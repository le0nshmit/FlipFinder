function getFilters(){

    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const fallback = {minPrice: 0, maxPrice: 500};
    

    if (!minPrice || !maxPrice){
        return {price: fallback};
    }

    const minValue = minPrice.value !== '' ? Number(minPrice.value) : fallback.min;
    const maxValue = maxPrice.value !== '' ? Number(maxPrice.value) : fallback.max;

    return {
        price: {
            min: minValue,
            max: maxValue
        }
    };

    return prices;
}



function buildSearchUrl(search, filters) {
    const params = new URLSearchParams({ q: search });

    if (filters && Object.keys(filters).length > 0) {
        params.set('filters', JSON.stringify(filters));
    }

    return `/search?${params.toString()}`;
}



window.addEventListener('DOMContentLoaded', function() {
    form = document.getElementById('form');

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const filters = getFilters();
        const search = event.target.search.value.trim();

        if (window.location.pathname === '/search') {
            window.history.pushState({}, '', buildSearchUrl(search, filters));
            window.dispatchEvent(new CustomEvent('search:updated', {
                detail: { search, filters }
            }));
        } else {
            window.location.href = buildSearchUrl(search, filters);
        }        
    })
})