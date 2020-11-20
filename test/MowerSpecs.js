const { expect, assert } = require('chai')
const Mower = require('../Mower')

describe('Test Mower', () => {
  describe('Test check Area Data', () => {
    const MOWER = new Mower()
    it('should success', done => {
      expect(MOWER.checkAreaData(['46', '45'])).to.equal('checkAreaData [46,45]')
      expect(MOWER.checkAreaData([46, 45])).to.equal('checkAreaData [46,45]')
      expect(MOWER.checkAreaData([0, 0])).to.equal('checkAreaData [0,0]')
      expect(MOWER.checkAreaData(['5', 5])).to.equal('checkAreaData [5,5]')
      done()
    })
    it('should failled: unexpected data type', done => {
      assert.throws(() => { MOWER.checkAreaData() }, Error, '[Area Data] data must be an array')
      assert.throws(() => { MOWER.checkAreaData('3','3') }, Error, '[Area Data] data must be an array')
      done()
    })
    it('should failled: unexpected number of value', done => {
      assert.throws(() => { MOWER.checkAreaData([]) }, Error, '[Area Data] Unexpected number of data')
      assert.throws(() => { MOWER.checkAreaData(['46']) }, Error, '[Area Data] Unexpected number of data')
      assert.throws(() => { MOWER.checkAreaData(['46', '15', '89']) }, Error, '[Area Data] Unexpected number of data')
      done()
    })
    it('should failled: value must be a number', done => {
      assert.throws(() => { MOWER.checkAreaData(['1,2', '45']) }, Error, '[Area Data] Values must be a number')
      assert.throws(() => { MOWER.checkAreaData(['46', 'A']) }, Error, '[Area Data] Values must be a number')
      assert.throws(() => { MOWER.checkAreaData([undefined, undefined]) }, Error, '[Area Data] Values must be a number')
      assert.throws(() => { MOWER.checkAreaData([null, null]) }, Error, '[Area Data] Values must be a number')
      done()
    })
    it('should failled: value must be positive integer', done => {
      assert.throws(() => { MOWER.checkAreaData(['-12', '45']) }, Error, '[Area Data] Values must be a positive integer')
      assert.throws(() => { MOWER.checkAreaData(['46', '1.5']) }, Error, '[Area Data] Values must be a positive integer')
      assert.throws(() => { MOWER.checkAreaData(['46', '-1.5']) }, Error, '[Area Data] Values must be a positive integer')
      done()
    })
  })
  describe('Test check Position Data', () => {
    // checkPositionData
    const MOWER = new Mower(['5', '5'])
    it('should success', done => {
      expect(MOWER.checkPositionData(['1', '1', 'N'])).to.equal('checkPositionData [1,1,N]')
      expect(MOWER.checkPositionData([1, 1, 'N'])).to.equal('checkPositionData [1,1,N]')
      done()
    })
    it('should failled: unexpected x and y value type', done => {
      assert.throws(() => { MOWER.checkPositionData() }, Error, '[Position Data] data must be an array')
      done()
    })
    it('should failled: unexpected x and y value type', done => {
      assert.throws(() => { MOWER.checkPositionData(['5', 'az', 'N']) }, Error, '[Position Data] Two first values must be numbers')
      done()
    })
    it('should failled: unexpected number of value', done => {
      assert.throws(() => { MOWER.checkPositionData([]) }, Error, '[Position Data] Unexpected number of data')
      assert.throws(() => { MOWER.checkPositionData(['12']) }, Error, '[Position Data] Unexpected number of data')
      assert.throws(() => { MOWER.checkPositionData(['5', '5', 'N', '']) }, Error, '[Position Data] Unexpected number of data')
      done()
    })
    it('should failled: unexpected x and y value type', done => {
      assert.throws(() => { MOWER.checkPositionData(['-12', '45', 'N']) }, Error, '[Position Data] Two first values must be positive integer')
      assert.throws(() => { MOWER.checkPositionData(['12', '4.5', 'N']) }, Error, '[Position Data] Two first values must be positive integer')
      done()
    })
    it('should failled: unexpected initial position', done => {
      assert.throws(() => { MOWER.checkPositionData(['12', '45' , 'N']) }, Error, '[Position Data] initial position is out of area')
      done()
    })
    it('should failled: unexpected initial orientation value', done => {
      assert.throws(() => { MOWER.checkPositionData(['4', '4', 'T']) }, Error, '[Position Data] unexpected orientation value')
      assert.throws(() => { MOWER.checkPositionData(['4', '4', '']) }, Error, '[Position Data] unexpected orientation value')
      assert.throws(() => { MOWER.checkPositionData(['4', '4', '5']) }, Error, '[Position Data] unexpected orientation value')
      done()
    })
  })
  describe('Test check Move Data', () => {
    // checkPositionData
    const MOWER = new Mower()
    it('should success', done => {
      expect(MOWER.checkSequenceData(['A','D','A','A','A','G'])).to.equal('checkSequenceData [A,D,A,A,A,G]')
      done()
    })
    it('should failled: unexpected sequence type', done => {
      assert.throws(() => { MOWER.checkSequenceData() }, Error, '[Sequence Data] data must be an array')
      assert.throws(() => { MOWER.checkSequenceData('ezaez') }, Error, '[Sequence Data] data must be an array')
      done()
    })
    it('should failled: missing sequence data', done => {
      assert.throws(() => { MOWER.checkSequenceData([]) }, Error, '[Sequence Data] Missing sequence value')
      done()
    })
    it('should failled: unexpected format', done => {
      assert.throws(() => { MOWER.checkSequenceData(['ADGV']) }, Error, '[Sequence Data] unexpected value lenght')
      assert.throws(() => { MOWER.checkSequenceData(['A','D','G','V']) }, Error, '[Sequence Data] Unexpected sequence instruction: V')
      assert.throws(() => { MOWER.checkSequenceData(['A','2','D','T','G','V']) }, Error, '[Sequence Data] Unexpected sequence instruction: 2TV')
      done()
    })
  })
  describe('Tes Move Process', () => {
    const MOWER = new Mower(['5','5'])
    const move1 = 'GAGAGAGAA'.split('')
    const move2 = 'AADAADADDA'.split('')
    console.log('move1',move1)
    it('should success', done => {
      expect(MOWER.process([1,2,'N'], move1)).to.equal('Final posirion : [1,3,N]')
      expect(MOWER.process([3,3,'E'], move2)).to.equal('Final posirion : [5,1,E]')
      done()
    })
    it('should failled: unexpected format', done => {
      assert.throws(() => { MOWER.process([1,2,'N'], undefined) }, Error, '[Process] Missing Arguments')
      assert.throws(() => { MOWER.process(undefined, move1) }, Error, '[Process] Missing Arguments')
      assert.throws(() => { MOWER.process([1,2,'N'], 'A,A') }, Error, '[Process] Arguments must be array')
      assert.throws(() => { MOWER.process('1, 2,N', move1) }, Error, '[Process] Arguments must be array')
      done()
    })
  })
})
