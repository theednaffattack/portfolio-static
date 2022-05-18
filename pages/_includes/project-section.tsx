import { SiGithub } from "react-icons/si";

interface ProjectListKeys {
  name: string;
  bgImage: string;
  liveLink: string;
  ghLink: string;
  tags: string[];
}

const projectList: ProjectListKeys[] = [
  {
    bgImage: "https://unsplash.com/photos/ipARHaxETRk",
    ghLink: "https://github.com/theednaffattack/dungeon-crawler-new",
    liveLink: "http://192.168.1.10:8080/project/dungeon-crawler",
    name: "Dungeon Crawler",
    tags: ["TypeScript"],
  },
  {
    bgImage: "https://unsplash.com/photos/_t-l5FFH8VA",
    ghLink: "https://github.com/theednaffattack/dungeon-crawler-new",
    liveLink: "http://192.168.1.10:8080/project/dungeon-crawler",
    name: "Bug Tracker",
    tags: ["TypeScript"],
  },
  {
    bgImage: "https://unsplash.com/photos/qDG7XKJLKbs",
    ghLink: "https://github.com/theednaffattack/dungeon-crawler-new",
    liveLink: "http://192.168.1.10:8080/project/dungeon-crawler",
    name: "Third Project",
    tags: ["Rust"],
  },
];

function ProjectSectionContent() {
  const projectsMap = projectList.map(({ bgImage, ghLink, liveLink, name }) => (
    <li
      key={`${name}-project-list`}
      className="project-badge"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="center-text">
        <p>{name}</p>
      </div>

      <a href={liveLink}>
        <SiGithub size="2em" />
        live
      </a>
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
