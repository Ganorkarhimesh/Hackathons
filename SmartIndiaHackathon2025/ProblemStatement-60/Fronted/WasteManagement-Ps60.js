        const BINS_DATA = [
            { id: 1, location: 'City Park', fillLevel: 45 },
            { id: 2, location: 'Downtown Square', fillLevel: 80 },
            { id: 3, location: 'Residential Area', fillLevel: 60 },
            { id: 4, location: 'Industrial Zone', fillLevel: 95 },
        ];

        const backendApiUrl = 'http://localhost:5000/api/update_bin_fill_level';

        function renderBins() {
            const container = document.getElementById('bins-container');
            container.innerHTML = '';
            BINS_DATA.forEach(bin => {
                const isUrgent = bin.fillLevel > 90;
                const card = document.createElement('div');
                card.className = `p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 ${isUrgent ? 'bg-red-50 ring-2 ring-red-400' : 'bg-gray-50'}`;
                card.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-gray-800">Bin ${bin.id}</span>
                        <span class="text-sm font-medium text-gray-600">${bin.location}</span>
                    </div>
                    <div class="mt-2 text-2xl font-semibold ${isUrgent ? 'text-red-500' : 'text-green-600'}">
                        ${bin.fillLevel}% Full
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div class="h-2.5 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-green-500'}" style="width: ${bin.fillLevel}%"></div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        async function updateBin() {
            const binIdInput = document.getElementById('binIdInput');
            const fillLevelInput = document.getElementById('fillLevelInput');
            const messageBox = document.getElementById('message-box');

            const binId = parseInt(binIdInput.value);
            const fillLevel = parseInt(fillLevelInput.value);

            if (isNaN(binId) || isNaN(fillLevel) || binId < 1 || binId > BINS_DATA.length || fillLevel < 0 || fillLevel > 100) {
                messageBox.textContent = 'Please enter a valid Bin ID (1-4) and Fill Level (0-100).';
                messageBox.className = 'mt-4 text-center text-sm font-medium text-red-500';
                return;
            }

            try {
                const response = await fetch(backendApiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bin_id: binId, fill_level: fillLevel }),
                });

                const data = await response.json();

                if (response.ok) {
                    const binToUpdate = BINS_DATA.find(bin => bin.id === binId);
                    if (binToUpdate) {
                        binToUpdate.fillLevel = fillLevel;
                    }
                    renderBins();
                    messageBox.textContent = data.message || `Bin ${binId} updated successfully.`;
                    messageBox.className = 'mt-4 text-center text-sm font-medium text-green-600';
                } else {
                    messageBox.textContent = data.error || `Error updating bin ${binId}.`;
                    messageBox.className = 'mt-4 text-center text-sm font-medium text-red-500';
                }
            } catch (error) {
                console.error('Error:', error);
                messageBox.textContent = 'Could not connect to the backend server. Please ensure it is running.';
                messageBox.className = 'mt-4 text-center text-sm font-medium text-red-500';
            }
        }
        
        window.onload = renderBins;