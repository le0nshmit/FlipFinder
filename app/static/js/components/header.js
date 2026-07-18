window.addEventListener('DOMContentLoaded', function() {
    form = document.getElementById('form');

    form.addEventListener('submit', async(event) => {
        event.preventDefault();


        const search = event.target.search.value;

        window.location.href = `/search?q=${encodeURIComponent(search)}`
    })
})