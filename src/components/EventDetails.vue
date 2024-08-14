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
    padding: 2rem 5rem;
    margin: 12%;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    position: relative;
}

.btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.modal-box button {
    border: none;
    border-radius: 10px;
    padding: .6rem;
    background-color: rgb(155, 56, 172);
    color: white;
    cursor: pointer;
    transition: all .3s;
    box-shadow: 1px 3px 2px black;
}

.modal-box button:hover {
    box-shadow: 3px 4px 5px black;
    transition: all .3s;
    background-color: rgb(180, 68, 200);
}

.modal-box button:active {
    box-shadow: none;

}

#cancelBtn {
    position: absolute;
    top: .5rem;
    right: 1rem;
    transform: scale(.8);
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