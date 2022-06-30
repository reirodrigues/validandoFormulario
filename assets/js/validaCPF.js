// 705.484.450-52  /  070.987.720-03
/*
7x 0x 5x 4x 8x 4x 4x 5x 0x
10 9  8  7  6  5  4  3  2
70 0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro digito) // Se o numero for maior que 9 então sera 0

7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10 9  8  7  6  5  4  3  2
77 0  45 32 56 24 20 20 0 10 = 248

11 - (284 % 11) = 2 (Segundo digito) // Se o numero for maior que 9 então sera 0

705.484.450-52 === 705.484.450-52 (Valido)
*/

class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, '')
    })
  }

  valida() {
    if (!this.cpfLimpo) return false
    if (typeof this.cpfLimpo !== 'string') return false
    if (this.cpfLimpo.length !== 11) return false
    if (this.eSequencia()) return false
    this.geraNovoCPF()

    return this.novoCPF === this.cpfLimpo
  }

  eSequencia() {
    return (
      this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    )
  }

  geraNovoCPF() {
    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito1 = this.geraDigito(cpfParcial)
    const digito2 = this.geraDigito(cpfParcial + digito1)
    this.novoCPF = cpfParcial + digito1 + digito2

    return this.novoCPF
  }

  geraDigito(cpfParcial) {
    const cpfArray = Array.from(cpfParcial)

    let contador = cpfArray.length + 1
    const total = cpfArray.reduce((ac, el) => {
      ac += contador * Number(el)
      contador--
      return ac
    }, 0)

    const digito = 11 - (total % 11)
    return digito > 9 ? 0 : digito
  }
}

const cpf = new ValidaCPF('705.484.450-52')

// if (cpf.valida()) {
//   console.log('CPF válido')
// } else {
//   console.log('CPF inválido')
// }
