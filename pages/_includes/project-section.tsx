import { SiGithub } from "react-icons/si";

const projectList = [
  {
    name: "Dungeon Crawler",
    bgImage: "https://unsplash.com/photos/ipARHaxETRk",
    ghLink: "https://github.com/theednaffattack/dungeon-crawler-new",
    tags: ["TypeScript"],
  },
  {
    name: "Bug Tracker",
    bgImage: "https://unsplash.com/photos/_t-l5FFH8VA",
    ghLink: "https://github.com/theednaffattack/dungeon-crawler-new",
    tags: ["TypeScript"],
  },
  {
    name: "Third Project",
    bgImage: "https://unsplash.com/photos/qDG7XKJLKbs",
    ghLink: "https://github.com/theednaffattack/dungeon-crawler-new",
    tags: ["Rust"],
  },
];

function ProjectSectionContent() {
  const projectsMap = projectList.map(({ bgImage, ghLink, name }) => (
    <li
      key={`${name}-project-list`}
      className="project-badge"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="center-text">
        <p>{name}</p>
      </div>
      <a href={ghLink}>
        <SiGithub size="2em" />
        open source code
      </a>
    </li>
  ));
  return (
    <div>
      <ul className="grid-list no-list-style">{projectsMap}</ul>
    </div>
  );
}

export default ProjectSectionContent;
