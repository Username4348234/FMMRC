document.getElementById("formulario").addEventListener("submit", async function(e){

e.preventDefault()

const formData = new FormData(this)

let dados = Object.fromEntries(formData.entries())

function media(perguntas){
let soma = 0
let qtd = 0

perguntas.forEach(p=>{
if(dados[p]){
soma += Number(dados[p])
qtd++
}
})

return qtd ? soma/qtd : 0
}

const estrategia = media(["q1","q2","q3","q4"])
const processos = media(["q5","q6","q7","q8","q9"])
const ferramentas = media(["q10","q11","q12","q13"])
const experiencia = media(["q14","q15","q16","q17"])
const metricas = media(["q18","q19","q20","q21"])

const mediaFinal = (
(estrategia * 2) +
(processos * 3) +
(ferramentas * 1) +
(experiencia * 1) +
(metricas * 2)
) / 9

let nivel = ""

if(mediaFinal <= 2.4){
nivel = "Iniciante"
}else if(mediaFinal <= 3.4){
nivel = "Em evolução"
}else if(mediaFinal <= 4.2){
nivel = "Estruturado"
}else{
nivel = "Estratégico"
}

dados.estrategia = estrategia.toFixed(2)
dados.processos = processos.toFixed(2)
dados.ferramentas = ferramentas.toFixed(2)
dados.experiencia = experiencia.toFixed(2)
dados.metricas = metricas.toFixed(2)
dados.media_final = mediaFinal.toFixed(2)
dados.nivel_maturidade = nivel
dados.data_envio = new Date().toISOString()

// remover perguntas
for(let i = 1; i <= 21; i++){
delete dados["q"+i]
}

try{

const response = await fetch("https://webhookbi.rheserva.com.br/webhook",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer 123456767899080testeprogpt"
},
body:JSON.stringify(dados)
})

if(!response.ok){
throw new Error("Erro na requisição")
}

alert("Diagnóstico enviado com sucesso!")

}catch(err){
console.error(err)
alert("Erro ao enviar")
}

})