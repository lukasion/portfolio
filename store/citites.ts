import {defineStore} from 'pinia'

export const useCitiesStore = defineStore('cities', () => {
    const cities = ref<object>({
        'katowice': {
            singular: 'Katowice',
            plural: 'Katowicach',
            genitive: 'Katowic',
            voivodeship: 'Śląsk'
        },
        'warszawa': {
            singular: 'Warszawa',
            plural: 'Warszawie',
            genitive: 'Warszawy',
            voivodeship: 'Mazowieckie'
        },
        'krakow': {
            singular: 'Kraków',
            plural: 'Krakowie',
            genitive: 'Krakowa',
            voivodeship: 'Małopolskie'
        },
        'poznan': {
            singular: 'Poznań',
            plural: 'Poznaniu',
            genitive: 'Poznania',
            voivodeship: 'Wielkopolskie'
        },
        'gdansk': {
            singular: 'Gdańsk',
            plural: 'Gdańsku',
            genitive: 'Gdańska',
            voivodeship: 'Pomorskie'
        },
        'wroclaw': {
            singular: 'Wrocław',
            plural: 'Wrocławiu',
            genitive: 'Wrocławia',
            voivodeship: 'Dolnośląskie'
        },
        'bydgoszcz': {
            singular: 'Bydgoszcz',
            plural: 'Bydgoszczy',
            genitive: 'Bydgoszczy',
            voivodeship: 'Kujawsko-Pomorskie'
        },
        'gdynia': {
            singular: 'Gdynia',
            plural: 'Gdyni',
            genitive: 'Gdyni',
            voivodeship: 'Pomorskie'
        },
        'kielce': {
            singular: 'Kielce',
            plural: 'Kielcach',
            genitive: 'Kielc',
            voivodeship: 'Świętokrzyskie'
        },
        'opole': {
            singular: 'Opole',
            plural: 'Opolu',
            genitive: 'Opola',
            voivodeship: 'Opolskie'
        },
        'radom': {
            singular: 'Radom',
            plural: 'Radomiu',
            genitive: 'Radomia',
            voivodeship: 'Mazowieckie'
        },
        'rzeszow': {
            singular: 'Rzeszów',
            plural: 'Rzeszowie',
            genitive: 'Rzeszowa',
            voivodeship: 'Podkarpackie'
        },
        'szczecin': {
            singular: 'Szczecin',
            plural: 'Szczecinie',
            genitive: 'Szczecina',
            voivodeship: 'Zachodniopomorskie'
        },
        'torun': {
            singular: 'Toruń',
            plural: 'Toruniu',
            genitive: 'Torunia',
            voivodeship: 'Kujawsko-Pomorskie'
        },
        'lublin': {
            singular: 'Lublin',
            plural: 'Lublinie',
            genitive: 'Lublina',
            voivodeship: 'Lubelskie'
        },
        'olsztyn': {
            singular: 'Olsztyn',
            plural: 'Olsztynie',
            genitive: 'Olsztyna',
            voivodeship: 'Warmińsko-Mazurskie'
        },
        'zielona-gora': {
            singular: 'Zielona Góra',
            plural: 'Zielonej Górze',
            genitive: 'Zielonej Góry',
            voivodeship: 'Lubuskie'
        },
        'bialystok': {
            singular: 'Białystok',
            plural: 'Białymstoku',
            genitive: 'Białegostoku',
            voivodeship: 'Podlaskie'
        },
        'czestochowa': {
            singular: 'Częstochowa',
            plural: 'Częstochowie',
            genitive: 'Częstochowy',
            voivodeship: 'Śląskie'
        },
        'gorzow-wielkopolski': {
            singular: 'Gorzów Wielkopolski',
            plural: 'Gorzowie Wielkopolskim',
            genitive: 'Gorzowa Wielkopolskiego',
            voivodeship: 'Lubuskie'
        },
        'kalisz': {
            singular: 'Kalisz',
            plural: 'Kaliszu',
            genitive: 'Kalisza',
            voivodeship: 'Wielkopolskie'
        },
    })

    return {
        cities
    }
})