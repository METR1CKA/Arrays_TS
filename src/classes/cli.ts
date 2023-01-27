import inquirer from 'inquirer'
import Letters from './letters'

enum commands {
  SRT = 'Start program',
  ALL = 'Show letters',
  ONE = 'Find letter',
  ADD = 'Add letter',
  UPD = 'Update letter',
  DEL = 'Delete letter',
  CDT = 'Credits',
  EXT = 'Exit to program'
}

export default class CLI extends Letters {

  constructor() {
    super()
  }

  public async main() {

    console.log('')

    if (this.isEmpty()) {

      const options = await inquirer.prompt({
        name: 'answer',
        message: 'Choose Option:',
        type: 'list',
        choices: [commands.SRT, commands.ADD, commands.CDT, commands.EXT]
      })

      switch (options.answer) {

        case commands.SRT: this.init('start'); break;

        case commands.ADD: await this.add(); break;

        case commands.CDT: this.init('credits'); break;

        case commands.EXT: this.init('end'); return;

      }

    } else {

      const options = await inquirer.prompt({
        name: 'answer',
        message: 'Choose Option:',
        type: 'list',
        choices: Object.values(commands)
      })

      switch (options.answer) {

        case commands.SRT: this.init('start'); break;

        case commands.ALL: this.all(); break;

        case commands.ONE: await this.one(); break;

        case commands.ADD: await this.add(); break;

        case commands.UPD: await this.upd(); break;

        case commands.DEL: await this.del(); break;

        case commands.CDT: this.init('credits'); break;

        case commands.EXT: this.init('end'); return;

      }

    }

    await this.main()

  }

  private init(option: string) {
    if (option === 'start') { this.clean(); console.log('\nInitialization completed') }

    if (option === 'end') { this.clean(); console.log('\nLeaving...\n') }

    if (option === 'credits') { console.log('\nCreated by:\n\nMETR1CKA') }

    return
  }

  private all() {
    console.log('\nLetters:', this.getAllLetters())

    return
  }

  private async one() {
    console.log('')

    const option = await inquirer.prompt({
      name: 'answer',
      message: 'Enter the letter to find:',
      type: 'input',
    })

    if (option.answer.length == 0) { console.log('\nNothing to do...') }

    if (option.answer.length > 1) { console.log('\nYou can only enter one character...') }

    if (option.answer.length == 1) {
      const data = this.getOneLetter(option.answer)

      data ? console.log(`\nIndex: ${data.index}\n\nLetter: ${data.letter}`) : console.log(`\nLetter ${option.answer} not found...`)
    }

    return
  }

  private async add() {
    console.log('')

    const option = await inquirer.prompt({
      name: 'answer',
      message: 'Enter the new letter:',
      type: 'input',
    })

    if (option.answer.length == 0) { console.log('\nNothing to do...') }

    if (option.answer.length > 1) { console.log('\nYou can only enter one character...') }

    if (option.answer.length == 1) { console.log(this.addLetter(option.answer)) }

    return
  }

  private async upd() {
    console.log('')

    const option1 = await inquirer.prompt({
      name: 'answer',
      message: 'Enter the letter to find:',
      type: 'input',
    })

    console.log('')

    const option2 = await inquirer.prompt({
      name: 'answer',
      message: 'Enter the new letter to update:',
      type: 'input',
    })

    if (option1.answer.length == 0 && option2.answer.length == 0) {

      console.log('\nNothing to do...')

    } else if (option1.answer.length == 1 && option2.answer.length == 1) {

      const data = this.updateLetter(option1.answer, option2.answer)

      if (!data) {
        console.log(`\nLetter ${option1.answer} updated to letter ${option2.answer}!!`)

        return
      }

      console.log(`\nLetter ${option1.answer} not found...`)

    } else {

      console.log('\nYou can only enter one character...')

    }

    return
  }

  private async del() {
    console.log('')

    const option = await inquirer.prompt({
      name: 'answer',
      message: 'Enter the letter to delete:',
      type: 'input',
    })

    if (option.answer.length == 0) { console.log('\nNothing to do...') }

    if (option.answer.length > 1) { console.log('\nYou can only enter one character...') }

    if (option.answer.length == 1) {
      const letter: string = option.answer

      const data = this.deleteLetter(letter)

      if (!data) {
        console.log(`\nLetter ${letter} not found...`)

        return
      }

      if (this.isEmpty()) {
        console.log(`\nLetter ${letter} deleted!!\n\nThe array of letters is empty...`)

        return
      }

      console.log(`\nLetter ${letter} deleted!!`)

      return
    }
  }
}
