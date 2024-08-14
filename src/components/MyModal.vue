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
    margin: 10%;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;

    gap: 1rem;
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