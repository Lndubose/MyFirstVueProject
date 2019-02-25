<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from "@/views/EventCard.vue";
import EventService from "@/Services/EventService.js";
export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(response => (this.events = response.data))
      .catch(err => console.loge("There was an error:" + err.response));
  }
};
</script>
