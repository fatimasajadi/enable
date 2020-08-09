export function download(file) {
  const path = getFilePath(file);
  fetch(path)
    .then(response => response.blob())
    .then(blob => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = file;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

export function getFilePath(file) {
  return `/uploads/${file}`;
}