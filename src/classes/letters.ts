export type Dic = { index: number, letter: string }

export default class Letters {

  constructor() {
    return this
  }

  private letters: string[] = []

  private copyLetters: string[] = []

  private ordenator(): void {
    this.letters.sort()
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
      if (this.letters[i] === letter) { isFound = true; index = i }
    }

    return isFound ? { index, letter } : null
  }

  public addLetter(letter: string): string {
    this.letters[this.letters.length++] = letter

    this.ordenator()

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

    this.letters[isFound.index] = this.letters[-1]

    this.copyLetters = this.letters

    this.letters.length = 0

    for (const element of this.copyLetters) {
      if (element !== undefined) { this.addLetter(element) }
    }

    this.copyLetters.length = 0

    this.ordenator()

    return true
  }
}
