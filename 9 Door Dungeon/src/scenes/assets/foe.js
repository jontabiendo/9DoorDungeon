class Foe {
  constructor() {
    this._foe = null;
    this._weapon = null
  }

  // get foe() {
  //   return this.foe
  // }

  // get weapon() {
  //   return this.weapon
  // }

  set foe(opp) {
    this._foe = opp
  }

  set weapon(weapon) {
    this._weapon = weapon
  }

  getFoe() {
    return {
      foe: this._foe,
      weapon: this._weapon
    }
  }
}

export const foe = new Foe()