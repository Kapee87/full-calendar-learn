<template>
    <div class="modal">
        <div class="modal-box">
            <label for="event-title">Nombre:
                <input id="event-title" v-model="eventData.title" placeholder="Título del evento">
            </label>
            <label for="event-description">Descripción:
                <input id="event-description" v-model="eventData.description" placeholder="Descripción">
            </label>
            <label for="event-start">Inicio:
                <input id="event-start" type="datetime-local" v-model="eventData.start">
            </label>
            <label for="event-end">Fin:
                <input id="event-end" type="datetime-local" v-model="eventData.end">
            </label>
            <div class="btn-container">
                <button @click="$emit('update', eventData)">Guardar</button>
                <button @click="$emit('delete', eventData._id)">Eliminar</button>
                <button @click="$emit('cancel')" id="cancelBtn">❌</button>
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
        default: false
    }
})

/**
 * Formatea una fecha para el input datetime-local
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
const formatDate = (date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
}

const eventData = ref({
    _id: props.eventInfo.extendedProps._id,
    title: props.eventInfo.title,
    description: props.eventInfo.description,
    start: formatDate(props.eventInfo.start),
    end: formatDate(props.eventInfo.end)
})
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
    background-color: rgb(33, 42, 54);
    padding: 2rem 5rem;
    margin: 12%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    position: relative;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.modal-box label {
    color: #ecf0f1;
    font-weight: bold;
    margin-bottom: 0.3rem;
}

.modal-box input {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    background-color: #34495e;
    color: #ecf0f1;
    font-size: 1rem;
}

.modal-box input:focus {
    outline: 2px solid #9b38ac;
}

.btn-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.modal-box button {
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-box button:first-child {
    background-color: #27ae60;
    color: white;
}

.modal-box button:nth-child(2) {
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

#cancelBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    color: #ecf0f1;
    font-size: 1.2rem;
    padding: 0.5rem;
}

#cancelBtn:hover {
    color: #e74c3c;
}

.modal-box div {
    width: 100%;
    padding: .5rem;
    border-top: solid .4px gray;
    display: flex;
    gap: 1rem;
    justify-content: end;
}

.modal-box label {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: .75rem;
}

.modal-box input {
    border-radius: 10px;
    border: none;
    padding: .5rem;
}
</style>