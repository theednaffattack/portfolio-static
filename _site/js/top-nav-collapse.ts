export function addMenuToggle(container: HTMLDivElement) {
  const menuIcon = document.getElementById("menu-icon");
  const linkList = document.getElementById("mobile-top-nav");
  if (!menuIcon) {
    const errorMessage =
      "An element with the class name 'menu-icon' is required!";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  menuIcon.addEventListener("click", (event) => {
    event.preventDefault();
    // animate the menu icon
    menuIcon.classList.toggle("change");

    if (!linkList) {
      throw new Error("linkList is not defined");
    }

    // Hide the menu
    if (linkList.style.display === "block") {
      linkList.style.display = "none";
    } else {
      linkList.style.display = "block";
    }
  });
}
