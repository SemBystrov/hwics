/*
    Паттерн Абстрактная фабрика (Abstract Factory) – порождающий шаблон проектирования,
    предоставляет интерфейс для создания семейств взаимосвязанных объектов с определенными
    интерфейсами без указания конкретных типов данных объектов, что позволяет разработчику
    создать интерфейс для объектов, каким-либо образом связанных между собой, причем не
    требуется указывать конкретные классы, поскольку работать с каждым из них можно будет
    через этот интерфейс.

    Таким образом, с помощью такой фабрики удастся создавать группы объектов, реализующих
    общее поведение.
 */

//  Шаг 1. Создан проект по шаблону

//  Шаг 2. Добавлен абстрактный класс CarFactory, выступающий в качестве фабрики и
//  определяющий методы для создания объектов: автомобиля и двигателя для него
abstract class CarFactory {
    public abstract createCar(): AbstractCar
    public abstract createEngine(): AbstractEngine
}

//  Шаг 3. Реализованы класы абстрактных объектов
abstract class AbstractCar {
    public name: string
    public abstract maxSpeed(engine: AbstractEngine): number
    public abstract toString(): string
}

abstract class AbstractEngine {
    public maxSpeed: number
}

//  Шаг 4. Реализована конкретная фобрика, создающая класс, описывающий автомобиль Ford
//  и двигатель для него
class FordFactory extends CarFactory {
    public createCar(): AbstractCar {
        return new FordCar("Форд");
    }
    public createEngine(): AbstractEngine {
        return new FordEngine();
    }
}

//  Шаг 5. Реализован класс для автомобиля Ford:
class FordCar extends AbstractCar{
    constructor(name: string) {
        super();
        this.name = name
    }

    public maxSpeed(engine: AbstractEngine): number {
        return engine.maxSpeed;
    }

    public toString(): string {
        return `Автомобиль ${this.name}`
    }
}

//  Шаг 6. Реализован класс для двигателя Ford
class FordEngine extends AbstractEngine {
    constructor() {
        super();
        this.maxSpeed = 220;
    }
}

//  Шаг 7, 8. Создан класс Client, в котором осуществлена работа с абстрактной фабрикой

class Client {
    private abstractCar: AbstractCar
    private abstractEngine: AbstractEngine

    constructor(carFactory: CarFactory) {
        this.abstractCar = carFactory.createCar()
        this.abstractEngine = carFactory.createEngine()
    }

    public runMaxSpeed(): number {
        return this.abstractCar.maxSpeed(this.abstractEngine)
    }

    public toString(): string {
        return this.abstractCar.toString()
    }
}

let fordCar: CarFactory = new FordFactory()
let c1: Client = new Client(fordCar)

console.log(`Максимальная скорость ${c1.toString()} составляет ${c1.runMaxSpeed()}`)

console.log("\nКонтрольное задание:")

/*
    1. В разработанное приложение добавьте класс для новой конкретной фабрики,
    создающей новый автомобиль, например, Audi.
    2. Добавьте в конфигурацию автомобиля новое свойство – тип кузова.
    3. Проанализируйте трудоемкость вносимых изменений.
 */

class AudiFactory extends CarFactory {
    public createCar(): AbstractCar {
        return new AudiCar("Ауди", "sports car");
    }
    public createEngine(): AbstractEngine {
        return new AudiEngine();
    }
}

class AudiCar extends AbstractCar {
    private readonly _carcase: string

    public get carcase(): string {
        return this._carcase
    }

    constructor(name: string, carcase: string) {
        super();
        this.name = name
        this._carcase = carcase
    }

    public maxSpeed(engine: AbstractEngine): number {
        return engine.maxSpeed;
    }

    public toString(): string {
        return `Автомобиль ${this.name} с кузовом ${this.carcase}`
    }
}

class AudiEngine extends AbstractEngine {
    constructor () {
        super()
        this.maxSpeed = 250;
    }
}

let audiCar: CarFactory = new AudiFactory()
let c2: Client = new Client(audiCar)

console.log(`Максимальная скорость ${c2.toString()} составляет ${c2.runMaxSpeed()}`)