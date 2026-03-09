export default async function handler(req,res){

if(req.method!=="POST"){
res.status(405).json({error:"Method not allowed"})
return
}

const {text}=req.body

try{

const response=await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"你是一个中国古文解释专家，用现代汉语解释古文，并简要说明意思。"
},
{
role:"user",
content:text
}
]

})

})

const data=await response.json()

const result=data.choices[0].message.content

res.status(200).json({result})

}catch(error){

res.status(500).json({error:"AI 请求失败"})

}

}
