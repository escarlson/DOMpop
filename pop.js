function popElements(htmlInput, tagToRemove) {
  // Create a DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlInput, 'text/html');
  
  // Get all elements matching the tag you want to remove
  const elementsToRemove = doc.querySelectorAll(tagToRemove);

  // For each element, replace it with its inner content
  elementsToRemove.forEach(el => {
      while (el.firstChild) {
          el.parentNode.insertBefore(el.firstChild, el);
      }
      el.remove();  // Remove the div element itself
  });

  // Serialize the modified DOM back to HTML
  let outputHTML = doc.body.innerHTML;

  // Remove empty lines
  outputHTML = outputHTML
    .split('\n')                          // Split output into lines
    .map(line => line.trim())             // Trim whitespace from each line
    .filter(line => line.length > 0)      // Filter out empty or whitespace-only lines
    .join('\n');                          // Join the lines back together

  // Output the modified HTML without escaping characters
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