<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimegridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import { ref } from 'vue'

const events = ref([
    // You can optionally put your initial events here
    { title: 'Meeting', start: new Date() }
])
const handleEventClick = (info) => {
    console.log('Event clicked:', info.event);
};
const handleDateClick = (info) => {
    console.log('Click on: ', info.dateStr);
    console.log('All day: ', info.allDay);
    console.log('View type: ', info.view.type);
};

const calendarOptions = ref({
    // ... other options
    plugins: [dayGridPlugin, TimegridPlugin, InteractionPlugin, ListPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: events.value,
    locale: 'es-ES',
    selectable: true,
    editable: true,
    eventAdd: (info) => {
        createEvent(info.event)
    },
    eventDrop: (info) => {
        updateEvent(info.event)
    },
    eventResize: (info) => {
        updateEvent(info.event)
    },
    eventRemove: (info) => {
        deleteEvent(info.event.id)
    },
    headerToolbar: {
        left: "title",
        right: "prev today next",
        center: "dayGridMonth, timeGridWeek, timeGridDay"
    },
    buttonText: {
        today: "hoy",
        prev: "anterior",
        next: "siguiente",
        day: "Día",
        month: "Mes",
        week: "Semana"
    },
    height: "80vh"
})

// Simulación de las funciones de la API
function createEvent(event) {
    // Aquí iría la lógica para enviar el evento a la API
    // Por ahora, simplemente agregamos el evento al arreglo local
    event.id = Date.now() // Asigna un ID único
    events.value.push(event)
}

function updateEvent(event) {
    // Aquí iría la lógica para actualizar el evento en la API
    // Por ahora, simplemente actualizamos el evento en el arreglo local
    const index = events.value.findIndex(e => e.id === event.id)
    if (index !== -1) {
        events.value[index] = event
    }
}

function deleteEvent(eventId) {
    // Aquí iría la lógica para eliminar el evento de la API
    // Por ahora, simplemente eliminamos el evento del arreglo local
    events.value = events.value.filter(e => e.id !== eventId)
}
</script>

<template>
    <h1>Demo App</h1>
    <FullCalendar :options='calendarOptions' @eventClick="handleEventClick" @dateClick="handleDateClick">
        <template v-slot:eventContent='arg'>
            {{ arg.event.title }}
        </template>
    </FullCalendar>
</template>

<style></style>
