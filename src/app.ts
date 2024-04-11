showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

// Патерн "Стратегія"

interface IPaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPaymentStrategy implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying $${amount} with credit card.`);
    }
}

class PaypalPaymentStrategy implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying $${amount} with Paypal.`);
    }
}

class BitcoinPaymentStrategy implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying $${amount} with Bitcoin.`);
    }
}

class PaymentContext {
    constructor(private paymentStrategy: IPaymentStrategy) {
    }

    setStrategy(paymentStrategy: IPaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    executePayment(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}

const creditCardPayment = new CreditCardPaymentStrategy();
const paypalPayment = new PaypalPaymentStrategy();
const bitcoinPayment = new BitcoinPaymentStrategy();

const paymentContext = new PaymentContext(creditCardPayment);
paymentContext.executePayment(100);

paymentContext.setStrategy(paypalPayment);
paymentContext.executePayment(50);

paymentContext.setStrategy(bitcoinPayment);
paymentContext.executePayment(200);


// Патерн "Спостерігач"

interface IObserver {
    update(data: any): void;
}

interface IObservable {
    subscribe(observer: IObserver): void;

    unsubscribe(observer: IObserver): void;

    notify(data: any): void;
}

class Subject implements IObservable {
    private observers: IObserver[] = [];

    subscribe(observer: IObserver): void {
        this.observers = [...this.observers, observer];
    }

    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data: any): void {
        this.observers.forEach(observer => observer.update(data));
    }
}

class StockObserver implements IObserver {
    private stockPrice: number = 0;

    update(data: any): void {
        this.stockPrice = data;
        console.log(`Stock price updated: ${this.stockPrice}`);
    }
}

const subject = new Subject();
const observer1 = new StockObserver();
const observer2 = new StockObserver();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify(100);



