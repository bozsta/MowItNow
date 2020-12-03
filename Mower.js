class Mower {
  constructor(area, initPosition, sequences, id) {
    this.area = area
    this.position = initPosition
    this.sequences = sequences
    this.id = id || Math.floor(Math.random() * 1000)
  }

  moveObj = {
    N: {
      A: [0, 1]
    },
    W: {
      A: [-1, 0]
    },
    S: {
      A: [0, -1]
    },
    E: {
      A: [1, 0]
    }
  }
  
  orientationArr = ['N', 'E', 'S', 'W']
  
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
    let [xPosition, yPosition] = positionArr
    return xPosition <= this.area[0] && xPosition >= 0 && yPosition <= this.area[1] && yPosition >= 0
  }

  nextindex = (currentIndex, length) => {
   const next =  (currentIndex + 1) % length
   return this.orientationArr[next]
  }

  prevIndex =  (currentIndex, length) => {
    const prev = (currentIndex - 1 + length) % length
    return this.orientationArr[prev]
  }


  process = (positionArr, moves) => {
    if (!positionArr || !moves) {
      throw new Error('[Process] Missing Arguments')
    }
    if (!Array.isArray(positionArr) || !Array.isArray(moves)) {
      throw new Error('[Process] Arguments must be array')
    }
    /// let nextPosition = [...positionArr]
    let [xPosition, yPosition, orientation] = positionArr
    moves.forEach(move => {
      if ( move === 'D') {
        let currentIndex = this.orientationArr.indexOf(orientation)
        orientation = this.nextindex(currentIndex, this.orientationArr.length)
      } else if (move === 'G') {
        let currentIndex = this.orientationArr.indexOf(orientation)
        orientation = this.prevIndex(currentIndex, this.orientationArr.length)
      } else {
        const moveObj = this.moveObj[orientation][move]
        xPosition += moveObj[0] 
        yPosition += moveObj[1] 
      }
      const nextPosition = [xPosition, yPosition, orientation] 
      // positionArr =  this.checkbeforeMove(nextPosition) ? [...nextPosition] : [...positionArr]
      this.position =  this.checkbeforeMove(nextPosition) ? [...nextPosition] : [...positionArr]
      
    })
    return `Final posirion : [${this.position}]`
   }
/*   process = (positionArr, moves) => {
    if (!positionArr || !moves) {
      throw new Error('[Process] Missing Arguments')
    }
    if (!Array.isArray(positionArr) || !Array.isArray(moves)) {
      throw new Error('[Process] Arguments must be array')
    }
    let nextPosition = [...positionArr]
    let [xPosition, yPosition, oreintation] = positionArr
    moves.forEach(move => {
      let orientation = positionArr[2]
      const moveObj = this.moveObj[orientation][move]
      if (Array.isArray(moveObj)) {
        for (let i = 0; i < moveObj.length; i++) {
          nextPosition[i] += moveObj[i]
        }
      } else {
        nextPosition[2] = moveObj
        // oreintation = moveObj
      }
      positionArr =  this.checkbeforeMove(nextPosition) ? [...nextPosition] : [...positionArr]
    })
    this.position = positionArr
    return `Final posirion : [${this.position}]`
  } */

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
