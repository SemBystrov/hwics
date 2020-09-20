/*
    Фабричный метод (Factory Method) — порождающий шаблон проектирования,
    предоставляющий подклассам абстрактный интерфейс (набор методов) для создания
    экземпляров некоторого класса (объекта-продукта). В момент создания наследники могут
    самостоятельно принять решение о том, экземпляр какого конкретного класса-продукта создать.

    Иными словами, данный шаблон делегирует создание объектов наследникам родительского
    класса. Это позволяет использовать в коде программы не специфические классы, а
    манипулировать абстрактными объектами на более высоком уровне.

    Таким образом, паттерн Factory Method позволяет базовым абстрактным классам передать
    ответственность за создание объектов-продуктов своим производным классам.

 */

//  Шаг 1. Создан проект по шаблону

//  Шаг 2. Реализован абстрактный клсс транспортной услуги TransportService

abstract class TransportService {
    protected readonly _name: string

    constructor(name: string) {
        this._name = name
    }

    public abstract costTransportation(distance: number): number
    public abstract displayCost(distance: number): string
}

//  Шаг 3. Добавлен абстрактный класс TransportCompany, который определяет абстрактный фабричный
//  метод create()

abstract class TransportCompany {
    protected readonly _name: string

    public get name(): string {
        return this._name
    }

    constructor(name: string) {
        this._name = name
    }

    public abstract create(c: number): TransportService
}

//  Шаг 4. Добавлен класс конкретной реализации услуги - поездка на такси

class TaxiService extends TransportService {
    protected readonly _category: number

    constructor(name: string, cat: number) {
        super(name);
        this._category = cat
    }

    public costTransportation(distance: number): number {
        return distance * this._category;
    }

    public displayCost(distance: number): string {
        return `
Фирма ${this._name}, доставка по тарифу ${this._category}
Рассчёт стоимости: ${this.costTransportation(distance)}
`    }
}

//  Шаг 5. Добавлен второй класс конкретной реализации услуги - перевозка мебели

class Shipping extends TransportService {
    protected readonly _tariff: number

    constructor(name: string, taff: number) {
        super(name);
        this._tariff = taff
    }

    public costTransportation(distance: number): number {
        return distance * this._tariff;
    }

    public displayCost(distance: number): string {
        return `
Фирма ${this._name}, доставка по тарифу ${this._tariff}
Рассчёт стоимости: ${this.costTransportation(distance)}
`
    }
}

//  Шаг 6. Добавлены в проект класса наследника класса-создателя

//  a. Такси

class TaxiTransCom extends TransportCompany {
    constructor(name: string) {
        super(name);
    }

    public create(c: number): TransportService {
        return new TaxiService(this.name, c);
    }
}

//  b. Перевозка мебели

class ShipTransCom extends TransportCompany {
    constructor(name: string) {
        super(name);
    }

    public create(c: number): TransportService {
        return new Shipping(this.name, c);
    }
}

//  Шаг 7, 8. Добавлен вид услуги компании - служба такси

let trCom: TransportCompany = new TaxiTransCom("Taxi Service")
let compService: TransportService = trCom.create(1)

//  Шаг 9. Установлена дальность поездки, информация об услуге выведена на экран

console.log(compService.displayCost(15.5))

//  Шаг 10. Приложение запущено
//  Шаг 11. Создан объект класса грузоперевозки

let gCom: TransportCompany = new ShipTransCom("Служба перевозок")
compService = gCom.create(2)

console.log(compService.displayCost(150.5))

/*
    Контрольное задание
    1. В разработанное приложение добавьте поддержку новой услуги
    2. Проанализируйте трудоемкость вносимых изменений.
 */

class BlaBlaCar extends TransportService {
    protected readonly _oil: number

    protected readonly _countPeople: number
    public get countPeople(): number {
        return this._countPeople
    }

    constructor(name: string, countPeople: number) {
        super(name);
        this._countPeople = countPeople
        this._oil = 0.25 * 50
    }

    public costTransportation(distance: number): number {
        let oilTotal = distance * this._oil
        return parseFloat((oilTotal / this.countPeople).toFixed(2))
    }

    public displayCost(distance: number): string {
        return `
Фирма ${this._name}, совместная аренда машины на ${this._countPeople} человека
Рассчёт стоимости: ${this.costTransportation(distance)}
`
    }
}

class BlaBlaComp extends TransportCompany {
    constructor(name: string) {
        super(name);
    }

    public create(c: number): TransportService {
        return new BlaBlaCar(this.name, c);
    }
}

let bbCom: TransportCompany = new BlaBlaComp("Перевозка с попутчиками")
compService = bbCom.create(4)

console.log(compService.displayCost(150))


