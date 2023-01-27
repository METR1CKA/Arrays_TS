export type Dic = { index: number, letter: string }

export default class Letters {

  constructor() {
    return this
  }

  private lettersMay: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  private lettersMin: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  private letters: string[] = []

  private copyLetters: string[] = []

  private ordenator(): void {
    this.copyLetters = this.letters
    
    this.letters = []

    for (let may of this.lettersMay) {
      for (let letter of this.copyLetters) {
        if (may === letter) { this.addLetter(letter) }
      }
    }

    for (let min of this.lettersMin) {
      for (let letter of this.copyLetters) {
        if (min === letter) { this.addLetter(letter) }
      }
    }

    this.copyLetters = []
  }

  public clean(): void {
    this.letters.length = 0

    this.copyLetters.length = 0
  }

  public isEmpty(): boolean {
    return this.letters.length === 0
  }

  public getAllLetters(): string[] {
    this.ordenator()

    return this.letters
  }

  public getOneLetter(letter: string): Dic | null {
    let isFound: boolean = false

    let index: number = 0

    for (let i = 0; i < this.letters.length; i++) {
      if (this.letters[i] === letter) {isFound = true; index = i}
    }

    return isFound ? { index, letter } : null
  }

  public addLetter(letter: string): string {
    this.letters[this.letters.length++] = letter

    return `\nLetter ${letter} added`
  }

  public updateLetter(letter: string, newLetter: string): boolean {
    const isFound = this.getOneLetter(letter)

    if (!isFound) { return false }

    this.letters[isFound.index] = newLetter

    return true
  }

  public deleteLetter(letter: string): boolean {
    const isFound = this.getOneLetter(letter)

    if (!isFound) { return false }

    this.copyLetters = this.letters

    this.letters = []

    this.copyLetters[isFound.index] = this.copyLetters[-1]

    for (let element of this.copyLetters) {
      if (element !== undefined) { this.addLetter(element) }
    }

    this.copyLetters = []

    return true
  }
}
