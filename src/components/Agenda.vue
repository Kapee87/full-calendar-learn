<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimegridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin, { Draggable } from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import { ref, computed, watch } from 'vue'
import MyModal from './MyModal.vue';
/* @ts-ignore */
import EventDetails from './EventDetails.vue'
import axios from 'axios'

const events = ref([])
const apiUrl = 'http://localhost:3000'

const axiosEvents = async () => {
    try {
        const response = await axios(apiUrl + '/events')
        events.value = response.data
    } catch (error) {
        console.error(error);
    }
}
axiosEvents()
const showModal = ref(false);
const showEventModal = ref(false);
const selectedDate = ref(null);
const selectedEvent = ref(null);


// Función para determinar el color del evento
const eventColorCheck = (startDate) => {
    const startDateFormatted = new Date(startDate)
    console.log(Date.now() > startDateFormatted.getTime());
    if (Date.now() > startDateFormatted.getTime()) {
        return 'red'; // Evento pasado
    } else if (new Date().getDate() === new Date(startDate).getDate()) {
        return 'orange'; // Evento hoy
    } else {
        return 'blue'; // Evento futuro
    }
}

// Función para actualizar los eventos con el color correspondiente
/* const updateEventColors = (events) => {
    events.forEach(event => {
        event.color = eventColorCheck(event.start);
    });
}; */



const handleEventClick = (info) => {
    selectedEvent.value = info.event
    showEventModal.value = true
};

const saveEventLocal = (eventData) => {
    if (eventData.title.length > 3 && eventData.start !== null) {
        // Aquí agregarías el nuevo evento a tu lista de eventos y lo guardarías en la base de datos si es necesariLocalo
        events.value.push({
            title: eventData.title,
            start: eventData.start,
            id: String(Date())
            // ... otras propiedades
        });
        showModal.value = false;
        console.log(events.value)
    } else {
        alert("Debe completar todos los campos")
    }
};

const updateEventLocal = (eventData) => {
    const newEvents = [...events.value]; // Crear una copia del array
    const index = newEvents.findIndex(event => event.id === selectedEvent.value.id);

    if (eventData.title.length > 3 && eventData.start !== null) {
        if (index !== -1) {
            // Actualizar las propiedades del evento existente
            newEvents[index].title = eventData.title;
            newEvents[index].start = eventData.start;
            // ... actualizar otras propiedades

            // Asignar el nuevo array al valor reactivo
            events.value = newEvents;

            handleCancelModal();
            console.log(events.value);
        } else {
            // Manejar el caso en el que el evento no se encontró
            console.error('Evento no encontrado');
        }
    } else {
        alert("Debe completar todos los campos");
    }
};
const deleteEventLocal = () => {
    if (confirm('¿Estás seguro?')) {
        const newEvents = [...events.value]; // Crear una copia del array
        const index = newEvents.findIndex(event => event.id === selectedEvent.value.id);
        if (index !== -1) {
            newEvents.splice(index, 1);
            events.value = newEvents; // Asignar el nuevo array al valor reactivo
            handleCancelModal()
        }
    } else {
        alert("Eliminación cancelada")
        console.log("Eliminación cancelada");
    }
};
const handleCancelModal = () => {
    showModal.value = false
    showEventModal.value = false
}
const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, TimegridPlugin, InteractionPlugin, ListPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    /* initialEvents: events.value.map(event => {
        event.color = eventColorCheck(event.start);
        return event;
    }), */
    initialEvents: events.value,
    locale: 'es-ES',
    selectable: true,
    editable: false,
    eventClick: handleEventClick,
    eventColor: '#378006',
    events: events.value,
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
    height: "80vh",
    dateClick: (info) => {

        if (info.view.type === 'dayGridMonth') {
            // console.log('es vista de mes ');
            info.view.calendar.changeView('timeGridDay', info.dateStr);
        } else {
            selectedDate.value = info;
            showModal.value = true; // Set showModal after setting selectedDate
        }
    },
    /*  eventAdd: (info) => {
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
     } */
}))

// Simulación de las funciones de la API
/* 

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
*/



</script>

<template>
    <h1>Agenda</h1>
    <FullCalendar :options="calendarOptions" />
    <MyModal v-if="showModal" :eventInfo="selectedDate" :modalProp="showModal" @save="saveEventLocal"
        @cancel="handleCancelModal" />
    <EventDetails v-if="showEventModal" :eventInfo="selectedEvent" :modalProp="showEventModal"
        @update="updateEventLocal" @delete="deleteEventLocal" @cancel="handleCancelModal" />
</template>

<style scoped>
h1 {
    font-style: italic;
    text-decoration: underline;
}
</style>




<!-- 
[
    {
        id: "001",
        title: 'Evento Actual',
        start: new Date(Date.now() + 3600000),
        end: new Date(Date.now() + 259200000),
    },
    {
        id: "002",
        title: 'Evento Vencido',
        start: new Date(Date.now() - 259200000),
        end: new Date(Date.now() - 209200000),
    },
    {
        id: "003",
        title: 'Evento Futuro',
        start: new Date(Date.now() + 209200000),
        end: new Date(Date.now() + 259200000),
    },
    {
        id: "004",
        title: 'Evento individual',
        start: new Date(Date.now() + 259200000 + 259200000),
        end: '',
    }

]
 -->