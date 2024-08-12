<template>
    <div class="modal">
        <div class="modal-box">
            <label for="">Nombre: </label>
            <input v-model="eventTitle" placeholder="Título del evento">
            <label for="">Inicio: </label>
            <input type="datetime-local" v-model="eventStart" id="fechaInput">
            <label for="">Fin: </label>
            <input type="datetime-local" v-model="eventStart" id="fechaInput">
            <div class="btn-container">
                <button @click="$emit('update', { title: eventTitle, start: eventStart })">Guardar</button>
                <button @click="$emit('delete', { title: eventTitle, start: eventStart })">Eliminar</button>
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
console.log(props.eventInfo.start);


const eventTitle = ref(props.eventInfo.title);
const eventStart = ref(formatDate(props.eventInfo.start));

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
</style>