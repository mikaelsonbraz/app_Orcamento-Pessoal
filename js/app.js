class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}
}

let bd = new Bd()


function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)

	if (despesa.validarDados()) { //se a função retornar true os dados serão gravados
		bd.gravar(despesa)
		//dialogo de sucess
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_titulo').innerHTML = 'Gravação de dados concluída'
		document.getElementById('modal_msg').innerHTML = 'Dados inseridos com sucesso e prontos para serem visualizados'
		document.getElementById('btn-voltar').className = 'btn btn-success'

		$('#modalRegistrarDespesa').modal('show')
	} else {
		//dialogo de error
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_titulo').innerHTML = 'Erro na gravação dos dados'
		document.getElementById('modal_msg').innerHTML = 'Os dados foram inseridos incorretamente'
		document.getElementById('btn-voltar').className = 'btn btn-danger'

		$('#modalRegistrarDespesa').modal('show')
	}
	
}
