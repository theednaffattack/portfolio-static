function menuToggle(container: HTMLDivElement) {
  const linkList = document.getElementById("mobile-top-nav");

  // animate the menu icon
  container.classList.toggle("change");

  if (!linkList) {
    throw new Error("linkList is not defined");
  }

  // Hide the menu
  if (linkList.style.display === "block") {
    linkList.style.display = "none";
  } else {
    linkList.style.display = "block";
  }
}
