<template>
  <div class="min-h-screen bg-gradient-to-tr from-white via-green-50 to-green-200 p-4 sm:p-8 md:p-12">
    <LoadingOverlay :visible="loading" />

    <header class="mb-8 sm:mb-10">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-800 drop-shadow-md">
        Your Books 📚
      </h1>
    </header>

    <!-- Modal Form -->
    <div
      v-if="showForm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm px-4"
    >
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8">
        <h2 class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-700 border-b border-green-200 pb-2">
          {{ isEdit ? 'Edit Book' : 'Add New Book' }}
        </h2>
        <input
          v-model="form.title"
          placeholder="Title"
          type="text"
          class="w-full border border-green-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          v-model="form.author"
          placeholder="Author"
          type="text"
          class="w-full border border-green-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          v-model.number="form.publishedYear"
          placeholder="Published year"
          type="number"
          class="w-full border border-green-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          v-model="form.genre"
          placeholder="Genre"
          type="text"
          class="w-full border border-green-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 mb-5 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            @click="submitForm"
            class="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition"
          >
            Save
          </button>
          <button
            @click="cancelForm"
            class="bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div
      class="overflow-x-auto bg-white rounded-3xl shadow-lg p-4 sm:p-8 max-w-7xl mx-auto"
    >
      <div class="mb-4 sm:mb-6 flex justify-end">
        <button
          @click="openCreateForm"
          class="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition"
        >
          + Add Book
        </button>
      </div>

      <table class="min-w-full table-auto border-collapse border border-gray-200 text-sm sm:text-base">
        <thead>
          <tr class="bg-green-100 text-green-900">
            <th class="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold border border-green-200">#</th>
            <th class="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold border border-green-200">Title</th>
            <th class="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold border border-green-200">Author</th>
            <th class="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold border border-green-200">Published Year</th>
            <th class="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold border border-green-200">Genre</th>
            <th class="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold border border-green-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="book in books"
            :key="book.id"
            class="hover:bg-green-50 transition cursor-pointer"
          >
            <td class="px-3 sm:px-6 py-2 sm:py-4 border border-green-200 text-green-800 font-medium">{{ book.id }}</td>
            <td class="px-3 sm:px-6 py-2 sm:py-4 border border-green-200 text-green-900 font-semibold">{{ book.title }}</td>
            <td class="px-3 sm:px-6 py-2 sm:py-4 border border-green-200 text-green-700">{{ book.author }}</td>
            <td class="px-3 sm:px-6 py-2 sm:py-4 border border-green-200 text-green-700">{{ book.published_year }}</td>
            <td class="px-3 sm:px-6 py-2 sm:py-4 border border-green-200 text-green-700">{{ book.genre }}</td>
            <td class="px-3 sm:px-6 py-2 sm:py-4 border border-green-200 space-x-2">
              <button
                @click="editBook(book)"
                class="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold rounded-lg px-3 sm:px-4 py-1 sm:py-2 shadow transition"
              >
                Edit
              </button>
              <button
                @click="deleteBook(book.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-1 sm:py-2 shadow transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-3 sm:space-y-0">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 sm:px-6 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition w-full sm:w-auto"
        >
          Previous
        </button>

        <p class="text-green-800 font-semibold">
          Page {{ currentPage }} of {{ lastPage }}
        </p>

        <button
          @click="nextPage"
          :disabled="currentPage === lastPage"
          class="px-4 sm:px-6 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import Swal from 'sweetalert2'

const books = ref([])
const currentPage = ref(1)
const lastPage = ref(1)

const showForm = ref(false)
const isEdit = ref(false)
const form = ref({ id: null, title: '', author: '', publishedYear: '', genre: '' })
const loading = ref(false)

async function fetchBooks(page = 1) {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    const res = await api.get(`/api/books?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    books.value = res.data.data
    currentPage.value = res.data.current_page
    lastPage.value = res.data.last_page
  } catch (error) {
    console.log(error)
    alert('Failed to fetch books')
  } finally {
    loading.value = false
  }
}

function openCreateForm() {
  isEdit.value = false
  form.value = { id: null, title: '', author: '', publishedYear: '', genre: '' }
  showForm.value = true
}

function editBook(book) {
  isEdit.value = true
  form.value = {
    id: book.id,
    title: book.title,
    author: book.author,
    publishedYear: book.published_year,
    genre: book.genre
  }
  showForm.value = true
}

function cancelForm() {
  showForm.value = false
}

async function submitForm() {
  if (!form.value.title || !form.value.author) {
    Swal.fire({
      title: 'Missing fields',
      text: 'Please fill in all required fields.',
      icon: 'warning',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition duration-300 ease-in-out'
      },
      buttonsStyling: false
    })
    return
  }

  if (isNaN(form.value.publishedYear)) {
    Swal.fire('Invalid Year', 'Published year must be a number.', 'error')
    return
  }

  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const url = isEdit.value ? `/api/books/${form.value.id}` : '/api/books'
    const method = isEdit.value ? 'put' : 'post'

    await api({
      method,
      url,
      data: {
        title: form.value.title,
        author: form.value.author,
        published_year: form.value.publishedYear,
        genre: form.value.genre,
      },
      headers: { Authorization: `Bearer ${token}` },
    })

    showForm.value = false
    fetchBooks(currentPage.value)

    Swal.fire({
      icon: 'success',
      title: isEdit.value ? 'Book Updated!' : 'Book Added!',
      text: isEdit.value
        ? 'The book information has been updated.'
        : 'The book has been successfully created.',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
    })
  } catch (error) {
    alert('Failed to save')
  } finally {
    loading.value = false
  }
}

async function deleteBook(id) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out',
      cancelButton: 'bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out ml-4'
    },
    buttonsStyling: false,
  })

  if (!result.isConfirmed) return

  try {
    const token = localStorage.getItem('token')
    await api.delete(`/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchBooks(currentPage.value)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your book has been deleted.',
      showConfirmButton: false,
      timer: 1500,
    })
  } catch (error) {
    console.error(error)
    Swal.fire('Error!', 'Failed to delete the book.', 'error')
  }
}

function nextPage() {
  if (currentPage.value < lastPage.value) {
    fetchBooks(currentPage.value + 1)
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    fetchBooks(currentPage.value - 1)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>
