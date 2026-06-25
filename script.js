fetch("https://universities.hipolabs.com/search?country=Malaysia")
.then(res => res.json())
.then(data => {
    // Kita ambil 10 universiti pertama dari data API
    const labels = data.slice(0, 10).map(u => u.name);
    // Kita letak nilai 1 sebagai data dummy untuk graf bar
    const values = data.slice(0, 10).map(() => 1);

    new Chart(document.getElementById("chart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Senarai Universiti Malaysia (API Data)",
                data: values,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
})
.catch(err => console.error("Gagal ambil data API:", err));
