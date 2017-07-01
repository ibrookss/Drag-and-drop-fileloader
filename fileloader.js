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
