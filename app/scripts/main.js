window.onload = () => {
  document.getElementById('try-params').addEventListener('submit', (form) => {
    form.preventDefault();

    /**
     * sends a request to the specified url from a form. this will change the window location.
     * @param {string} path the path to send the post request to
     * @param {object} params the paramiters to add to the url
     * @param {string} [method=post] the method to use on the form
     */
    function post(path, params) {
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
    }
    const json = document.getElementById('json-params').textContent;
    post(document.getElementsByTagName('form')[0].getAttribute('action'), { params: JSON.parse((JSON.stringify(json))) });
  });
};
