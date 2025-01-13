<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <h1 class="text-h3 font-weight-bold mb-4">
                    Browse Books
                </h1>
                <p class="text-h6 mb-6">
                    Discover books shared by the community
                </p>
            </v-col>
        </v-row>

        <v-row>
            <v-col
            v-for="(book) in books"
            :key="book.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            >
            <v-card class="mx-auto" :loading="book.loading">
                <v-img
                :src="book.image || 'https://via.placeholder.com/150'"
                height="200"
                cover
                ></v-img>
                <v-card-title class="text-h6">{{ book.name }}</v-card-title>
                <v-card-subtitle>{{ book.author }}</v-card-subtitle>
                <v-card-text>
                <div class="d-flex align-center mb-2">
                    <v-icon small class="mr-1">mdi-account</v-icon>
                    <span>{{ book.username }}</span>
                </div>
                <div class="d-flex align-center mb-2">
                    <v-icon small class="mr-1">mdi-star</v-icon>
                    <span>{{ book.rating }}</span>
                </div>
                <div class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-comment</v-icon>
                    <span>{{ book.comments }} comments</span>
                </div>
                </v-card-text>
            </v-card>
            </v-col>

            <!-- Placeholder for far behind books -->
            <v-col
            v-if="loading"
            cols="12"
            >
            <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>

        <!-- Infinite Scroll Trigger -->
        <v-row v-if="hasMore" ref="infiniteScrollTrigger">
            <v-col cols="12" class="text-center">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BooksView',
    data() {
    return {
        books: [
                    {
                        "id": 1,
                        "name": "The Great Gatsby",
                        "author": "F. Scott Fitzgerald",
                        "image": "https://storiarts.com/cdn/shop/files/DSC_0115_61ea72e8-b632-4aab-b75d-a4d6c12f1299_5000x.jpg?v=1726858868",
                        "username": "john_doe",
                        "rating": 4.5,
                        "comments": 12
                    },
                    {
                        "id": 2,
                        "name": "1984",
                        "author": "George Orwell",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPg1p6JufCrNZ2cOXH7OPr_uQa6-LYL0DG0w&s",
                        "username": "jane_doe",
                        "rating": 4.7,
                        "comments": 8
                    },
                    {
                        "id": 3,
                        "name": "The wefwq",
                        "author": "F. Scott Fitzgerald",
                        "image": "https://online.anyflip.com/qzxfi/huaq/files/mobile/1.jpg?1669975790",
                        "username": "john_doe",
                        "rating": 4.5,
                        "comments": 12
                    },
                    {
                        "id": 4,
                        "name": "ewfewfefffff",
                        "author": "wqefweqf Orwell",
                        "image": "https://example.com/1984.jpg",
                        "username": "jane_doe",
                        "rating": 4.7,
                        "comments": 8
                    },
                    {
                        "id": 1,
                        "name": "The Great Gatsby",
                        "author": "F. Scott Fitzgerald",
                        "image": "https://example.com/great-gatsby.jpg",
                        "username": "john_doe",
                        "rating": 4.5,
                        "comments": 12
                    },
                    {
                        "id": 5,
                        "name": "1984",
                        "author": "George Orwell",
                        "image": "https://example.com/1984.jpg",
                        "username": "jane_doe",
                        "rating": 4.7,
                        "comments": 8
                    },

                ],
        page: 1, // Current page for pagination
        perPage: 12, // Number of books per page
        hasMore: true, // Whether there are more books to load
        loading: false, // Loading state for infinite scroll
    };
    },
    mounted() {
        this.fetchBooks();
        this.setupInfiniteScroll();
    },
    methods: {
        async fetchBooks() {
            if (this.loading || !this.hasMore) return;

            this.loading = true;

            try {
                // Simulate API call
                const response = await this.$api.get('/books', {
                    params: {
                    page: this.page,
                    perPage: this.perPage,
                    },
                });

                if (response.data.length > 0) {
                    this.books = [...this.books, ...response.data];
                    this.page += 1;
                } else {
                    this.hasMore = false; // No more books to load
                }
            } catch (error) {
                console.error('Failed to fetch books:', error);
            } finally {
                this.loading = false;
            }
        },
        setupInfiniteScroll() {
            // const observer = new IntersectionObserver((entries) => {
            //     if (entries[0].isIntersecting && this.hasMore) {
            //         this.fetchBooks();
            //     }
            // });

            // observer.observe(this.$refs.infiniteScrollTrigger);
        },
    },
};
</script>

<style scoped>
.v-card {
    transition: transform 0.2s;
}

.v-card:hover {
    transform: scale(1.05);
}

.v-skeleton-loader {
    width: 100%;
    height: 300px;
}
</style>