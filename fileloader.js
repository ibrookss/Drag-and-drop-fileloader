let fileLoader = {
  init(dropZoneName, url, maxFileZize) {
    this.url = url || '/';
    this.maxFileZize = maxFileZize || 10000;
    this.dropZone = document.getElementById(dropZoneName);
    if (!typeof(window.FileReader)) {
      this.dropZone.innerHtml = `Your browser is bad`;
      this.dropZone.classList.add('error');
    };
    this.dropZone.addEventListener('dragenter', this.dropZoneEnter);
    this.dropZone.addEventListener('dragover', this.dropZoneOver);
    this.dropZone.addEventListener('dragleave', this.dropZoneLeave);

    this.dropZone.addEventListener('drop', (e) => {
      this.dropZoneDrop(e);
    });

  },
  dropZoneEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  },
  dropZoneOver: (e) => {
    e.stopPropagation();
    e.preventDefault();
    dropZone.classList.add('hover');
  },
  dropZoneLeave() {
    dropZone.classList.remove('hover');
  },
  dropZoneDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (file.size > this.maxFileZize) {
      this.dropZone.innerHTML = 'File very large';
      this.dropZone.classList.add('error');
    } else {
      this.dropZone.innerHTML = 'File size - '+file.size;
    }
    this.uploadFile('/upload.php', 'POST', file);

    return false;
  },
  uploadFile(url, method, file){
    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', this.uploadProgress, false);
    xhr.onreadystatechange = this.stateChange;
    xhr.open('POST', this.url);
    xhr.setRequestHeader('X-FILE-NAME', file.name);
    xhr.send(file);
  },
  uploadProgress(event) {
    var percent = parseInt(event.loaded / event.total * 100);
    dropZone.innerHTML = 'Загрузка: ' + percent + '%';
  },
  stateChange(event) {
    if (event.target.readyState == 4) {
      //Ответ пришел, здесь можно обработать все ответы.
      if (event.target.status == 200) {
          dropZone.innerHTML = 'Загрузка успешно завершена!';
          dropZone.classList.add('success');
      } else {
          dropZone.innerHTML = 'Произошла ошибка!';
          dropZone.classList.add('error');
      }
    }
  }
}

// Аргементы: id блока дропзоны, адрес серверного обработчика, максимальный размер файла.
fileLoader.init('dropZone', '/upload.php', 100000);
