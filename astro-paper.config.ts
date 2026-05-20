import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://shahabazkhan.com/",
    title: "Shahabaz Khan",
    description:
      "Notes on software, infrastructure, and the homelab — by Shahabaz Khan.",
    author: "Shahabaz Khan",
    profile: "https://shahabazkhan.com",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Berlin",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/shahabazdev/shahabazkhan.com/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/shahabazdev" },
    { name: "mail", url: "mailto:me@shahabazkhan.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
