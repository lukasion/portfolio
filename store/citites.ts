import {defineStore} from 'pinia'

export const useCitiesStore = defineStore('cities', () => {
    const cities = ref<object>({
        'katowice': {
            singular: 'Katowice',
            plural: 'Katowicach',
            genitive: 'Katowic',
            voivodeship: 'Śląsk',
            description: `
                Zajmuję się <strong>tworzeniem stron internetowych dla klientów z Katowic jak i&nbsp;całej Polski</strong> opartych o system 
                zarządzania treścią <strong>Wordpress</strong> (i nie tylko). Tworzę rozwiązania dla potrzeb małych 
                i średnich firm działających na terenie miasta Katowice, które chcą <strong>zaistnieć w sieci</strong>. 
                Wszystkie moje strony są responsywne, co oznacza, że są dostosowane do urządzeń 
                mobilnych. 
                <br/> <br/> 
                Tworzone przeze mnie strony WWW Katowice są <strong>zgodne z&nbsp;najnowszymi 
                trendami i&nbsp;standardami</strong>, co pozwala na ich długotrwałe użytkowanie. 
                Wszystkie opracowywane aplikacje są zoptymalizowane pod kątem SEO, sprawiając że są one 
                lepiej widoczne w&nbsp;wynikach wyszukiwania, co przekłada się na zwiększenie ruchu na 
                stronie i&nbsp;zwiększenie sprzedaży.
            `
        },
        'warszawa': {
            singular: 'Warszawa',
            plural: 'Warszawie',
            genitive: 'Warszawy',
            voivodeship: 'Mazowieckie',
            description: `
                Warszawa, stolica Polski, jest miejscem, gdzie <strong>tworzę nowoczesne strony internetowe dla firm z różnych branż</strong>. 
                Moje projekty oparte są na <strong>Wordpressie</strong>, ale nie ograniczam się tylko do tego systemu. 
                <br/> <br/>
                Moje strony internetowe są <strong>responsywne</strong>, co oznacza, że idealnie wyświetlają się na urządzeniach mobilnych. 
                <br/> <br/>
                Dla firm z Warszawy oferuję strony <strong>zgodne z najnowszymi trendami i standardami</strong>, co gwarantuje ich długotrwałe i efektywne użytkowanie. 
                Dodatkowo, wszystkie strony są zoptymalizowane pod kątem SEO, co zwiększa ich widoczność w wynikach wyszukiwania i przekłada się na większy ruch na stronie.
            `
        },
        'krakow': {
            singular: 'Kraków',
            plural: 'Krakowie',
            genitive: 'Krakowa',
            voivodeship: 'Małopolskie',
            description: `
                Kraków, serce Małopolski, to miejsce, gdzie moja pasja do <strong>tworzenia wyjątkowych stron internetowych</strong> spotyka się z bogatą historią i kulturą. 
                <br/><br/>
                Moje projekty dla firm z Krakowa to nie tylko strony internetowe - to <strong>unikalne wizualne opowieści</strong>, które przyciągają uwagę klientów i wyróżniają się na tle konkurencji. 
                <br/><br/>
                Stawiam na <strong>kreatywność, funkcjonalność i nowoczesne rozwiązania technologiczne</strong>, aby strony były nie tylko estetyczne, ale także efektywne w generowaniu ruchu i konwersji.
            `
        },
        'poznan': {
            singular: 'Poznań',
            plural: 'Poznaniu',
            genitive: 'Poznania',
            voivodeship: 'Wielkopolskie',
            description: `
                Poznań, stolica Wielkopolski, to miejsce, gdzie <strong>tworzę dynamiczne i efektywne strony internetowe dla różnorodnych firm</strong>. 
                <br/><br/>
                Moje projekty w Poznaniu to nie tylko proste witryny internetowe - to <strong>interaktywne platformy</strong>, które angażują użytkowników i budują trwałe relacje z klientami. 
                <br/><br/>
                Dzięki moim usługom, firmy z Poznania mogą liczyć na <strong>profesjonalne wsparcie</strong> w budowaniu swojej obecności online i osiąganiu sukcesów biznesowych.
            `
        },
        'gdansk': {
            singular: 'Gdańsk',
            plural: 'Gdańsku',
            genitive: 'Gdańska',
            voivodeship: 'Pomorskie',
            description: `
                Gdańsk, perła nad Bałtykiem, to miasto, w którym <strong>tworzę innowacyjne i wizjonerskie projekty internetowe dla różnorodnych przedsiębiorstw</strong>. 
                <br/><br/>
                Moje działania skupiają się na <strong>połączeniu piękna z funkcjonalnością</strong>, aby stworzyć nie tylko strony internetowe, ale prawdziwe <strong>digitalne arcydzieła</strong>. 
                <br/><br/>
                Dzięki mojej pasji do technologii i wzornictwa, firmy z Gdańska mogą liczyć na <strong>nowoczesne rozwiązania</strong>, które przyciągają uwagę klientów i budują silną markę online.
            `
        },
        'wroclaw': {
            singular: 'Wrocław',
            plural: 'Wrocławiu',
            genitive: 'Wrocławia',
            voivodeship: 'Dolnośląskie',
            description: `
                Wrocław, miasto spotkań i inspiracji, to miejsce, gdzie <strong>realizuję ambitne projekty stron internetowych dla firm z różnych sektorów i branż</strong>. 
                <br/><br/>
                Moje podejście opiera się na <strong>łączeniu wiedzy technicznej z kreatywnością</strong>, co pozwala mi tworzyć strony internetowe, które nie tylko zachwycają estetyką, ale także działają jak efektywne narzędzia biznesowe. 
                <br/><br/>
                Dla firm z Wrocławia oferuję nie tylko standardowe rozwiązania, ale <strong>indywidualnie dopasowane strategie online</strong>, które przyczyniają się do wzrostu ich sukcesów w świecie cyfrowym.
            `
        },
        'bydgoszcz': {
            singular: 'Bydgoszcz',
            plural: 'Bydgoszczy',
            genitive: 'Bydgoszczy',
            voivodeship: 'Kujawsko-Pomorskie',
            description: `
                Bydgoszcz, miasto z tradycją i nowoczesnością, to miejsce, gdzie <strong>realizuję unikatowe projekty internetowe dla przedsiębiorstw z regionu i nie tylko</strong>. 
                <br/><br/>
                Moje podejście do tworzenia stron opiera się na <strong>rozumieniu potrzeb klientów i ich biznesów</strong>, co pozwala mi dostarczać rozwiązania, które naprawdę przynoszą wartość i wzmacniają ich obecność w sieci. 
                <br/><br/>
                Dla firm z Bydgoszczy oferuję nie tylko strony internetowe, ale <strong>kompleksowe strategie cyfrowe</strong>, które pomagają w osiąganiu celów biznesowych i budowaniu trwałych relacji z klientami.
            `
        },
        'gdynia': {
            singular: 'Gdynia',
            plural: 'Gdyni',
            genitive: 'Gdyni',
            voivodeship: 'Pomorskie',
            description: `
                Gdynia, dynamiczne miasto nad Morzem Bałtyckim, to miejsce, gdzie <strong>tworzę nowoczesne i zaskakujące projekty internetowe dla różnorodnych firm i instytucji</strong>. 
                <br/><br/>
                Moje podejście do projektowania stron opiera się na <strong>łączeniu estetyki z funkcjonalnością</strong>, co pozwala mi tworzyć witryny, które nie tylko zachwycają wyglądem, ale także skutecznie przekazują przekaz klientów. 
                <br/><br/>
                Dla przedsiębiorstw z Gdyni oferuję nie tylko standardowe rozwiązania, ale <strong>indywidualnie dopasowane strategie online</strong>, które wspierają ich w osiąganiu sukcesów w świecie internetu.
            `
        },
        'kielce': {
            singular: 'Kielce',
            plural: 'Kielcach',
            genitive: 'Kielc',
            voivodeship: 'Świętokrzyskie',
            description: `
        Kielce, miasto w sercu Polski, to miejsce, gdzie <strong>realizuję innowacyjne projekty internetowe dla lokalnych przedsiębiorstw oraz klientów z całego kraju</strong>. 
        <br/><br/>
        Moje strony internetowe cechuje <strong>profesjonalizm, kreatywność i funkcjonalność</strong>, co pozwala firmom z Kielc i okolic odnosić sukcesy online. 
        <br/><br/>
        Dzięki mojej wiedzy i doświadczeniu, oferuję nie tylko standardowe strony internetowe, ale <strong>kompleksowe rozwiązania cyfrowe</strong>, które wspierają biznesy w osiąganiu swoich celów.
    `
        },
        'opole': {
            singular: 'Opole',
            plural: 'Opolu',
            genitive: 'Opola',
            voivodeship: 'Opolskie',
            description: `
        Opole, miasto bogate w historię i tradycję, to miejsce, gdzie <strong>tworzę nowoczesne i funkcjonalne strony internetowe dla lokalnych przedsiębiorstw oraz klientów z całej Polski</strong>. 
        <br/><br/>
        Moje podejście do projektowania stron internetowych opiera się na <strong>zrozumieniu unikalnych potrzeb klientów</strong> oraz <strong>kreowaniu efektywnych narzędzi online</strong>, które wspierają ich w osiąganiu biznesowych celów. 
        <br/><br/>
        Dla firm z Opola oferuję nie tylko strony internetowe, ale <strong>kompleksowe strategie cyfrowe</strong>, które pomagają budować silną obecność online i rozwijać biznes w dynamicznym świecie internetu.
    `
        },
        'radom': {
            singular: 'Radom',
            plural: 'Radomiu',
            genitive: 'Radomia',
            voivodeship: 'Mazowieckie',
            description: `
                Radom, miasto bogate w historię i tradycję, to miejsce, gdzie <strong>tworzę nowoczesne i funkcjonalne strony internetowe dla lokalnych przedsiębiorstw oraz klientów z całej Polski</strong>. 
                <br/><br/>
                Moje podejście do projektowania stron internetowych opiera się na <strong>zrozumieniu unikalnych potrzeb klientów</strong> oraz <strong>kreowaniu efektywnych narzędzi online</strong>, które wspierają ich w osiąganiu biznesowych celów. 
                <br/><br/>
                Dla firm z Radomia oferuję nie tylko strony internetowe, ale <strong>kompleksowe strategie cyfrowe</strong>, które pomagają budować silną obecność online i rozwijać biznes w dynamicznym świecie internetu.
            `
        },
        'rzeszow': {
            singular: 'Rzeszów',
            plural: 'Rzeszowie',
            genitive: 'Rzeszowa',
            voivodeship: 'Podkarpackie',
            description: `
                Rzeszów, dynamiczne miasto wojewódzkie, to miejsce, gdzie <strong>realizuję ambitne projekty internetowe dla różnorodnych firm i instytucji</strong>. 
                <br/><br/>
                Moje strony internetowe cechuje <strong>profesjonalizm, kreatywność i funkcjonalność</strong>, co pozwala firmom z Rzeszowa i okolic odnosić sukcesy online. 
                <br/><br/>
                Dzięki mojej wiedzy i doświadczeniu, oferuję nie tylko standardowe strony internetowe, ale <strong>kompleksowe rozwiązania cyfrowe</strong>, które wspierają biznesy w osiąganiu swoich celów.
            `
        },
        'szczecin': {
            singular: 'Szczecin',
            plural: 'Szczecinie',
            genitive: 'Szczecina',
            voivodeship: 'Zachodniopomorskie',
            description: `
                Szczecin, urocze miasto nad Odrą, to miejsce, gdzie <strong>tworzę innowacyjne i zaskakujące projekty internetowe dla różnorodnych firm i instytucji</strong>. 
                <br/><br/>
                Moje projekty internetowe to nie tylko standardowe strony - to <strong>interaktywne platformy</strong>, które angażują użytkowników i budują silne relacje z klientami. 
                <br/><br/>
                Dla przedsiębiorstw z Szczecina oferuję <strong>profesjonalne wsparcie</strong> w budowaniu ich obecności online oraz <strong>indywidualnie dostosowane strategie cyfrowe</strong>, które pomagają osiągać biznesowe cele.
            `
        },
        'torun': {
            singular: 'Toruń',
            plural: 'Toruniu',
            genitive: 'Torunia',
            voivodeship: 'Kujawsko-Pomorskie',
            description: `
                Toruń, miasto z niezwykłą historią i atmosferą, to miejsce, gdzie <strong>tworzę unikalne i funkcjonalne strony internetowe dla różnych firm i instytucji</strong>. 
                <br/><br/>
                Moje podejście do projektowania stron internetowych opiera się na <strong>połączeniu estetyki z funkcjonalnością</strong>, co pozwala mi tworzyć witryny, które nie tylko zachwycają wyglądem, ale także skutecznie przekazują przekaz klientów. 
                <br/><br/>
                Dla firm z Torunia oferuję nie tylko standardowe rozwiązania, ale <strong>indywidualnie dopasowane strategie online</strong>, które wspierają ich w osiąganiu sukcesów w świecie internetu.
            `
        },
        'lublin': {
            singular: 'Lublin',
            plural: 'Lublinie',
            genitive: 'Lublina',
            voivodeship: 'Lubelskie',
            description: `
                Lublin, miasto spotkań kultur i tradycji, to miejsce, gdzie <strong>realizuję nowoczesne projekty internetowe dla lokalnych biznesów oraz klientów z całej Polski</strong>. 
                <br/><br/>
                Moje strony internetowe cechuje <strong>profesjonalizm, innowacyjność i funkcjonalność</strong>, co pozwala firmom z Lublina odnosić sukcesy w świecie online. 
                <br/><br/>
                Dzięki mojej pasji do technologii, oferuję nie tylko standardowe rozwiązania, ale <strong>indywidualnie dostosowane strategie cyfrowe</strong>, które pomagają w osiąganiu biznesowych celów i budowaniu trwałych relacji z klientami.
            `
        },
        'olsztyn': {
            singular: 'Olsztyn',
            plural: 'Olsztynie',
            genitive: 'Olsztyna',
            voivodeship: 'Warmińsko-Mazurskie',
            description: `
                Olsztyn, malowniczo położone miasto na Mazurach, to miejsce, gdzie <strong>tworzę wyjątkowe i efektywne strony internetowe dla firm z regionu oraz klientów z całej Polski</strong>. 
                <br/><br/>
                Moje projekty internetowe to <strong>połączenie nowoczesności z lokalnym kolorytem</strong>, które przyciągają uwagę klientów i pomagają firmom z Olsztyna w osiąganiu sukcesów online. 
                <br/><br/>
                Dla przedsiębiorstw z Olsztyna oferuję <strong>indywidualne podejście</strong> oraz <strong>rozwiązania dopasowane do ich potrzeb</strong>, co sprawia, że ich strony internetowe są nie tylko atrakcyjne wizualnie, ale także skuteczne w generowaniu ruchu i konwersji.
            `
        },
        'zielona-gora': {
            singular: 'Zielona Góra',
            plural: 'Zielonej Górze',
            genitive: 'Zielonej Góry',
            voivodeship: 'Lubuskie',
            description: `
                Zielona Góra, miasto winnic i zieleni, to miejsce, gdzie <strong>realizuję kreatywne i profesjonalne projekty internetowe dla lokalnych firm oraz klientów z różnych części kraju</strong>. 
                <br/><br/>
                Moje podejście do tworzenia stron internetowych opiera się na <strong>rozumieniu potrzeb klientów</strong> oraz <strong>połączeniu estetyki z funkcjonalnością</strong>, co pozwala mi dostarczać rozwiązania, które przyciągają uwagę i generują wyniki. 
                <br/><br/>
                Dla przedsiębiorstw z Zielonej Góry oferuję <strong>indywidualne podejście</strong> oraz <strong>kompleksowe wsparcie</strong> na każdym etapie projektu, co pozwala budować trwałe relacje i osiągać sukcesy online.
            `
        },
        'bialystok': {
            singular: 'Białystok',
            plural: 'Białymstoku',
            genitive: 'Białegostoku',
            voivodeship: 'Podlaskie',
            description: `
                Białystok, miasto bogate w historię i kulturę, to miejsce, gdzie <strong>tworzę nowoczesne i skuteczne strony internetowe dla lokalnych przedsiębiorstw oraz klientów z całej Polski</strong>. 
                <br/><br/>
                Moje projekty internetowe to <strong>połączenie innowacyjności z solidnymi fundamentami</strong>, które zapewniają firmom z Białegostoku silną obecność online i konkurencyjną przewagę. 
                <br/><br/>
                Dzięki mojej wiedzy i doświadczeniu, oferuję nie tylko estetyczne strony internetowe, ale także <strong>kompleksowe strategie cyfrowe</strong>, które wspierają biznesy w osiąganiu ich celów i sukcesów online.
            `
        },
        'czestochowa': {
            singular: 'Częstochowa',
            plural: 'Częstochowie',
            genitive: 'Częstochowy',
            voivodeship: 'Śląskie',
            description: `
                Częstochowa, miasto kultury i tradycji, to miejsce, gdzie <strong>realizuję profesjonalne i skuteczne projekty internetowe dla lokalnych firm i instytucji</strong>. 
                <br/><br/>
                Moje strony internetowe to <strong>połączenie estetyki z funkcjonalnością</strong>, co pozwala firmom z Częstochowy efektywnie komunikować się z klientami i osiągać biznesowe cele. 
                <br/><br/>
                Dla przedsiębiorstw z Częstochowy oferuję nie tylko strony internetowe, ale <strong>kompleksowe wsparcie cyfrowe</strong>, które pomaga w budowaniu silnej marki online i osiąganiu sukcesów w dynamicznym świecie internetu.
            `
        },
        'gorzow-wielkopolski': {
            singular: 'Gorzów Wielkopolski',
            plural: 'Gorzowie Wielkopolskim',
            genitive: 'Gorzowa Wielkopolskiego',
            voivodeship: 'Lubuskie',
            description: `
                Gorzów Wielkopolski, urokliwe miasto nad Wartą, to miejsce, gdzie <strong>realizuję innowacyjne i efektywne projekty internetowe dla firm z regionu oraz klientów z całej Polski</strong>. 
                <br/><br/>
                Moje podejście do projektowania stron internetowych opiera się na <strong>zrozumieniu potrzeb klientów</strong> oraz <strong>kreowaniu rozwiązań dopasowanych do ich indywidualnych wymagań</strong>, co pozwala im odnosić sukcesy online. 
                <br/><br/>
                Dzięki mojej wiedzy i doświadczeniu, oferuję nie tylko estetyczne strony internetowe, ale także <strong>kompleksowe strategie cyfrowe</strong>, które wspierają biznesy w osiąganiu ich celów i budowaniu trwałych relacji z klientami.
            `
        },
        'kalisz': {
            singular: 'Kalisz',
            plural: 'Kaliszu',
            genitive: 'Kalisza',
            voivodeship: 'Wielkopolskie',
            description: `
                Kalisz, miasto z historią sięgającą starożytności, to miejsce, gdzie <strong>realizuję nowoczesne i funkcjonalne projekty internetowe dla lokalnych przedsiębiorstw oraz klientów z różnych części Polski</strong>. 
                <br/><br/>
                Moje projekty internetowe to <strong>połączenie nowatorskiego designu z efektywnością biznesową</strong>, co pozwala firmom z Kalisza wyróżniać się w sieci i osiągać sukcesy online. 
                <br/><br/>
                Dla przedsiębiorstw z Kalisza oferuję <strong>indywidualne podejście</strong> oraz <strong>kompleksowe wsparcie</strong> na każdym etapie projektu, co przekłada się na budowanie trwałych relacji z klientami i osiąganie biznesowych celów.
            `
        },
    })

    return {
        cities
    }
})