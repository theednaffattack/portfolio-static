export function addMenuToggle(elementId: string) {
  const clickableElement = document.getElementById(elementId);
  const linkList = document.getElementById("mobile-top-nav");
  if (!clickableElement) {
    console.error(
      `Element "${elementId}" does not appear to be present in the DOM.`
    );
    return;
  }

  clickableElement.addEventListener("click", (event) => {
    event.preventDefault();

    // animate the menu icon
    clickableElement.classList.toggle("change");

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
