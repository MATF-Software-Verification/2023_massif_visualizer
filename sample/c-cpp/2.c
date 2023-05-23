#include <stdlib.h>

void create_memory_blocks() {
    int** blocks = malloc(100 * sizeof(int*));

    for (int i = 0; i < 100; i++) {
        blocks[i] = malloc(1000 * sizeof(int));
    }

    for (int i = 0; i < 100; i++) {
        for (int j = 0; j < 1000; j++) {
            blocks[i][j] = i + j;
        }
    }

    for (int i = 0; i < 100; i++) {
        free(blocks[i]);
    }

    free(blocks);
}

int main() {
    create_memory_blocks();

    return 0;
}
