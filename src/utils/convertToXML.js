export function convertToXML(data) {
  const serializer = new XMLSerializer();
  const xmlDocument = document.implementation.createDocument('', '', null);
  const root = xmlDocument.createElement("Registry");

  function createElement(key, value) {
      const element = xmlDocument.createElement(key);
      if (Array.isArray(value)) {
          value.forEach(item => {
              const itemElement = xmlDocument.createElement(key.slice(0, -1)); // Remove 's' from the end of the key
              Object.entries(item).forEach(([itemKey, itemValue]) => {
                  createElement(itemKey, itemValue).forEach(child => itemElement.appendChild(child));
              });
              element.appendChild(itemElement);
          });
      } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([itemKey, itemValue]) => {
              createElement(itemKey, itemValue).forEach(child => element.appendChild(child));
          });
      } else {
          element.textContent = value;
      }
      return [element];
  }

  Object.entries(data).forEach(([key, value]) => {
      createElement(key, value).forEach(child => root.appendChild(child));
  });

  xmlDocument.appendChild(root);
  return serializer.serializeToString(xmlDocument);
}
