<template>
  <PCSliderSplide />
  <PCNews :news="allNews" :events="allEvents" :pending="pending" />
  <PCEducation :data-education="dataEducation" :link360="footer.virtual_link" :pending="pending" />
  <LifeStyle
    :our-clubs="categoryClubs"
    :projects="categoryProjects"
    :scientific-schools="scientificSchools"
    :life-style-students="lifeStyleStudents"
    :pending="pending"
    :subjects="subjects"
    :festivals="festivals"
  />
  <PCScientificResearches
    :data-scientific-researches="dataScientificResearches"
    :pending="pending"
  />
  <announce :announce="announcements" :pending="pending" class="py-[64rem]" />

  <PCInteractiveSection />
  <MetaTag
    :data="{
      title: 'TДЮ',
      desc: '',
    }"
  />
</template>

<script setup>
import PCSliderSplide from "@/pages/Home/components/PCSliderSplide.vue";
import PCNews from "./components/PCNews.vue";
import PCEducation from "./components/PCEducation.vue";
import LifeStyle from "@/components/layouts/sections/LifeStyle.vue";
import PCInteractiveSection from "./components/PCInteractiveSection.vue";
import PCScientificResearches from "./components/PCScientific-researches.vue";
import MetaTag from "@/components/common/MetaTag.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const pending = ref(true);
const announcements = ref([]);
const allNews = ref([]);
const allEvents = ref([]);
const dataEducation = ref(undefined);
const categoryClubs = ref(undefined);
const categoryProjects = ref(undefined);
const scientificSchools = ref(undefined);
const lifeStyleStudents = ref(undefined);
const subjects = ref(undefined);
const festivals = ref(undefined);
const dataScientificResearches = ref(undefined);
const footer = ref([]);

const store = useStore();

const fetchPosts = () => {
  store
    .dispatch("fetchPost", {
      type: "announcements",
      limit: 6,
    })
    .then(({ data }) => {
      announcements.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });

  store
    .dispatch("fetchPost", {
      type: "news",
      limit: 20,
    })
    .then(({ data }) => {
      allNews.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });
  store
    .dispatch("fetchPost", {
      type: "event",
      limit: 6,
    })
    .then(({ data }) => {
      allEvents.value = data.results?.filter((item,idx) => item?.event_date && idx<=5)
    })
    .finally(() => {
      pending.value = false;
    });

  store
    .dispatch("fetchAbout")
    .then(({ data }) => {
      dataEducation.value = data;
    })
    .finally(() => {
      pending.value = false;
    });

  store
    .dispatch("fetchFoundation", {
      category: "projects",
      page: 1,
    })
    .then(({ data }) => {
      categoryProjects.value = data.results;
    });

  store.dispatch("fetchFooter").then(({ data }) => {
    footer.value = data;
  });

  store
    .dispatch("fetchFoundation", {
      category: "clubs",
      page: 1,
    })
    .then(({ data }) => {
      categoryClubs.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });

  store
    .dispatch("fetchFoundation", {
      category: "ilmiy-maktablar",
      page: 1,
    })
    .then(({ data }) => {
      scientificSchools.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });

  //Subject
  store
    .dispatch("fetchFoundation", {
      category: "tutors",
      page: 1,
    })
    .then(({ data }) => {
      subjects.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });

  //Festivals
  store
    .dispatch("fetchFoundation", {
      category: "festivals",
      page: 1,
    })
    .then(({ data }) => {
      festivals.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });

  store
    .dispatch("fetchPost", {
      type: "lifestyle-students",
    })
    .then(({ data }) => {
      lifeStyleStudents.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });

  store
    .dispatch("fetchPost", {
      type: "scientific-works",
      limit: 4,
    })
    .then(({ data }) => {
      dataScientificResearches.value = data.results;
    })
    .finally(() => {
      pending.value = false;
    });
};

fetchPosts();
</script>
