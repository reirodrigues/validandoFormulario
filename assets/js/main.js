class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')

    this.eventos()
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const camposValidos = this.camposSaoValidos()
    const senhasValidas = this.senhasSaoValidas()

    if (camposValidos && senhasValidas) {
      alert('Formulário enviado')
      this.formulario.submit()
    }
  }

  senhasSaoValidas() {
    let valid = true
    const senha = this.formulario.querySelector('.senha')
    const senhaRepetida = this.formulario.querySelector('.senhaRepetida')

    if (senha.value !== senhaRepetida.value) {
      this.criaErro(senha, 'As senhas devem ser iguais')
      this.criaErro(senhaRepetida, 'As senhas devem ser iguais')
      valid = false
    }
    if (senha.value.length > 12 || senha.value.length < 6) {
      this.criaErro(senha, 'As senhas devem conter entre 6 à 12 caracteres')
      this.criaErro(
        senhaRepetida,
        'As senhas devem conter entre 6 à 12 caracteres'
      )
      valid = false
    }

    return valid
  }

  camposSaoValidos() {
    let valid = true

    for (let erroText of this.formulario.querySelectorAll('.erro-text')) {
      erroText.remove()
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText

      if (!campo.value) {
        this.criaErro(campo, `Atenção: "${label}" nao pode estar em branco`)
        valid = false
      }
      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false
      }
      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false
      }
    }

    return valid
  }

  validaUsuario(campo) {
    const usuario = campo.value
    let valid = true

    if (usuario.length > 12 || usuario.length < 3) {
      this.criaErro(
        campo,
        'Usuário inválido, deve conter entre 3 à 12 caracteres!'
      )
      valid = false
    }

    if (!usuario.match(/[a-zA-Z0-9]+/g)) {
      this.criaErro(
        campo,
        'Usuário inválido, usuário deve conter apenas letras e/ou números!'
      )
      valid = false
    }

    return true
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value)

    if (!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido')
      return false
    }
    return true
  }

  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('erro-text')
    campo.insertAdjacentElement('afterend', div)
  }
}

const valida = new ValidaFormulario()
