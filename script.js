document.getElementById("formulario").addEventListener("submit", async function(e){

e.preventDefault()

const formData = new FormData(this)

const dados = Object.fromEntries(formData.entries())

try{

const response = await fetch("https://webhookbi.rheserva.com.br/webhook", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer 123456767899080testeprogpt"
},
body: JSON.stringify(dados)
})

if(!response.ok){
throw new Error("Erro na requisição")
}

const resultado = await response.json()

alert("Resposta salva com sucesso!")

}catch(erro){

console.error(erro)
alert("Erro ao enviar formulário")

}

})