const fs = require('fs')
const readline = require('readline')
const Mower = require('./Mower')

const programme = {}

const initData = (dataArr) => {
  // initArea
  programme.areaArr = dataArr[0].trim().toUpperCase().split(/\s+/)
  for (let i = 1; i < dataArr.length; i++) {
    if (i % 2 !== 0) {
      // Start position
      const initPosistion = dataArr[i].trim().toUpperCase().split(/\s+/)
      programme.startPositions = programme.startPositions ? programme.startPositions.concat([initPosistion]) : [initPosistion]
    } else {
      // Move sequence
      const initSequence = dataArr[i].toUpperCase().replace(/\s+/g, '').split('')
      programme.sequences = programme.sequences ? programme.sequences.concat([initSequence]) : [initSequence]
    }
  }
}

const init = () => {
  const data = []

  var rd = readline.createInterface({
    input: fs.createReadStream('./data/data.txt')
  })

  rd.on('line', function (line) {
    data.push(line)
  })
    .on('close', function (line) {
      initData(data)
      for (let i = 0; i < programme.startPositions.length; i++) {
        const mover = new Mower(programme.areaArr, programme.startPositions[i], programme.sequences[i], `moverId${i}`)
        mover.init()
      }
    })
}

init()
