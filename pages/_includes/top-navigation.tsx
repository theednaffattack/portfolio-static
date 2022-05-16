const links = [
  { label: "projects", href: "#projects" },
  {
    label: "about",
    href: "#about",
  },
  {
    label: "contact",
    href: "#contact",
  },
  { label: "blog", href: "/blog" },
];

function TopNavigation() {
  const linkMap = links.map(({ href, label }) => (
    <li key={href}>
      <a href={href}>{label}</a>
    </li>
  ));
  return (
    <nav className="new-nav">
      <ul id="top-menu">{linkMap}</ul>
    </nav>
  );
}

export default TopNavigation;
