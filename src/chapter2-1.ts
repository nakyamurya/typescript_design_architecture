class Yen {
  MIN = 0;
  private value: number;

  constructor(value: number) {
    if (value < this.MIN) {
      throw new Error(`不正:${this.MIN}未満`);
    }
    this.value = value;
  }

  add(other: Yen): Yen {
    const added: number = this.addValue(other);
    return new Yen(added);
  }

  show(): string {
    return `Yen: JPY ${this.value}`;
  }
  private addValue(other: Yen): number {
    return this.value + other.value;
  }
}

interface Fee {
  yen(): Yen;
  label(): string;
}

class AdultFee implements Fee {
  yen(): Yen {
    return new Yen(100);
  }

  label(): string {
    return '大人';
  }
}

class ChildFee implements Fee {
  yen(): Yen {
    return new Yen(50);
  }

  label(): string {
    return '子供';
  }
}

class Charge {
  fee: Fee;

  constructor(fee: Fee) {
    this.fee = fee;
  }

  yen(): Yen {
    return this.fee.yen();
  }

  label(): string {
    return this.fee.label();
  }
}

class Reservation {
  fees: Array<Fee>;

  constructor() {
    this.fees = new Array<Fee>();
  }

  addFee(fee: Fee): void {
    this.fees.push(fee);
  }

  feeTotal(): Yen {
    let total = new Yen(0);
    this.fees.forEach((e) => {
      total = total.add(e.yen());
    });
    return total;
  }
}

class FeeFactory {
  static types: Map<string, Fee> = new Map([
    ['adult', new AdultFee()],
    ['child', new ChildFee()],
  ]);

  static feeByName(feeName: string): Fee {
    const fee = FeeFactory.types.get(feeName);
    if (typeof fee === 'undefined') {
      throw new Error(`${feeName} is undefined.`);
    }
    return fee;
  }
}

if (require.main === module) {
  const charge1 = FeeFactory.feeByName('adult');
  const charge2 = FeeFactory.feeByName('child');

  console.log(charge1.label());
  console.log(charge2.label());

  const reservation = new Reservation();
  reservation.addFee(charge1);
  reservation.addFee(charge2);

  const total = reservation.feeTotal();
  console.log(total.show());
}
