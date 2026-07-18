document.addEventListener("DOMContentLoaded", () => {

/* === PRICE FILTER === */

    /* - slider - */
    const slider = document.getElementById("price-slider");

    noUiSlider.create(slider, {
        start: [100, 500],
        connect: true,
        step: 10,

        range: {
            min: 0,
            max: 5000
        }
    });

    const minInput = document.getElementById("min-price");
    const maxInput = document.getElementById("max-price");

    slider.noUiSlider.on("update", function(values){
        minInput.value = Math.round(values[0]);
        maxInput.value = Math.round(values[1]);
    });

    minInput.addEventListener('change', function(){
        slider.noUiSlider.set([this.value || 0, null]);
    });

    maxInput.addEventListener('change', function(){
        slider.noUiSlider.set([null, this.value || 5000]);
    });

});