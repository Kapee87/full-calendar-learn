<template>
    <div class="modal">
        <div class="modal-box">
            <input v-model="eventTitle" placeholder="Título del evento" id="eventTitle">
            <label for="eventDescription">
                <input v-model="eventDescription" id="eventDescription" placeholder="Descripción">
                opcional
            </label>
            <input type="datetime-local" v-model="eventStart" id="fechaInput">
            <label for="eventEndDate">
                <input type="datetime-local" id="eventEndDate" v-model="eventEnd">
                opcional
            </label>
            <div>
                <button
                    @click="$emit('save', { title: eventTitle, start: eventStart, description: eventDescription, end: eventEnd })">Guardar</button>
                <button @click="$emit('cancel')">❌</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    eventInfo: {
        type: Object,
        required: true
    },
    modalProp: {
        type: Boolean,
        isReadOnly: false
    }
});

const eventTitle = ref('');
const eventDescription = ref('');
const eventEnd = ref('');
const eventStart = ref(formatDate(props.eventInfo.date));

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const
        hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;

}

</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal-box {
    background-color: #2c3e50;
    padding: 2rem;
    margin: 10%;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;

    gap: 1rem;
    max-width: 350px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.modal-box input {
    width: 85%;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    background-color: #34495e;
    color: #ecf0f1;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.modal-box input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #9b38ac;
}

.modal-box input::placeholder {
    color: #95a5a6;
}

.modal-box div {
    width: 100%;
    padding: .5rem;
    border-top: solid .4px gray;
    display: flex;
    gap: 1rem;
    justify-content: end;
}

.modal-box button {
    border: none;
    border-radius: 8px;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-box button:first-of-type {
    background-color: #27ae60;
    color: white;
}

.modal-box button:last-of-type {
    background-color: #e74c3c;
    color: white;
}

.modal-box button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-box button:active {
    transform: translateY(0);
    box-shadow: none;
}

.modal-box label {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: .75rem;

    align-items: end;
}

.modal-box input {
    border-radius: 10px;
    border: none;
    padding: .5rem;
}
</style>