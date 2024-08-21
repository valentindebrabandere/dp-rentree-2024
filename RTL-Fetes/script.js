
        // online datas
        const iconPath = "http://dossiersdepresse.be/wp-content/uploads/2023/11/";
        const dataURL = "https://gist.githubusercontent.com/valentin-deB/115e1d9b2cfc6470544f118a8a65b3bd/raw/rtl-dp-data.json";

        // local datas
        // const dataURL = "/clean/Untitled/rtl-dp-data.json"


        const categoryContainer = document.querySelector('.c-category-container');
        let programChannels = {};


        // Fetching JSON data and rendering it
        fetch(dataURL)
            .then(response => response.json())
            .then(data => {
                programChannels = data.RTL_Belgium_Press_Kit.programsChannels;

                const categories = data.RTL_Belgium_Press_Kit.categories;
                renderCategories(categories);

                const horoscope = data.RTL_Belgium_Press_Kit;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


        // Function to initialize and play the Vimeo video
        function playVideo(event) {

            var button = event.currentTarget;
            var miniature = button.parentElement;
            var vimeoContainer = miniature.nextElementSibling;

            // Hide the miniature image
            miniature.style.display = 'none';
            vimeoContainer.style.display = 'block';

            // Create a new Vimeo player instance
            var iframe = vimeoContainer.querySelector('iframe');
            var player = new Vimeo.Player(iframe);

            // Start playing the video
            player.play().catch(function (error) {
                console.error('Error playing the video:', error);
            });
        }


        function noPropertyWarn(program, missingProperty, objectToReturn = '') {
            console.warn(`No ${missingProperty} for this program: ${program.title}`);
            return objectToReturn;
        }

        function toggleReadMore(button) {

            const description = button.previousElementSibling;
            description.style.maxHeight = description.style.maxHeight ? null : description.scrollHeight + "px";
            let textContent = ['Lire plus', 'Lire moins'];
            button.textContent = textContent[textContent.indexOf(button.textContent) ^ 1];

        }

        // Function to render categories and types
        function renderCategories(categories) {
            const container = document.querySelector('.c-category-container');
            let htmlContent = '';
            for (const categoryKey in categories) {
                const category = categories[categoryKey];
                htmlContent += `<div class="c-category c-category--${category.id}" id="${category.id}">
                    <div class="c-category__title-wrapper">
                        <h2 class="c-category__title" data-text="${category.title}">${category.title}</h2>
                    </div>`;
                if (category.programs) {
                    htmlContent += '<div class="c-program-card-container">';
                    category.programs.forEach(program => {
                        htmlContent += createProgramCard(program);
                    });
                    htmlContent += '</div>';
                }
                else if (category.horoscopes) {
                    htmlContent += '<div class="c-horoscope-card-container">';
                    category.horoscopes.forEach(horoscope => {
                        htmlContent += createHoroscopeCard(horoscope);
                    });
                    htmlContent += '</div>';
                }
                else {
                    for (const typeKey in category.type) {
                        const type = category.type[typeKey];
                        htmlContent += `<div class="type"><h4 class="c-type__title">${type.title}</h4><div class="c-program-card-container">`;
                        type.programs.forEach(program => {
                            htmlContent += createProgramCard(program);
                        });
                        htmlContent += '</div></div>'; // Closing c-program-card-container and type
                    }
                }

                htmlContent += '</div>'; // Closing category
            }

            container.innerHTML = htmlContent;
        }

        function createProgramCard(program) {
            const imageLink = program.photo ? program.photo : "https://placehold.co/400x600";

            return `
                <div class="c-program">
                    <div class="c-program-card" onclick="openModal(event)">
                        <div class="c-program-card__media">  
                                <img class="c-program-card__image" src="${imageLink}" alt="${program.title}" loading="lazy">
                        </div>
                        <div class="c-program-card__content">
                            <h5 class="c-program-card__date">${program.date}</h5>
                            <h3 class="c-program-card__title">${program.title}</h3>
                        </div>
                    </div>
                    <dialog class="c-show-window">
                        <button class="c-show-window__focus""></button>
                        <div class="c-show-window__container">
                            <div class="c-show-window__media">
                                <img class="c-show-window__image" src="${imageLink}" alt="${program.title}" loading="lazy">
                            </div>
                            <div class="c-show-window__content">
                                <div class="c-show-window__title-group">
                                    ${program.date ? `<h4 class="c-show-window__date">${program.date}</h4>` : noPropertyWarn(program, 'date')}
                                    ${program.title ? `<h3 class="c-show-window__name">${program.title}</h3>` : noPropertyWarn(program, 'title')}
                                    ${program.presenters ? `<h4 class="c-show-window__presentators">${program.presenters.join(', ')}</h4>` : noPropertyWarn(program, 'presenters')}
                                </div>

                                ${program.description ? `
                                    <p class="c-show-window__description">${program.description}</p>`
                                    : noPropertyWarn(program, 'description')
                                }
                                <div class="c-show-window__footer">
                                    <ul class="c-show-window__channels">
                                        ${program.channels.map(channel => `
                                            <li class="c-show-window__channel">
                                                <a class="c-show-window__channel-link" href="${programChannels[channel].link}" target="_blank">
                                                    <img tabindex="-1" class="c-show-window__channel-icon" src="${iconPath + "RTL_" + channel}.svg" alt="${programChannels[channel].name} logo" loading="lazy">
                                                </a>
                                            </li>
                                        `).join('')}
                                    </ul>

                                    ${program.link ? `
                                        <a class="c-show-window__link"  href="${program.link}" target="_blank">
                                            <img class="c-show-window__link-icon" tabindex="-1" src="http://dossiersdepresse.be/wp-content/uploads/2023/12/arrow-right-circle.svg" alt="right arrow svg" loading="lazy">
                                        </a>`
                                    : ''}
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            `;
        }

        function openModal(e) {

            const modal = e.currentTarget.parentElement.querySelector('dialog');
            modal.focus();
            modal.addEventListener("click", e => {
                const dialogDimensions = modal.getBoundingClientRect()
                if (
                    e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom
                ) {
                    enableScroll();
                    modal.close()
                }
            })

            const btnAndLinks = modal.querySelectorAll('a, button');
            btnAndLinks.forEach(btnOrLink => {
                console.log(btnOrLink)
                btnOrLink.blur();
            });

            modal.showModal();
            // prevent scrolling
            disableScroll();
        }

        function disableScroll() {
            // Get the current page scroll position
            scrollTop =
            window.scrollY || document.documentElement.scrollTop;
            scrollLeft =
            window.scrollX || document.documentElement.scrollLeft,
         
                // if any scroll is attempted,
                // set this to the previous value
                window.onscroll = function() {
                    window.scrollTo(scrollLeft, scrollTop);
                };
        }
         
        function enableScroll() {
            window.onscroll = function() {};
        }

        function createHoroscopeCard(horoscope) {
            return `
                <div class="c-horoscope-card" onclick="this.classList.toggle('c-horoscope-card--active')">
                    <div class="c-horoscope-card__front c-horoscope-card__face">
                        <img class="c-horoscope-card__img"
                            src="${"http://dossiersdepresse.be/wp-content/uploads/2023/12/" + horoscope.sign + ".svg"}" alt="${horoscope.sign} icon"
                            loading="lazy">
                        <h3 class="c-horoscope-card__main-title">${horoscope.sign}</h3>
                    </div>
                    <div class="c-horoscope-card__back c-horoscope-card__face">
                        <div class="c-horoscope-card__title-group">
                            <h4 class="c-horoscope-card__title">${horoscope.sign}</h4>
                            <h5 class="c-horoscope-card__short">${horoscope.horoscope}</h5>
                        </div>
                        <p class="c-horoscope-card__prediction">${horoscope.prediction}</p>
                        <img class="c-horoscope-card__back-deco"
                            src="${"http://dossiersdepresse.be/wp-content/uploads/2023/12/" + horoscope.sign + ".svg"}" alt="${horoscope.sign} icon"
                            loading="lazy">
                    </div>
                </div>`;
        }