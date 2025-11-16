// Переконуємося, що DOM завантажено, перш ніж запускати скрипти
document.addEventListener('DOMContentLoaded', () => {

    /**
     * ЗАВДАННЯ 1: Встановлення повного імені
     */
    function setFullName(firstName, lastName, elementId) {
        const nameElement = document.getElementById(elementId);
        if (nameElement) {
            // Використовуємо innerHTML, щоб зберегти форматування <br> та <strong> з макета
            nameElement.innerHTML = `${firstName} <br /><strong>${lastName}</strong>`;
        }
    }

    // Виклик функції для Завдання 1
    setFullName("JOHN", "ABIRAR", "personName");

    // -----------------------------------------------------------------

    /**
     * ЗАВДАННЯ 3: Генерація контенту з масиву
     * (Виконуємо до Завдання 2, оскільки воно створює контент, який Завдання 2 буде приховувати)
     */
    const experienceData = [
        {
            date: "Present",
            title: "Enter Job Position Here",
            company: "Company / Location",
            description: "Lorem ipsum dolor sit amet, this is a thena consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore"
        },
        {
            date: "2017–2019",
            title: "Enter Job Position Here",
            company: "Company / Location",
            description: "Lorem ipsum dolor sit amet, this is a thena consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore"
        }
    ];

    function generateExperience(data) {
        const container = document.getElementById('experience-container');
        if (!container) return;

        // Очищення контейнера перед вставкою
        container.innerHTML = '';

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

    // Виклик функції для Завдання 3
    generateExperience(experienceData);

    // -----------------------------------------------------------------

    /**
     * ЗАВДАННЯ 2: Перемикання видимості блоків (Toggle)
     */
    function initializeToggles() {
        const headers = document.querySelectorAll('.toggle-header');

        headers.forEach(header => {
            // Знаходимо контент (наступний елемент) та стрілку
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.toggle-arrow');

            if (!content || !arrow) return;

            // // Встановлюємо початковий стан (закрито)
            // content.classList.add('collapsed');
            // arrow.classList.add('rotated');

            // Додаємо обробник події click
            header.addEventListener('click', () => {
                // Перемикаємо клас видимості контенту
                content.classList.toggle('collapsed');
                // Перемикаємо клас для обертання стрілки
                arrow.classList.toggle('rotated');
            });
        });
    }

    // Виклик функції для Завдання 2
    initializeToggles();
});