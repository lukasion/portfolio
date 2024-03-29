import { ref } from 'vue';
import { u as useFetch } from './fetch-DXWw0h3v.mjs';
import { d as defineStore } from './server.mjs';

const useTopicsStore = defineStore("topics", () => {
  const topics = ref([]);
  const topic = ref({
    name: "",
    datetime: ""
  });
  async function fetchTopics(id) {
    const { data } = await useFetch(`/api/topics`, "$eNA539CJJU");
    if (data.value) {
      topics.value = data.value;
    }
  }
  async function fetchTopic(id) {
    const { data } = await useFetch(`/api/topics/${id}`, "$mV5PWQJx7h");
    if (data.value) {
      topic.value.name = data.value.name;
      topic.value.datetime = data.value.datetime;
    }
  }
  async function create() {
    const { data } = await useFetch(`/api/topics`, {
      method: "POST",
      body: {
        name: topic.value.name,
        datetime: topic.value.datetime
      }
    }, "$WE3j2xWiXf");
    if (data.value) {
      topic.value = data.value;
    }
  }
  return {
    topic,
    topics,
    fetchTopic,
    fetchTopics,
    create
  };
});

export { useTopicsStore as u };
//# sourceMappingURL=topics-Baz25l9q.mjs.map
