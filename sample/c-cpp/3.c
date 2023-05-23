#include <stdlib.h>

void allocate_memory(int condition) {
    int size = 100;
    int* array = NULL;

    if (condition) {
        array = malloc(size * sizeof(int));
    }

    int* l = malloc(50 * sizeof(int));

    if (array != NULL) {
        free(array);
    }
}

int main() {
    allocate_memory(1);
    allocate_memory(0);


    return 0;
}
