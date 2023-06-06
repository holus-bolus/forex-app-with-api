function getForexQuotes() {
    // Make an AJAX request to the FCS-API endpoint
    fetch('https://fcsapi.com/api-v3/forex/latest?symbol=EUR/USD,USD/JPY,GBP/CHF&access_key=1XRiLZaADxXdj5NYr1Hy')
        .then(response => response.json())
        .then(data => {
            // Check if the API response is successful
            if (data.status === true) {
                const quotes = data.response;

                // Clear the existing table rows
                const table = document.getElementById('quotes-table');
                table.innerHTML = `
                            <tr>
                                <th>Currency Pair</th>
                                <th>Open</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>Close</th>
                            </tr>
                        `;

                // Add each quote as a new row in the table
                for (const currencyPair in quotes) {
                    const quote = quotes[currencyPair];
                    const currencyName = quote.s;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                                <td>${currencyName}</td>
                                <td>${quote.o}</td>
                                <td>${quote.h}</td>
                                <td>${quote.l}</td>
                                <td>${quote.c}</td>
                            `;
                    table.appendChild(row);
                }
            } else {
                console.log('API response unsuccessful');
            }
        })
        .catch(error => {
            console.log('An error occurred:', error);
        });
}

// Fetch quotes initially
getForexQuotes();

// Fetch quotes periodically using setInterval
setInterval(getForexQuotes, 20000); // Fetch quotes every 20 seconds, max requests amount 3 per minute
