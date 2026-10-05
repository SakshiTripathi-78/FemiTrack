// Handle the form submission from the main page (index.html)
document.getElementById("tracker-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Collect data from the form
    const periodStart = document.getElementById("period-start").value;
    const bloodColor = document.getElementById("blood-color").value;
    const painLevel = parseInt(document.getElementById("pain-level").value);
    const mood = document.getElementById("mood").value;
    const craving = document.getElementById("craving").value;

    // Save data to sessionStorage for navigation between pages
    sessionStorage.setItem("periodStart", periodStart);
    sessionStorage.setItem("bloodColor", bloodColor);
    sessionStorage.setItem("painLevel", painLevel);
    sessionStorage.setItem("mood", mood);
    sessionStorage.setItem("craving", craving);

    // Redirect to results page (results.html)
    window.location.href = "results.html";
});

// Handle the results page (results.html)
if (window.location.pathname.includes("results.html")) {
    const painLevel = parseInt(sessionStorage.getItem("painLevel"));

    // Show recommendations based on pain level
    let recommendation = "";
    switch (painLevel) {
        case 1:
            recommendation = "Mild pain. Consider using a warm compress or gentle stretches.";
            break;
        case 2:
            recommendation = "Moderate pain. Yoga and light exercise can help. Drink plenty of water.";
            break;
        case 3:
            recommendation = "Severe pain. Consider taking pain relief medication.";
            break;
        case 4:
        case 5:
            recommendation = "Very severe pain. Please consult a doctor if necessary.";
            break;
        default:
            recommendation = "No pain detected.";
    }

    document.getElementById("recommendation").textContent = recommendation;

    // Handle the "Back to Main Form" button
    document.getElementById("back-to-main").addEventListener("click", function() {
        window.location.href = "index.html";
    });

    // Handle the "Set Pad Change Reminder" button
    document.getElementById("reminder-button").addEventListener("click", function() {
        window.location.href = "reminder.html";
    });
}

// Handle the reminder page (reminder.html)
if (window.location.pathname.includes("reminder.html")) {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById("pad-reminder").textContent = `Reminder:Change your pad! Time: ${currentTime}`;

    // Handle the "Back to Results" button
    document.getElementById("back-to-results").addEventListener("click", function() {
        window.location.href = "results.html";
    });
} 
window.onload = function() {
    let periodStart = localStorage.getItem("periodStart"); // Get saved date

    if (!periodStart) {
        document.getElementById("reminder-text").innerText = "No period start date found. Please go back and enter the date.";
        return;
    }

    // Convert periodStart to a Date object
    let startDate = new Date(periodStart);

    // Display the start date in a readable format
    document.getElementById("reminder-text").innerText = `Period start date: ${startDate.toDateString()}`;
};

function startReminder() {
    let periodStart = localStorage.getItem("periodStart"); // Get saved date

    if (!periodStart) {
        alert("No period start date found. Please go back and enter the date.");
        window.location.href = 'index.html';
        return;
    }

    let startDate = new Date(periodStart);
    let currentDate = new Date();
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4); // Reminder lasts for 4 days

    // Show the start and end date of the reminder
    let reminderPeriod = document.getElementById("reminder-period");
    reminderPeriod.style.display = "block"; // Show the reminder period
    reminderPeriod.innerText = `Reminder set from: ${startDate.toDateString()} to ${endDate.toDateString()}`;

    if (currentDate > endDate) {
        alert("Reminder period has ended.");
        window.location.href = 'index.html'; // Redirect back
        return;
    }

    alert("Pad change reminder set! You will be reminded every 4 hours for 4 days.");

    let interval = setInterval(() => {
        let now = new Date();

        if (now >= endDate) {
            clearInterval(interval);
            alert("Pad change reminder period is over.");
            window.location.href = 'index.html';
        } else {
            alert("Reminder: Time to change your pad!");
        }
    }, 4 * 60 * 60 * 1000); // Every 4 hours
}

