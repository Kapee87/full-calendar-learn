<template>
    <div class="modal">
        <div class="modal-box">
            <input v-model="eventTitle" placeholder="Título del evento">
            <input type="datetime-local" v-model="eventStart">
            <button @click="$emit('save', { title: eventTitle, start: eventStart })">Guardar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    eventDate: {
        type: Date,
        required: true
    }
});

const eventTitle = ref('');
const eventStart = ref(null);
</script>
<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal-content {
    background-color: white;
    padding: 20px;
}

.modal-box {
    background-color: rgb(33, 42, 54);
    padding: 2rem;
    border-radius: 15px;
}
</style>