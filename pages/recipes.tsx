function Recipes({ collections }) {
  const urlList = collections.recipe.map((item) => {
    return (
      <li key={`link-list-${item.url}`}>
        <a href={item.url}>{item.data.title}</a>
      </li>
    );
  });
  return (
    <div>
      <h1>RECIPES</h1>
      <ul>{urlList}</ul>
    </div>
  );
}

export const frontMatter = {
  title: "Recipes",
  layout: "base.njk",
};

export default Recipes;
