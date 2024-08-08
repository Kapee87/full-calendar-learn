<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimegridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import { ref, computed, watch } from 'vue'
import MyModal from './MyModal.vue';
// console.log('1er carga ' + String(Date()));

const events = ref([
    {
        id: "001",
        title: 'Evento importante',
        start: '2024-08-19T09:00:00',
        backgroundColor: 'red',
        borderColor: 'black',
        textColor: 'white'
    },
    {
        id: "002",
        title: 'Evento importante',
        start: '2024-08-20T09:00:00',
        backgroundColor: 'red',
        borderColor: 'black',
        textColor: 'white'
    },
    {
        id: "003",
        title: 'Evento importante',
        start: '2024-08-23T09:00:00',
        backgroundColor: 'red',
        borderColor: 'black',
        textColor: 'white'
    },
])
const showModal = ref(false);
const selectedDate = ref(null);
const calendar = ref(null);

// Función para determinar el color del evento
const eventColorCheck = (startDate) => {
    if (new Date() > new Date(startDate)) {
        return 'red'; // Evento pasado
    } else if (new Date().getDate() === new Date(startDate).getDate()) {
        return 'orange'; // Evento hoy
    } else {
        return 'blue'; // Evento futuro
    }
}

// Función para actualizar los eventos con el color correspondiente
const updateEventColors = (events) => {
    events.forEach(event => {
        event.color = eventColorCheck(event.start);
    });
};



const handleEventClick = (info) => {
    const eventId = info.event.id;
    const index = events.value.findIndex(event => event.id === eventId);
    console.log(eventId);
    console.log(index);


    if (index !== -1) {
        events.value.splice(index, 1);
    }
    console.log(events.value);


    /* if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
        const eventId = info.event.id;
        const index = events.value.findIndex(event => event.id === eventId);
        if (index !== -1) {
            events.value.splice(index, 1);
        }

    } else {
        // El usuario canceló la eliminación
        console.log("Eliminación cancelada");
    } */
};

const saveEvent = (eventData) => {
    if (eventData.title.length > 3 && eventData.start !== null) {
        // Aquí agregarías el nuevo evento a tu lista de eventos y lo guardarías en la base de datos si es necesario
        events.value.push({
            title: eventData.title,
            start: eventData.start,
            id: String(Date())
            // ... otras propiedades
        });
        showModal.value = false;
    } else {
        alert("Debe completar todos los campos")
    }
};

const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, TimegridPlugin, InteractionPlugin, ListPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: events.value,
    locale: 'es-ES',
    selectable: true,
    editable: true,
    eventClick: handleEventClick,
    eventColor: '#378006',
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
    events: events.value.map(event => {
        event.color = eventColorCheck(event.start);
        return event;
    }),
    dateClick: (info) => {
        if (info.view.type === 'dayGridMonth') {
            // console.log('es vista de mes ');
            info.view.calendar.changeView('timeGridDay', info.dateStr);
        } else {
            selectedDate.value = info.date;
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
/* watch(selectedDate, (newValue) => {
    if (newValue) {
        showModal.value = true;
    }
}); */

</script>

<template>
    <h1>Demo App</h1>
    <FullCalendar :options="calendarOptions" />
    <MyModal v-if="showModal" :eventDate="selectedDate" @save="saveEvent" />


</template>

<style></style>
