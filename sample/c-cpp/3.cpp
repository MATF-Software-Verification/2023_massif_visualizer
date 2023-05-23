#include <iostream>

class MyClass {
public:
    MyClass() {
        std::cout << "MyClass constructor called" << std::endl;
    }

    ~MyClass() {
        std::cout << "MyClass destructor called" << std::endl;
    }
};

void allocate_memory() {
    int size = 100;

    MyClass* array = new MyClass[size];

    MyClass* leak = new MyClass;

    for (int i = 0; i < size; i++) {
        std::cout << "Array element: " << i << std::endl;
    }
}

int main() {
    allocate_memory();

    MyClass* leak = new MyClass;

    return 0;
}
