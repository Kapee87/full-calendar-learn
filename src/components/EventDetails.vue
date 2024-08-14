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
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal-box {
    background-color: #2c3e50;
    padding: 2.5rem;
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
</style>