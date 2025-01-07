let currentSeedwave = {
    level: Math.floor(Math.random() * 10) + 1,
    expiresAt: Date.now() + Math.floor(Math.random() * (4 * 60 * 60 * 1000 - 30 * 60 * 1000)) + 30 * 60 * 1000,
};

let lastSeedwave = null;

export default function handler(req, res) {
    const now = Date.now();

    // Generate a new seedwave if the current one has expired
    if (now > currentSeedwave.expiresAt) {
        lastSeedwave = {
            level: currentSeedwave.level,
            endedAt: currentSeedwave.expiresAt,
        };

        currentSeedwave = {
            level: Math.floor(Math.random() * 10) + 1,
            expiresAt: now + Math.floor(Math.random() * (4 * 60 * 60 * 1000 - 30 * 60 * 1000)) + 30 * 60 * 1000,
        };
    }

    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS
    res.status(200).json({
        seedwave: currentSeedwave.level,
        expiresAt: currentSeedwave.expiresAt,
        previousSeedwave: lastSeedwave || { level: 'N/A', endedAt: 'N/A' },
    });
} 