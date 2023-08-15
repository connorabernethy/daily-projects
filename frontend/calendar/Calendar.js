let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let day = date.getDay();

const navDate = document.getElementById("month-and-year");

const dayListItems = document.querySelector(".calendar-dates");

const navigation = document.querySelectorAll(".calendar-nav button");

const events = document.querySelector(".events-header");

const eventList = {};

// Global Month Array:
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const generateCalendar = () => {
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();
    let lastDay = new Date(year, month, lastDate).getDay();
    let prevMonthLast = new Date(year, month, 0).getDate();

    let gen = "";

    for (let i = firstDay; i > 0; i--) {
        gen += `<li class="inactive">${prevMonthLast - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        let isToday = i === date.getDate()
            && month === date.getMonth()
            && year === date.getFullYear()
            ? "active"
            : "";
        gen += `<li id="active" class="${isToday}">${i}</li>`;
    }

    for (let i = lastDay; i < 6; i++) {
        gen += `<li class="inactive">${i - lastDay + 1}</li>`;
    }

    navDate.innerHTML = `${months[month].toUpperCase()}, ${year}`;

    dayListItems.innerHTML = gen;

    // Get each date / list item
    const dates = document.querySelectorAll('.calendar-dates #active');
    dates.forEach(num => {
        num.addEventListener("click", () => {
            let headerDate = new Date(year, month, num.innerHTML);
            events.innerHTML = `${months[headerDate.getMonth()]} ${headerDate.getDate()}`;
        });
    })
}

generateCalendar();

navigation.forEach(button => {
    button.addEventListener("click", () => {
        month = button.id === "prev-month" ? month - 1 : month + 1;

        if (month < 0 || month > 11) {

            date = new Date(year, month, new Date().getDate());

            year = date.getFullYear();

            month = date.getMonth();
        }
        else {
            date = new Date();
        }
        generateCalendar();
    });
});
