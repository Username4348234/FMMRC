const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const pastaDestino = "\\\\192.168.21.2\\business_intelligence\\Controles\\1 - JSON TESTE FORMULARIO MKT"

/* FUNÇÃO DE CÁLCULO */

function calcularDiagnostico(r){

function media(lista){
return lista.reduce((a,b)=>a+b,0) / lista.length
}

const estrategia = media([
Number(r.q1),
Number(r.q2),
Number(r.q3),
Number(r.q4)
])

const processos = media([
Number(r.q5),
Number(r.q6),
Number(r.q7),
Number(r.q8),
Number(r.q9)
])

const ferramentas = media([
Number(r.q10),
Number(r.q11),
Number(r.q12),
Number(r.q13)
])

const experiencia = media([
Number(r.q14),
Number(r.q15),
Number(r.q16),
Number(r.q17)
])

const metricas = media([
Number(r.q18),
Number(r.q19),
Number(r.q20),
Number(r.q21)
])

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
}
else if(mediaFinal <= 3.4){
nivel = "Em evolução"
}
else if(mediaFinal <= 4.2){
nivel = "Estruturado"
}
else{
nivel = "Estratégico"
}

r.media_estrategia = estrategia
r.media_processos = processos
r.media_ferramentas = ferramentas
r.media_experiencia = experiencia
r.media_metricas = metricas

r.media_final = mediaFinal
r.nivel_maturidade = nivel

return r
}

/* ROTA QUE RECEBE O FORMULÁRIO */

app.post("/salvar",(req,res)=>{

let dados = req.body

dados = calcularDiagnostico(dados)

const nomeArquivo = `diagnostico_${Date.now()}.json`

const caminho = path.join(pastaDestino,nomeArquivo)

fs.writeFile(caminho,JSON.stringify(dados,null,2),(err)=>{

if(err){
console.log(err)
return res.status(500).json({erro:"Erro ao salvar"})
}

res.json({
mensagem:"Diagnóstico salvo",
nivel:dados.nivel_maturidade,
media:dados.media_final
})

})

})

/* INICIA O SERVIDOR */

app.listen(3000,()=>{
console.log("Servidor rodando na porta 3000")
})