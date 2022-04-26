/*
    Adapter (Адаптер) – структурный паттерн. Он обеспечивает возможность совместной работы
    классов с несовместимыми интерфейсами, позволяя разработчикам реализовывать наборы
    полиморфных классов, обеспечивающих альтернативные реализации существующего класса.

    В этом упражнении реализован шаблон Адаптер для следующей модели. Есть игрок,
    который играет в «кости» (бросает кубик). Но в какой-то момент ему приходится решать:
    бросать в очередной раз кубик или прекратить игру. В этом случае он хочет выбрать решение,
    кинув монету, но в классе игрока использование класса монеты не предусмотрено, поэтому вам
    надо создать адаптер.
 */

//  Шаг 1. Создан проект по шаблону

//  Шаг 2. Реализован интерфейс IGame
interface IGame {
    brosok(): number
}

//  Шаг 3. Добавлен класс Kost
class Kost implements IGame {

    private readonly _edgeCount: number

    constructor(edgeCount: number) {
        this._edgeCount = edgeCount
    }

    public brosok(): number {
        return this.getEdge()
    }

    private getEdge (): number {
        return Math.floor(Math.random() * (this._edgeCount)) + 1;
    }
}

//  Шаг 4. Добавлен класс Gamer
class Gamer {
    protected readonly _name: string

    public get name(): string {
        return this._name
    }

    constructor(name: string) {
        this._name = name
    }

    public seansGame(ig: IGame) {
        return ig.brosok()
    }
}

//  Шаг 5. Создан объект класса Kost и объект класса Gamer
let kubik: Kost = new Kost(6)
let gamer: Gamer = new Gamer("Стив")

//  Шаг 6. Приложение запущено
console.log(`Выпало ${gamer.seansGame(kubik)} очков у игрока ${gamer.name}`)

//  Шаг 7. Добавлен класс Monet
class Monet {
    public brosokM(): number {
        return this.getSide()
    }

    private getSide (): number {
        return Math.floor(Math.random() * (2)) + 1;
    }
}

//  Шаг 8. Добавлен класс адаптера, который реализует требуемый интерфейс,
//  в поле класса размещена ссылка на адаптируемый объект, в методе реализуемого
//  интерфейса вызван метод адаптируемого объекта:

class AdapterGame implements IGame {
    private _mon: Monet

    constructor(m: Monet) {
        this._mon = m
    }

    public brosok(): number {
        return this._mon.brosokM()
    }
}

//  Шаг 9. Создан объект класса Monet и объект класса AdapterGame
let mon: Monet = new Monet()
let bmon: AdapterGame = new AdapterGame(mon)

//  Шаг 10. Приложение запущено
console.log(`Монета показала ${gamer.seansGame(bmon)} для игрока ${gamer.name}`)

/* 
    Контрольное задание
    
    Разрабатывается система климат-контроля, предназначенная для автоматического
    поддержания температуры окружающего пространства в заданных пределах.
    
    Важным компонентом такой системы является температурный датчик, с помощью которого
    измеряют температуру окружающей среды для последующего анализа.
    
    Для этого датчика уже имеется готовое программное обеспечение от сторонних
    разработчиков, представляющее собой некоторый класс с соответствующим интерфейсом.
    Однако использовать этот класс непосредственно не удастся, так как показания датчика
    снимаются в градусах Фаренгейта.
    
    Требуется разработать адаптер, преобразующий температуру в шкалу Цельсия.
    Функциональность классов разработайте на свое усмотрение.
 */

console.log("\nКонтрольное задание: ")

class TemperatureF {
    protected readonly _t: number

    public get temperature(): string {
        return `${this._t} °F`
    }

    constructor(t: number) {
        this._t = t
    }
}

class TemperatureC {
    protected readonly _t: number

    public get temperature(): string {
        return `${this._t} °C`
    }

    constructor(t: number) {
        this._t = t
    }
}

interface ITemperatureSensor {
    measureTemperature(): TemperatureC
}

class TemperatureSensor {

    private readonly _maxTemperature: number

    constructor(maxTemperature: number) {
        this._maxTemperature = maxTemperature
    }

    public measureTemperature(): TemperatureF {
        return new TemperatureF(this.getTemperature())
    }

    private getTemperature (): number {
        return Math.floor(Math.random() * (this._maxTemperature)) + 1;
    }

}

class ClimatControl {
    private _temperatureSensor: ITemperatureSensor

    constructor(temperatureSensor: ITemperatureSensor) {
        this._temperatureSensor = temperatureSensor
    }

    public displayTemperature() {
        const t: string = this._temperatureSensor.measureTemperature().temperature

        if (parseFloat(t) > 28) {
            console.log(`
Мои датчики показывают ${t} 
Уменьшить температуру?
            `)
        }
        else {
            console.log(`
Мои датчики показывают ${t} 
Увеличить температуру?
            `)
        }

    }

    // ...
}

let TS: TemperatureSensor = new TemperatureSensor(100)

//  Получаю ошибку
//  let CC: ClimatControl = new ClimatControl(TS)

//  Реализую адаптер
class AdapterTemperatureSensor implements ITemperatureSensor {
    private _temperatureSensor: TemperatureSensor

    constructor(temperatureSensor: TemperatureSensor) {
        this._temperatureSensor = temperatureSensor
    }

    public measureTemperature(): TemperatureC {
        return this.temperatureFtoC(this._temperatureSensor.measureTemperature())
    }

    private temperatureFtoC(temperatureF: TemperatureF): TemperatureC {
        let t: string = ((parseInt(temperatureF.temperature) - 32) / 1.8).toFixed(2)
        return new TemperatureC(parseFloat(t))
    }
}

let ATS: AdapterTemperatureSensor = new AdapterTemperatureSensor(TS)
let CC: ClimatControl = new ClimatControl(ATS)

CC.displayTemperature()
