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

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import TimegridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";
import MyModal from "./MyModal.vue";
import EventDetails from "./EventDetails.vue";
import axios from "axios";

export default {
  components: {
    FullCalendar,
    MyModal,
    EventDetails,
  },
  data() {
    return {
      events: [],
      showModal: false,
      showEventModal: false,
      selectedDate: null,
      selectedEvent: null,
    };
  },
  computed: {
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, TimegridPlugin, InteractionPlugin, ListPlugin],
        initialView: "dayGridMonth",
        weekends: true,
        initialEvents: this.events,
        locale: "es-ES",
        selectable: true,
        editable: false,
        eventClick: this.handleEventClick,
        eventColor: "#378006",
        events: this.events,
        headerToolbar: {
          left: "title",
          right: "prev today next",
          center: "dayGridMonth, timeGridWeek, timeGridDay",
        },
        buttonText: {
          today: "hoy",
          prev: "anterior",
          next: "siguiente",
          day: "Día",
          month: "Mes",
          week: "Semana",
        },
        height: "80vh",
        dateClick: (info) => {
          if (info.view.type === "dayGridMonth") {
            info.view.calendar.changeView("timeGridDay", info.dateStr);
          } else {
            this.selectedDate = info;
            this.showModal = true;
          }
        },
      };
    },
  },
  methods: {
 
    async axiosEvents() {
      try {
        const response = await axios("http://localhost:3000/events");
        console.log(response);
        this.events = response.data;
        console.log(this.events);
      } catch (error) {
        console.error(error);
      }
    },
    eventColorCheck(startDate) {
      const startDateFormatted = new Date(startDate);
      if (Date.now() > startDateFormatted.getTime()) {
        return "red"; // Evento pasado
      } else if (new Date().getDate() === new Date(startDate).getDate()) {
        return "orange"; // Evento hoy
      } else {
        return "blue"; // Evento futuro
      }
    },
    handleEventClick(info) {
      this.selectedEvent = info.event;
      this.showEventModal = true;
    },
    async saveEventLocal(eventData) {
      if (eventData.title.length > 3 && eventData.start !== null) {
        const newEvent = {
          title: eventData.title,
          start: eventData.start,
          id: String(Date()),
        };
        try {
          const response = await axios.post(
            "http://localhost:3000/events",
            newEvent
          );
          newEvent.id = response.data.id;
          this.events.push(newEvent);
          this.showModal = false;
        } catch (error) {
          console.error(
            "Error al guardar el evento en la base de datos:",
            error
          );
        }
      } else {
        alert("Debe completar todos los campos");
      }
    },
    async updateEventLocal(eventData) {
      const newEvents = [...this.events];
      const index = newEvents.findIndex(
        (event) => event.id === this.selectedEvent.id
      );

      if (eventData.title.length > 3 && eventData.start !== null) {
        if (index !== -1) {
          try {
            await axios.put(
              `http://localhost:3000/events/${this.selectedEvent.id}`,
              eventData
            );
            newEvents[index].title = eventData.title;
            newEvents[index].start = eventData.start;
            this.events = newEvents;
            this.handleCancelModal();
            console.log(this.events);
          } catch (error) {
            console.error(
              "Error al actualizar el evento en la base de datos:",
              error
            );
          }
        } else {
          console.error("Evento no encontrado");
        }
      } else {
        alert("Debe completar todos los campos");
      }
    },
    async deleteEventLocal() {
      if (confirm("¿Estás seguro?")) {
        const newEvents = [...this.events];
        const index = newEvents.findIndex(
          (event) => event.id === this.selectedEvent.id
        );

        try {
          await axios.delete(
            `http://localhost:3000/events/${this.selectedEvent.id}`
          );
          newEvents.splice(index, 1);
          this.events = newEvents;
          this.handleCancelModal();
        } catch (error) {
          console.error(
            "Error al eliminar el evento en la base de datos:",
            error
          );
        }
      }
    },
    handleCancelModal() {
      this.showModal = false;
      this.showEventModal = false;
    },
  },
  mounted() {
    this.axiosEvents();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

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
</style>
