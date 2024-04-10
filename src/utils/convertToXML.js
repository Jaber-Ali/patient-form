export function convertToXML(data) {
    const serializer = new XMLSerializer();
    const xmlDocument = document.implementation.createDocument('', '', null);
    const root = xmlDocument.createElement("PatientRegistry");
  
    Object.entries(data).forEach(([key, value]) => {
      const element = xmlDocument.createElement(key);
      if (Array.isArray(value)) {
        value.forEach(item => {
          const itemElement = xmlDocument.createElement(`${key}Item`);
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            const childElement = xmlDocument.createElement(itemKey);
            childElement.textContent = itemValue;
            itemElement.appendChild(childElement);
          });
          element.appendChild(itemElement);
        });
      } else {
        element.textContent = value;
      }
      root.appendChild(element);
    });
  
    xmlDocument.appendChild(root);
    return serializer.serializeToString(xmlDocument);
  }
  
  
  const formData = { patient: { name: 'Test Test', generalCondition: '3' }, diagnoses: [{ diagnosisDate: '2024-04-09', basisForDiagnosis: 'X-ray' }] };
  const xmlData = convertToXML(formData);
  console.log(xmlData);
  