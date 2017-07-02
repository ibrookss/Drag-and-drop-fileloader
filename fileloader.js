<<<<<<< HEAD
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
    dropZoneOver: (e) => {;
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

  fileLoader.init('dropZone', '/upload.php', 100000);
=======
let dropZone = document.getElementById('dropZone');
let maxFileZize = 100000;
//Приводем к boolean
let checkBrowser = !!typeof(window.FileReader);
//Проверяем, поддерживает ли браузер FileReader;
  if (!typeof(window.FileReader)) {
    dropZone.innerHtml = `Your browser is bad`;
    dropZone.classList.add('error');
  };
  //При входе курсора в дроп зону
  let dropZoneEnter = function(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  //При движении курсора по дроп зону
  let dropZoneOver = function(e) {
    e.stopPropagation();
    e.preventDefault();
    dropZone.classList.add('hover');
  }
  //При выходе курсора из дроп зоны
  let dropZoneLeave = function() {
    dropZone.classList.remove('hover');
  }

  //При сбросе файла в дропзону
  let dropZoneDrop = function(e) {
    let file = e.dataTransfer.files[0];

    if(file.size > maxFileZize) {
      dropZone.innerHTML = 'File very large';
      dropZone.classList.add('error');
    } else {
      dropZone.innerHTML = 'File size - '+file.size;
    }

    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', uploadProgress, false);
    xhr.onreadystatechange = stateChange;
    xhr.open('POST', '/upload.php');
    xhr.setRequestHeader('X-FILE-NAME', file.name);
    xhr.send(file);

    return false;
  }

  function uploadProgress(event) {
      var percent = parseInt(event.loaded / event.total * 100);
      dropZone.innerHTML = 'Загрузка: ' + percent + '%';
  }

  function stateChange(event) {
      if (event.target.readyState == 4) {
          if (event.target.status == 200) {
              dropZone.innerHTML = 'Загрузка успешно завершена!';
              dropZone.classList.add('success');
          } else {
              dropZone.innerHTML = 'Произошла ошибка!';
              dropZone.classList.add('error');
          }
      }
  }
>>>>>>> origin/master
