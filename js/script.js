document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('date-picker');
    const loadBtn = document.getElementById('load-btn');
    const contentCard = document.getElementById('content');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');

    // Elements to update
    const titleEl = document.getElementById('apod-title');
    const dateEl = document.getElementById('apod-date');
    const mediaContainer = document.getElementById('media-container');
    const explanationEl = document.getElementById('apod-explanation');

    const now = new Date();
    const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    datePicker.max = today;

    fetchApod();

    loadBtn.addEventListener('click', () => {
        const selectedDate = datePicker.value;
        fetchApod(selectedDate);
    });

    async function fetchApod(date = null) {
        contentCard.classList.add('hidden');
        errorEl.classList.add('hidden');
        loadingEl.classList.remove('hidden');

        try {
            // URL atualizada para apontar para o servidor backend local
            let url = 'http://127.0.0.1:5000/api/apod';
            if (date) {
                url += `?date=${date}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Erro ao buscar dados da API da NASA. (Verifique se o backend está rodando)');
            }

            const data = await response.json();
            displayApod(data);

        } catch (error) {
            showError(error.message);
        }
    }

    function displayApod(data) {
        loadingEl.classList.add('hidden');
        titleEl.textContent = data.title;

        const dateObj = new Date(data.date + 'T12:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        dateEl.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        explanationEl.textContent = data.explanation;
        datePicker.value = data.date;
        mediaContainer.innerHTML = '';

        if (data.media_type === 'image') {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            if (data.hdurl) {
                const a = document.createElement('a');
                a.href = data.hdurl;
                a.target = '_blank';
                a.title = "Ver imagem em alta resolução";
                a.appendChild(img);
                mediaContainer.appendChild(a);
            } else {
                mediaContainer.appendChild(img);
            }
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.title = data.title;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        } else {
            mediaContainer.innerHTML = '<p>Mídia não suportada</p>';
        }

        contentCard.classList.remove('hidden');
    }

    function showError(message) {
        loadingEl.classList.add('hidden');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
});
