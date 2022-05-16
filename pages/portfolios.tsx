const portfolios = [
  {
    url: "https://www.kateives.com",
    name: "Kate Ives",
    tags: [],
  },
];

function PortfolioPage() {
  const pfs = portfolios.map(({ name, url }) => (
    <li key={url}>
      <a href={url}>{name}</a>
    </li>
  ));
  return (
    <ul>
      <h1>Portfolios to Admire</h1>
      {pfs}
    </ul>
  );
}

export const frontMatter = {
  title: "Portfolios",
  layout: "base.njk",
};

export default PortfolioPage;
