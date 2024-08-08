<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimegridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import { useStore } from 'vuex'
import { mapGetters } from 'vuex'

const store = useStore()

const EVENTS = [
    { title: 'Meeting', start: new Date() }
]


export default {
    components: {
        FullCalendar
    },
    data: function () {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, TimegridPlugin,
                    InteractionPlugin,
                    ListPlugin],
                initialView: 'dayGridMonth',
                weekends: true,
                events: this.events,
                locale: 'es-ES',
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
            }
        }
    },
    computed: {
        ...mapGetters("events")
    },
    methods: {
        handleEventClick(info) {
            console.log('click wuyaso');
            
        }
    }
}
</script>

<template>
    <h1>Demo App</h1>
    <!--  <FullCalendar :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
        </template>
</FullCalendar> -->
    <FullCalendar :options='calendarOptions' @eventClick="handleEventClick">
        <template v-slot:eventContent='arg'>
            {{ arg.event.title }}
        </template>
    </FullCalendar>
</template>

<style></style>