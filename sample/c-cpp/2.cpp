#include <iostream>

void allocate_memory() {
    int size = 100;
    int* array = new int[size];

    for (int i = 0; i < size; i++) {
        array[i] = i;
    }

    for (int i = 0; i < size; i++) {
        std::cout << array[i] << " ";
    }
    std::cout << std::endl;

    delete[] array;
}

int main() {
    allocate_memory();

    return 0;
}
