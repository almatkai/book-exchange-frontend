<!-- src/views/NewRequest.vue -->
<template>
    <div class="new-request-container">
    <h1>Create a New Book Exchange Request</h1>
    <form @submit.prevent="handleSubmit" class="new-request-form">
        <section class="book-details">
        <h2>Book Details</h2>
        <div class="form-group">
            <label for="title">Title *</label>
            <input
            type="text"
            id="title"
            v-model="book.title"
            required
            placeholder="Enter book title"
            />
        </div>

        <div class="form-group">
            <label for="author">Author *</label>
            <input
            type="text"
            id="author"
            v-model="book.author"
            required
            placeholder="Enter author's name"
            />
        </div>

        <div class="form-group">
            <label for="isbn">ISBN</label>
            <input
            type="text"
            id="isbn"
            v-model="book.isbn"
            placeholder="Enter ISBN number"
            maxlength="13"
            />
        </div>

        <div class="form-group">
            <label for="condition">Condition *</label>
            <select id="condition" v-model="book.condition" required>
            <option disabled value="">Select condition</option>
            <option v-for="option in conditionOptions" :key="option" :value="option">
                {{ option }}
            </option>
            </select>
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea
            id="description"
            v-model="book.description"
            placeholder="Enter a brief description of the book"
            ></textarea>
        </div>

        <div class="form-group">
            <label for="genre">Genre</label>
            <input
            type="text"
            id="genre"
            v-model="book.genre"
            placeholder="Enter genre"
            />
        </div>

        <div class="form-group">
            <label for="language">Language</label>
            <input
            type="text"
            id="language"
            v-model="book.language"
            placeholder="Enter language"
            />
        </div>

        <div class="form-group">
            <label for="publication_year">Publication Year</label>
            <input
            type="number"
            id="publication_year"
            v-model.number="book.publication_year"
            placeholder="Enter publication year"
            :max="currentYear"
            />
        </div>

        <div class="form-group">
            <label for="image_url">Image URL</label>
            <input
            type="url"
            id="image_url"
            v-model="book.image_url"
            placeholder="Enter image URL"
            />
        </div>
        </section>

        <section class="exchange-details">
        <h2>Exchange Details</h2>
        <div class="form-group">
            <label for="meeting_location">Meeting Location *</label>
            <input
            type="text"
            id="meeting_location"
            v-model="exchange.meeting_location"
            required
            placeholder="Enter meeting location"
            />
        </div>

        <div class="form-group">
            <label for="meeting_time">Meeting Time *</label>
            <input
            type="datetime-local"
            id="meeting_time"
            v-model="exchange.meeting_time"
            required
            />
        </div>

        <div class="form-group">
            <label for="notes">Notes</label>
            <textarea
            id="notes"
            v-model="exchange.notes"
            placeholder="Any additional notes"
            ></textarea>
        </div>
        </section>

        <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="success-message">
        {{ successMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
        </button>
    </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'NewRequest',
    data() {
    return {
        book: {
        title: '',
        author: '',
        isbn: '',
        condition: '',
        description: '',
        genre: '',
        language: '',
        publication_year: null,
        image_url: '',
        },
        exchange: {
        meeting_location: '',
        meeting_time: '',
        notes: '',
        },
        conditionOptions: ['New', 'Like New', 'Very Good', 'Good', 'Fair', 'Poor'],
        currentYear: new Date().getFullYear(),
        isSubmitting: false,
        errorMessage: '',
        successMessage: '',
    };
    },
    methods: {
    ...mapActions(['addNewBook', 'createExchangeRequest']),
    async handleSubmit() {
        this.errorMessage = '';
        this.successMessage = '';
        this.isSubmitting = true;

        try {
        // Validate publication year
        if (
            this.book.publication_year &&
            this.book.publication_year > this.currentYear
        ) {
            throw new Error(
            `Publication year cannot be in the future (${this.currentYear}).`
            );
        }

        // Add new book
        const newBook = await this.addNewBook(this.book);

        // Create exchange request
        const exchangeData = {
            requester_id: this.$store.state.userData.user_id, // Adjust according to your state
            book_id: newBook.book_id,
            meeting_location: this.exchange.meeting_location,
            meeting_time: this.exchange.meeting_time,
            notes: this.exchange.notes,
            status: 'Pending',
            title: this.book.title,
            description: this.book.description,
        };

        await this.createExchangeRequest(exchangeData);

        this.successMessage = 'Exchange request submitted successfully!';
        this.resetForm();
        } catch (error) {
        this.errorMessage = error.message || 'An error occurred. Please try again.';
        } finally {
        this.isSubmitting = false;
        }
    },
    resetForm() {
        this.book = {
        title: '',
        author: '',
        isbn: '',
        condition: '',
        description: '',
        genre: '',
        language: '',
        publication_year: null,
        image_url: '',
        };
        this.exchange = {
        meeting_location: '',
        meeting_time: '',
        notes: '',
        };
    },
    },
};
</script>

<style scoped>
.new-request-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.new-request-container h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #42b983;
}

.new-request-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.new-request-form section {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 1rem;
}

.new-request-form section:last-child {
    border-bottom: none;
}

.new-request-form h2 {
    margin-bottom: 1rem;
    color: #34495e;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #42b983;
    outline: none;
}

.error-message {
    color: #e74c3c;
    text-align: center;
    margin-bottom: 1rem;
}

.success-message {
    color: #27ae60;
    text-align: center;
    margin-bottom: 1rem;
}

.submit-btn {
    padding: 0.75rem 1.5rem;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    align-self: center;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #369870;
}

.submit-btn:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}
</style>
