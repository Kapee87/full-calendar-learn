// store/index.js
state: {
  events: [
    {
      id: 1,
      title: 'Evento 1',
      start: new Date('2024-08-07'),
      end: new Date('2024-08-08'),
    },
    // ... otros eventos
  ];
}
// store/index.js
getters: {
  events: (state) => state.events;
}
// store/index.js
mutations: {
    addEvent(state, event) {
      state.events.push(event)
    },
    updateEvent(state, updatedEvent) {
      const index = state.events.findIndex(e => e.id === updatedEvent.id)
      if (index !== -1) {
        state.events[index] = updatedEvent
      }
    }
    // ... otras mutaciones para eliminar, etc.
  }
  