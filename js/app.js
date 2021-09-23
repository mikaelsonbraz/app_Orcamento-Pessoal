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

	recuperarTodosRegistros() {
		//Array para adicionar todas as despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//Laço para recuperar todas as despesas cadastradas em localStorage
		for (let i = 1; i <= id; i++) {
			let despesa = JSON.parse(localStorage.getItem(i))
			if (despesa === null) {
				continue
			}
			
			despesas.push(despesa)
			
		}

	return despesas
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

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
	} else {
		//dialogo de error
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_titulo').innerHTML = 'Erro na gravação dos dados'
		document.getElementById('modal_msg').innerHTML = 'Os dados foram inseridos incorretamente'
		document.getElementById('btn-voltar').className = 'btn btn-danger'

		$('#modalRegistrarDespesa').modal('show')
	}
	
}

function carregaListaDespesas() {
	let despesas = Array()
	despesas = bd.recuperarTodosRegistros()

	//selecionando o tbody e colocando dentro de uma variavel
	var listaDespesas = document.getElementById('listaDespesas')

	despesas.forEach(function(d) {

		//criando as <tr></tr>
		let linha = listaDespesas.insertRow()

		//criando as <td></td>
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		
		//ajustar o tipo de id pro nome
		switch (parseInt(d.tipo)) {
			case 1: d.tipo = 'Alimentação';
				break;
			case 2: d.tipo = 'Educação';
				break;
			case 3: d.tipo = 'Lazer';
				break;
			case 4: d.tipo = 'Saúde';
				break;
			case 5: d.tipo = 'Transporte';
				break;
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})

}
