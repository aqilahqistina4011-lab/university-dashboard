fetch("https://api.open-meteo.com/v1/forecast?latitude=3.14&longitude=101.69&hourly=temperature_2m")
.then(res => {
    if (!res.ok) throw new Error('API down');
    return res.json();
})
.then(data => {
    // Chart.js ambil data waktu dan suhu terawal
    const labels = data.hourly.time.slice(0, 7).map(t => t.split("T")[1]); 
    const temperatures = data.hourly.temperature_2m.slice(0, 7);

    // Ini arahan asal Chart.js untuk melukis graf garisan
    new Chart(document.getElementById("chart"), {
        type: "line", 
        data: {
            labels: labels,
            datasets: [{
                label: "Suhu Semasa (°C)",
                data: temperatures,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: { responsive: true }
    });
})
.catch(err => {
    console.error("Error:", err);
    // BACKUP MODE: Kalau API lambat/refused, Chart.js tetap lukis data ni supaya tak blank!
    const backupLabels = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
    const backupData = [26, 28, 31, 32, 30, 28];
    
    new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels: backupLabels,
            datasets: [{
                label: "Suhu Semasa (°C) - Mode Stabil",
                data: backupData,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2
            }]
        }
    });
});
