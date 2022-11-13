let play = document.querySelector("#play")
let description = document.querySelector("#description")
let gameMechanics = document.querySelector("#game_mechanics")
gameMechanics.style.display = "none"
play.addEventListener("click", e => {
  description.style.display = "none"
  gameMechanics.style.display = "inline"
  game()
})

function game() {
let res = document.querySelector("#res")
let mapdiv = document.querySelector("#map")
let map = document.createElement("table")
let scorediv = document.querySelector("#scorediv")
againbutton = document.querySelector("#againbutton")
scorediv.style.display = "none"
let timerDisplay = document.querySelector("#timerdisplay")
let savebutton = document.querySelector("#savebutton")
let savediv = document.querySelector("#savediv")
let savedgames = document.querySelector("#savedgames")
let editorbutton = document.querySelector("#editorbutton")
let editordiv = document.querySelector("#editor")
let highscoresdiv = document.querySelector("#highscores")
savediv.style.display = "none"
timerDisplay.style.display = "none"
let counter = 0
isPaused = true
let maps = []
let currentMap
let score

let hscoresF = []
if(localStorage.hscoresF) {
  hscoresF = JSON.parse(localStorage.hscoresF)
}
for(elem of hscoresF) {
  let li = document.createElement("li")
  li.innerHTML = `${elem.name} - ${elem.map} - ${elem.score}`
  document.querySelector("#highscores ol").append(li)
}

let select = document.querySelector("select")
select.addEventListener("change", e => {
  editorbutton.style.display = "none"
  scorediv.style.display = "none"
  timerDisplay.style.display = "flex"
  res.innerHTML = ""
  currentMap = select.value
  if (select.value != 0) {
    mapdiv.innerHTML = ""
    select.style.display = "none"
    map = maps[parseInt(select.value)-1]
    mapdiv.append(map)
    active()
    resetStopwatch()
    startStopwatch()
    savediv.style.display = "flex"
  }
})

createMaps()
function createMaps() {
  for (let i = 1; i <= 3; i++) {
    let size
    if (i <= 2) {
      size = 7
    } else size = 10
    let newMap = document.createElement("table")
    for(let i = 0; i < size; i++){
      const row = document.createElement("tr")
      for(let j = 0; j < size; j++){
        const cell = document.createElement("td")
        row.append(cell)
      }
      newMap.append(row)
    }
    fillTable(newMap,i)
    maps.push(newMap)
    let option = document.createElement("option")
    option.value = i
    switch (i) {
      case 1:
        option.innerHTML = `Könnyű ${size}x${size}`
        break
      case 2:
        option.innerHTML = `Haladó ${size}x${size}`
        break
      case 3:
        option.innerHTML = `Nehéz ${size}x${size}`
        break
      default:
        option.innerHTML = `${size}x${size}`
        break
    }
    select.add(option)
  }
}

function fillTable(newMap, tableID) {
  switch (tableID) {
    case 1:
      newMap.querySelectorAll("td").forEach(e => {
        e.classList.add("free")
      })
      newMap.rows[0].cells[3].innerHTML = 1
      newMap.rows[0].cells[3].classList.replace("free","obstacle")
      newMap.rows[1].cells[1].innerHTML = 0
      newMap.rows[1].cells[1].classList.replace("free","obstacle")
      newMap.rows[1].cells[5].innerHTML = 2
      newMap.rows[1].cells[5].classList.replace("free","obstacle")
      newMap.rows[3].cells[0].classList.replace("free","obstacle")
      newMap.rows[3].cells[3].classList.replace("free","obstacle")
      newMap.rows[3].cells[6].classList.replace("free","obstacle")
      newMap.rows[5].cells[1].classList.replace("free","obstacle")
      newMap.rows[5].cells[5].innerHTML = 2
      newMap.rows[5].cells[5].classList.replace("free","obstacle")
      newMap.rows[6].cells[3].innerHTML = 3
      newMap.rows[6].cells[3].classList.replace("free","obstacle")
      break
    case 2:
      newMap.querySelectorAll("td").forEach(e => {
        e.classList.add("free")
      })
      newMap.rows[0].cells[2].classList.replace("free","obstacle")
      newMap.rows[0].cells[2].innerHTML = 0
      newMap.rows[0].cells[5].classList.replace("free","obstacle")
      newMap.rows[2].cells[0].classList.replace("free","obstacle")
      newMap.rows[2].cells[2].classList.replace("free","obstacle")
      newMap.rows[2].cells[4].classList.replace("free","obstacle")
      newMap.rows[2].cells[4].innerHTML = 3
      newMap.rows[2].cells[6].classList.replace("free","obstacle")
      newMap.rows[3].cells[3].classList.replace("free","obstacle")
      newMap.rows[3].cells[3].innerHTML = 1
      newMap.rows[4].cells[0].classList.replace("free","obstacle")
      newMap.rows[4].cells[0].innerHTML = 2
      newMap.rows[4].cells[2].classList.replace("free","obstacle")
      newMap.rows[4].cells[4].classList.replace("free","obstacle")
      newMap.rows[4].cells[6].classList.replace("free","obstacle")
      newMap.rows[6].cells[2].classList.replace("free","obstacle")
      newMap.rows[6].cells[4].classList.replace("free","obstacle")
      newMap.rows[6].cells[4].innerHTML = 2
      break
    case 3:
      newMap.querySelectorAll("td").forEach(e => {
        e.classList.add("free")
      })
      newMap.rows[0].cells[1].classList.replace("free","obstacle")
      newMap.rows[1].cells[5].classList.replace("free","obstacle")
      newMap.rows[1].cells[5].innerHTML = 3
      newMap.rows[1].cells[7].classList.replace("free","obstacle")
      newMap.rows[1].cells[7].innerHTML = 2
      newMap.rows[1].cells[9].classList.replace("free","obstacle")
      newMap.rows[2].cells[1].classList.replace("free","obstacle")
      newMap.rows[2].cells[1].innerHTML = 0
      newMap.rows[2].cells[2].classList.replace("free","obstacle")
      newMap.rows[2].cells[7].classList.replace("free","obstacle")
      newMap.rows[3].cells[4].classList.replace("free","obstacle")
      newMap.rows[4].cells[1].classList.replace("free","obstacle")
      newMap.rows[4].cells[1].innerHTML = 1
      newMap.rows[4].cells[4].classList.replace("free","obstacle")
      newMap.rows[4].cells[5].classList.replace("free","obstacle")
      newMap.rows[4].cells[5].innerHTML = 1
      newMap.rows[4].cells[6].classList.replace("free","obstacle")
      newMap.rows[5].cells[3].classList.replace("free","obstacle")
      newMap.rows[5].cells[4].classList.replace("free","obstacle")
      newMap.rows[5].cells[5].classList.replace("free","obstacle")
      newMap.rows[5].cells[8].classList.replace("free","obstacle")
      newMap.rows[5].cells[8].innerHTML = 3
      newMap.rows[6].cells[5].classList.replace("free","obstacle")
      newMap.rows[7].cells[2].classList.replace("free","obstacle")
      newMap.rows[7].cells[2].innerHTML = 1
      newMap.rows[7].cells[7].classList.replace("free","obstacle")
      newMap.rows[7].cells[7].innerHTML = 0
      newMap.rows[7].cells[8].classList.replace("free","obstacle")
      newMap.rows[8].cells[0].classList.replace("free","obstacle")
      newMap.rows[8].cells[0].innerHTML = 3
      newMap.rows[8].cells[2].classList.replace("free","obstacle")
      newMap.rows[8].cells[4].classList.replace("free","obstacle")
      newMap.rows[8].cells[4].innerHTML = 0
      newMap.rows[9].cells[8].classList.replace("free","obstacle")
      newMap.rows[9].cells[8].innerHTML = 0
      break
    default:
      console.log("INVALID MAP SELECTION")
      break
  }
}

function active() {
  map.addEventListener("click", (e)=> {
    if(e.target.matches("td") && !e.target.classList.contains("obstacle") && !winCheck()){
      if (e.target.classList.contains("free")) {
        e.target.classList.replace("free","bulb")
        const lightAnimation = async () => {
          await lightOnAnimation(e.target.closest('tr').rowIndex,e.target.cellIndex)
          if (e.target.classList.contains("intersect")) doesIntersect()
          refresh()
        }
        lightAnimation()
      } else {
        if (e.target.classList.contains("intersect")) doesIntersect()
        e.target.classList.replace("bulb","free")
        refresh()
      }
    }
  })
}

async function lightOnAnimation(r,c) {
  await Promise.all([left(r,c-1), right(r,c+1), top(r-1,c), bottom(r+1,c)]);
  async function left(R,C) {
    if ((C >= 0) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        map.rows[R].cells[C].classList.add("intersect")
        map.rows[r].cells[c].classList.add("intersect")
      }
      await delay(200);
      return await left(R,C-1)
    } else return
  }
  async function right(R,C) {
    if ((C <= map.rows.length-1) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        map.rows[R].cells[C].classList.add("intersect")
        map.rows[r].cells[c].classList.add("intersect")
      }
      await delay(200);
      return await right(R,C+1)
    } else return
  }
  async function top(R,C) {
    if ((R >= 0) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        map.rows[R].cells[C].classList.add("intersect")
        map.rows[r].cells[c].classList.add("intersect")
      }
      await delay(200);
      return await top(R-1,C)
    } else return
  }
  async function bottom(R,C) {
    if ((R <= map.rows.length-1) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        map.rows[R].cells[C].classList.add("intersect")
        map.rows[r].cells[c].classList.add("intersect")
      }
      await delay(200);
      return await bottom(R+1,C)
    } else return
  }
  return
}

function lightOn(r,c) {
  let intersect = false
  let iR, iC
  left(r,c-1)
  right(r,c+1)
  top(r-1,c)
  bottom(r+1,c)
  function left(R,C) {
    if ((C >= 0) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        intersect = true
        iR = R
        iC = C
      }
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      left(R,C-1)
    } else return
  }
  function right(R,C) {
    if ((C <= map.rows.length-1) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        intersect = true
        iR = R
        iC = C
      }
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      right(R,C+1)
    } else return
  }
  function top(R,C) {
    if ((R >= 0) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        intersect = true
        iR = R
        iC = C
      }
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      top(R-1,C)
    } else return
  }
  function bottom(R,C) {
    if ((R <= map.rows.length-1) && !map.rows[R].cells[C].classList.contains("obstacle")) {
      if (map.rows[R].cells[C].classList.contains("bulb")) {
        intersect = true
        iR = R
        iC = C
      }
      map.rows[R].cells[C].style.backgroundColor = "yellow"
      bottom(R+1,C)
    } else return
  }
  if (intersect) {
    map.rows[r].cells[c].classList.add("intersect")
    map.rows[iR].cells[iC].classList.add("intersect")
  }
}

function refresh() {
  map.querySelectorAll("td").forEach(e => {
    if ((!e.classList.contains("obstacle")) && (!e.classList.contains("bulb"))) {
      e.style.backgroundColor = "white"
    }
  })
  map.querySelectorAll("td").forEach(e => {
    if (e.classList.contains("bulb")) {
      lightOn(e.closest('tr').rowIndex,e.cellIndex)
    }
  })
  obstacleIllumination()
  if (winCheck()) {
    score = document.querySelector('#mins').innerHTML + " : " +
            document.querySelector('#secs').innerHTML + " : " +
            document.querySelector('#ms').innerHTML
    stopStopwatch()
    res.innerHTML = ""
    res.append("You've won!")
    savedgames.style.display = "none"
    scorediv.style.display = "inline"
    savebutton.style.display = "none"
  }
}

function doesIntersect() {
  map.querySelectorAll("td").forEach(e => {
    if (e.classList.contains("intersect")) e.classList.remove("intersect")
  })
}

function obstacleIllumination() {
  map.querySelectorAll(".obstacle").forEach(e => {
    r = e.closest('tr').rowIndex
    c = e.cellIndex
    let counter = 0
    if (r < map.rows.length-1 && map.rows[r+1].cells[c].classList.contains("bulb")) counter++
    if (r > 0 && map.rows[r-1].cells[c].classList.contains("bulb")) counter++
    if (c < map.rows.length-1 && map.rows[r].cells[c+1].classList.contains("bulb")) counter++
    if (c > 0 && map.rows[r].cells[c-1].classList.contains("bulb")) counter++
    if (map.rows[r].cells[c].innerHTML == counter) {
      map.rows[r].cells[c].style.color = "green"
    } else map.rows[r].cells[c].style.color = "white"
  })
}

function winCheck() {
  allCellsIlluminated = false
  allObstaclesIlluminated = false
  noIntersections = false

  numOfCells = map.rows.length*map.rows.length
  numOfObstacles = map.querySelectorAll(".obstacle").length
  numOfBulbs = map.querySelectorAll(".bulb").length
  numOfFreeCells = map.querySelectorAll(".free").length
  let counter1 = 0
  map.querySelectorAll(".free").forEach(e => {
    if(e.style.backgroundColor == "yellow") counter1++
  })
  numOfIlluminatedCells = counter1
  allCellsIlluminated = (numOfIlluminatedCells + numOfBulbs) == numOfCells - numOfObstacles
  let counter2 = 0
  map.querySelectorAll(".obstacle").forEach(e => {
    if(e.style.color == "green" || e.innerHTML == ``) counter2++
  })
  let numOfGreenObstacles = counter2
  allObstaclesIlluminated = numOfGreenObstacles == numOfObstacles
  noIntersections = map.querySelectorAll(".intersect").length == 0
  return allCellsIlluminated && allObstaclesIlluminated && noIntersections
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

againbutton.addEventListener("click", (e) => {
  restart()
  savedgames.style.display = "inline"
  select.style.display = "inline"
  scorediv.style.display = "none"
  editorbutton.style.display = "inline"
})

function restart() {
  let newrecord = new Object()
  newrecord.name = document.querySelector("input#name").value
  newrecord.map = select.options[currentMap].innerHTML
  select.selectedIndex = 0
  newrecord.score = score
  newrecord.time =  parseInt(document.querySelector('#mins').innerHTML) * 60000 +
                    parseInt(document.querySelector('#secs').innerHTML) * 1000 +
                    parseInt(document.querySelector('#ms').innerHTML)
  hscoresF.push(newrecord)
  hscoresF.sort((a, b) => a.time - b.time)
  document.querySelector("ol").innerHTML = ""
  for(elem of hscoresF){
    let li = document.createElement("li")
    li.innerHTML = `${elem.name} - ${elem.map} - ${elem.score}`
    document.querySelector("ol").append(li)
  }
  localStorage.hscoresF = JSON.stringify(hscoresF)
  resetStopwatch()
}

savedgames.style.display = "inline"
let saves = []
if(localStorage.saves) {
  saves = JSON.parse(localStorage.saves)
}
for(elem of saves) {
  let bttn = document.createElement("button")
  bttn.innerHTML = elem.date
  document.querySelector("#saves").append(bttn)
}

savebutton.addEventListener("click", (e) => {
  let newsave = new Object()
  newsave.map = map.cloneNode(true).innerHTML
  const date = new Date()
  newsave.date = date.toLocaleString('hu', { timeZone: 'Europe/Budapest' })
  newsave.time =  parseInt(document.querySelector('#mins').innerHTML) * 60000 +
                  parseInt(document.querySelector('#secs').innerHTML) * 1000 +
                  parseInt(document.querySelector('#ms').innerHTML)
  newsave.currentMap = currentMap
  saves.push(newsave)
  document.querySelector("#saves").innerHTML = ""
  for(elem of saves){
    let bttn = document.createElement("button")
    bttn.innerHTML = elem.date
    document.querySelector("#saves").append(bttn)
  }
  localStorage.saves = JSON.stringify(saves)
})

let ul = document.querySelector("#saves")
ul.onclick = function(event) {
  stopStopwatch()
  select.style.display = "none"
  editorbutton.style.display = "none"
  let target = getEventTarget(event)
  let bttn = target.closest('button')
  let nodes = Array.from(bttn.closest("#saves").children)
  let index = nodes.indexOf(bttn)
  createTableFromSave(saves[index].map,saves[index].time,saves[index].currentMap)
}
function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement; 
}

function createTableFromSave(newmap,time,saved_currentMap) {
  currentMap = saved_currentMap
  timerDisplay.style.display = "flex"
  map.innerHTML = newmap
  mapdiv.innerHTML = ""
  mapdiv.append(map)
  savediv.style.display = "flex"
  setStopwatch(parseInt(time))
  res.innerHTML = ""
  active()
  refresh()
}

function startStopwatch() {
  if (isPaused) {
    isPaused = false
    counter -= Date.now()
    render()
  }
}
function stopStopwatch() {
  if (!isPaused) {
    isPaused = true
    counter += Date.now()
  }
}
function resetStopwatch() {
  if (isPaused) {
    counter = 0
    render()
  } else {
    counter = -Date.now()
  }
}
function setStopwatch(savedValue) {
  if (isPaused) {
    counter = savedValue
    startStopwatch()
    render()
  }
}
function format(value, scale, modulo, padding) {
  value = Math.floor(value / scale) % modulo;
  return value.toString().padStart(padding, 0);
}
function render() {
  let value
  if (isPaused) {
    value = counter
  } else value = Date.now() + counter
  document.querySelector('#ms').textContent = format(value, 1, 1000, 3);
  document.querySelector('#secs').textContent = format(value, 1000, 60, 2);
  document.querySelector('#mins').textContent = format(value, 60000, 60, 2);
  if(!isPaused) {
    requestAnimationFrame(render);
  }
}

let sizeInputN
let sizeInputM
let createButton

editorbutton.addEventListener("click", e => {
  res.style.display = "none"
  mapdiv.style.display = "none"
  scorediv.style.display = "none"
  timerDisplay.style.display = "none"
  savedgames.style.display = "none"
  select.style.display = "none"
  highscoresdiv.style.display = "none"
  editorbutton.style.display = "none"
  savediv.style.display = "none"
  sizeInputN = document.createElement("input")
  editordiv.append("Please add the size of your map: ")
  sizeInputN.type = "number"
  sizeInputN.id = "sizeinput_n"
  sizeInputN.min = 1
  sizeInputN.max = 100
  editordiv.append(sizeInputN)
  sizeInputM = document.createElement("input")
  editordiv.append(" x ")
  sizeInputM.type = "number"
  sizeInputM.id = "sizeinput_m"
  sizeInputM.min = 1
  sizeInputM.max = 100
  editordiv.append(sizeInputM)
  createButton = document.createElement("button")
  createButton.innerHTML = "Create"
  createButton.addEventListener("click", e => {
    editordiv.innerHTML = ""
    createEditorTable()
  })
  editordiv.append(createButton)
})

function createEditorTable() {
  let N = parseInt(sizeInputN.value)
  let M = parseInt(sizeInputM.value)
  let editorMap = document.createElement("table")
  for(let i = 0; i < N; i++) {
    const row = document.createElement("tr")
    for(let j = 0; j < M; j++){
      const cell = document.createElement("td")
      row.append(cell)
    }
    editorMap.append(row)
  }
  editordiv.append("Add the value of the obstacle: ")
  let inputObstacleValue = document.createElement("input")
  inputObstacleValue.type = "number"
  inputObstacleValue.value = 0
  inputObstacleValue.min = -1
  inputObstacleValue.max = 4
  editordiv.append(inputObstacleValue)
  editordiv.append(" -1 = empty obstacle")
  editordiv.append(editorMap)
  editorMap.addEventListener("click", e => {
    if (e.target.matches("td")) {
      editorMap.rows[e.target.closest('tr').rowIndex].cells[e.target.cellIndex].classList.add("obstacle")
      if (parseInt(inputObstacleValue.value) >= 0) {
        editorMap.rows[e.target.closest('tr').rowIndex].cells[e.target.cellIndex].innerHTML = parseInt(inputObstacleValue.value)
      } else editorMap.rows[e.target.closest('tr').rowIndex].cells[e.target.cellIndex].innerHTML = ""
    }
  })
  let saveMapButton = document.createElement("button")
  saveMapButton.innerHTML = "Save map"
  saveMapButton.addEventListener("click", e => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (!editorMap.rows[i].cells[j].classList.contains("obstacle")) editorMap.rows[i].cells[j].classList.add("free")
      }
    }
    
      let opt = document.createElement("option")
      maps.push(editorMap.cloneNode(true))
      opt.value = maps.length
      opt.innerHTML = mapName.value
      select.add(opt)
    
      editordiv.style.display = "none"
      res.style.display = "inline"
      mapdiv.style.display = "inline"
      savedgames.style.display = "inline"
      select.style.display = "inline"
      highscoresdiv.style.display = "inline"
      editorbutton.style.display = "inline"

  })

  let mapName = document.createElement("input")
  mapName.type = "text"
  mapName.placeholder = "myMap"
  editordiv.append("Name your map: ")
  editordiv.append(mapName)
  editordiv.append(saveMapButton)
}

}