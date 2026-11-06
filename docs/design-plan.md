# Фаворит-групп — решение для первого лендинга

Тип: service / other. Next.js App Router, TypeScript, Tailwind CSS, Motion.

## Направление
Светлый тёплый фон, графитовый текст, приглушённый оливковый в схемах, терракотовая кнопка. Временная текстовая марка, без придуманного логотипа.

## Разделы
1. Hero: анимированная SVG-схема участка — земля, выемка, основание, армирование, бетон. Автоматическая последовательность один раз, пауза, повтор, ручной выбор этапов. Схема иллюстративная.
2. Четыре типа фундаментов: плитный, свайный, ленточный, столбчатый.
3. Точечный, линейный, глубинный дренаж; тематическое изображение.
4. Подход: участок, решение, работы; тематическое изображение плиты.
5. Что подготовить для обсуждения проекта. Контакты и реальная форма появятся после получения данных компании.

## Применение design-taste-frontend
Использованы принципы единого стиля, ровных краёв, конкретных текстов, интерактивных состояний, адаптивности, reduced motion, проверки изображения и веса. Содержимое навыка не менялось.
Запрос пользователя имеет приоритет: небольшие секции вместо фиксированной высоты экрана; анимированный Hero для строительной компании вместо ограничения навыка на неподвижные сервисные страницы; собственная SVG-сцена и Motion вместо готовых технических сцен. Палитра и композиция выбраны для этой сцены, генератор случайных макетов не использован. Автоматические проверки эстетики навыка оцениваются с учётом этих отличий.

## Материалы
Изображения сгенерированы встроенным image_gen, не являются фотографиями объектов компании. На странице есть соответствующая отметка. SVG — условная иллюстрация, не рабочая документация. Нет выдуманных отзывов, цен, стажа, адреса, гарантий.
Оригиналы: public/images/foundation.png, public/images/drainage.png.
Оптимизированные файлы страницы: public/images/foundation.webp, public/images/drainage.webp.

### Prompt: foundation
Use case: photorealistic-natural. Create a premium architectural editorial photograph for a Russian foundation construction and drainage company website. Landscape 3:2 composition. A freshly completed rectangular reinforced concrete slab foundation on a tidy suburban construction site, surrounded by sandy earth, pine trees and birch woodland at the far background. Elevated oblique camera, strong architectural geometry, fine realistic concrete texture, quiet overcast daylight, earthy sand and charcoal palette, subtle fresh olive greenery. No house on slab, no people, no cranes, no lettering, no logos, no watermark, no collage. Realistic construction context, not an engineering diagram. High-end architecture magazine photograph.

### Prompt: drainage
Use case photorealistic-natural. Wide landscape 3:2 editorial architectural construction detail photograph for drainage service website. Close oblique view along a neatly excavated shallow drainage trench with a perforated dark pipe bedded in clean gray crushed stone, white geotextile neatly folded along trench sides, sandy soil and a strip of natural lawn alongside, out of focus birch trees in background. Quiet soft daylight, sophisticated earthy neutral color grading, detailed materials. No people, no machinery, no text or logos or watermarks. Not a diagram, not a collage. Illustrative construction photograph, crisp and professionally composed.

## Сборка
В исходном шаблоне Turbopack падает при запуске CSS worker на этой Windows-среде. Используется Webpack для dev и build; Tailwind подключён стандартным PostCSS plugin. Библиотеки навыков .agents и .claude исключены из ESLint проекта.

## Результаты проверки
- `npm run build`: успешно, страница статически подготовлена.
- `npm run lint`: без ошибок и предупреждений.
- `git diff --check`: без ошибок пробельных символов.
- Визуально проверены снимки 1440×900, 1024×768, 768×1024 и 390×844. Нет горизонтального переполнения. На повторной браузерной проверке нет исключений React.
- Исправлены два рассогласования гидратации: SVG title теперь одна строка; видимость кнопки повтора при reduced motion задаётся CSS, без разных деревьев HTML на сервере и клиенте.
- Performance checker на production: 0 FAIL, 4 WARN; нет сломанных запросов, CLS 0.000 на двух размерах, загружено около 339 KiB на десктопе и 306 KiB на телефоне. Это локальные лабораторные измерения, не полевые показатели.
- Предупреждения: JS после распаковки около 590 KiB (около 184 KiB передано с компрессией); два изображения используют Next Image fill без HTML width/height, при этом место под них зарезервировано размерами контейнеров и сдвигов не найдено.
- Строгий layout-check навыка не проходит его требования фиксированной высоты секций, фиксированной шапки и именованной 12-колоночной сетки. Используются компактные секции и собственная адаптивная сетка по запросу пользователя. edge-left для внутренних колонок и правых ссылок не является переполнением; снимки проверены вручную. Эти требования намеренно не навязываются дизайну.
- Полная consistency-проверка dev-страницы остановлена из-за длительности; её частичные результаты не считаются итоговым вердиктом. Итоговая геометрия, сборка и production perf проверены отдельно.

## Основной шрифт
Manrope Variable (200–800), локально через next/font/local. Файл app/fonts/Manrope-Variable.ttf и лицензия app/fonts/OFL.txt взяты из официального репозитория Google Fonts (ofl/manrope). Применён ко всем разделам и элементам интерфейса. CSS fallback: Arial, Helvetica, sans-serif. Временная SVG-иконка вкладки использует системный шрифт независимо от страницы.


## Обновление: доверие, карточки и прокрутка
По прямому запросу пользователя добавлены тёмная акцентная карточка, срезанные углы clip-path, чертёжный декор и рулетка, раскрывающаяся при прокрутке. Это намеренные исключения из ограничений design-taste-frontend для сайтов услуг. Макет карточек и материалы созданы для этой компании.

Четыре утверждения предоставлены пользователем: обязательный проект, выполнение по ГОСТ/СП/СНиП, подробная оптимизированная смета, опытные оснащённые бригады. Не добавлены выдуманные сертификаты, сроки, финансовые гарантии или отзывы.

Путь посетителя: Hero → краткие принципы → выбор услуги → подробные аргументы доверия → этапы работы и план дома → подготовка запроса. Ссылки ведут к существующим разделам. Финальная форма формирует текст локально; не отправляет заявки и не собирает данные на сервере. Контакты компании ещё не предоставлены.

Новая иллюстрация: `public/images/planning.png`, оптимизированная версия `public/images/planning.webp`, создана встроенным image_gen. Это тематическая визуализация, не рабочий чертёж и не объект компании.

Проверки: production build и ESLint прошли. `node scripts/smoke-ui.mjs` проверяет 320, 390, 768, 1024 и 1440 px, отсутствие горизонтального переполнения, мобильную навигацию, выбор этапа Hero, раскрытие рулетки со скроллом, подготовку запроса и выбор дренажа, статичное состояние reduced motion, исключения JavaScript и сломанные ресурсы. Все проверки прошли. Буфер обмена автоматически не менялся. Снимки: shots/premium.

### Prompt: planning
Use case: photorealistic-natural. Asset: premium construction company landing page editorial detail photograph. Wide landscape 3:2 composition, shot from directly above. A large unbranded architectural house floor plan printed on ivory paper resting on a warm gray concrete drafting desk. Thin technical graphite lines, simple rooms and foundation layout, no readable writing or logos. A small charcoal and muted yellow professional tape measure in the upper right, a short exposed steel yellow measuring tape laid diagonally over the drawing, one graphite carpenter pencil near lower edge, a little natural paper curl. Refined quiet construction engineering still life, tactile paper and metal textures, soft daylight coming from left, natural subtle shadows, sophisticated restrained warm neutral palette. The drawing is illustrative, not a usable engineering plan. No people, no text overlays, no watermark, no collage, no clutter, no safety claims.

## Правки по аннотациям браузера
Последующая правка: раздел дренажа заменён тремя самостоятельными статьями — точечный, линейный и глубинный. На десктопе фото чередуются справа/слева/справа, на телефоне описание всегда перед своей фотографией. В каждом блоке есть назначение, объяснение работы, области применения и переход к мессенджерам.

Новые изображения созданы встроенным image_gen: public/images/drainage-point.png и public/images/drainage-linear.png. На странице используются оптимизированные drainage-point.webp и drainage-linear.webp. Для глубинного сохранено public/images/drainage.webp. Все изображения тематические иллюстрации, не фотографии выполненных компанией работ.

### Prompt: point drainage
Use case photorealistic-natural. Asset: editorial detail photograph for premium drainage construction services landing page. Wide 3:2 landscape photo. Close ground-level oblique view of a square black cast iron stormwater inlet grate beneath the outlet of a graphite metal downspout beside a minimalist light stone suburban house. The downspout ends several centimeters above the grate, no pipe crossing the grate. Clean beige stone paving carefully graded around the square inlet, a little natural rainwater flowing into its slots, green grass on one side, restrained garden softly out of focus. Clearly show a single point collection drain, not a long channel or buried perforated pipe. Realistic tidy installation, architectural magazine composition, quiet soft overcast daylight, warm neutral natural tones matching concrete and muted green. No people, readable writing, brands, logos or watermark. Illustrative photo, not a client's completed project.

### Prompt: linear drainage
Use case photorealistic-natural. Asset: editorial photograph for premium drainage construction services landing page. Wide 3:2 landscape photo. Ground-level architectural perspective along a long narrow linear drainage channel with a dark steel slotted grate installed flush in elegant pale beige stone paving along the edge of a suburban house terrace. Long straight grate is the main subject, running from lower foreground diagonally toward upper background; clipped green lawn borders the opposite side. A small amount of rainwater on paving makes the drainage purpose understandable. Quiet minimalist contemporary residential exterior, detailed realistic materials, soft overcast daylight and warm neutral muted green palette, high-end architectural photography. No square inlet, exposed pipes, people, readable writing, logos, watermark or collage. Illustrative scene, not a client's completed project.

1. Форма подготовки запроса удалена. Её заменил SocialContacts: Telegram и WhatsApp с локальными цветными SVG из библиотеки навыка. Пользователь разрешил временные контакты; пока URL равны null, блок отмечен демонстрационным и не ведёт на случайные чужие аккаунты. Подключение реальных ссылок — в components/social-contacts.tsx.
2. Карточки вынесены в FoundationCards: однократное последовательное появление с интервалом 130 ms и длительностью 650 ms. На телефоне каждая карточка запускается при своём появлении в экране; reduced motion оставляет все карточки видимыми.
3. Сразу после фундаментов добавлен ConcreteScene: 300svh на десктопе, 240svh на телефоне. Sticky-сцена высотой экран: две части опалубки сходятся, появляется поток бетона, заполнение раскрывается по площади, в конце остаётся готовая плита. SVG и MotionValue обновляются без React setState на каждый кадр. При reduced motion — короткий статичный раздел без sticky.

Требования анимации появления, длинной сцены и тёмного оформления прямо заданы пользователем и имеют приоритет над ограничениями design-taste-frontend. Новые фотографии для этой правки не генерировались.

Проверка в headless Chrome: 320, 390, 768, 1024, 1440 px — переполнения нет. Проверена реальная последовательность прозрачности карточек, конечное видимое состояние, начало/середина/конец заливки на 390 и 1440 px, закрепление сцены, уменьшенное движение, отсутствие формы и двух сторонних URL-заглушек, меню и рулетка. Исключений JavaScript и сломанных ресурсов не обнаружено.
