function flip(element) {
  if (element.nodeName === "DIV") {
    element.parentElement.classList.add("flipped");
  }
}

export default {
  flip
};
