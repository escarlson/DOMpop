function popElements(htmlIn, tag) {
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlIn;
  let selectedTags = tempDiv.querySelectorAll(tag);
  selectedTags.forEach(tag => {tag.replaceWith(tag.innerHTML);})
  let htmlOut = tempDiv.innerHTML;
  let outputTextarea = document.getElementById('htmlOutput');
  outputTextarea.value = htmlOut;
}

function copyOutputToInput() {
  let inputTextarea = document.getElementById('htmlInput');
  let outputTextarea = document.getElementById('htmlOutput');
  inputTextarea.value = outputTextarea.value;
}

function enumerateElements() {
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = document.getElementById('htmlInput').value;

  // Select all elements
  let allElements = tempDiv.querySelectorAll('*');

  // Store unique elements in a set
  let tagNames = new Set();

  // Loop through the elements and add their tag names to the set
  allElements.forEach(element => {
    tagNames.add(element.tagName.toLowerCase());
  });

  // Convert to array
  let tagList = Array.from(tagNames);
  console.log(tagList);

  const elementsCheckboxes = document.getElementById('elementsCheckboxes');
  elementsCheckboxes.innerHTML = '';  // Clear previous checkboxes
  tagList.forEach((tag, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input me-1';
      checkbox.value = tag;
      checkbox.id = `checkbox${index}`;  // Assign unique id

      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.htmlFor = checkbox.id;  // Ensure label matches the checkbox's id
      label.innerText = tag;

      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      elementsCheckboxes.appendChild(listItem);
  });
}

function getCheckedElements() {
  // Select all checkboxes inside the list
  const checkboxes = document.querySelectorAll('#elementsCheckboxes input[type="checkbox"]');
  
  // Filter the checked checkboxes and get their values
  const checkedValues = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
  return checkedValues;
}