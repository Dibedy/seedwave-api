<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seedwave Overlay</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: transparent;
            font-family: Arial, sans-serif;
            color: white;
            text-align: center;
            font-size: 24px;
            overflow: hidden;
        }
        #seedwave-level {
            font-size: 32px;
            font-weight: bold;
        }
        #ends-in {
            font-size: 20px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div id="seedwave-level">Seedwave: Loading...</div>
    <div id="ends-in">Ends in: Loading...</div>

    <script>
        async function fetchSeedwaveData() {
            try {
                const response = await fetch('/api/seedwave'); // Replace with your API URL
                const data = await response.json();

                // Update the overlay with the current seedwave data
                document.getElementById("seedwave-level").textContent = `Seedwave: ${data.seedwave}`;
                document.getElementById("ends-in").textContent = `Ends in: ${formatRemainingTime(data.expiresAt)}`;
            } catch (error) {
                console.error("Error fetching seedwave data:", error);
            }
        }

        function formatRemainingTime(expiresAt) {
            const now = Date.now();
            const remaining = Math.max(0, expiresAt - now);
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            return `${hours}hr ${minutes}min ${seconds}sec`;
        }

        // Update the seedwave data every second
        setInterval(fetchSeedwaveData, 1000);
        fetchSeedwaveData();
    </script>
</body>
</html>