#include <stdlib.h>

void allocate_memory() {
    int size = 1000000;
    int* array = malloc(size * sizeof(int));

    int sum = 0;
    for (int i = 0; i < size; i++) {
        array[i] = i;
        sum += array[i];
    }

    int* leak = malloc(100 * sizeof(int));

    free(array);
}

int main() {
    allocate_memory();

    int* leak = malloc(500 * sizeof(int));

    return 0;
}
