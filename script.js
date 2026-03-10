document.getElementById("formulario").addEventListener("submit", async function(e){

e.preventDefault()

const formData = new FormData(this)

const dados = Object.fromEntries(formData.entries())

const response = await fetch("http://localhost:3000/salvar", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(dados)
})

const resultado = await response.json()

alert("Resposta salva com sucesso!")

})
