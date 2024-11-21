function popElements(htmlInput, tagsToRemove, attributesToRemove) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlInput, 'text/html');

  // Remove elements
  tagsToRemove.forEach(tag => {
    const elementsToRemove = doc.querySelectorAll(tag);
    elementsToRemove.forEach(el => {
      while (el.firstChild) {
        el.parentNode.insertBefore(el.firstChild, el);
      }
      el.remove();
    });
  });

  // Remove attributes
  const allElements = doc.querySelectorAll('*');
  allElements.forEach(el => {
    attributesToRemove.forEach(attr => {
      if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
      }
    });
  });

  // Serialize the modified DOM back to HTML
  let outputHTML = doc.body.innerHTML;

  // Remove empty lines
  outputHTML = outputHTML
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  document.getElementById('htmlOutput').value = outputHTML;
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
  let attributeNames = new Set();

  // Loop through the elements and add their tag names to the set
  allElements.forEach(element => {
    tagNames.add(element.tagName.toLowerCase());
    Array.from(element.attributes).forEach(attr => {
      attributeNames.add(attr.name.toLowerCase());
    });
  });

  // Convert to array
  let tagList = Array.from(tagNames);
  console.log(tagList);

  // Populate element checkboxes
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

  // Populate attribute checkboxes
  const attributesCheckboxes = document.getElementById('attributesCheckboxes');
  attributesCheckboxes.innerHTML = '';
  Array.from(attributeNames).forEach((attr, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-1';
    checkbox.value = attr;
    checkbox.id = `attributeCheckbox${index}`;

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = checkbox.id;
    label.innerText = attr;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    attributesCheckboxes.appendChild(listItem);
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

function getCheckedAttributes() {
  const checkboxes = document.querySelectorAll('#attributesCheckboxes input[type="checkbox"]');
  return Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
}