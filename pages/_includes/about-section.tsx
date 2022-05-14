import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";

const skills = [
  { name: "html", Icon: SiHtml5, fill: "#e34f26", labelText: "HTML5" },
  { name: "css", Icon: SiCss3, fill: "#264de4", labelText: "CSS3" },
  { name: "react", Icon: SiReact, fill: "#61DBFB", labelText: "React" },
  {
    name: "javascript",
    Icon: SiJavascript,
    fill: "#f0db4f",
    labelText: "JavaScript",
  },
  {
    name: "typescript",
    Icon: SiTypescript,
    fill: "#3178c6",
    labelText: "TypeScript",
  },
  { name: "node", Icon: SiNodedotjs, fill: "#3c873a", labelText: "NodeJs" },
];

function AboutSectionContent() {
  const skillMap = skills.map(({ fill, Icon, labelText, name }) => (
    <li key={`${name}-list-icon`}>
      {typeof Icon !== "string" ? (
        <Icon color={fill} title={`${labelText} icon`} size="2em" />
      ) : (
        ""
      )}
      <p>{labelText}</p>
    </li>
  ));
  return (
    <div>
      <ul className="grid-list no-list-style">{skillMap}</ul>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rerum
        quas omnis rem dolore maxime dolores pariatur eius culpa! Consequatur
        sapiente reiciendis quam voluptatum eos assumenda excepturi perferendis
        doloremque sequi?
      </p>
    </div>
  );
}

export default AboutSectionContent;
