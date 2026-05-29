export type Site = {
  name: string;
  role: string;
  intro: string;
  email: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    x: string;
  };
  resume: string;
};

export const site: Site = {
  name: "",
  role: "",
  intro: "",
  email: "",
  location: "",
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    x: "",
  },
  resume: "/cv.pdf",
};
