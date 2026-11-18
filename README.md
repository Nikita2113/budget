# Мой бюджет

Простое приложение для учёта доходов и расходов: месячные лимиты по категориям, цели для накопления, остаток по месяцам. Суммы в рублях.

Один файл `index.html`, без сборки и зависимостей. Данные хранятся в браузере (localStorage) на том устройстве, где открыта страница.

## Запуск
Откройте `index.html` в браузере.

## Публикация через GitHub Pages
1. Создайте репозиторий на GitHub и загрузите туда файлы:
   ```
   git init
   git add .
   git commit -m "Бюджет"
   git branch -M main
   git remote add origin https://github.com/ВАШ_ЛОГИН/budget.git
   git push -u origin main
   ```
2. Settings → Pages → Source: «Deploy from a branch», ветка `main`, папка `/ (root)`.
3. Через минуту сайт будет по адресу `https://ВАШ_ЛОГИН.github.io/budget/`. Эту ссылку можно отправить.

На телефоне ссылку можно добавить на главный экран («Поделиться» → «На экран Домой»).

## Общий бюджет на нескольких устройствах (Firebase)

Без настройки приложение хранит данные только в браузере. Чтобы данные были общими:

1. Откройте https://console.firebase.google.com, войдите через Google и создайте проект (Google Analytics можно отключить).
2. Build → Firestore Database → Create database. Регион: Europe (например `eur3` или `europe-west4`). Режим: production.
3. Вкладка Rules, вставьте и нажмите Publish:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /rooms/{room} {
         allow get: if true;
         allow create, update, delete: if room.matches('[0-9a-f]{64}');
         allow list: if false;
       }
     }
   }
   ```
4. Project settings (шестерёнка) → General → Your apps → значок веб-приложения `</>` → зарегистрируйте приложение. Скопируйте значения из `firebaseConfig` в файл `firebase-config.js`.
5. Закоммитьте и запушьте `index.html` и `firebase-config.js`.
6. На каждом устройстве: кнопка 🎨 → «Общий бюджет» → введите одинаковое секретное слово (минимум 8 символов) → «Подключить».

Данные синхронизируются только между устройствами с одинаковым секретным словом. Не публикуйте его.
