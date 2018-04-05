function flip(element) {
  if (element.nodeName === "DIV") {
    element.parentElement.classList.add("flipped");
  } else if (element.nodeName === "LI") {
    element.classList.add("flipped");
  }
}

function unflip(element) {
  if (element.nodeName === "DIV") {
    element.parentElement.classList.remove("flipped");
  } else if (element.nodeName === "LI") {
    element.classList.remove("flipped");
  }
}

export default {
  flip,
  unflip
};
