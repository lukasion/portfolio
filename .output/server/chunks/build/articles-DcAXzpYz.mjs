import { ref } from 'vue';
import { u as useFetch } from './fetch-CCjfMeZS.mjs';
import { d as defineStore } from './server.mjs';

const useArticlesStore = defineStore("articles", () => {
  const articles = ref([]);
  const article = ref(null);
  async function fetchData(params) {
    const { data } = await useFetch("/api/articles", {
      params
    }, "$md08FJB6Fz");
    if (data.value) {
      articles.value = data.value;
    }
  }
  async function fetchArticle(id) {
    const { data } = await useFetch(`/api/articles/${id}`, "$vFb3E4SRhb");
    if (data.value) {
      article.value = data.value;
    }
  }
  async function fetchBySlug(slug) {
    const { data } = await useFetch(`/api/articles/${slug}`, "$Wu5fGNwafs");
    if (data.value) {
      article.value = data.value;
      return data.value;
    }
    return null;
  }
  return {
    articles,
    article,
    fetchData,
    fetchArticle,
    fetchBySlug
  };
});

export { useArticlesStore as u };
//# sourceMappingURL=articles-DcAXzpYz.mjs.map
