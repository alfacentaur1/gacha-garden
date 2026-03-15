# gacha-garden

Cílem projektu je vytvořit hru podobnou klasickým gacha hrám propojenou s farm planting simulátorem. Hráč má k dispozici přehled dostupných rostlinek s potřebnými informacemi. Hráč nakupuje balíčky, které mají rozdílnou distribuci rostlinek, tzn. každý balíček má jiný obsah s jinými pravděpodobnostmi. Cílem je si vydělat na víc rostlinek, využívat změny počasí a dostupných tools.
Aby tvá zahrada vzkvétala a peněženka se plnila, postupuj podle těchto kroků:

### 1. Nákup semínek
* Kliknutím na tlačítko **"Seed Shop and Lexicon"** na hlavním panelu se přesuň do obchodu.
* Vyber si jeden z balíčků (např. Starter, Green, Exotic) a klikni na **"Buy"**. Každý balíček obsahuje různé rostliny s odlišnou pravděpodobností získání.
* Po nákupu se tlačítkem **"Back"** vrať na hlavní obrazovku.

### 2. Sázení a pěstování
* V pravém sloupci v sekci **"SEEDS"** uvidíš své zakoupené balíčky a jejich počet.
* Pomocí **Drag & Drop** (přetažením myší) vezmi balíček a pusť ho na libovolné volné políčko v zahradě. Tím dojde k rozbalení a zasazení náhodné rostlinky.
* Růst rostliny můžeš sledovat pomocí vizuálního ukazatele (překrytí políčka), který se postupně naplňuje.

### 3. Vliv počasí
* Sleduj sekci **"Weather forecast"**. Aktuální počasí výrazně ovlivňuje rychlost růstu.
* **Rainy (Deštivo)**: Rostliny rostou o 50 % rychleji.
* **Sunny (Slunečno)**: Rostliny rostou o 20 % rychleji.
* **Storm (Bouřka)**: Růst je o 10 % pomalejší.

### 4. Sklizeň a výdělek
* Jakmile ukazatel růstu zmizí a rostlina je plně zobrazena, je připravena ke sklizni.
* **Kliknutím na dospělou rostlinu** ji sklidíš a okamžitě získáš peníze podle její prodejní ceny.
* Pokud potřebuješ peníze rychleji, můžeš využít **Lemonade Stand** (stánek s limonádou) v levém panelu – každé kliknutí ti vydělá $1.

### 5. Používání nástrojů
* V obchodě u Tradera si můžeš koupit **Watering Can** (konvičku) za $1500.
* Přetažením konvičky na pole dojde k okamžitému dozrání všech zasazených rostlin na daném poli.

### 6. Lexicon
* V Lexiconu si můžeš prohlédnout seznam všech rostlin, jejich vzácnost (Common až Legendary), dobu růstu a prodejní cenu.
## Přehled splněných požadavků

### 1. Dokumentace 
* **Cíl a funkčnost**: Popsáno v úvodu tohoto dokumentu.
* **Komentáře**: Zdrojový kód obsahuje vysvětlující komentáře k logice gacha distribuce, Singletonu a renderování.

### 2. HTML 5 
* **Validita**: Použit validní HTML5 doctype.
* **Sémantické značky**: Projekt využívá značky jako `<header>`, `<main>`, `<section>`, `<article>`, `<nav>` a `<aside>` pro logické členění layoutu.
* **Grafika (SVG / Canvas)**:
    * **Canvas**: Slouží k vizualizaci progresu růstu rostlin na jednotlivých políčkách (`reloadCanvas`).
    * **SVG**: Dynamicky generované animované kapky deště při použití konvičky.
* **Média**: 
    * **Video**: Rytíř na dashboardu s atributy `autoplay`, `loop` a `muted`.
    * **Audio**: Zvukové efekty pro nákup, prodej a déšť spouštěné přes JS API.
* **Formulářové prvky**: Implementována sekce pro zadání jména zahradníka s validací, placeholderem a možností vymazání.

### 3. CSS 
* **Pokročilé selektory**: Využití kombinátorů (např. `.statistics > p`, `.stat-item + .stat-item`) a pseudotříd (`:hover`, `.active`).
* **CSS3 Transformace**: Použity efekty `rotate` a `translateY` při interakci s kartami v obchodě a tlačítky.
* **CSS3 Transitions/Animations**:
    * Plynulé přechody mezi stránkami pomocí **View Transition API**.
    * Definované klíčové snímky `@keyframes` pro animace `fade-in` a `slide`.
* **Media Queries**: Plně responzivní design. Layout se mění z mřížky (grid) na sloupcové zobrazení (flex-column) pro mobilní zařízení pod 600px.
* **Nested CSS**: Využití vnořování v rámci CSS pro lepší strukturu (např. u `.seeds` nebo `.location`).

### 4. Javascript 
* **OOP přístup**: Hra využívá třídy (`Plant`, `Pack`, `State`) a návrhový vzor **Singleton** pro globální správu stavu hry.
* **Knihovna**: Využití externí knihovny **Toastify** pro herní notifikace (počasí, nákupy, stav sítě).
* **Pokročilá JS API**:
    * **Drag & Drop**: Přetahování semínek a nástrojů z inventáře na pole.
    * **Geolocation API**: Zjištění polohy uživatele pro doporučení vhodných rostlin (např. tropické rostliny pro nízké zeměpisné šířky).
    * **View Transitions API**: Pro animované přechody v rámci SPA.
* **History API**: Funkční navigace mezi hrou, obchodem a lexikonem pomocí `pushState` a `popstate`, umožňující používat tlačítka zpět/vpřed v prohlížeči.
* **Média API**: Programové ovládání přehrávání zvuků (`.play()`, `.pause()`) v reakci na herní události.
* **Offline režim**: Aplikace sleduje události `online` a `offline` a informuje uživatele o stavu připojení.
* **Práce s SVG**: Funkce `triggerRainEffect` dynamicky vytváří SVG elementy, nastavuje jim atributy a spouští animace deště.
* **Webová komponenta**: Vytvořen vlastní HTML element `<app-header>` pro jednotné záhlaví aplikace.

## Struktura projektu
- `/js/classes/`: Logika objektů a správa stavu (Singleton).
- `/js/config/`: Konfigurace rostlin, balíčků a počasí.
- `/js/render/`: Moduly pro vykreslování jednotlivých stránek SPA a herní smyčka.
- `/css/`: Responzivní styly s využitím moderních CSS vlastností.
