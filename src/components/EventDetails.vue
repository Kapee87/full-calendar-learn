<template>
    <div class="modal">
        <div class="modal-box">
            <label for="">Nombre: </label>
            <input v-model="eventTitle" placeholder="Título del evento">
            <label for="">Descripcion:
            </label>
            <input v-model="eventDescription" placeholder="Descripción">
            <label for="">Inicio: </label>
            <input type="datetime-local" v-model="eventStart" id="fechaInput">
            <label for="">Fin: </label>
            <input type="datetime-local" v-model="eventEnd">
            <div class="btn-container">
                <button @click="$emit('update', eventData.val)">Guardar</button>
                <button @click="$emit('delete', eventData.val)">Eliminar</button>
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
        isReadOnly: false
    }
});


const eventId = props.eventInfo.extendedProps._id
const eventTitle = ref(props.eventInfo.title);
const eventDescription = ref(props.eventInfo.description);
const eventStart = ref(formatDate(props.eventInfo.start));
const eventEnd = ref(formatDate(props.eventInfo.end));
const eventData = ref({
    _id: eventId,
    title: eventTitle.value,
    description: eventDescription.value,
    start: eventStart.value,
    end: eventEnd.value
});



function formatDate(date) {
    if (!date) return
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

    align-items: end;
}
</style>