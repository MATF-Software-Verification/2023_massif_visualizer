#include <iostream>

class BaseClass {
public:
    virtual ~BaseClass() {}
};

class DerivedClass : public BaseClass {
public:
    DerivedClass() {
        std::cout << "DerivedClass constructor called" << std::endl;
    }

    ~DerivedClass() {
        std::cout << "DerivedClass destructor called" << std::endl;
    }
};

void allocate_memory(int size) {
    BaseClass** objects = new BaseClass*[size];

    for (int i = 0; i < size; i++) {
        if (i % 2 == 0) {
            objects[i] = new DerivedClass();
        } else {
            objects[i] = new BaseClass();
        }
    }

    BaseClass* leak = new DerivedClass();

    for (int i = 0; i < size; i++) {
        delete objects[i];
    }

    delete[] objects;
}

int main() {
    allocate_memory(100);

    BaseClass* leak = new BaseClass();

    return 0;
}
