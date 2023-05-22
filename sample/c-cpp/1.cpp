#include <iostream>

void allocateMemory() {
    int* arr = new int[1000];
    delete[] arr;
}

int main() {
    allocateMemory();
    return 0;
}
