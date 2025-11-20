// Перевірка що DOM завантажено перш ніж запускати скрипти
document.addEventListener('DOMContentLoaded', () => {


    // ЗАВДАННЯ 1 (ЛР4): Перемикання видимості блоків (Toggle)
    function initializeToggles() {
        const headers = document.querySelectorAll('.toggle-header');

        headers.forEach(header => {
            // Знаходимо контент (наступний елемент) та стрілку
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.toggle-arrow');

            if (!content || !arrow) return;

            // Встановлює початковий стан (закрито)
            content.classList.add('collapsed');
            arrow.classList.add('rotated');

            // Додаємо обробник події click
            header.addEventListener('click', () => {
                // Перемикаємо клас видимості контенту
                content.classList.toggle('collapsed');
                // Перемикаємо клас для обертання стрілки
                arrow.classList.toggle('rotated');
            });
        });
    }


    // ЗАВДАННЯ 2 (ЛР4): Встановлення повного імені
    function setFullName(firstName, lastName, elementId) {
        const nameElement = document.getElementById(elementId);
        if (nameElement) {
            // Використовуємо innerHTML, щоб зберегти форматування <br> та <strong> з макета
            nameElement.innerHTML = `${firstName} <br /><strong>${lastName}</strong>`;
        }
    }


    // ЗАВДАННЯ 3 (ЛР4): Генерація контенту з масиву
    function generateExperience(data) {
        const container = document.getElementById('experience-container');
        if (!container) return;

        // Очищення контейнера перед вставкою
        container.innerHTML = '';

        // Перевірка, чи масив jobs порожній або не існує
        if (!data || data.length === 0) {
            // Виводимо повідомлення, якщо досвіду немає
            container.innerHTML = `
            <p style="text-align: center; color: #555555; font-size: 2em; padding: 20px;">
                No work experience
            </p>
        `;
            return; // Завершуємо виконання функції
        }

        // Генерація HTML та вставка
        data.forEach(job => {
            const jobHtml = `
                <div class="experience-block">
                    <h3>${job.title}</h3>
                    <p><span class="experience-block-time">${job.date}</span> ${job.company}</p>
                    <p class="experience-about">${job.description}</p>
                </div>
            `;
            container.innerHTML += jobHtml;
        });
    }


    /**
     * =================================================================
     * ЗАВДАННЯ 5 (ЛР5): Асинхронне завантаження даних (AJAX / Fetch)
     * =================================================================
     */

    // Функція для завантаження та обробки даних з data.json
    async function loadDataAndRender() {
        try {
            // 1. Виконує запит до data.json
            const response = await fetch('data.json');

            // Перевірка чи запит успішний
            if (!response.ok) {
                throw new Error(`Помилка HTTP: ${response.status}`);
            }

            // 2. Перетворює відповідь на об'єкт Json
            const data = await response.json();

            // 3. Замінюємо захардкоджені значення (Завдання 5.3)

            //  3.1. Підстановка повного імені
            if (data.personal) {
                setFullName(data.personal.firstName, data.personal.lastName, "personName");
            }

            //  3.2. Побудова списку досвіду
            if (data.jobs) {
                generateExperience(data.jobs);
            }

        } catch (error) {
            //  4. Обробка помилок
            console.error('Не вдалося завантажити дані:', error);

            // Відображає службове повідомлення на сторінці
            const container = document.getElementById('experience-container');
            if (container) {
                container.innerHTML = '<p style="color: red; text-align: center;">Не вдалося завантажити дані. </p>';
            }
        }
    }

    // =================================================================
    // ЗАПУСК СКРИПТІВ
    // =================================================================

    // 1. Ініціалізація перемикачі (ЛР4)
    initializeToggles();

    // 2. Завантаження та підгонка/вставка динамічних даних (ЛР5)
    loadDataAndRender();
});