window.onload = () => {
  document.getElementById('try-params').addEventListener('submit', (form) => {
    form.preventDefault();
    const post = (path, params) => {
      const newForm = document.createElement('form');
      newForm.method = 'post';
      newForm.action = path;
      Object.keys(params).forEach((key) => {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
        newForm.appendChild(hiddenField);
      });
      document.body.appendChild(newForm);
      newForm.submit();
    };
    const json = document.getElementById('json-params').textContent;
    post(document.getElementsByTagName('form')[0].getAttribute('action'), { params: `{${JSON.parse(JSON.stringify(json))}}` });
  });
};
