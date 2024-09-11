function popElements(htmlIn, tag) {
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlIn;
  let selectedTags = tempDiv.querySelectorAll(tag);
  selectedTags.forEach(tag => {tag.replaceWith(tag.innerHTML);})
  let htmlOut = tempDiv.innerHTML;
  let outputTextarea = document.getElementById('htmlOutput');
  outputTextarea.value = htmlOut;
}