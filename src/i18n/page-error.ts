/** Kept apart from the full dictionaries so the error boundary can import it without shipping them. */
export const pageError = {
  en: {
    label: "Page error",
    title: "Part of this page didn't load.",
    body: "This usually happens right after the site is updated. Reloading fixes it.",
    reload: "Reload the page",
    email: "Still broken? Email",
  },
  sv: {
    label: "Sidfel", // REVIEW-SV
    title: "En del av sidan laddades inte.", // REVIEW-SV
    body: "Det händer oftast precis efter att webbplatsen har uppdaterats. Ladda om sidan så löser det sig.", // REVIEW-SV
    reload: "Ladda om sidan", // REVIEW-SV
    email: "Fungerar det fortfarande inte? Mejla", // REVIEW-SV
  },
};
