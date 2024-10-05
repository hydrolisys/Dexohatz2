        const events = [
            { year: "1992", event: "Discovery of the first exoplanet", img: "https://cdn.mos.cms.futurecdn.net/Hj9KHU62pjaktrn9Vqh8E8-1200-80.jpg" },
            { year: "1995", event: "Discovery of 51 Pegasi b", img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Didier_Queloz_and_Michel_Mayor_at_La_Silla_%286812451755%29.jpg" },
            { year: "2001", event: "Discovery of the planet HD 28185 b", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Jkv.HD28185.b.png/290px-Jkv.HD28185.b.png" },
            { year: "2016", event: "Discovery of the planet Proxima b", img: "https://upload.wikimedia.org/wikipedia/commons/8/81/Artist%E2%80%99s_impression_of_Proxima_Centauri_b_shown_hypothetically_as_an_arid_rocky_super-earth.jpg" },
            { year: "2018", event: "The Launch of TESS", img: "https://science.nasa.gov/wp-content/uploads/2023/06/tessinspacerender16by9-jpg.webp?w=4096&format=png" },
            { year: "2019", event: "Exoplanet count reached 4000", img: "https://i.ytimg.com/vi/EAUwsXSENA4/maxresdefault.jpg" },
            { year: "2022", event: "Exoplanet count reached 5000", img: "https://www.watchmojo.com/uploads/thumbs720/UV-NASA-Has-Discovered-5000-Exoplanets-What-Have-We-Learnt-So-Far_D7L6K7-2.jpg" },
        ];

        const cardsContainer = document.getElementById('cardsContainer');
        let draggedCard = null;
        let isCorrect = false;

        events.forEach(e => {
            const card = document.createElement('div');
            card.className = 'card';
            card.draggable = true;
            card.innerText = `${e.event}`;
            card.dataset.year = e.year;
            card.dataset.event = e.event;
            card.dataset.img = e.img;

            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);

            cardsContainer.appendChild(card);
        });

        const years = document.querySelectorAll('.year');

        years.forEach(year => {
            year.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            year.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedCard && !isCorrect) {
                    const existingCard = year.querySelector('.card');
                    if (existingCard) {
                        const tempCard = existingCard;
                        tempCard.replaceWith(draggedCard);
                        cardsContainer.appendChild(tempCard);
                    } else {
                        year.appendChild(draggedCard);
                    }
                }
            });
        });

        cardsContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        cardsContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedCard && !isCorrect) {
                const existingCard = cardsContainer.querySelector(`[data-year="${draggedCard.dataset.year}"]`);
                if (!existingCard) {
                    cardsContainer.appendChild(draggedCard);
                }
            }
        });

        document.getElementById('checkBtn').addEventListener('click', () => {
            let correct = true;

            years.forEach(year => {
                const card = year.querySelector('.card');
                if (card) {
                    const cardYear = card.dataset.year;
                    if (cardYear !== year.dataset.year) {
                        correct = false;
                    }
                } else {
                    correct = false;
                }
            });

            const messageText = document.getElementById('messageText');

            if (correct) {
                isCorrect = true;
                messageText.textContent = "Everything is correct!";

                years.forEach(year => {
                    const card = year.querySelector('.card');
                    if (card) {
                        const imgSrc = card.dataset.img;
                        card.innerHTML = `<img src="${imgSrc}" alt="event image" style="width: 100px; height: 100px; object-fit: cover">`;
                        card.draggable = false;
                    }
                });

            } else {
                messageText.textContent = "Incorrect, try again!";
            }

            document.getElementById('overlay').style.display = 'block';
            const messageBox = document.getElementById('messageBox');
            messageBox.style.display = 'block';

            setTimeout(() => {
                messageBox.classList.add('show');
            }, 10);
        });

        // Обработчик кнопки "Close"
        document.getElementById('closeBtn').addEventListener('click', () => {
            document.getElementById('overlay').style.display = 'none';
            const messageBox = document.getElementById('messageBox');
            messageBox.classList.remove('show');
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 300);
        });

        function handleDragStart() {
            draggedCard = this;
            setTimeout(() => this.classList.add('invisible'), 0);
        }

        function handleDragEnd() {
            this.classList.remove('invisible');
            draggedCard = null;
        }

        document.getElementById('resetBtn').addEventListener('click', () => {
            const placedCards = document.querySelectorAll('.year .card');
            placedCards.forEach(card => {
                cardsContainer.appendChild(card);
                card.innerHTML = `${card.dataset.event}`;
                card.draggable = true;
            });

            years.forEach(year => {
                const card = year.querySelector('.card');
                if (card) {
                    cardsContainer.appendChild(card);
                }
            });

            isCorrect = false;
        });