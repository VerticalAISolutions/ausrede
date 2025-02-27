document.getElementById('excuseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        recipient: document.getElementById('recipient').value,
        situation: document.getElementById('situation').value,
        email: document.getElementById('email').value
    };

    try {
        // Hier URL deines Backends einsetzen
        const response = await fetch('https://6zcqvu.buildship.run/ausreden-generator-copy-69386eeec037/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        // Zeige das Ergebnis an
        document.getElementById('result').style.display = 'block';
        document.getElementById('excuseText').textContent = data.excuse;
        
        // Audio-Element mit der generierten Audio-URL aktualisieren
        const audioElement = document.getElementById('excuseAudio');
        audioElement.src = data.audioUrl;
        
        // E-Mail-Button Event Listener
        document.getElementById('sendEmail').addEventListener('click', async () => {
            try {
                const emailResponse = await fetch('https://6zcqvu.buildship.run/ausreden-generator-copy-69386eeec037/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        excuse: data.excuse,
                        audioUrl: data.audioUrl
                    })
                });
                
                if (emailResponse.ok) {
                    alert('E-Mail wurde erfolgreich versendet!');
                } else {
                    throw new Error('E-Mail konnte nicht versendet werden.');
                }
            } catch (error) {
                alert('Fehler beim Versenden der E-Mail: ' + error.message);
            }
        });

    } catch (error) {
        alert('Fehler beim Generieren der Ausrede: ' + error.message);
    }
}); 
