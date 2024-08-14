<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimegridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import { ref, computed } from 'vue'
import MyModal from './MyModal.vue'
import EventDetails from './EventDetails.vue'
import axios from 'axios'

// URL de la API para los eventos
const apiEventsUrl = 'http://localhost:3000/events/'

// Referencias reactivas
const events = ref([])
const showModal = ref(false)
const showEventModal = ref(false)
const selectedDate = ref(null)
const selectedEvent = ref(null)

/**
 * Obtiene los eventos desde la API
 */
const fetchEvents = async () => {
    try {
        const response = await axios.get(apiEventsUrl)
        events.value = response.data
    } catch (error) {
        console.error('Error al obtener eventos:', error)
    }
}

// Cargar eventos al iniciar el componente
fetchEvents()

/**
 * Determina el color del evento basado en su fecha de inicio
 * @param {string} startDate - Fecha de inicio del evento
 * @returns {string} Color del evento
 */
const eventColorCheck = (startDate) => {
    const startDateFormatted = new Date(startDate)
    const now = new Date()
    if (now > startDateFormatted) {
        return '#F34205' // Evento pasado
    } else if (now.toDateString() === startDateFormatted.toDateString()) {
        return '#F37C05' // Evento hoy
    } else {
        return '#05F354' // Evento futuro
    }
}

// /**
//  * Maneja el clic en un evento
//  * @param {Object} info - Información del evento clickeado
//  */
// const handleEventClick = (info) => {
//     selectedEvent.value = info.event
//     showEventModal.value = true
// }

/**
 * Guarda un nuevo evento
 * @param {Object} eventData - Datos del nuevo evento
 */
const saveEventLocal = async (eventData) => {
    if (eventData.title.length > 3 && eventData.start) {
        try {
            const response = await axios.post(apiEventsUrl, eventData)
            events.value.push(response.data)
            showModal.value = false
        } catch (error) {
            console.error('Error al guardar evento:', error)
        }
    } else {
        alert("Debe completar todos los campos")
    }
}

/**
 * Actualiza un evento existente
 * @param {Object} eventData - Datos actualizados del evento
 */
const updateEventLocal = async (eventData) => {
    const eventId = selectedEvent.value._def.extendedProps._id
    const index = events.value.findIndex(event => event._id === eventId)

    if (eventData.title.length > 3 && eventData.start) {
        if (index !== -1) {
            try {
                await axios.put(`${apiEventsUrl}${eventId}`, eventData)
                events.value[index] = { ...events.value[index], ...eventData }
                handleCancelModal()
            } catch (error) {
                console.error('Error al actualizar evento:', error)
            }
        } else {
            console.error('Evento no encontrado')
        }
    } else {
        alert("Debe completar todos los campos")
    }
}

/**
 * Elimina un evento
 */
const deleteEventLocal = async () => {
    if (confirm('¿Estás seguro?')) {
        const eventId = selectedEvent.value._def.extendedProps._id
        try {
            await axios.delete(`${apiEventsUrl}${eventId}`)
            events.value = events.value.filter(event => event._id !== eventId)
            handleCancelModal()
        } catch (error) {
            alert('Hubo un error al eliminar el evento')
        }
    }
}

/**
 * Cierra los modales
 */
const handleCancelModal = () => {
    showModal.value = false
    showEventModal.value = false
}

/**
 * Opciones del calendario
 */
const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, TimegridPlugin, InteractionPlugin, ListPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    locale: 'es-ES',
    selectable: true,
    editable: false,
    eventClick: (info) => {
        selectedEvent.value = info.event
        showEventModal.value = true
    },
    eventColor: '#378006',
    events: events.value.map(event => ({
        ...event,
        color: eventColorCheck(event.start)
    })),
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
            info.view.calendar.changeView('timeGridDay', info.dateStr)
        } else {
            selectedDate.value = info
            showModal.value = true
        }
    }
}))
</script>

<template>
  <h1>Tu agenda personal</h1>
  <FullCalendar :options="calendarOptions" />
  <MyModal
    v-if="showModal"
    :eventInfo="selectedDate"
    :modalProp="showModal"
    @save="saveEventLocal"
    @cancel="handleCancelModal"
  />
  <EventDetails
    v-if="showEventModal"
    :eventInfo="selectedEvent"
    :modalProp="showEventModal"
    @update="updateEventLocal"
    @delete="deleteEventLocal"
    @cancel="handleCancelModal"
  />
</template>

<style>
h1 {
  font-weight: 300;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  letter-spacing: 1.5px;
}

:deep(.fc) {
  --fc-border-color: #dfe4ea;
  --fc-button-text-color: #ffffff;
  --fc-button-bg-color: #1abc9c;
  --fc-button-border-color: #1abc9c;
  --fc-button-hover-bg-color: #16a085;
  --fc-button-hover-border-color: #16a085;
  --fc-button-active-bg-color: #16a085;
  --fc-button-active-border-color: #16a085;
}

:deep(.fc-toolbar-title) {
  font-size: 2rem !important;
  font-weight: 400;
  color: #2c3e50;
}

:deep(.fc-button) {
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.7em 1.2em;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-sizing: border-box; /* Asegura que el padding no afecte el tamaño del botón */
  display: inline-block; /* Mantén el botón como un bloque inline para evitar que se divida */
}

:deep(.fc-button:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

:deep(.fc-day-today) {
  background-color: rgba(26, 188, 156, 0.1) !important;
}

:deep(.fc-event) {
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
  padding: 3px 5px;
  transition: all 0.2s ease;
}

:deep(.fc-event:hover) {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

:deep(.fc-event-past) {
  background-color: #95a5a6 !important;
}

:deep(.fc-event-today) {
  background-color: #f39c12 !important;
}

:deep(.fc-event-future) {
  background-color: #27ae60 !important;
}

:deep(.fc-day-header) {
  font-weight: 600;
  text-transform: uppercase;
  color: #7f8c8d;
}

:deep(.fc-list-event) {
  background-color: transparent !important;
}

:deep(.fc-list-event-dot) {
  border-color: #1abc9c !important;
}

:deep(.fc-list-day-cushion) {
  background-color: #f1f2f6 !important;
}

:deep(.fc-timegrid-slot-label) {
  font-size: 0.85em;
  font-weight: 500;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  :deep(.fc-toolbar) {
    flex-direction: column;
    align-items: center;
  }

  :deep(.fc-toolbar-title) {
    font-size: 1.6rem !important;
    margin-bottom: 0.5rem;
  }

  :deep(.fc-button) {
    margin: 0.3em 0;
  }
}

.fc-toolbar-chunk {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
}

/* Estilos generales para los botones */
.fc-button-primary {
    background-color: #4CAF50 !important;
    border-color: #4CAF50 !important;
    color: white !important;
}

/* Estilos para el botón activo */
.fc-button-active {
    background-color: #45a049 !important;
    border-color: #45a049 !important;
}

/* Estilos para el hover de los botones */
.fc-button-primary:hover {
    background-color: #45a049 !important;
    border-color: #45a049 !important;
}

/* Estilos para el botón 'hoy' */
.fc-today-button {
    font-weight: bold !important;
}

/* Estilos para los botones de navegación (anterior y siguiente) */
.fc-prev-button,
.fc-next-button {
    padding: 4px 8px !important;
}

@media screen and (max-width:768px) {
    .fc-toolbar-chunk {
        flex-direction: column;
        justify-content: baseline !important;
        align-items: baseline;
        gap: .2rem;
    }
}
</style>
