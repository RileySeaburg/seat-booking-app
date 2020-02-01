var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// Select DOM elements
var container = document.querySelector(".container");
var seats = document.querySelectorAll(".row .seat:not(.occupied)");
var count = document.getElementById("count");
var total = document.getElementById("total");
var movieSelect = document.getElementById("movie");
// Populate UI
populateUI();
var ticketPrice = +movieSelect.value;
// Save Slected Movie Index & Price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Updated Seat Count
function updateSelectedCount() {
    var selectedSeats = document.querySelectorAll(".row .seat.selected");
    // Copy Selected Seats Into Array
    // Map Through Array
    // Create New Array Of Indexes
    var seatsIndex = __spreadArrays(selectedSeats).map(function (seat) { return __spreadArrays(seats).indexOf(seat); });
    // Save TO Local Storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    var selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
// Add Event Listeners
///Seat Click Event
/// Proper Arrow Function
container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")) {
        // Toggle Seat
        e.target.classList.toggle("selected");
        // Add Ticket Prices TO Seats
        updateSelectedCount();
    }
});
// Get Data From Local Storage & Populate UI
function populateUI() {
    var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    // Add Ticket Price Finction for Local Sotrage
    var selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
// Movie Select Event
movieSelect.addEventListener("change", function (e) {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});
// Initial Count & Total Set
updateSelectedCount();
