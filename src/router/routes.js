export const routes = [
  {
    path: "/",
    name: "PHome",
    meta: {
      title: "Home",
    },
    component: () => import("@/pages/Home/PIndex.vue"),
  },
  {
    path: "/search",
    meta: {
      title: "Search",
    },
    component: () => import("../pages/search.vue"),
  },
  {
    path: "/education-bachelor",
    meta: {
      title: "Education",
    },
    component: () => import("../pages/education-bachelor.vue"),
  },
  {
    path: "/vacancy",
    meta: {
      title: "Vacancy",
    },
    component: () => import("../pages/vacancy/index.vue"),
  },
  {
    path: "/vacancy/:id",
    meta: {
      title: "Vacancy id",
    },
    component: () => import("../pages/vacancy/_id.vue"),
  },
  {
    path: "/active-students",
    meta: {
      title: "Active Students",
    },
    component: () => import("../pages/active-students/index.vue"),
  },
  {
    path: "/active-students/:id",
    meta: {
      title: "Active Students",
    },
    component: () => import("../pages/active-students/id.vue"),
  },
  {
    path: "/heads-of-department",
    meta: {
      title: "Heads Of Department",
    },
    component: () => import("../pages/heads-of-department/index.vue"),
  },
  {
    path: "/heads-of-department/:slug",
    meta: {
      title: "Heads Of Department",
    },
    component: () => import("../pages/heads-of-department/slug.vue"),
  },
  {
    path: "/normative-documents",
    meta: {
      title: "Normative documents",
    },
    component: () => import("../pages/normative-documents.vue"),
  },
  {
    path: "/class-schedule",
    meta: {
      title: "Class schedule",
    },
    component: () => import("../pages/class-schedule.vue"),
  },
  {
    path: "/oav-about",
    meta: {
      title: "OAV biz haqimizda",
    },
    component: () => import("../pages/oav-about/index.vue"),
  },
  {
    path: "/news",
    meta: {
      title: "News",
    },
    component: () => import("../pages/news/index.vue"),
  },
  {
    path: "/gallery",
    meta: {
      title: "Gallery",
    },
    component: () => import("../pages/gallery/index.vue"),
  },
  {
    path: "/universitysubjects",
    meta: {
      title: "Universitysubjects",
    },
    component: () => import("../pages/universitysubjects/index.vue"),
  },
  {
    path: "/foundation",
    name: "Foundation",
    component: () => import("../pages/foundation/index.vue"),
  },
  {
    path: "/foundation/:slug",
    name: "FoundationSingle",
    component: () => import("../pages/foundation/_slug.vue"),
  },
  {
    path: "/announcements",
    meta: {
      title: "Announcements",
    },
    component: () => import("../pages/announcements/index.vue"),
  },
  {
    path: "/faculties",
    meta: {
      title: "Faculties",
    },
    component: () => import("../pages/faculties/index.vue"),
  },
  {
    path: "/faculties/:id",
    meta: {
      title: "Faculty",
    },
    component: () => import("../pages/faculties/id/index.vue"),
  },
  {
    path: "/faculties/:slug/:id",
    meta: {
      title: "FacultySingle",
    },
    component: () => import("../pages/scientist/id.vue"),
  },
  {
    path: "/faculties/:id/stuffs",
    meta: {
      title: "Faculty Stuffs",
    },
    component: () => import("../pages/faculties/id/stuffs.vue"),
  },
  {
    path: "/faculties/:slug/stuffs/:id",
    meta: {
      title: "Faculty Stuffs Single",
    },
    component: () => import("../pages/scientist/id.vue"),
  },
  {
    path: "/faculties/:id/news",
    meta: {
      title: "Faculty News",
    },
    component: () => import("../pages/faculties/news.vue"),
  },
  {
    path: "/faculties/:id/event",
    meta: {
      title: "Faculty Event",
    },
    component: () => import("../pages/faculties/event.vue"),
  },
  {
    path: "/management",
    meta: {
      title: "Management",
    },
    component: () => import("../pages/management/index.vue"),
  },
  {
    path: "/management/:id",
    meta: {
      title: "Management",
    },
    component: () => import("../pages/management/id.vue"),
  },
  {
    path: "/gallery/:slug",
    meta: {
      title: "Gallery",
    },
    component: () => import("../pages/gallery/_slug.vue"),
  },
  {
    path: "/universitysubjects/:slug",
    meta: {
      title: "Universitysubjects",
    },
    component: () => import("../pages/universitysubjects/_slug.vue"),
  },
  {
    path: "/news/:slug",
    meta: {
      title: "News",
    },
    component: () => import("../pages/news/_slug.vue"),
  },
  {
    path: "/announcements/:slug",
    meta: {
      title: "Announcements",
    },
    component: () => import("../pages/announcements/_slug.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("../layouts/error.vue"),
  },
  {
    path: "/:path(.*)",

    component: () => import("../layouts/error.vue"),
  },
  {
    path: "/branches",
    meta: {
      title: "Branches",
    },
    component: () => import("../pages/branches.vue"),
  },
  {
    path: "/event",
    meta: {
      title: "Event",
    },
    component: () => import("../pages/event/index.vue"),
  },
  {
    path: "/event/:id",
    meta: {
      title: "Event Id",
    },
    component: () => import("../pages/event/id.vue"),
  },
  {
    path: "/governing",
    meta: {
      title: "Governing",
    },
    component: () => import("../pages/governing/index.vue"),
  },
  {
    path: "/governing/:id",
    meta: {
      title: "Governing Id",
    },
    component: () => import("../pages/governing/id.vue"),
  },
  {
    path: "/oav",
    meta: {
      title: "OAV",
    },
    component: () => import("../pages/oav/index.vue"),
  },
  {
    path: "/oav/:slug",
    meta: {
      title: "OAV",
    },
    component: () => import("../pages/oav/_slug.vue"),
  },
  {
    path: "/sections",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/sections/index.vue"),
  },
  {
    path: "/sections/:id",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/sections/_slug.vue"),
  },
  {
    path: "/sections/:id/:id",
    meta: {
      title: "Stuffs",
    },
    component: () => import("../pages/scientist/id.vue"),
  },
  {
    path: "/sections/:id/stuffs/:id",
    meta: {
      title: "Stuffs",
    },
    component: () => import("../pages/scientist/id.vue"),
  },
  {
    path: "/sections/:id/stuffs",
    meta: {
      title: "Stuffs",
    },
    component: () => import("../pages/sections/stuffs.vue"),
  },
  {
    path: "/control",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/control/index.vue"),
  },
  {
    path: "/control/:id",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/control/_slug.vue"),
  },
  {
    path: "/centers",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/centers/index.vue"),
  },
  {
    path: "/centers/:id",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/centers/_slug.vue"),
  },
  {
    path: "/centers/:id/:slug",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/centers/centers-employees.vue"),
  },
  {
    path: "/centers/:id/stuffs",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/centers/stuffs.vue"),
  },
  {
    path: "/center/:id",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/centers/_slug.vue"),
  },
  {
    path: "/department",
    meta: {
      title: "Department",
    },
    component: () => import("../pages/department/index.vue"),
  },
  {
    path: "/department/subjects",
    meta: {
      title: "Subjects",
    },
    component: () => import("../pages/department/subjects/index.vue"),
  },
  {
    path: "/department/scientific-schools",
    meta: {
      title: "Scientific Schools",
    },
    component: () => import("../pages/department/scientific-schools/index.vue"),
  },
  {
    path: "/department/scientific-schools/:slug",
    meta: {
      title: "Scientific Schools",
    },
    component: () => import("../pages/department/scientific-schools/_slug.vue"),
  },
  {
    path: "/department/short-course",
    meta: {
      title: "Scientific Schools",
    },
    component: () => import("../pages/department/short-cource/index.vue"),
  },
  {
    path: "/department/short-course/:slug",
    meta: {
      title: "Scientific Schools",
    },
    component: () => import("../pages/department/short-cource/_slug.vue"),
  },
  {
    path: "/faq",
    meta: {
      title: "FAQ",
    },
    component: () => import("../pages/faq.vue"),
  },
  {
    path: "/scientific-works",
    meta: {
      title: "Scientific Works",
    },
    component: () => import("../pages/scientific-works/index.vue"),
  },
  {
    path: "/scientific-works/:slug",
    meta: {
      title: "Scientific Works",
    },
    component: () => import("../pages/scientific-works/_slug.vue"),
  },
  {
    path: "/life-of-students",
    meta: {
      title: "Life of Students",
    },
    component: () => import("../pages/life-of-students.vue"),
  },
  {
    path: "/scientific-projects",
    meta: {
      title: "Scientific projects",
    },
    component: () => import("../pages/scientific-projects/index.vue"),
  },
  {
    path: "/department/:id",
    meta: {
      title: "Department Id",
    },
    component: () => import("../pages/department/_id.vue"),
  },
  {
    path: "/department/:id/:slug",
    meta: {
      title: "Department Stuffs",
    },
    component: () => import("@/pages/department/slug.vue"),
  },
  {
    path: "/department/:id/departmentStaff",
    meta: {
      title: "Department Stuffs",
    },
    component: () => import("../pages/department/stuffs.vue"),
  },
  {
    path: "/department/:id/departmentStaff/:slug",
    meta: {
      title: "Department Stuffs",
    },
    component: () => import("@/pages/department/slug.vue"),
  },
  {
    path: "/department/:id/about",
    meta: {
      title: "Department related faculty about",
    },
    component: () => import("../pages/department/about.vue"),
  },
  {
    path: "/report",
    meta: {
      title: "Report",
    },
    component: () => import("../pages/report/index.vue"),
  },
  {
    path: "/report/:slug",
    meta: {
      title: "Report",
    },
    component: () => import("../pages/report/_slug.vue"),
  },
  {
    path: "/values",
    meta: {
      title: "Values",
    },
    component: () => import("../pages/values.vue"),
  },
  {
    path: "/scientist",
    meta: {
      title: "Scientist",
    },
    component: () => import("../pages/scientist/index.vue"),
  },
  {
    path: "/scientist/:id",
    meta: {
      title: "Scientist",
    },
    component: () => import("../pages/scientist/id.vue"),
  },
  {
    path: "/scientific-magazines",
    meta: {
      title: "Scientific magazines",
    },
    component: () => import("../pages/scientific-magazines.vue"),
  },
  {
    path: "/purchase",
    meta: {
      title: "Purchase",
    },
    component: () => import("../pages/purchase.vue"),
  },
  {
    path: "/contact",
    meta: {
      title: "Contact",
    },
    component: () => import("../pages/contact.vue"),
  },
  {
    path: "/management/apply",
    meta: {
      title: "Management",
    },
    component: () => import("../pages/management/apply.vue"),
  },
  {
    path: "/management/prorektor-apply",
    meta: {
      title: "Management",
    },
    component: () => import("../pages/management/prorektor-apply.vue"),
  },
  {
    path: "/brandbook",
    meta: {
      title: "Brandbook",
    },
    component: () => import("../pages/brandbook.vue"),
  },
  {
    path: "/curricula",
    meta: {
      title: "Curricula",
    },
    component: () => import("../pages/curricula/index.vue"),
  },
  {
    path: "/curricula/:slug",
    meta: {
      title: "Curricula",
    },
    component: () => import("../pages/curricula/slug.vue"),
  },
  {
    path: "/curricula/:slug/syllabus/:id",
    meta: {
      title: "syllabus",
    },
    component: () => import("../pages/curricula/syllabus/id.vue"),
  },
  {
    path: "/pages/:slug",
    meta: {
      title: "TSUL",
    },
    component: () => import("../pages/pages.vue"),
  },
  {
    path: "/org/:slug",
    meta: {
      title: "OrgParent",
    },
    component: () => import("../pages/org/parent.vue"),
  },
  {
    path: "/org/:slug/:id",
    meta: {
      title: "OrgChild",
    },
    component: () => import("../pages/org/child.vue"),
  },
  {
    path: "/org/employee",
    meta: {
      title: "Employee",
    },
    component: () => import("../pages/org/employee.vue"),
  },
  {
    path: "/projects",
    meta: {
      title: "Projects",
    },
    component: () => import("../pages/projects/projects.vue"),
  },
  {
    path: "/projects/:slug",
    meta: {
      title: "ProjectsChild",
    },
    component: () => import("../pages/projects/child.vue"),
  },
  {
    path: "/rektor-tabrigi",
    meta: {
      title: "Rektor tabrigi",
    },
    component: () => import("../pages/rektorTabrigi.vue"),
  },
  {
    path: "/all-employees",
    name: "PAllEmployees",
    meta: {
      title: "All Employees",
    },
    component: () => import("../pages/all-employees/index.vue"),
  },
  {
    path: "/all-employees/:slug",
    meta: {
      title: "All Employees single",
    },
    component: () => import("../pages/all-employees/slug.vue"),
  },
  {
    path: "/department/subject",
    meta: {
      title: "hello",
    },
    component: () => import("../components/common/ProfileInfo.vue"),
  },
  {
    path: "/pages/qabul",
    meta: {
      title: "hello",
    },
    component: () => import("@/pages/admission/index.vue"),
  },
  // {
  //   path: "/admission/:slug",
  //   meta: {
  //     title: "hello",
  //   },
  //   component: () => import("@/pages/admission/slug.vue"),
  // },
  {
    path: "/admission-to-bachelor",
    meta: {
      title: "Bachelor admission",
    },
    component: () => import("@/pages/admission-bachelor/index.vue"),
  },
  {
    path: "/admission-magistr",
    meta: {
      title: "Bachelor admission",
    },
    component: () => import("@/pages/admission-magistr/index.vue"),
  },
  {
    path: "/education-program",
    meta: {
      title: "Educational programs",
    },
    component: () => import("@/pages/admission/education-program.vue"),
  },
  {
    path: "/admission-international",
    meta: {
      title: "Educational programs",
    },
    component: () => import("@/pages/admission/international.vue"),
  },
  {
    path: "/education-master",
    meta: {
      title: "Education Master",
    },
    component: () => import("@/pages/EducationLevel/Master.vue"),
  },
  {
    path: "/ikkinchi-mutaxassislik",
    meta: {
      title: "Second specialty",
    },
    component: () => import("@/pages/EducationLevel/SecondSpecialty.vue"),
  },
  {
    path: "/opendays",
    meta: {
      title: "Educational programs",
    },
    component: () => import("@/pages/admission/opendays.vue"),
  },
  {
    path: "/post-gallery",
    meta: {
      title: "Media markaz",
    },
    component: () => import("@/pages/gallery/index.vue"),
  },
  {
    path: "/org/foundation",
    redirect: "/error",
  },
];
