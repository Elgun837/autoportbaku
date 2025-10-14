// Данные туров с полной информацией для детальных страниц
export const toursData = {
    "baku-night-tour": {
        id: 1,
        slug: "baku-night-tour",
        title: {
            en: "Baku City Night Tour: Discover the Mysterious and Dazzling",
            ru: "Ночной тур по Баку: Откройте таинственное и ослепительное"
        },
        shortDescription: {
            en: "Experience the enchanting transformation of Baku City at night. Join our captivating night tour and be mesmerized by the dazzling lights and decorations that illuminate the city.",
            ru: "Испытайте очаровательное преображение города Баку ночью. Присоединяйтесь к нашему захватывающему ночному туру и будьте очарованы ослепительными огнями и украшениями, которые освещают город."
        },
        fullDescription: {
            en: `<h3>Tour Highlights</h3>
<p><strong>Government House</strong> - Government house is one of the most beautiful examples of Baroque architecture in Baku. It also is the remarkable symbol of capital city alongside Flame Towers and Maiden Tower.</p>

<h3>What's Included</h3>
<p>• Bottled water<br/>
• Professional guide<br/>
• Transport by air-conditioned coach/private vehicle according to number of guests<br/>
• Hotel pickup and drop-off (if option selected)</p>

<h3>Additional Information</h3>
<p>Baku is an intriguing city to explore, and its charm is unsurpassed even at night. The capital takes on a magical aura once the day ends. This contemporary metropolis truly shines in the darkness with every building in the heart of the city glowing in its distinctive radiance.</p>

<p>Immerse yourself in our memorable nighttime city tour, and let the myriad of lights and decorations leave you inspired.</p>

<p><strong>NOTE:</strong> If a traveler needs to use stroller and wheelchair during the tour, he/she has to keep us informed about it in advance.</p>`,
            ru: `<h3>Особенности тура</h3>
<p><strong>Дом Правительства</strong> - Дом Правительства является одним из самых красивых примеров архитектуры барокко в Баку. Это также замечательный символ столицы наряду с Пламенными башнями и Девичьей башней.</p>

<h3>Что включено</h3>
<p>• Бутилированная вода<br/>
• Профессиональный гид<br/>
• Транспорт с кондиционером/частный автомобиль в зависимости от количества гостей<br/>
• Трансфер из отеля и обратно (если выбрана опция)</p>

<h3>Дополнительная информация</h3>
<p>Баку - захватывающий город для исследования, и его очарование непревзойденно даже ночью. Столица приобретает волшебную ауру, когда день заканчивается. Этот современный мегаполис действительно сияет в темноте, когда каждое здание в центре города светится своим особым сиянием.</p>

<p>Погрузитесь в наш незабываемый ночной городской тур и позвольте множеству огней и украшений вдохновить вас.</p>

<p><strong>ПРИМЕЧАНИЕ:</strong> Если путешественник нуждается в коляске или инвалидном кресле во время тура, он должен сообщить нам об этом заранее.</p>`
        },
        mainImage: "/src/assets/images/baku.png",
        gallery: [
            "/src/assets/images/baku.png",
            "/src/assets/images/baku_night.png",
            "/src/assets/images/flame_towers.png",
            "/src/assets/images/baku_night.png",
            "/src/assets/images/flame_towers.png",
             "/src/assets/images/baku.png",
            "/src/assets/images/baku_night.png",
            "/src/assets/images/flame_towers.png",
        ],
        duration: {
            en: "3-4 hours",
            ru: "3-4 часа"
        },
        cancellation: {
            en: "Up to 24 hours before the tour starts.",
            ru: "За 24 часа до начала тура."
        },      
    },

    "private-baku-tour": {
        id: 2,
        slug: "private-baku-tour",
        title: {
            en: "Private Baku Night City Tour: Explore with our Local Guide",
            ru: "Частный ночной тур по Баку: Исследуйте с нашим местным гидом"
        },
        shortDescription: {
            en: "Experience the enchanting beauty of Baku at night with our private city tour. Discover hidden corners, iconic landmarks, and fascinating stories with our expert local guide.",
            ru: "Испытайте очаровательную красоту Баку ночью с нашим частным городским туром. Откройте скрытые уголки, знаковые достопримечательности и увлекательные истории с нашим опытным местным гидом."
        },
        fullDescription: {
            en: "Enjoy a personalized exploration of Baku with your own private guide and vehicle. This exclusive tour allows you to set your own pace and focus on the attractions that interest you most, while learning about Azerbaijan's rich culture and history.",
            ru: "Наслаждайтесь персонализированным исследованием Баку с вашим собственным частным гидом и транспортом. Этот эксклюзивный тур позволяет вам установить свой собственный темп и сосредоточиться на достопримечательностях, которые вас больше всего интересуют, изучая богатую культуру и историю Азербайджана."
        },
        mainImage: "/src/assets/images/baku_night.png",
        gallery: [
            "/src/assets/images/baku_night.png",
            "/src/assets/images/flame_towers.png",
            "/src/assets/images/baku.png"
        ],
        duration: {
            en: "4-5 hours",
            ru: "4-5 часов"
        },
        cancellation: {
            en: "Free cancellation up to 24 hours before the tour starts.",
            ru: "Бесплатная отмена за 24 часа до начала тура."
        },
        price: {
            private: 180,
            currency: "USD"
        },
        highlights: {
            en: [
                "Private guide and vehicle",
                "Customizable itinerary",
                "Exclusive access to hidden gems",
                "Professional photography",
                "Flexible timing"
            ],
            ru: [
                "Частный гид и транспорт",
                "Настраиваемый маршрут",
                "Эксклюзивный доступ к скрытым жемчужинам",
                "Профессиональная фотография",
                "Гибкое время"
            ]
        },
        includes: {
            en: [
                "Private professional guide",
                "Private vehicle with driver",
                "Photography service",
                "All entrance fees",
                "Complimentary refreshments"
            ],
            ru: [
                "Частный профессиональный гид",
                "Частный автомобиль с водителем",
                "Услуги фотографа",
                "Все входные билеты",
                "Бесплатные напитки"
            ]
        },
        schedule: {
            en: [
                "Flexible start time (recommended 18:00-19:00)",
                "Customized route based on preferences",
                "Multiple photo stops",
                "Optional dining recommendations",
                "Return at your convenience"
            ],
            ru: [
                "Гибкое время начала (рекомендуется 18:00-19:00)",
                "Индивидуальный маршрут на основе предпочтений",
                "Множественные остановки для фотографий",
                "Дополнительные рекомендации по ресторанам",
                "Возвращение в удобное для вас время"
            ]
        }
    },

    "baku-highlights-tour": {
        id: 3,
        slug: "baku-highlights-tour",
        title: {
            en: "Baku City Tour: Discover Baku's Highlights",
            ru: "Городской тур по Баку: Откройте основные достопримечательности Баку"
        },
        shortDescription: {
            en: "Explore Baku's highlights with expert guides, free photography, and stunning views. Book now for an unforgettable Azerbaijani adventure.",
            ru: "Исследуйте основные достопримечательности Баку с экспертными гидами, бесплатной фотографией и потрясающими видами. Забронируйте сейчас для незабываемого азербайджанского приключения."
        },
        fullDescription: {
            en: "Comprehensive day tour covering all major attractions of Baku. From ancient history to modern architecture, experience the full spectrum of Azerbaijan's capital city with our knowledgeable guides.",
            ru: "Комплексный дневной тур, охватывающий все основные достопримечательности Баку. От древней истории до современной архитектуры, испытайте полный спектр столицы Азербайджана с нашими знающими гидами."
        },
        mainImage: "/src/assets/images/flame_towers.png",
        gallery: [
            "/src/assets/images/flame_towers.png",
            "/src/assets/images/baku.png",
            "/src/assets/images/baku_night.png"
        ],
        duration: {
            en: "6-8 hours",
            ru: "6-8 часов"
        },
        cancellation: {
            en: "Free cancellation up to 24 hours before the tour starts.",
            ru: "Бесплатная отмена за 24 часа до начала тура."
        },
        price: {
            adult: 65,
            child: 35,
            currency: "USD"
        },
        highlights: {
            en: [
                "Flame Towers and Highland Park",
                "Old City UNESCO World Heritage Site",
                "Shirvanshah's Palace",
                "Maiden Tower",
                "Modern Baku architecture"
            ],
            ru: [
                "Пламенные башни и Нагорный парк",
                "Старый город - объект всемирного наследия ЮНЕСКО",
                "Дворец Ширваншахов",
                "Девичья башня",
                "Современная архитектура Баку"
            ]
        },
        includes: {
            en: [
                "Expert local guide",
                "Comfortable transportation",
                "All entrance tickets",
                "Professional photography",
                "Traditional lunch"
            ],
            ru: [
                "Опытный местный гид",
                "Комфортабельный транспорт",
                "Все входные билеты",
                "Профессиональная фотография",
                "Традиционный обед"
            ]
        },
        schedule: {
            en: [
                "09:00 - Hotel pickup",
                "09:30 - Highland Park and Flame Towers",
                "11:00 - Old City tour",
                "13:00 - Traditional lunch",
                "14:30 - Modern Baku exploration",
                "17:00 - Return to hotel"
            ],
            ru: [
                "09:00 - Забор из отеля",
                "09:30 - Нагорный парк и Пламенные башни",
                "11:00 - Тур по Старому городу",
                "13:00 - Традиционный обед",
                "14:30 - Исследование современного Баку",
                "17:00 - Возвращение в отель"
            ]
        }
    },

    "canyon-adventure-tour": {
        id: 4,
        slug: "canyon-adventure-tour",
        title: {
            en: "Canyon Adventure: Nature and History Combined",
            ru: "Приключение в каньоне: Сочетание природы и истории"
        },
        shortDescription: {
            en: "Experience the breathtaking beauty of Azerbaijan's natural landscapes combined with rich historical sites. Perfect for adventure seekers and nature lovers.",
            ru: "Испытайте захватывающую красоту природных ландшафтов Азербайджана в сочетании с богатыми историческими местами. Идеально для искателей приключений и любителей природы."
        },
        fullDescription: {
            en: "Venture beyond Baku to discover Azerbaijan's stunning natural beauty and ancient heritage. This full-day adventure combines hiking, sightseeing, and cultural exploration in one unforgettable experience.",
            ru: "Отправьтесь за пределы Баку, чтобы открыть потрясающую природную красоту и древнее наследие Азербайджана. Это полнодневное приключение сочетает пешие прогулки, осмотр достопримечательностей и культурное исследование в одном незабываемом опыте."
        },
        mainImage: "/src/assets/images/kanyon.png",
        gallery: [
            "/src/assets/images/kanyon.png",
            "/src/assets/images/baku.png",
            "/src/assets/images/flame_towers.png"
        ],
        duration: {
            en: "8-10 hours",
            ru: "8-10 часов"
        },
        cancellation: {
            en: "Free cancellation up to 24 hours before the tour starts.",
            ru: "Бесплатная отмена за 24 часа до начала тура."
        },
        price: {
            adult: 95,
            child: 55,
            currency: "USD"
        },
        highlights: {
            en: [
                "Spectacular canyon views",
                "Ancient petroglyphs and cave paintings",
                "Traditional village visit",
                "Local cuisine tasting",
                "Professional hiking guide"
            ],
            ru: [
                "Захватывающие виды каньона",
                "Древние петроглифы и наскальные рисунки",
                "Посещение традиционной деревни",
                "Дегустация местной кухни",
                "Профессиональный гид по пешим прогулкам"
            ]
        },
        includes: {
            en: [
                "Professional hiking guide",
                "Transportation to/from Baku",
                "All entrance fees",
                "Traditional lunch in village",
                "Safety equipment",
                "Photography service"
            ],
            ru: [
                "Профессиональный гид по пешим прогулкам",
                "Транспорт в/из Баку",
                "Все входные билеты",
                "Традиционный обед в деревне",
                "Оборудование безопасности",
                "Услуги фотографа"
            ]
        },
        schedule: {
            en: [
                "07:00 - Early hotel pickup",
                "09:00 - Arrive at canyon area",
                "09:30 - Begin hiking adventure",
                "12:00 - Traditional lunch break",
                "14:00 - Explore ancient sites",
                "16:00 - Return journey to Baku",
                "18:00 - Arrive back at hotel"
            ],
            ru: [
                "07:00 - Ранний забор из отеля",
                "09:00 - Прибытие в район каньона",
                "09:30 - Начало пешего приключения",
                "12:00 - Перерыв на традиционный обед",
                "14:00 - Исследование древних мест",
                "16:00 - Обратный путь в Баку",
                "18:00 - Прибытие в отель"
            ]
        }
    }
};

// Вспомогательная функция для получения тура по slug
export const getTourBySlug = (slug) => {
    return toursData[slug] || null;
};

// Функция для получения всех туров в виде массива
export const getAllTours = () => {
    return Object.values(toursData);
};