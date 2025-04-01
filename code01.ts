interface MySet<T>{
    add(value: T): void;
    remove(value: T): void;
    has(value: T): boolean;
    intersect(otherSet: MySet<T>): MySet<T>;
}

class ArraySet<T> implements MySet<T> {
    private Set: T[] = [];

    add(value: T): void {
        if (!this.has(value)) {
            this.Set.push(value);
        }
    }

    remove(value: T): void {
        const index = this.Set.indexOf(value);
        if (index !== -1) {
            this.Set.splice(index, 1);
        }
    }

    has(value: T): boolean {
        return this.Set.indexOf(value) !== -1;
    }

    intersect(otherSet: MySet<T>): MySet<T> {
        const intersection = new ArraySet<T>();
        for (const value of this.Set) {
            if (otherSet.has(value)) {
                intersection.add(value);
            }
        }
        return intersection;
    }
}

interface Equatable<T>{
    equals(other: T): boolean;
}

class Person implements Equatable<Person> {
    constructor(public name: string, public age: number) {}

    equals(other: Person): boolean {
        return this.name === other.name && this.age === other.age;
    }
}

const set1 = new ArraySet<Person>();
const set2 = new ArraySet<Person>();
set1.add(new Person("Alice", 30));
set1.add(new Person("Bob", 25));
set2.add(new Person("Alice", 30));
set2.add(new Person("Charlie", 35));
const intersection = set1.intersect(set2);
console.log(intersection); // Should contain only the person "Alice" with age 30
const set3 = new ArraySet<number>();
set3.add(1);
set3.add(2);
set3.add(3);
const set4 = new ArraySet<number>();
set4.add(2);
set4.add(3);
set4.add(4);

const intersection2 = set3.intersect(set4);
console.log(intersection2); // Should contain only the numbers 2 and 3
// Test cases
const set5 = new ArraySet<number>();
set5.add(1);
set5.add(2);
set5.add(3);
const set6 = new ArraySet<number>();
set6.add(3);
set6.add(4);
const intersection3 = set5.intersect(set6);

console.log(intersection3); // Should contain only the number 3
set5.remove(2);
console.log(set5); // Should contain 1 and 3
set6.add(5);
console.log(set6); // Should contain 3, 4, and 5
set5.add(4);
console.log(set5); // Should contain 1, 3, and 4
set6.remove(3);
console.log(set6); // Should contain 4 and 5

