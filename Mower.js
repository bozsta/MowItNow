class Mower {
  constructor(area, initPosition, sequences, id) {
    this.area = area
    this.position = initPosition
    this.sequences = sequences
    this.id = id || Math.floor(Math.random() * 1000)
  }

  moveObj = {
    N: {
      G: 'W',
      D: 'E',
      A: [0, 1]
    },
    W: {
      G: 'S',
      D: 'N',
      A: [-1, 0]
    },
    S: {
      G: 'E',
      D: 'W',
      A: [0, -1]
    },
    E: {
      G: 'N',
      D: 'S',
      A: [1, 0]
    }
  }
  
  orientationArr = ['N', 'E', 'S', 'W']

  nextindex = (currentIndex, length) => {
    return (currentIndex + 1) % length
  }

  prevIndex =  (currentIndex, length) => {
    return (currentIndex - 1 + length) % length
  }
  
  checkAreaData = (areaArr) => {
    if (!areaArr || !Array.isArray(areaArr)) {
      throw new Error('[Area Data] data must be an array')
    }
    if (areaArr.length !== 2) {
      throw new Error('[Area Data] Unexpected number of data')
    }
    this.area = areaArr.map(val => {
      if (isNaN(val) || val === null) {
        throw new Error('[Area Data] Values must be a number')
      }
      val = Number(val)
      if (!Number.isInteger(val) || val < 0) {
        throw new Error('[Area Data] Values must be a positive integer')
      }
      return val
    })
    return `checkAreaData [${this.area}]`
  }

  checkPositionData = (PositionArr) => {
    if (!PositionArr || !Array.isArray(PositionArr)) {
      throw new Error('[Position Data] data must be an array')
    }
    if (PositionArr.length !== 3) {
      throw new Error('[Position Data] Unexpected number of data')
    }
    // to finish
    let [xPosition, yPosition, oreintation] = PositionArr
    if (isNaN(xPosition) || isNaN(yPosition)) {
      throw new Error('[Position Data] Two first values must be numbers')
    }
    xPosition = Number(xPosition)
    yPosition = Number(yPosition)
    if (!Number.isInteger(xPosition) || !Number.isInteger(yPosition)
      || xPosition < 0 || yPosition < 0) {
      throw new Error('[Position Data] Two first values must be positive integer')
    }
    if (xPosition > this.area[0] || yPosition > this.area[1]) {
      throw new Error('[Position Data] initial position is out of area')
    }
    oreintation = oreintation.toUpperCase()
    if (!(/N|W|S|E/).test(oreintation) || oreintation.length !== 1) {
      throw new Error('[Position Data] unexpected orientation value')
    }
    this.position = PositionArr
    return `checkPositionData [${this.position}]`
  }

  checkSequenceData = (dataArr) => {
    if (!dataArr || !Array.isArray(dataArr)) {
      throw new Error('[Sequence Data] data must be an array')
    }
    if (!dataArr.length) {
      throw new Error('[Sequence Data] Missing sequence value')
    }
    dataArr.forEach(item => {
      if (item.length !== 1) {
        throw new Error('[Sequence Data] unexpected value lenght')
      }
    })
    const val = dataArr.join('').replace(/A|D|G/g, '')
    if (val.length) {
      throw new Error(`[Sequence Data] Unexpected sequence instruction: ${val}`)
    }
    return `checkSequenceData [${dataArr}]`
  }

  checkbeforeMove = (positionArr) => {
    return positionArr[0] <= this.area[0] && positionArr[0] >= 0 && positionArr[1] <= this.area[1] && positionArr[1] >= 0
  }

  process = (positionArr, moves) => {
    if (!positionArr || !moves) {
      throw new Error('[Process] Missing Arguments')
    }
    if (!Array.isArray(positionArr) || !Array.isArray(moves)) {
      throw new Error('[Process] Arguments must be array')
    }
    let nextPosition = [...positionArr]
    moves.forEach(move => {
      let orientation = positionArr[2]
      const moveObj = this.moveObj[orientation][move]
      if (Array.isArray(moveObj)) {
        for (let i = 0; i < moveObj.length; i++) {
          nextPosition[i] += moveObj[i]
        }
      } else {
        nextPosition[2] = moveObj
      }
      positionArr =  this.checkbeforeMove(nextPosition) ? [...nextPosition] : [...positionArr]
    })
    this.position = positionArr
    return `Final posirion : [${this.position}]`
  }

  init = () => { 
    try {
      this.checkAreaData(this.area)
      this.checkPositionData([...this.position])
      this.checkSequenceData([...this.sequences])
      this.process([...this.position], [...this.sequences])
  
      console.log(`${this.id} Final Position ${this.position.join(' ')}`)
    } catch (error) {
      console.log('Error:', error.message)
    }
  }
}

module.exports = Mower
