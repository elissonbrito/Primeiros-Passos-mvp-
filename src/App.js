import { useState, useEffect } from "react";

// ─── PALETA ──────────────────────────────────────────────────────────────────
const C = {
  lilac:"#7C3AED", lilacLight:"#E9D5FF", lilacBg:"#F5EEFF", lilacSoft:"#A78BFA",
  mint:"#6EE7B7", mintDeep:"#059669", white:"#FFFFFF",
  near:"#1E1B2E", gray:"#6B6882", grayLight:"#F0EBF8",
  red:"#DC2626", redBg:"#FEE2E2", redBorder:"#FECACA",
  amber:"#D97706", amberBg:"#FEF3C7", amberBorder:"#FDE68A",
  green:"#059669", greenBg:"#D1FAE5",
};

// ─── DADOS SEMANAIS ───────────────────────────────────────────────────────────
const weeklyData = {
  5:{ babySize:"semente de maçã",emoji:"🍎",mm:"2mm",babyDesc:"O coração do bebê começa a se formar e já dá seus primeiros batimentos. O sistema nervoso central está em desenvolvimento inicial.",momChanges:"Você pode sentir o seio mais sensível, leve náusea matinal e cansaço incomum. O útero começa a crescer discretamente.",symptoms:["Náusea leve","Seios sensíveis","Cansaço","Vontade de urinar frequente"],alerts:["Sangramento intenso","Dor abdominal forte","Febre acima de 38°C"],exams:["Beta HCG (confirmação)","Ultrassom transvaginal inicial"],tip:"Comece o ácido fólico se ainda não iniciou (conforme orientação médica)." },
  6:{ babySize:"grão de lentilha",emoji:"🌿",mm:"6mm",babyDesc:"O coração já bate cerca de 100–160 vezes por minuto. Braços e pernas começam a se formar como pequenas brotas.",momChanges:"A náusea pode se intensificar. O olfato fica mais aguçado — cheiros antes agradáveis podem causar enjoo.",symptoms:["Náusea intensa","Enjoo com odores","Salivação excessiva","Fadiga"],alerts:["Vômitos que impedem alimentação","Sangramento","Dor pélvica intensa"],exams:["Hemograma completo","Tipagem sanguínea","Sorologias iniciais"],tip:"Fracione as refeições — coma pouco a cada 2–3 horas para reduzir a náusea." },
  8:{ babySize:"framboesa",emoji:"🫐",mm:"16mm",babyDesc:"Todos os órgãos principais estão se formando. Os dedos das mãos e pés começam a aparecer.",momChanges:"O útero dobrou de tamanho. Pode haver leve aumento abdominal. O cansaço ainda é intenso.",symptoms:["Fadiga intensa","Náusea","Constipação","Leve dor nas costas"],alerts:["Sangramento com cólica","Febre","Ardência ao urinar"],exams:["Urocultura","Exame de urina tipo 1","Glicemia em jejum"],tip:"Marque a primeira consulta com obstetra se ainda não fez." },
  10:{ babySize:"morango",emoji:"🍓",mm:"31mm",babyDesc:"O bebê agora é tecnicamente chamado de feto. Todos os órgãos essenciais estão formados.",momChanges:"A barriga ainda não aparece muito externamente, mas o útero já está do tamanho de uma laranja.",symptoms:["Redução gradual da náusea","Leve ganho de peso","Maior energia"],alerts:["Dor de cabeça intensa persistente","Inchaço nas mãos e rosto","Visão turva"],exams:["Translucência nucal (janela: 11–13 semanas — AGENDE JÁ)"],tip:"A translucência nucal tem janela estreita. Agende com antecedência." },
  12:{ babySize:"limão",emoji:"🍋",mm:"53mm",babyDesc:"O bebê pode abrir e fechar os punhos. Os reflexos começam. O sistema digestivo pratica movimentos de sucção.",momChanges:"Fim do primeiro trimestre! O risco de aborto reduz significativamente.",symptoms:["Redução da náusea","Maior disposição","Barriga começando a aparecer"],alerts:["Sangramento","Dor abdominal persistente"],exams:["Translucência nucal (se não fez — ÚLTIMA CHANCE)"],tip:"Momento ideal para contar a gravidez para amigos e família." },
  16:{ babySize:"abacate",emoji:"🥑",mm:"116mm",babyDesc:"O bebê já escuta sons! O coração bombeia cerca de 25 litros de sangue por dia.",momChanges:"A barriga já é visível. Você pode começar a sentir os primeiros movimentos — como borboletas.",symptoms:["Primeiros movimentos (possível)","Dor lombar leve","Congestão nasal"],alerts:["Ausência total de movimentos após semana 20","Sangramento","Contrações regulares"],exams:["Hemograma de controle","Glicemia"],tip:"Converse com o bebê — ele já consegue ouvir sua voz." },
  20:{ babySize:"manga",emoji:"🥭",mm:"255mm",babyDesc:"METADE DA GESTAÇÃO! O bebê tem sobrancelhas, cílios e cabelos. Pode chupar o dedo.",momChanges:"O fundo uterino está na altura do umbigo. A barriga é bem visível.",symptoms:["Movimentos fetais frequentes","Azia","Refluxo","Inchaço nos pés"],alerts:["Redução brusca dos movimentos","Dor abdominal intensa","Sangramento"],exams:["Ultrassom morfológico (20–24 sem) ⭐ MAIS IMPORTANTE — AGENDE JÁ"],tip:"O ultrassom morfológico avalia a anatomia completa do bebê. Não perca a janela." },
  24:{ babySize:"espiga de milho",emoji:"🌽",mm:"300mm",babyDesc:"O bebê tem padrão de sono e vigília. O pulmão se desenvolve intensamente.",momChanges:"Câimbras nas pernas são comuns à noite. O umbigo pode começar a sobressair.",symptoms:["Câimbras nas pernas","Insônia","Dor no ligamento redondo","Varizes"],alerts:["Contrações regulares antes da semana 37","Pressão pélvica intensa","Perda de líquido"],exams:["Curva glicêmica","Ecocardiograma fetal (24–28 sem)"],tip:"Comece a pesquisar sobre cursos de gestantes e parto." },
  28:{ babySize:"berinjela",emoji:"🍆",mm:"370mm",babyDesc:"Início do 3º trimestre! Os olhos do bebê se abrem pela primeira vez.",momChanges:"Consultas passam para quinzenais. Falta de ar pode aparecer.",symptoms:["Falta de ar","Inchaço","Hemorroidas","Dificuldade para dormir"],alerts:["Falta de ar súbita e intensa","Dor no peito","Pressão alta com sintomas"],exams:["Hemograma","Sorologias de controle","Vacina dTpa (27–36 sem)"],tip:"Monte a mala da maternidade. Recomenda-se estar pronta até a semana 36." },
  32:{ babySize:"coco",emoji:"🥥",mm:"420mm",babyDesc:"O bebê pratica a respiração. Está virando para a posição cefálica. Ossos se consolidam.",momChanges:"As consultas são a cada 2 semanas. Braxton Hicks (contrações falsas) são comuns.",symptoms:["Contrações de Braxton Hicks","Falta de ar","Pelve pesada","Refluxo intenso"],alerts:["Contrações regulares e dolorosas","Sangramento","Bebê em posição pélvica persistente"],exams:["Ultrassom de crescimento fetal","Dopplervelocimetria"],tip:"Visite a maternidade escolhida. Conhecer o ambiente reduz a ansiedade." },
  36:{ babySize:"melão",emoji:"🍈",mm:"470mm",babyDesc:"O bebê está praticamente pronto! Os pulmões estão quase maduros.",momChanges:"O bebê desceu para a pelve — você respira melhor mas vai ao banheiro com mais frequência.",symptoms:["Alívio da falta de ar","Pressão pélvica intensa","Frequência urinária extrema","Nesting"],alerts:["Ruptura da bolsa","Contrações a cada 5 min por 1h","Sangramento intenso","Redução dos movimentos"],exams:["Streptococcus B (swab)","Cardiotocografia (CTG)","Ultrassom final"],tip:"A mala deve estar pronta. Defina quem vai te acompanhar e trace a rota até a maternidade." },
  40:{ babySize:"melancia pequena",emoji:"🍉",mm:"510mm",babyDesc:"Data provável do parto! O bebê está completamente formado. Pesa em média 3,2 a 3,8kg.",momChanges:"A qualquer momento pode iniciar o trabalho de parto.",symptoms:["Ansiedade","Pressão pélvica","Contrações irregulares (pródromo)"],alerts:["Contrações regulares (5-1-1)","Ruptura da bolsa","Sangramento","Ausência de movimentos"],exams:["Cardiotocografia semanal","Ultrassom doppler de controle"],tip:"Vá para a maternidade quando as contrações forem a cada 5 min, 1 min de duração, por 1 hora (regra 5-1-1)." },
};
const getWeekData = (w) => {
  const keys = Object.keys(weeklyData).map(Number).sort((a,b)=>a-b);
  let c=keys[0]; for(const k of keys){if(k<=w)c=k;} return{...weeklyData[c],week:w};
};

// ─── EXAMES COM VALORES DE REFERÊNCIA ────────────────────────────────────────
const examsData = [
  { id:"betahcg",icon:"🧪",name:"Beta HCG Quantitativo",tri:1,window:"4ª–6ª semana",obrig:true,
    oque:"Exame de sangue que mede o hormônio HCG, produzido pela placenta após a implantação do embrião.",
    paraQue:"Confirma a gravidez com alta precisão e acompanha seu desenvolvimento inicial.",
    quando:"A partir do 1º dia de atraso menstrual. Pode ser repetido após 48h.",
    como:"Coleta de sangue em jejum de 4 horas.",preparo:"Jejum de 4 horas.",duracao:"5 minutos para coleta",
    identifica:["Confirmação da gravidez","Gravidez ectópica (suspeita)","Risco de aborto espontâneo"],
    ref:"Ministério da Saúde – Caderno de Atenção Básica nº 32",
    resultType:"text",resultLabel:"Valor do Beta HCG (mUI/mL)",
    interpret:(v,w)=>({status:"info",msg:"O Beta HCG varia muito por semana gestacional. Valores entre 1.000 e 200.000 mUI/mL são comuns no 1º trimestre. Seu médico interpretará conforme a semana exata.",icon:"💙"})
  },
  { id:"hemograma",icon:"🩸",name:"Hemograma Completo",tri:1,window:"1º Trimestre",obrig:true,
    oque:"Avalia as células do sangue: glóbulos vermelhos, glóbulos brancos e plaquetas.",
    paraQue:"Detecta anemia, infecções e alterações na coagulação.",
    quando:"Início do pré-natal, repetido no 2º e 3º trimestre.",
    como:"Coleta de sangue em jejum.",preparo:"Jejum de 4–8 horas.",duracao:"5 minutos",
    identifica:["Anemia ferropriva","Infecções","Trombocitopenia"],
    ref:"FEBRASGO – Protocolo de Assistência Pré-Natal de Baixo Risco",
    resultType:"numeric",resultLabel:"Hemoglobina (g/dL)",resultUnit:"g/dL",
    interpret:(v)=>{
      const n=parseFloat(v);
      if(isNaN(n))return{status:"info",msg:"Insira o valor numérico da hemoglobina.",icon:"💙"};
      if(n>=11)return{status:"ok",msg:`✅ Hemoglobina de ${v} g/dL está dentro do esperado para a gestação (≥ 11 g/dL). Ótimo! Continue com a alimentação equilibrada e as consultas regulares.`,icon:"💚"};
      if(n>=9)return{status:"warn",msg:`⚠️ Hemoglobina de ${v} g/dL indica anemia leve. Seu médico provavelmente vai orientar suplementação de ferro. Comunique na próxima consulta.`,icon:"🟡"};
      return{status:"alert",msg:`🔴 Hemoglobina de ${v} g/dL indica anemia importante. Converse com seu obstetra o quanto antes — pode ser necessário iniciar tratamento.`,icon:"🔴"};
    }
  },
  { id:"glicemia",icon:"🍬",name:"Glicemia em Jejum",tri:1,window:"1º Trimestre",obrig:true,
    oque:"Mede o nível de açúcar no sangue após jejum.",
    paraQue:"Rastrear diabetes pré-existente ou risco de diabetes gestacional.",
    quando:"Início do pré-natal.",
    como:"Coleta de sangue após jejum.",preparo:"Jejum de 8–12 horas.",duracao:"5 minutos",
    identifica:["Diabetes pré-gestacional","Hiperglicemia em jejum"],
    ref:"SBD – Diretrizes da Sociedade Brasileira de Diabetes (2023)",
    resultType:"numeric",resultLabel:"Glicemia em jejum (mg/dL)",resultUnit:"mg/dL",
    interpret:(v)=>{
      const n=parseFloat(v);
      if(isNaN(n))return{status:"info",msg:"Insira o valor em mg/dL.",icon:"💙"};
      if(n<92)return{status:"ok",msg:`✅ Glicemia de ${v} mg/dL está dentro do esperado (< 92 mg/dL). Continue com alimentação saudável!`,icon:"💚"};
      if(n<126)return{status:"warn",msg:`⚠️ Glicemia de ${v} mg/dL está levemente elevada. Informe seu médico — pode ser necessário realizar a curva glicêmica com mais urgência.`,icon:"🟡"};
      return{status:"alert",msg:`🔴 Glicemia de ${v} mg/dL é considerada alta. Seu médico precisa avaliar com prioridade. Não espere a próxima consulta de rotina.`,icon:"🔴"};
    }
  },
  { id:"tn",icon:"🔬",name:"Translucência Nucal (TN)",tri:1,window:"11ª–13ª sem + 6 dias ⚠️",obrig:true,
    oque:"Ultrassom especializado que mede a espessura de líquido na nuca do bebê.",
    paraQue:"Rastrear risco de Síndrome de Down, outras trissomias e cardiopatias.",
    quando:"OBRIGATORIAMENTE entre 11 sem e 13 sem + 6 dias.",
    como:"Ultrassom transvaginal ou abdominal.",preparo:"Bexiga cheia. Sem restrição alimentar.",duracao:"30–60 minutos",
    identifica:["Síndrome de Down","Outras trissomias","Cardiopatias congênitas"],
    ref:"Fetal Medicine Foundation (FMF) – Protocolo 1º Trimestre",
    resultType:"numeric",resultLabel:"Translucência nucal (mm)",resultUnit:"mm",
    interpret:(v)=>{
      const n=parseFloat(v);
      if(isNaN(n))return{status:"info",msg:"Insira o valor em mm.",icon:"💙"};
      if(n<2.5)return{status:"ok",msg:`✅ TN de ${v}mm está dentro da faixa esperada (< 2,5mm). Resultado tranquilizador! Converse com seu médico sobre o risco combinado completo.`,icon:"💚"};
      if(n<=3)return{status:"warn",msg:`⚠️ TN de ${v}mm está na faixa limítrofe. Isso não é diagnóstico — seu médico avaliará em conjunto com os exames de sangue e pode solicitar exames adicionais. Mantenha a calma e siga as orientações médicas.`,icon:"🟡"};
      return{status:"alert",msg:`🔴 TN de ${v}mm está acima do esperado. Isso não é diagnóstico de nenhuma condição, mas seu médico vai indicar investigação adicional (como amniocentese ou NIPT). Converse com seu obstetra com prioridade.`,icon:"🔴"};
    }
  },
  { id:"morfologico",icon:"👶",name:"Ultrassom Morfológico 2º Trim.",tri:2,window:"20ª–24ª semana ⭐",obrig:true,
    oque:"Ultrassom detalhado que avalia a anatomia completa do bebê.",
    paraQue:"Detectar malformações estruturais que podem ser tratadas ainda na gestação.",
    quando:"Entre 20 e 24 semanas. Ideal ao redor de 22 semanas.",
    como:"Ultrassom abdominal. O médico examina cada estrutura sistematicamente.",preparo:"Comer antes pode deixar o bebê mais ativo.",duracao:"30–60 minutos",
    identifica:["Malformações cardíacas","Problemas cerebrais","Fissura labial","Problemas renais","Malformações de membros"],
    ref:"ISUOG – Diretrizes para Ultrassom Obstétrico do 2º Trimestre (2022)",
    resultType:"text",resultLabel:"Como foi o resultado? (descreva o que o médico informou)",
    interpret:(v)=>{
      if(!v||v.trim().length<3)return{status:"info",msg:"Descreva o que o médico informou sobre o exame.",icon:"💙"};
      const low=v.toLowerCase();
      if(low.includes("normal")||low.includes("adequad")||low.includes("dentro")||low.includes("sem alter"))
        return{status:"ok",msg:`✅ Que notícia maravilhosa! Com o relato de resultado normal, tudo indica que o bebê está se desenvolvendo bem. Guarde o laudo e leve na próxima consulta.`,icon:"💚"};
      if(low.includes("atenção")||low.includes("avaliar")||low.includes("repetir")||low.includes("acompanhar"))
        return{status:"warn",msg:`⚠️ Parece que o médico pediu atenção ou acompanhamento. Não entre em pânico — muitos achados de ultrassom são variações normais. Siga rigorosamente as orientações do seu obstetra.`,icon:"🟡"};
      if(low.includes("alter")||low.includes("anormal")||low.includes("malform")||low.includes("suspeita"))
        return{status:"alert",msg:`🔴 Parece que houve um achado no exame. Lembre-se: o ultrassom levanta suspeitas, mas não é diagnóstico definitivo. Siga as orientações do seu obstetra — exames complementares podem ser solicitados. Você não está sozinha.`,icon:"🔴"};
      return{status:"info",msg:`📋 Registro salvo. Leve sempre o laudo impresso nas consultas e siga as orientações do seu médico.`,icon:"💙"};
    }
  },
  { id:"eco",icon:"❤️",name:"Ecocardiograma Fetal",tri:2,window:"24ª–28ª semana",obrig:false,
    oque:"Ultrassom especializado do coração do bebê, realizado por cardiologista pediátrico ou fetal.",
    paraQue:"Detectar cardiopatias congênitas — as malformações mais comuns em bebês.",
    quando:"Entre 24 e 28 semanas.",
    como:"Ultrassom abdominal focado no coração.",preparo:"Nenhum preparo especial.",duracao:"45–60 minutos",
    identifica:["Comunicação interventricular","Transposição dos grandes vasos","Coarctação da aorta","Tetralogia de Fallot"],
    ref:"Sociedade Brasileira de Cardiologia – Diretriz de Ecocardiografia Fetal",
    resultType:"text",resultLabel:"Como foi o resultado?",
    interpret:(v)=>{
      if(!v||v.trim().length<3)return{status:"info",msg:"Descreva o que o cardiologista informou.",icon:"💙"};
      const low=v.toLowerCase();
      if(low.includes("normal")||low.includes("adequad")||low.includes("sem alter"))
        return{status:"ok",msg:`✅ Coração do bebê avaliado e dentro do esperado! Ótima notícia. Guarde o laudo e leve na próxima consulta com o obstetra.`,icon:"💚"};
      return{status:"warn",msg:`⚠️ Registro salvo. Qualquer achado no ecocardiograma fetal deve ser discutido com o cardiologista pediátrico e seu obstetra. Siga as orientações médicas.`,icon:"🟡"};
    }
  },
  { id:"curva",icon:"🩺",name:"Curva Glicêmica (TOTG)",tri:2,window:"24ª–28ª semana",obrig:true,
    oque:"Teste Oral de Tolerância à Glicose: avalia como o corpo processa o açúcar.",
    paraQue:"Diagnosticar diabetes gestacional — condição que afeta 10–18% das gestantes.",
    quando:"Entre 24 e 28 semanas.",
    como:"Coleta em jejum, ingestão de 75g de glicose, nova coleta após 1h e 2h.",preparo:"Jejum de 8–12 horas. Não faça dieta restritiva nos 3 dias anteriores.",duracao:"2–3 horas",
    identifica:["Diabetes gestacional","Resistência à insulina"],
    ref:"Federação Internacional de Diabetes (IDF) e IADPSG – Critérios 2010",
    resultType:"triple",labels:["Jejum (mg/dL)","1 hora (mg/dL)","2 horas (mg/dL)"],
    interpret:(v)=>{
      const [a,b,cc]=v.split("|").map(parseFloat);
      const alerts=[];
      if(!isNaN(a)){if(a>=92)alerts.push(`Jejum ${a} mg/dL (ref: < 92)`)}
      if(!isNaN(b)){if(b>=180)alerts.push(`1h ${b} mg/dL (ref: < 180)`)}
      if(!isNaN(cc)){if(cc>=153)alerts.push(`2h ${cc} mg/dL (ref: < 153)`)}
      if(alerts.length===0&&(!isNaN(a)||!isNaN(b)||!isNaN(cc)))
        return{status:"ok",msg:`✅ Todos os valores dentro do esperado! Sem sinal de diabetes gestacional. Continue com alimentação saudável e as consultas regulares.`,icon:"💚"};
      if(alerts.length>0)
        return{status:"warn",msg:`⚠️ Valor(es) acima do esperado: ${alerts.join(", ")}. Um único valor alterado já pode indicar diabetes gestacional. Informe seu obstetra — o diagnóstico e tratamento precoce trazem ótimos resultados.`,icon:"🟡"};
      return{status:"info",msg:"Insira os valores para receber o feedback.",icon:"💙"};
    }
  },
  { id:"strep",icon:"🧫",name:"Streptococcus do Grupo B (GBS)",tri:3,window:"35ª–37ª semana",obrig:true,
    oque:"Coleta de swab vaginal e retal para verificar a presença da bactéria GBS.",
    paraQue:"Prevenir infecção grave no bebê durante o parto.",
    quando:"Entre 35 e 37 semanas.",
    como:"Coleta rápida com cotonete. Indolor.",preparo:"Não use lubrificante vaginal ou antibiótico 24h antes.",duracao:"5 minutos",
    identifica:["Colonização por Streptococcus do Grupo B"],
    ref:"CDC – Prevenção da Doença por GBS Neonatal (2020) / FEBRASGO",
    resultType:"choice",choices:["Negativo (não colonizada)","Positivo (colonizada)"],
    interpret:(v)=>{
      if(v==="Negativo (não colonizada)")
        return{status:"ok",msg:`✅ Resultado negativo! A bactéria GBS não foi detectada. Não será necessário antibiótico profilático durante o parto por este motivo.`,icon:"💚"};
      if(v==="Positivo (colonizada)")
        return{status:"info",msg:`💙 Resultado positivo para GBS. Isso é mais comum do que parece — cerca de 10–30% das mulheres são colonizadas. Não significa infecção! Durante o trabalho de parto, você receberá antibiótico venoso para proteger o bebê. Informe a equipe da maternidade.`,icon:"💙"};
      return{status:"info",msg:"Selecione o resultado acima.",icon:"💙"};
    }
  },
];

// ─── CHECKLIST INICIAL ───────────────────────────────────────────────────────
const checklistItems = [
  {id:"confirm",icon:"🧪",title:"Confirmar a gravidez",priority:"essencial",detail:{oque:"Exame de sangue (Beta HCG) ou teste de farmácia detecta o hormônio produzido pela placenta.",paraQue:"Para ter certeza da gestação e iniciar o pré-natal o quanto antes.",quando:"Assim que houver atraso menstrual ou sintomas suspeitos.",como:"Teste de farmácia: urina no palito e aguarde 3 minutos. Para confirmação, solicite Beta HCG quantitativo ao médico.",porQue:"O início precoce do pré-natal é fundamental para a saúde da mãe e do bebê.",seNao:"Atraso no pré-natal compromete a detecção de condições tratáveis precocemente.",medico:"Se positivo, agende consulta com obstetra em até 1–2 semanas."}},
  {id:"obstetra",icon:"👩‍⚕️",title:"Escolher obstetra",priority:"essencial",detail:{oque:"O obstetra é o médico especializado em gestação, parto e puerpério.",paraQue:"Para ter acompanhamento médico especializado do início ao fim.",quando:"Nas primeiras semanas.",como:"Pelo plano de saúde, indicação de conhecidos ou plataformas médicas. Considere proximidade e disponibilidade.",porQue:"O pré-natal adequado detecta complicações precocemente.",seNao:"Condições como pré-eclâmpsia e diabetes gestacional podem passar despercebidas.",medico:"O próprio obstetra escolhido será seu médico de referência."}},
  {id:"consulta",icon:"📅",title:"Marcar primeira consulta",priority:"essencial",detail:{oque:"A 1ª consulta pré-natal confirma a gravidez, calcula a DPP e solicita os primeiros exames.",paraQue:"Para iniciar o pré-natal e estabelecer o cronograma de acompanhamento.",quando:"Idealmente até a 8ª semana.",como:"Ligue ou use o app do plano. Leve resultado do teste, DUM e documentos.",porQue:"O Ministério da Saúde recomenda no mínimo 6 consultas de pré-natal.",seNao:"Atraso no pré-natal é um dos principais fatores de risco para complicações.",medico:"Esta IS a consulta médica. Prepare uma lista de dúvidas."}},
  {id:"folico",icon:"💊",title:"Iniciar ácido fólico",priority:"essencial",detail:{oque:"Vitamina do complexo B essencial para o desenvolvimento do tubo neural (cérebro e medula espinhal).",paraQue:"Previne defeitos do tubo neural como a espinha bífida — malformação grave e evitável.",quando:"Idealmente antes de engravidar. Se já grávida, inicie imediatamente.",como:"Conforme prescrição médica. Dose padrão 400–800mcg/dia. Não automedique.",porQue:"O tubo neural se fecha nas primeiras 4 semanas — antes de muitas mulheres saberem que estão grávidas.",seNao:"Risco aumentado de defeitos do tubo neural e outras malformações congênitas.",medico:"Sempre use conforme orientação médica."}},
  {id:"plano",icon:"🏥",title:"Verificar cobertura do plano",priority:"importante",detail:{oque:"Quais exames, consultas e procedimentos obstétricos estão cobertos.",paraQue:"Evitar surpresas financeiras e planejar gastos com antecedência.",quando:"Logo no início da gestação.",como:"Ligue para a central. Pergunte sobre: pré-natal, exames, morfológico, parto e internação.",porQue:"Alguns exames como translucência nucal podem não ter cobertura em todos os planos.",seNao:"Cobranças inesperadas durante a gestação.",medico:"Consulte o médico sobre quais exames são prioritários caso precise escolher."}},
  {id:"pasta",icon:"📁",title:"Criar pasta de documentos",priority:"importante",detail:{oque:"Organizar todos os documentos da gestação em um único lugar físico e digital.",paraQue:"Facilitar o acesso em qualquer consulta ou emergência.",quando:"No início da gestação.",como:"Pasta física para laudos + digitalize tudo no celular. Itens: cartão de pré-natal, exames, receitas, carteirinha.",porQue:"Em situações de urgência, os documentos à mão podem ser determinantes.",seNao:"Risco de perder resultados e repetir exames desnecessariamente.",medico:"Leve sempre a pasta completa em cada consulta."}},
  {id:"maternidade",icon:"🏨",title:"Definir maternidade",priority:"importante",detail:{oque:"Escolher o hospital ou maternidade onde o parto acontecerá.",paraQue:"Garantir vaga, conhecer a estrutura e alinhar preferências sobre o parto.",quando:"Preferencialmente até o 2º trimestre.",como:"Pesquise maternidades cobertas pelo plano, visite-as, verifique UTI neonatal e política de acompanhante.",porQue:"Maternidades lotadas podem recusar internação. Conhecer o local reduz a ansiedade.",seNao:"Risco de não ter vaga garantida em emergência.",medico:"Confirme com seu obstetra se ele atende na maternidade escolhida."}},
  {id:"empresa",icon:"💼",title:"Comunicar à empresa",priority:"importante",detail:{oque:"Informar ao empregador sobre a gravidez para garantir direitos trabalhistas.",paraQue:"Ativar a estabilidade de emprego e organizar a licença maternidade.",quando:"Quanto antes, melhor.",como:"Informe ao RH por escrito (e-mail com confirmação de leitura).",porQue:"A partir da comunicação, há estabilidade no emprego até 5 meses após o parto (art. 10, ADCT).",seNao:"Mais difícil comprovar o direito à estabilidade em caso de demissão.",medico:"As consultas pré-natais têm direito a abono de falta no trabalho."}},
  {id:"direitos",icon:"⚖️",title:"Conhecer direitos da gestante",priority:"importante",detail:{oque:"Estabilidade de emprego, licença maternidade de 120–180 dias, salário maternidade pelo INSS, consultas durante o horário de trabalho.",paraQue:"Para não perder benefícios a que você tem direito por lei.",quando:"Logo no início.",como:"Pesquise no site do Ministério do Trabalho, INSS e Ministério da Saúde.",porQue:"Muitas gestantes perdem benefícios por desconhecimento.",seNao:"Perda de benefícios financeiros e proteção trabalhista.",medico:"Verifique com o médico as consultas com direito a abono de falta."}},
  {id:"nutri",icon:"🥗",title:"Consultar nutricionista",priority:"importante",detail:{oque:"Nutricionista especializada em gestação elabora um plano alimentar adequado.",paraQue:"Garantir nutrição adequada para o desenvolvimento fetal e saúde materna.",quando:"No 1º trimestre, assim que possível.",como:"Busque nutricionista com experiência em gestação. Leve seus exames.",porQue:"A alimentação impacta diretamente o desenvolvimento do bebê.",seNao:"Carências nutricionais afetam o desenvolvimento fetal. Excessos aumentam risco de diabetes.",medico:"Sempre alinhado com o obstetra."}},
];

// ─── QUARTO DO BEBÊ ───────────────────────────────────────────────────────────
const babyRoomCategories = [
  {
    id:"sono",icon:"🛏️",title:"Sono e Descanso",
    items:[
      {id:"berco",name:"Berço",priority:"essencial",icon:"🛏️",preco:"R$ 400–2.000",ate:"Semana 32",dura:"Até 3 anos (varia)",espaco:"Grande",
       oque:"Cama específica para bebês com grades laterais de segurança e fundo regulável em altura.",
       porQue:"O berço é o local mais seguro para o bebê dormir. As grades evitam quedas e o fundo regulável facilita pegar o bebê sem forçar as costas da mãe.",
       tipos:["Mini berço (menor, mais prático para quartos pequenos)","Berço americano (maior, mais duradouro)","Berço multifuncional (vira cama de transição)","Montessoriano (baixo, no chão — para movimento independente)"],
       cuidados:"NUNCA coloque almofadas, travesseiros ou pelúcias dentro do berço com bebê recém-nascido — risco de sufocamento. Use apenas o colchão com lençol bem ajustado.",
       alternativa:"Berço portátil (moisés) para os primeiros meses.",
       quando:"Por que comprar antes: o bebê usará desde o primeiro dia em casa."},
      {id:"colchao",name:"Colchão para berço",priority:"essencial",icon:"🛌",preco:"R$ 150–600",ate:"Semana 32",dura:"Até 3 anos",espaco:"Dentro do berço",
       oque:"Colchão firme e impermeável, encaixado perfeitamente no berço sem folgas.",
       porQue:"O colchão firme é recomendado pela Academia Americana de Pediatria (AAP) para reduzir o risco de SMSL (Síndrome da Morte Súbita do Lactente). Colchões macios aumentam o risco de sufocamento.",
       tipos:["Espuma d28 ou superior (firmeza adequada)","Molas ensacadas (mais ventilado)","Com capa impermeável embutida"],
       cuidados:"O colchão deve ser exatamente do tamanho do berço — sem folgas laterais. Verifique se tem certificação INMETRO.",
       alternativa:"Não há alternativa segura — este item é indispensável.",
       quando:"Compre junto com o berço."},
      {id:"baba",name:"Babá eletrônica",priority:"importante",icon:"📷",preco:"R$ 200–1.500",ate:"Semana 36",dura:"2–4 anos",espaco:"Pequeno (dispositivo)",
       oque:"Monitor de áudio e/ou vídeo que permite acompanhar o bebê de outro cômodo.",
       porQue:"Permite que os pais descansem em outro cômodo sem perder de vista o bebê. Modelos com vídeo são especialmente tranquilizadores na fase em que o bebê começa a se virar.",
       tipos:["Só áudio (mais simples e barato)","Áudio + vídeo (recomendado)","Com sensor de movimento e temperatura"],
       cuidados:"Mantenha os cabos fora do alcance do bebê. Posicione a câmera a pelo menos 1 metro do berço.",
       alternativa:"Aplicativos de celular (mas exigem dois celulares e consomem bateria).",
       quando:"A partir do nascimento."},
    ]
  },
  {
    id:"higiene",icon:"🛁",title:"Higiene e Cuidados",
    items:[
      {id:"banheira",name:"Banheira de bebê",priority:"essencial",icon:"🛁",preco:"R$ 80–400",ate:"Semana 34",dura:"Até 2 anos",espaco:"Médio",
       oque:"Banheira ergonômica e segura, com suporte antiderrapante, no tamanho certo para o bebê.",
       porQue:"Banheiras de adulto são perigosas para recém-nascidos — o bebê não consegue sustentar a cabeça sozinho. A banheira de bebê tem formato que apoia o corpo e é no tamanho certo para controle seguro da temperatura da água.",
       tipos:["Banheira simples com suporte","Banheira com redutor (cresce com o bebê)","Banheira dobrável (prática para viagens)","Banheira com termômetro embutido"],
       cuidados:"NUNCA deixe o bebê desacompanhado na água, nem por um segundo. Use termômetro de água (36–37°C é ideal).",
       alternativa:"Cuba da pia (para os primeiros meses, com supervisão total).",
       quando:"A temperatura ideal da água é entre 36°C e 37°C — use sempre termômetro."},
      {id:"trocador",name:"Trocador",priority:"essencial",icon:"🔄",preco:"R$ 100–500",ate:"Semana 34",dura:"Até 2 anos",espaco:"Médio",
       oque:"Superfície acolchoada e lavável para trocar fraldas com segurança e ergonomia.",
       porQue:"Trocas de fralda acontecem 8–12 vezes por dia nos primeiros meses. Um trocador adequado protege o bebê de quedas, facilita o trabalho dos pais e evita problemas nas costas.",
       tipos:["Trocador sobre a cômoda","Trocador portátil dobrável","Cômoda com trocador embutido"],
       cuidados:"NUNCA deixe o bebê desacompanhado no trocador. Sempre mantenha uma mão sobre ele. Tenha tudo (fralda, lenço, pomada) à mão antes de começar.",
       alternativa:"Uma cama baixa com toalha dobrada (com supervisão total).",
       quando:"Compre com antecedência — você usará desde o 1º dia."},
      {id:"termometro",name:"Termômetro digital",priority:"essencial",icon:"🌡️",preco:"R$ 30–150",ate:"Semana 36",dura:"Indefinido",espaco:"Mínimo",
       oque:"Termômetro digital para medir a temperatura do bebê com precisão.",
       porQue:"Febre em recém-nascidos (acima de 37,5°C) é sinal de alerta que exige avaliação médica imediata. Ter um termômetro confiável em casa é essencial.",
       tipos:["Axilar digital (mais comum)","Auricular (rápido, mas requer técnica)","De testa (infravermelho, mais prático)","Retal (mais preciso para recém-nascidos, segundo a AAP)"],
       cuidados:"Para recém-nascidos, a medida retal é a mais precisa. Consulte o pediatra sobre o método preferido.",
       alternativa:"Não há alternativa segura para este item.",
       quando:"Tenha em casa antes do nascimento. Não adie."},
      {id:"pomada",name:"Kit de higiene (pomada, algodão, lenços)",priority:"essencial",icon:"🧴",preco:"R$ 80–200/mês",ate:"Semana 36",dura:"Consumível",espaco:"Mínimo",
       oque:"Pomada para assadura (óxido de zinco), algodão hidrófilo, lenços umedecidos sem álcool e perfume.",
       porQue:"A pele do recém-nascido é extremamente sensível. A pomada de óxido de zinco cria barreira protetora contra assaduras. Lenços sem álcool e perfume evitam irritações.",
       tipos:["Pomada de óxido de zinco (essencial)","Algodão em bola ou pluma","Lenços umedecidos sem álcool e sem perfume"],
       cuidados:"Evite lenços com álcool, perfume ou parabenos. Para o coto umbilical, use apenas álcool 70% conforme orientação do pediatra.",
       alternativa:"Algodão com água filtrada (substitui lenços para recém-nascidos).",
       quando:"Tenha em casa antes do nascimento."},
    ]
  },
  {
    id:"alimentacao",icon:"🍼",title:"Alimentação",
    items:[
      {id:"mamadeira",name:"Mamadeiras",priority:"importante",icon:"🍼",preco:"R$ 60–300 (kit)",ate:"Semana 36",dura:"1–2 anos",espaco:"Pequeno",
       oque:"Recipiente com bico artificial para alimentar o bebê quando a amamentação não é possível ou como complemento.",
       porQue:"Mesmo que o plano seja amamentar exclusivamente, ter mamadeiras em casa é recomendado para situações de emergência, extração de leite materno ou introdução de fórmula se necessário.",
       tipos:["Mamadeira anticólica (reduz ingestão de ar)","Com bico em formato de seio (facilita alternância amamentação/mamadeira)","De vidro (mais higiênica)","De plástico sem BPA"],
       cuidados:"A OMS recomenda amamentação exclusiva até os 6 meses. A mamadeira pode interferir na pega do seio em recém-nascidos — converse com o pediatra antes de introduzir.",
       alternativa:"Copinho ou colher (para oferecer leite materno extraído sem interferir na amamentação).",
       quando:"Tenha pelo menos 2–3 unidades em casa antes do nascimento."},
      {id:"esterilizador",name:"Esterilizador",priority:"importante",icon:"♨️",preco:"R$ 100–400",ate:"Semana 36",dura:"2–3 anos",espaco:"Médio",
       oque:"Aparelho que elimina bactérias e microrganismos das mamadeiras, bicos e utensílios do bebê por vapor ou calor.",
       porQue:"O sistema imunológico do recém-nascido é imaturo. A esterilização adequada previne gastroenterites e infecções que podem ser graves nesta fase.",
       tipos:["A vapor elétrico (prático e rápido)","Microondas (barato)","Fervura na panela (gratuito, mas trabalhoso)"],
       cuidados:"Esterilize mamadeiras e bicos a cada uso nos primeiros 3 meses. Após, higienização com sabão e água quente é suficiente segundo a maioria dos pediatras.",
       alternativa:"Fervura em panela (gratuito e igualmente eficaz).",
       quando:"Compre antes do nascimento se planeja usar mamadeiras."},
      {id:"extrator",name:"Extrator de leite",priority:"opcional",icon:"🤱",preco:"R$ 80–700",ate:"Semana 36",dura:"1–2 anos",espaco:"Médio",
       oque:"Aparelho manual ou elétrico para extrair leite materno e armazená-lo.",
       porQue:"Permite que a mãe extraia leite para que o bebê seja alimentado por outra pessoa quando ela não puder estar presente, ou para aliviar o ingurgitamento mamário.",
       tipos:["Manual (silencioso, portátil, mais barato)","Elétrico simples","Elétrico duplo (mais rápido para quem extrai frequentemente)"],
       cuidados:"Higienize e esterilize após cada uso. O leite materno pode ser armazenado em geladeira por até 12h e no freezer por até 15 dias.",
       alternativa:"Ordenha manual (com orientação de enfermeira obstetra ou consultora de amamentação).",
       quando:"Útil especialmente se você vai retornar ao trabalho enquanto amamenta."},
    ]
  },
  {
    id:"seguranca",icon:"🔒",title:"Segurança",
    items:[
      {id:"cadeirinha",name:"Cadeirinha para carro",priority:"essencial",icon:"🚗",preco:"R$ 300–2.000",ate:"Semana 36",dura:"Até 4 anos (grupos 0+1)",espaco:"Ocupa banco do carro",
       oque:"Dispositivo de retenção infantil obrigatório por lei para transporte de crianças em veículos.",
       porQue:"É OBRIGATÓRIA POR LEI (Resolução CONTRAN 277). O bebê não pode sair da maternidade de carro sem cadeirinha. Ela reduz o risco de morte em acidentes em até 71%.",
       tipos:["Bebê conforto (0–13kg, instala voltada para trás)","Cadeira conversível (0–18kg)","Cadeira 2 em 1 (0–25kg, mais econômica a longo prazo)"],
       cuidados:"Para recém-nascidos, a cadeirinha deve estar SEMPRE voltada para trás. Nunca instale no banco do passageiro com airbag ativo.",
       alternativa:"Não há alternativa legal. É item obrigatório.",
       quando:"Instale e teste ANTES do nascimento. Muitos pais se arrependem de deixar para a última hora."},
      {id:"monitor_temp",name:"Termômetro de ambiente",priority:"importante",icon:"🌡️",preco:"R$ 30–100",ate:"Semana 36",dura:"Indefinido",espaco:"Mínimo",
       oque:"Aparelho que mede a temperatura e umidade do ambiente do quarto do bebê.",
       porQue:"Recém-nascidos não regulam bem a temperatura corporal. O quarto deve estar entre 20°C e 22°C. Temperatura muito alta é fator de risco para SMSL.",
       tipos:["Digital simples","Com umidificador integrado","Smart (conecta ao celular)"],
       cuidados:"Mantenha o quarto entre 20–22°C. Evite corrente de ar direta sobre o bebê.",
       alternativa:"Verificar a temperatura com termômetro comum periodicamente.",
       quando:"Tenha em casa antes do nascimento."},
    ]
  },
  {
    id:"enxoval",icon:"👶",title:"Enxoval Básico",
    items:[
      {id:"bodies",name:"Bodies e macacões (RN e P)",priority:"essencial",icon:"👕",preco:"R$ 200–600 (kit)",ate:"Semana 34",dura:"1–3 meses por tamanho",espaco:"Gaveta",
       oque:"Peças de roupa confortáveis e práticas para o recém-nascido.",
       porQue:"O bebê troca de roupa várias vezes ao dia — regurgitações, fraldas, banho. Peças práticas com botões na frente facilitam as trocas.",
       tipos:["Body manga curta (uso interno)","Body manga longa (clima frio)","Macacão com zíper (mais prático à noite)","Conjunto calça + body"],
       cuidados:"Lave todas as peças antes de usar, com sabão neutro sem amaciante. Evite peças com laços, cordões ou botões soltos. Prefira algodão.",
       alternativa:"Não exagere no estoque — bebês crescem muito rápido e podem nem usar todas as peças do mesmo tamanho.",
       quando:"Compre mínimo 7–10 peças em RN e 7–10 em P. Lave tudo antes do nascimento."},
      {id:"manta",name:"Mantas e cueiros",priority:"essencial",icon:"🧣",preco:"R$ 80–300 (kit)",ate:"Semana 34",dura:"6–12 meses",espaco:"Mínimo",
       oque:"Mantas leves de algodão para aconchegar, enrolar e proteger o bebê.",
       porQue:"O cueiro (técnica de enrolar o bebê) imita o ambiente uterino e pode reduzir o choro e melhorar o sono. A manta também serve para cobrir no carrinho ou no colo.",
       tipos:["Cueiro de musselina (leve e versátil)","Manta de malha (mais quente)","Manta de plush (para dias frios)"],
       cuidados:"NUNCA use mantas ou cobertores dentro do berço com recém-nascido — risco de sufocamento. Use apenas para enrolar nos braços.",
       alternativa:"Sleep sack (saco de dormir para bebê) é alternativa segura ao cobertor no berço.",
       quando:"Tenha pelo menos 5–8 cueiros/mantas. São muito usados."},
    ]
  },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const calcWeek = (lmp) => { const d=Math.floor((Date.now()-new Date(lmp).getTime())/86400000); return{weeks:Math.floor(d/7),days:d%7,total:d}; };
const calcDue = (lmp) => { const d=new Date(lmp); d.setDate(d.getDate()+280); return d; };
const daysLeft = (lmp) => Math.max(0,Math.floor((calcDue(lmp)-Date.now())/86400000));
const fmtDate = (d) => new Date(d).toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});
const fmtShort = (d) => new Date(d).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});
const getTri = (w) => w<=13?{n:1,label:"1º Trimestre",color:"#7C3AED"}:w<=26?{n:2,label:"2º Trimestre",color:"#059669"}:{n:3,label:"3º Trimestre",color:"#DC2626"};
const priColor = {essencial:"#DC2626",importante:"#D97706",opcional:"#059669"};
const examWeekMap = {betahcg:5,hemograma:6,glicemia:8,tn:11,morfologico:20,eco:24,curva:24,strep:35};

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
const getStorage = (key,def={}) => { try{return JSON.parse(localStorage.getItem(key)||"null")||def;}catch{return def;} };
const setStorage = (key,val) => { try{localStorage.setItem(key,JSON.stringify(val));}catch{} };

// ─── ESTILOS BASE ─────────────────────────────────────────────────────────────
const f = "system-ui,'Segoe UI',sans-serif";
const card = { background:"#fff", borderRadius:16, padding:16, boxShadow:"0 2px 12px rgba(124,58,237,0.08)", marginBottom:12 };
const btn = (bg,col="#fff")=>({ background:bg, color:col, border:"none", borderRadius:10, padding:"13px 20px", fontFamily:f, fontSize:15, fontWeight:800, cursor:"pointer", width:"100%" });
const tag = (bg,col)=>({ display:"inline-block", background:bg, color:col, fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:20 });
const inp = { border:"2px solid #E9D5FF", borderRadius:10, padding:"11px 14px", fontFamily:f, fontSize:14, outline:"none", width:"100%", boxSizing:"border-box" };

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step,setStep]=useState(0);
  const [type,setType]=useState("lmp");
  const [lmp,setLmp]=useState(""); const [due,setDue]=useState(""); const [wks,setWks]=useState("");
  const [mName,setMName]=useState(""); const [pName,setPName]=useState("");

  const lmpFromDue=(d)=>{ const dt=new Date(d); dt.setDate(dt.getDate()-280); return dt.toISOString().split("T")[0]; };
  const lmpFromWeeks=(w)=>{ const dt=new Date(); dt.setDate(dt.getDate()-(parseInt(w)*7)); return dt.toISOString().split("T")[0]; };
  const valid=()=>type==="lmp"?lmp!=="":type==="due"?due!=="":wks!==""&&parseInt(wks)>0&&parseInt(wks)<42;
  const finish=()=>{ let fl=lmp; if(type==="due")fl=lmpFromDue(due); if(type==="weeks")fl=lmpFromWeeks(wks); onComplete({lmpDate:fl,motherName:mName||"Mamãe",partnerName:pName||"Papai",createdAt:new Date().toISOString()}); };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20,background:"linear-gradient(160deg,#F5EEFF,#E9D5FF 50%,#D1FAE5)"}}>
      <div style={{background:"#fff",borderRadius:24,padding:"32px 24px",width:"100%",maxWidth:420,boxShadow:"0 8px 40px rgba(124,58,237,0.15)"}}>
        {step===0&&(<div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center"}}>
          <div style={{fontSize:64}}>💜</div>
          <h1 style={{fontSize:28,fontWeight:900,color:C.lilac,margin:0}}>Primeiros Passos</h1>
          <p style={{color:C.lilac,fontWeight:600,fontSize:15,margin:0}}>Seu guia completo para a jornada mais especial da vida</p>
          <p style={{color:C.gray,fontSize:14,lineHeight:1.6,textAlign:"center",margin:0}}>Acompanhe cada semana da gestação, organize exames e consultas, e tenha tudo em um único lugar — sempre baseado em orientações médicas e científicas.</p>
          <div style={{background:C.amberBg,border:`1px solid ${C.amberBorder}`,borderRadius:10,padding:12,fontSize:13,color:"#92400E",textAlign:"center",width:"100%",boxSizing:"border-box"}}>⚕️ Este app é educativo e de organização. Nunca substitui o acompanhamento do seu médico.</div>
          <button style={btn(C.lilac)} onClick={()=>setStep(1)}>Começar minha jornada →</button>
          <p style={{fontSize:11,color:C.gray,margin:0}}>Desenvolvido por <strong>EliTech</strong> · Você imagina, nós desenvolvemos.</p>
        </div>)}
        {step===1&&(<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <span style={tag(C.lilacLight,C.lilac)}>Passo 1 de 2</span>
          <h2 style={{fontSize:20,fontWeight:800,margin:0}}>Quando começou sua gestação?</h2>
          <p style={{color:C.gray,fontSize:14,margin:0}}>Calcularemos automaticamente a data prevista do parto e todas as semanas.</p>
          {[{id:"lmp",emoji:"📅",label:"Data da última menstruação (DUM)"},{id:"due",emoji:"🏥",label:"Data provável do parto (DPP)"},{id:"weeks",emoji:"🗓️",label:"Semanas de gestação atuais"}].map(o=>(
            <button key={o.id} style={{display:"flex",alignItems:"center",gap:12,background:type===o.id?C.lilacLight:"#F0EBF8",border:`2px solid ${type===o.id?C.lilac:"transparent"}`,borderRadius:10,padding:"12px 16px",fontFamily:f,fontSize:14,fontWeight:600,cursor:"pointer",color:type===o.id?C.lilac:C.near}} onClick={()=>setType(o.id)}>
              <span>{o.emoji}</span><span>{o.label}</span>
            </button>
          ))}
          {type==="lmp"&&<div><label style={{fontSize:13,fontWeight:700,color:C.gray,display:"block",marginBottom:6}}>Data da última menstruação</label><input style={inp} type="date" value={lmp} max={new Date().toISOString().split("T")[0]} onChange={e=>setLmp(e.target.value)}/></div>}
          {type==="due"&&<div><label style={{fontSize:13,fontWeight:700,color:C.gray,display:"block",marginBottom:6}}>Data provável do parto</label><input style={inp} type="date" value={due} min={new Date().toISOString().split("T")[0]} onChange={e=>setDue(e.target.value)}/></div>}
          {type==="weeks"&&<div><label style={{fontSize:13,fontWeight:700,color:C.gray,display:"block",marginBottom:6}}>Quantas semanas você está?</label><input style={inp} type="number" min="1" max="41" placeholder="Ex: 12" value={wks} onChange={e=>setWks(e.target.value)}/></div>}
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <button style={{...btn("#F0EBF8",C.near),flex:1,width:"auto"}} onClick={()=>setStep(0)}>← Voltar</button>
            <button style={{...btn(C.lilac),flex:1,width:"auto",opacity:valid()?1:0.5}} disabled={!valid()} onClick={()=>setStep(2)}>Próximo →</button>
          </div>
        </div>)}
        {step===2&&(<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <span style={tag(C.lilacLight,C.lilac)}>Passo 2 de 2</span>
          <h2 style={{fontSize:20,fontWeight:800,margin:0}}>Como podemos chamá-los? 💜</h2>
          <p style={{color:C.gray,fontSize:14,margin:0}}>Opcional — personalize a experiência para vocês.</p>
          {[{l:"Nome da mamãe",p:"Ex: Ana",v:mName,s:setMName},{l:"Nome do papai / parceiro(a)",p:"Ex: Carlos",v:pName,s:setPName}].map(({l,p,v,s})=>(
            <div key={l}><label style={{fontSize:13,fontWeight:700,color:C.gray,display:"block",marginBottom:6}}>{l}</label><input style={inp} type="text" placeholder={p} value={v} onChange={e=>s(e.target.value)}/></div>
          ))}
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <button style={{...btn("#F0EBF8",C.near),flex:1,width:"auto"}} onClick={()=>setStep(1)}>← Voltar</button>
            <button style={{...btn(C.lilac),flex:1,width:"auto"}} onClick={finish}>Começar 🎉</button>
          </div>
        </div>)}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ userData, setTab }) {
  const {weeks,days}=calcWeek(userData.lmpDate);
  const left=daysLeft(userData.lmpDate);
  const due=calcDue(userData.lmpDate);
  const tri=getTri(weeks);
  const wd=getWeekData(weeks);
  const clProg=getStorage("pp_checklist",{});
  const examResults=getStorage("pp_exam_results",{});
  const completed=checklistItems.filter(i=>clProg[i.id]).length;
  const gestPct=Math.min(100,Math.round((weeks/40)*100));
  const clPct=Math.round((completed/checklistItems.length)*100);
  const doneExams=Object.keys(examResults).length;

  // próximos exames baseado na semana
  const upcoming = examsData.filter(e=>{
    const ew=examWeekMap[e.id]||0;
    return ew>=weeks && ew<=weeks+4 && !examResults[e.id];
  }).slice(0,3);

  return (
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><div style={{fontSize:22,fontWeight:900}}>Olá, {userData.motherName}! 💜</div><div style={{fontSize:13,color:C.gray}}>Acompanhando sua jornada com carinho</div></div>
        <div style={{width:40,height:40,background:C.lilac,borderRadius:10,color:"#fff",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>ET</div>
      </div>

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#7C3AED,#6D28D9)",borderRadius:20,padding:20,display:"flex",alignItems:"center",gap:20,marginBottom:20,boxShadow:"0 8px 32px rgba(124,58,237,0.3)"}}>
        <div style={{width:84,height:84,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative"}}>
          <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)"}}/>
          <div style={{position:"absolute",inset:8,borderRadius:"50%",background:"rgba(255,255,255,0.1)"}}/>
          <span style={{fontSize:38,fontWeight:900,color:"#fff",lineHeight:1,position:"relative"}}>{weeks}</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.8)",fontWeight:600,position:"relative"}}>semanas</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:800,color:C.mint,textTransform:"uppercase",letterSpacing:"0.5px"}}>{tri.label}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:4}}>{days} dia{days!==1?"s":""} desta semana</div>
          <div style={{color:"#fff"}}><span style={{fontSize:28,fontWeight:900}}>{left}</span><span style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}> dias para o parto</span></div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:2}}>DPP: {fmtDate(due)}</div>
        </div>
      </div>

      {/* Bebê */}
      <div style={{fontSize:13,fontWeight:800,color:C.gray,textTransform:"uppercase",letterSpacing:"0.5px",margin:"0 0 10px"}}>Seu bebê esta semana</div>
      <div style={{...card,display:"flex",gap:14,alignItems:"flex-start"}}>
        <div style={{fontSize:40,flexShrink:0}}>{wd.emoji}</div>
        <div>
          <div style={{fontSize:13,color:C.gray}}>do tamanho de um(a) <strong>{wd.babySize}</strong></div>
          <div style={{fontSize:12,color:C.lilacSoft,fontWeight:700,margin:"2px 0 8px"}}>{wd.mm}</div>
          <div style={{fontSize:13,lineHeight:1.5}}>{wd.babyDesc}</div>
        </div>
      </div>

      {/* Próximos exames */}
      {upcoming.length>0&&(<>
        <div style={{fontSize:13,fontWeight:800,color:C.gray,textTransform:"uppercase",letterSpacing:"0.5px",margin:"16px 0 10px"}}>⚠️ Exames nas próximas semanas</div>
        <div style={{...card,background:C.amberBg,border:`1px solid ${C.amberBorder}`}}>
          {upcoming.map(e=><div key={e.id} style={{fontSize:13,color:"#92400E",padding:"4px 0"}}>📋 {e.name} — {e.window}</div>)}
          <button style={{...btn(C.amber),marginTop:12,fontSize:13}} onClick={()=>setTab("exams")}>Ver todos os exames →</button>
        </div>
      </>)}

      {/* Progresso */}
      <div style={{fontSize:13,fontWeight:800,color:C.gray,textTransform:"uppercase",letterSpacing:"0.5px",margin:"16px 0 10px"}}>Seu progresso</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {label:"Gestação",pct:gestPct,val:`${gestPct}%`,color:C.lilac},
          {label:"Checklist",pct:clPct,val:`${completed}/${checklistItems.length}`,color:C.mintDeep},
          {label:"Exames",pct:Math.round((doneExams/examsData.length)*100),val:`${doneExams}/${examsData.length}`,color:C.amber},
        ].map(p=>(
          <div key={p.label} style={card}>
            <div style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:8}}>{p.label}</div>
            <div style={{height:6,background:C.lilacLight,borderRadius:3,overflow:"hidden",marginBottom:6}}>
              <div style={{height:"100%",width:`${p.pct}%`,background:p.color,borderRadius:3,transition:"width 0.8s"}}/>
            </div>
            <div style={{fontSize:18,fontWeight:900}}>{p.val}</div>
          </div>
        ))}
      </div>

      {/* Sintomas */}
      <div style={{fontSize:13,fontWeight:800,color:C.gray,textTransform:"uppercase",letterSpacing:"0.5px",margin:"0 0 10px"}}>Sintomas comuns agora</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
        {wd.symptoms.map((s,i)=><span key={i} style={tag(C.lilacLight,C.lilac)}>{s}</span>)}
      </div>

      {/* Alertas */}
      <div style={{fontSize:13,fontWeight:800,color:C.gray,textTransform:"uppercase",letterSpacing:"0.5px",margin:"0 0 10px"}}>🔴 Procure o médico se...</div>
      <div style={{...card,background:C.redBg,border:`1px solid ${C.redBorder}`}}>
        {wd.alerts.map((s,i)=><div key={i} style={{fontSize:13,color:"#991B1B",fontWeight:600,padding:"3px 0"}}>🔴 {s}</div>)}
      </div>

      {/* Dica */}
      <div style={{background:"linear-gradient(135deg,#EDE9FE,#D1FAE5)",borderRadius:16,padding:16,margin:"16px 0"}}>
        <div style={{fontSize:12,fontWeight:800,color:C.lilac,marginBottom:6}}>💡 Dica da semana</div>
        <div style={{fontSize:13,lineHeight:1.6}}>{wd.tip}</div>
      </div>

      <div style={{background:"#F0EBF8",borderRadius:10,padding:12,fontSize:11,color:C.gray,textAlign:"center",lineHeight:1.5}}>⚕️ Todo conteúdo é educativo e não substitui consulta médica.<br/>Baseado em diretrizes do Ministério da Saúde e sociedades médicas.</div>
      <div style={{textAlign:"center",fontSize:11,color:C.gray,marginTop:8}}>Primeiros Passos · <strong>EliTech Tecnologia e Segurança</strong></div>
    </div>
  );
}

// ─── CALENDÁRIO SEMANAL ───────────────────────────────────────────────────────
function WeeklyCalendar({ userData }) {
  const {weeks:cur}=calcWeek(userData.lmpDate);
  const [sel,setSel]=useState(cur);
  const [detail,setDetail]=useState(false);
  const allWeeks=[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
  const wd=getWeekData(sel);
  const tc=(w)=>w<=13?"#7C3AED":w<=26?"#059669":"#DC2626";

  if(detail) return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <button style={{background:"none",border:"none",color:C.lilac,fontSize:14,fontWeight:700,fontFamily:f,cursor:"pointer",padding:"0 0 16px",display:"block"}} onClick={()=>setDetail(false)}>← Voltar ao calendário</button>
      <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20}}>
        <div style={{fontSize:52}}>{wd.emoji}</div>
        <div><h2 style={{fontSize:20,fontWeight:800,margin:0}}>Semana {sel}</h2><div style={{fontSize:13,color:C.gray,marginTop:4}}>Bebê: tamanho de <strong>{wd.babySize}</strong> ({wd.mm})</div></div>
      </div>
      {[{t:"👶 Desenvolvimento do bebê",c:wd.babyDesc},{t:"🤱 Mudanças no corpo da mãe",c:wd.momChanges}].map(({t,c})=>(
        <div key={t} style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>{t}</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{c}</p></div>
      ))}
      <div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>💊 Sintomas comuns</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{wd.symptoms.map((s,i)=><span key={i} style={tag(C.lilacLight,C.lilac)}>{s}</span>)}</div></div>
      {wd.exams?.length>0&&<div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>🔬 Exames desta fase</div>{wd.exams.map((e,i)=><div key={i} style={{fontSize:13,padding:"6px 0",borderBottom:"1px solid #E9D5FF"}}>📋 {e}</div>)}</div>}
      <div style={{...card,background:C.redBg,border:`1px solid ${C.redBorder}`}}><div style={{fontSize:13,fontWeight:800,color:C.red,marginBottom:8}}>🔴 Sinais de alerta</div>{wd.alerts.map((s,i)=><div key={i} style={{fontSize:13,color:"#991B1B",fontWeight:600,padding:"3px 0"}}>🔴 {s}</div>)}</div>
      <div style={{background:"linear-gradient(135deg,#EDE9FE,#D1FAE5)",borderRadius:16,padding:16}}><div style={{fontSize:12,fontWeight:800,color:C.lilac,marginBottom:6}}>💡 Dica</div><div style={{fontSize:13,lineHeight:1.6}}>{wd.tip}</div></div>
      <div style={{background:"#F0EBF8",borderRadius:10,padding:12,fontSize:11,color:C.gray,textAlign:"center",marginTop:16}}>⚕️ Conteúdo educativo. Consulte sempre seu médico.</div>
    </div>
  );

  return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{marginBottom:20}}><h2 style={{fontSize:22,fontWeight:800,margin:0}}>Calendário Gestacional</h2><p style={{fontSize:14,color:C.gray,margin:"4px 0 0"}}>40 semanas da sua jornada</p></div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
        {[{l:"1º Trim.",c:"#7C3AED"},{l:"2º Trim.",c:"#059669"},{l:"3º Trim.",c:"#DC2626"}].map(t=>(
          <div key={t.l} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:C.gray}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:t.c}}/><span>{t.l}</span>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:6,marginBottom:20}}>
        {allWeeks.map(w=>{
          const isCur=w===cur,isPast=w<cur,c=tc(w);
          return(
            <button key={w} style={{aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:10,border:`2px solid ${isCur||isPast?c:C.lilacLight}`,background:isCur?c:"#fff",cursor:"pointer",fontFamily:f,color:isCur?"#fff":isPast?c:C.near,boxShadow:isCur?"0 0 0 3px rgba(124,58,237,0.2)":"none"}} onClick={()=>{setSel(w);setDetail(true);}}>
              <span style={{fontSize:13,fontWeight:800}}>{w}</span>
              {isCur&&<span style={{fontSize:8,fontWeight:700}}>agora</span>}
            </button>
          );
        })}
      </div>
      <div style={card}>
        <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>Semana {sel} {sel===cur?"(atual)":""}</div>
        <div style={{fontSize:14,color:C.gray,marginBottom:12}}>{wd.emoji} Bebê: {wd.babySize} ({wd.mm})</div>
        <button style={btn(C.lilac)} onClick={()=>setDetail(true)}>Ver detalhes da semana {sel} →</button>
      </div>
    </div>
  );
}

// ─── CHECKLIST ────────────────────────────────────────────────────────────────
function ChecklistModule() {
  const [prog,setProg]=useState(()=>getStorage("pp_checklist",{}));
  const [sel,setSel]=useState(null);
  const toggle=(id)=>{ const np={...prog,[id]:!prog[id]}; setProg(np); setStorage("pp_checklist",np); };
  const completed=checklistItems.filter(i=>prog[i.id]).length;
  const pct=Math.round((completed/checklistItems.length)*100);

  if(sel){
    const d=sel.detail;
    return(
      <div style={{padding:"20px 16px 90px",fontFamily:f}}>
        <button style={{background:"none",border:"none",color:C.lilac,fontSize:14,fontWeight:700,fontFamily:f,cursor:"pointer",padding:"0 0 16px",display:"block"}} onClick={()=>setSel(null)}>← Voltar ao checklist</button>
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20}}>
          <div style={{fontSize:48}}>{sel.icon}</div>
          <div><h2 style={{fontSize:20,fontWeight:800,margin:0}}>{sel.title}</h2><span style={tag(priColor[sel.priority],"#fff")}>{sel.priority}</span></div>
        </div>
        {[{k:"oque",l:"🔍 O que é?"},{k:"paraQue",l:"🎯 Para que serve?"},{k:"quando",l:"⏰ Quando fazer?"},{k:"como",l:"📋 Como fazer?"},{k:"porQue",l:"💡 Por que fazer?"},{k:"seNao",l:"⚠️ O que acontece se não fizer?"},{k:"medico",l:"👩‍⚕️ Quando procurar médico?"}].map(({k,l})=>(
          <div key={k} style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>{l}</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{d[k]}</p></div>
        ))}
        <button style={btn(prog[sel.id]?C.mintDeep:C.lilac)} onClick={()=>{toggle(sel.id);setSel(null);}}>{prog[sel.id]?"✅ Marcado como concluído":"✔ Marcar como concluído"}</button>
        <div style={{background:"#F0EBF8",borderRadius:10,padding:12,fontSize:11,color:C.gray,textAlign:"center",marginTop:16}}>⚕️ Conteúdo educativo. Consulte sempre seu médico.</div>
      </div>
    );
  }

  return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{marginBottom:20}}><h2 style={{fontSize:22,fontWeight:800,margin:0}}>Checklist Inicial</h2><p style={{fontSize:14,color:C.gray,margin:"4px 0 0"}}>Primeiros passos da gestação</p></div>
      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,fontSize:14,fontWeight:600}}><span>{completed} de {checklistItems.length} concluídos</span><span style={{fontSize:20,fontWeight:900,color:C.lilac}}>{pct}%</span></div>
        <div style={{height:8,background:C.lilacLight,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:C.lilac,borderRadius:4,transition:"width 0.8s"}}/></div>
        {pct===100&&<div style={{fontSize:13,color:C.mintDeep,fontWeight:700,marginTop:10,textAlign:"center"}}>🎉 Parabéns! Checklist inicial completo!</div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {checklistItems.map(item=>(
          <div key={item.id} style={{...card,display:"flex",alignItems:"center",gap:10,opacity:prog[item.id]?0.65:1}}>
            <button style={{background:"none",border:"none",fontSize:22,cursor:"pointer",flexShrink:0}} onClick={()=>toggle(item.id)}>{prog[item.id]?"✅":"⬜"}</button>
            <div style={{flex:1,cursor:"pointer"}} onClick={()=>setSel(item)}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><span style={{fontSize:18}}>{item.icon}</span><span style={{fontSize:14,fontWeight:700,textDecoration:prog[item.id]?"line-through":"none",color:prog[item.id]?C.gray:C.near}}>{item.title}</span></div>
              <span style={{fontSize:11,fontWeight:800,color:priColor[item.priority]}}>{item.priority}</span>
            </div>
            <button style={{background:"none",border:"none",fontSize:22,color:C.gray,cursor:"pointer",flexShrink:0}} onClick={()=>setSel(item)}>›</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXAMES COM CALENDÁRIO E RESULTADOS ──────────────────────────────────────
function ExamsModule({ userData }) {
  const {weeks}=calcWeek(userData.lmpDate);
  const due=calcDue(userData.lmpDate);
  const [filter,setFilter]=useState("calendar");
  const [sel,setSel]=useState(null);
  const [results,setResults]=useState(()=>getStorage("pp_exam_results",{}));
  const [scheduled,setScheduled]=useState(()=>getStorage("pp_exam_scheduled",{}));
  const [inputVal,setInputVal]=useState({});
  const [showResult,setShowResult]=useState(false);

  const saveResult=(examId,val)=>{
    const nr={...results,[examId]:{value:val,savedAt:new Date().toISOString()}};
    setResults(nr); setStorage("pp_exam_results",nr);
  };
  const toggleScheduled=(examId)=>{
    const ns={...scheduled,[examId]:!scheduled[examId]};
    setScheduled(ns); setStorage("pp_exam_scheduled",ns);
  };

  // Calendário — agrupa exames por semana alvo
  const calendarGroups = examsData.reduce((acc,e)=>{
    const w=examWeekMap[e.id]||0;
    if(!acc[w])acc[w]=[];
    acc[w].push(e);
    return acc;
  },{});
  const calendarWeeks = Object.keys(calendarGroups).map(Number).sort((a,b)=>a-b);

  const getStatusDot=(e)=>{
    if(results[e.id])return{color:C.mintDeep,label:"Realizado ✅"};
    if(scheduled[e.id])return{color:C.amber,label:"Agendado 📅"};
    const ew=examWeekMap[e.id]||0;
    if(ew<weeks)return{color:C.red,label:"Em atraso ⚠️"};
    return{color:C.gray,label:"Pendente"};
  };

  if(sel){
    const e=sel;
    const urgent=e.window.includes("⚠️")||e.window.includes("⭐");
    const existResult=results[e.id];
    const iv=inputVal[e.id]||"";
    const feedback=existResult ? e.interpret(existResult.value) : (iv?(e.interpret(iv)):null);

    const renderInput=()=>{
      if(e.resultType==="numeric") return(
        <input style={inp} type="number" step="0.01" placeholder={`Insira o valor em ${e.resultUnit}`} value={iv} onChange={x=>setInputVal(p=>({...p,[e.id]:x.target.value}))}/>
      );
      if(e.resultType==="text") return(
        <textarea style={{...inp,minHeight:80,resize:"vertical"}} placeholder={e.resultLabel} value={iv} onChange={x=>setInputVal(p=>({...p,[e.id]:x.target.value}))}/>
      );
      if(e.resultType==="choice") return(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {e.choices.map(ch=>(
            <button key={ch} style={{background:iv===ch?C.lilacLight:"#F0EBF8",border:`2px solid ${iv===ch?C.lilac:"transparent"}`,borderRadius:10,padding:"11px 14px",fontFamily:f,fontSize:14,fontWeight:600,cursor:"pointer",textAlign:"left",color:iv===ch?C.lilac:C.near}} onClick={()=>setInputVal(p=>({...p,[e.id]:ch}))}>{ch}</button>
          ))}
        </div>
      );
      if(e.resultType==="triple") return(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {e.labels.map((lbl,i)=>{
            const parts=(iv||"||").split("|");
            return(
              <div key={lbl}><label style={{fontSize:12,fontWeight:700,color:C.gray,display:"block",marginBottom:4}}>{lbl}</label>
              <input style={inp} type="number" step="0.1" placeholder="mg/dL" value={parts[i]||""} onChange={x=>{
                const p=[...parts]; p[i]=x.target.value;
                setInputVal(prev=>({...prev,[e.id]:p.join("|")}));
              }}/></div>
            );
          })}
        </div>
      );
    };

    const feedbackColor=(s)=>s==="ok"?C.greenBg:s==="warn"?C.amberBg:s==="alert"?C.redBg:"#EDE9FE";
    const feedbackBorder=(s)=>s==="ok"?"#6EE7B7":s==="warn"?C.amberBorder:s==="alert"?C.redBorder:C.lilacLight;
    const feedbackText=(s)=>s==="ok"?"#065F46":s==="warn"?"#92400E":s==="alert"?"#991B1B":"#5B21B6";

    return(
      <div style={{padding:"20px 16px 90px",fontFamily:f}}>
        <button style={{background:"none",border:"none",color:C.lilac,fontSize:14,fontWeight:700,fontFamily:f,cursor:"pointer",padding:"0 0 16px",display:"block"}} onClick={()=>{setSel(null);setShowResult(false);}}>← Voltar</button>
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:16}}>
          <div style={{fontSize:48}}>{e.icon}</div>
          <div>
            <h2 style={{fontSize:18,fontWeight:800,margin:0}}>{e.name}</h2>
            <div style={{...tag(urgent?C.redBg:C.lilacLight,urgent?C.red:C.lilac),marginTop:6,display:"inline-block"}}>📅 {e.window}</div>
            <div style={{fontSize:13,fontWeight:700,color:C.mintDeep,marginTop:4}}>{e.obrig?"✅ Obrigatório no pré-natal":"🔵 Recomendado"}</div>
          </div>
        </div>

        {/* Status */}
        <div style={{...card,display:"flex",gap:10,alignItems:"center"}}>
          <div style={{width:12,height:12,borderRadius:"50%",background:getStatusDot(e).color,flexShrink:0}}/>
          <span style={{fontSize:14,fontWeight:700}}>{getStatusDot(e).label}</span>
          <button style={{...btn(scheduled[e.id]?C.mintDeep:C.lilac),width:"auto",fontSize:12,padding:"6px 12px",marginLeft:"auto"}} onClick={()=>toggleScheduled(e.id)}>
            {scheduled[e.id]?"✅ Agendado":"📅 Marcar como agendado"}
          </button>
        </div>

        {[{l:"🔍 O que é?",v:e.oque},{l:"🎯 Para que serve?",v:e.paraQue},{l:"⏰ Quando fazer?",v:e.quando},{l:"📋 Como é realizado?",v:e.como},{l:"🍽️ Preparo",v:e.preparo},{l:"⏱️ Duração",v:e.duracao}].map(({l,v})=>(
          <div key={l} style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>{l}</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{v}</p></div>
        ))}
        <div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>🔎 O que identifica?</div>{e.identifica.map((it,i)=><div key={i} style={{fontSize:13,padding:"6px 0",borderBottom:"1px solid #E9D5FF"}}>📌 {it}</div>)}</div>
        <div style={{background:"#F0EBF8",borderRadius:10,padding:12,fontSize:12,color:C.gray,fontStyle:"italic",marginBottom:12}}>📚 {e.ref}</div>

        {/* Registro de resultado */}
        <div style={{...card,border:`2px solid ${C.lilacLight}`}}>
          <div style={{fontSize:14,fontWeight:800,color:C.lilac,marginBottom:12}}>📝 Registrar resultado</div>
          {existResult&&!showResult?(
            <div>
              <div style={{fontSize:13,color:C.gray,marginBottom:8}}>✅ Resultado registrado em {new Date(existResult.savedAt).toLocaleDateString("pt-BR")}</div>
              <div style={{background:feedbackColor(e.interpret(existResult.value).status),border:`1px solid ${feedbackBorder(e.interpret(existResult.value).status)}`,borderRadius:10,padding:14,fontSize:14,lineHeight:1.6,color:feedbackText(e.interpret(existResult.value).status)}}>
                {e.interpret(existResult.value).msg}
              </div>
              <button style={{...btn("#F0EBF8",C.near),marginTop:10,fontSize:13}} onClick={()=>{setShowResult(true);setInputVal(p=>({...p,[e.id]:existResult.value}));}}>Editar resultado</button>
            </div>
          ):(
            <div>
              <label style={{fontSize:13,fontWeight:700,color:C.gray,display:"block",marginBottom:8}}>{e.resultLabel}</label>
              {renderInput()}
              {feedback&&(
                <div style={{background:feedbackColor(feedback.status),border:`1px solid ${feedbackBorder(feedback.status)}`,borderRadius:10,padding:14,fontSize:14,lineHeight:1.6,color:feedbackText(feedback.status),margin:"12px 0"}}>
                  {feedback.msg}
                </div>
              )}
              <button style={{...btn(C.lilac),marginTop:8}} disabled={!iv} onClick={()=>{saveResult(e.id,iv);setShowResult(false);}}>
                💾 Salvar resultado
              </button>
            </div>
          )}
        </div>
        <div style={{background:"#F0EBF8",borderRadius:10,padding:12,fontSize:11,color:C.gray,textAlign:"center",lineHeight:1.5}}>⚕️ Este feedback é orientativo. Resultados alterados devem ser sempre discutidos com seu obstetra.</div>
      </div>
    );
  }

  // Vista calendário vs lista
  const filtered = filter==="all"?examsData:filter==="calendar"?examsData:examsData.filter(e=>e.tri===parseInt(filter));

  return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{marginBottom:16}}><h2 style={{fontSize:22,fontWeight:800,margin:0}}>Exames do Pré-Natal</h2><p style={{fontSize:14,color:C.gray,margin:"4px 0 0"}}>Toque em um exame para detalhes e registro de resultado</p></div>
      <div style={{background:C.lilacLight,borderRadius:10,padding:"10px 14px",fontSize:14,marginBottom:16}}>📍 Semana atual: <strong>{weeks}</strong> · DPP: <strong>{fmtShort(due)}</strong></div>

      {/* Legenda */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
        {[{c:C.mintDeep,l:"Realizado"},{c:C.amber,l:"Agendado"},{c:C.red,l:"Em atraso"},{c:C.gray,l:"Pendente"}].map(s=>(
          <div key={s.l} style={{display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,color:C.gray}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:s.c}}/>{s.l}
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {[{id:"calendar",l:"📅 Cronograma"},{id:"all",l:"Todos"},{id:"1",l:"1º Trim."},{id:"2",l:"2º Trim."},{id:"3",l:"3º Trim."}].map(f=>(
          <button key={f.id} style={{background:filter===f.id?C.lilac:"#fff",border:`2px solid ${filter===f.id?C.lilac:C.lilacLight}`,borderRadius:20,padding:"6px 14px",fontFamily:f_,fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",color:filter===f.id?"#fff":C.near}} onClick={()=>setFilter(f.id)}>{f.l}</button>
        ))}
      </div>

      {/* Cronograma agrupado por semana */}
      {filter==="calendar"?(
        <div>
          {calendarWeeks.map(w=>{
            const exs=calendarGroups[w];
            const isPast=w<weeks, isCur=w===weeks||w===weeks+1||w===weeks+2;
            return(
              <div key={w} style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:isPast?"#E5E7EB":isCur?C.lilac:C.lilacLight,color:isPast?C.gray:isCur?"#fff":C.lilac,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>{w}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:isPast?C.gray:C.near}}>Semana {w}</div>
                    {isCur&&<span style={tag(C.lilacLight,C.lilac)}>Próxima janela</span>}
                    {w<weeks&&<span style={tag("#F3F4F6",C.gray)}>Passada</span>}
                  </div>
                </div>
                {exs.map(e=>{
                  const st=getStatusDot(e);
                  return(
                    <div key={e.id} style={{...card,display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginLeft:44,marginBottom:8}} onClick={()=>setSel(e)}>
                      <div style={{fontSize:28,flexShrink:0}}>{e.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:800}}>{e.name}</div>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:st.color}}/><span style={{fontSize:12,color:st.color,fontWeight:700}}>{st.label}</span>
                        </div>
                      </div>
                      <span style={{fontSize:22,color:C.gray}}>›</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(e=>{
            const st=getStatusDot(e);
            const urgent=e.window.includes("⚠️")||e.window.includes("⭐");
            return(
              <div key={e.id} style={{...card,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setSel(e)}>
                <div style={{fontSize:32,flexShrink:0}}>{e.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800}}>{e.name}</div>
                  <div style={{fontSize:12,color:urgent?C.red:C.gray}}>📅 {e.window}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:st.color}}/><span style={{fontSize:12,color:st.color,fontWeight:700}}>{st.label}</span>
                  </div>
                </div>
                <span style={{fontSize:22,color:C.gray}}>›</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
const f_ = "system-ui,'Segoe UI',sans-serif";

// ─── QUARTO DO BEBÊ ───────────────────────────────────────────────────────────
function BabyRoomModule() {
  const [selCat,setSelCat]=useState(null);
  const [selItem,setSelItem]=useState(null);
  const [bought,setBought]=useState(()=>getStorage("pp_babyroom",{}));

  const toggleBought=(id)=>{ const n={...bought,[id]:!bought[id]}; setBought(n); setStorage("pp_babyroom",n); };
  const totalItems=babyRoomCategories.reduce((a,c)=>a+c.items.length,0);
  const boughtCount=Object.values(bought).filter(Boolean).length;

  if(selItem){
    return(
      <div style={{padding:"20px 16px 90px",fontFamily:f}}>
        <button style={{background:"none",border:"none",color:C.lilac,fontSize:14,fontWeight:700,fontFamily:f,cursor:"pointer",padding:"0 0 16px",display:"block"}} onClick={()=>setSelItem(null)}>← Voltar</button>
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:16}}>
          <div style={{fontSize:48}}>{selItem.icon}</div>
          <div>
            <h2 style={{fontSize:20,fontWeight:800,margin:0}}>{selItem.name}</h2>
            <span style={tag(priColor[selItem.priority],"#fff")}>{selItem.priority}</span>
          </div>
        </div>

        {/* Resumo rápido */}
        <div style={{...card,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{l:"💰 Faixa de preço",v:selItem.preco},{l:"📅 Comprar até",v:selItem.ate},{l:"⏳ Duração",v:selItem.dura},{l:"📦 Espaço",v:selItem.espaco}].map(({l,v})=>(
            <div key={l}><div style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:700}}>{v}</div></div>
          ))}
        </div>

        <div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>🔍 O que é?</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{selItem.oque}</p></div>
        <div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>💡 Por que comprar?</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{selItem.porQue}</p></div>

        {selItem.tipos&&(
          <div style={card}>
            <div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>📋 Tipos disponíveis</div>
            {selItem.tipos.map((t,i)=><div key={i} style={{fontSize:13,padding:"6px 0",borderBottom:"1px solid #E9D5FF"}}>• {t}</div>)}
          </div>
        )}

        <div style={{...card,background:C.amberBg,border:`1px solid ${C.amberBorder}`}}>
          <div style={{fontSize:13,fontWeight:800,color:C.amber,marginBottom:8}}>⚠️ Cuidados importantes</div>
          <p style={{fontSize:14,lineHeight:1.6,margin:0,color:"#92400E"}}>{selItem.cuidados}</p>
        </div>

        <div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>🔄 Alternativas</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{selItem.alternativa}</p></div>
        <div style={card}><div style={{fontSize:13,fontWeight:800,color:C.lilac,marginBottom:8}}>🕐 Quando comprar?</div><p style={{fontSize:14,lineHeight:1.6,margin:0}}>{selItem.quando}</p></div>

        <button style={btn(bought[selItem.id]?C.mintDeep:C.lilac)} onClick={()=>toggleBought(selItem.id)}>
          {bought[selItem.id]?"✅ Comprado!":"🛒 Marcar como comprado"}
        </button>
      </div>
    );
  }

  if(selCat){
    const cat=babyRoomCategories.find(c=>c.id===selCat);
    return(
      <div style={{padding:"20px 16px 90px",fontFamily:f}}>
        <button style={{background:"none",border:"none",color:C.lilac,fontSize:14,fontWeight:700,fontFamily:f,cursor:"pointer",padding:"0 0 16px",display:"block"}} onClick={()=>setSelCat(null)}>← Voltar às categorias</button>
        <div style={{marginBottom:20}}>
          <h2 style={{fontSize:22,fontWeight:800,margin:0}}>{cat.icon} {cat.title}</h2>
          <p style={{fontSize:14,color:C.gray,margin:"4px 0 0"}}>{cat.items.length} itens nesta categoria</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {cat.items.map(item=>(
            <div key={item.id} style={{...card,display:"flex",alignItems:"center",gap:12,cursor:"pointer",opacity:bought[item.id]?0.65:1}} onClick={()=>setSelItem(item)}>
              <div style={{fontSize:32,flexShrink:0}}>{item.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:800,textDecoration:bought[item.id]?"line-through":"none"}}>{item.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                  <span style={tag(priColor[item.priority],"#fff")}>{item.priority}</span>
                  <span style={{fontSize:12,color:C.gray}}>{item.preco}</span>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <button style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}} onClick={e=>{e.stopPropagation();toggleBought(item.id);}}>{bought[item.id]?"✅":"⬜"}</button>
                <span style={{fontSize:20,color:C.gray}}>›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{marginBottom:20}}><h2 style={{fontSize:22,fontWeight:800,margin:0}}>Quarto do Bebê</h2><p style={{fontSize:14,color:C.gray,margin:"4px 0 0"}}>Tudo que você precisa saber antes de comprar</p></div>
      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,fontSize:14,fontWeight:600}}><span>{boughtCount} de {totalItems} itens comprados</span><span style={{fontSize:20,fontWeight:900,color:C.lilac}}>{Math.round((boughtCount/totalItems)*100)}%</span></div>
        <div style={{height:8,background:C.lilacLight,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round((boughtCount/totalItems)*100)}%`,background:C.lilac,borderRadius:4,transition:"width 0.8s"}}/></div>
      </div>
      <div style={{...card,background:C.amberBg,border:`1px solid ${C.amberBorder}`,fontSize:13,color:"#92400E",lineHeight:1.6}}>
        💡 <strong>Dica:</strong> Não indicamos marcas — apenas categorias e critérios de segurança. Pesquise sempre preços e avaliações antes de comprar. Priorize itens essenciais primeiro.
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:4}}>
        {babyRoomCategories.map(cat=>{
          const boughtInCat=cat.items.filter(i=>bought[i.id]).length;
          return(
            <div key={cat.id} style={{...card,cursor:"pointer"}} onClick={()=>setSelCat(cat.id)}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:36}}>{cat.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:800}}>{cat.title}</div>
                  <div style={{fontSize:13,color:C.gray,marginTop:2}}>{cat.items.length} itens · {boughtInCat} comprados</div>
                  <div style={{height:4,background:C.lilacLight,borderRadius:2,overflow:"hidden",marginTop:8}}>
                    <div style={{height:"100%",width:`${Math.round((boughtInCat/cat.items.length)*100)}%`,background:C.lilac,borderRadius:2}}/>
                  </div>
                </div>
                <span style={{fontSize:22,color:C.gray}}>›</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DIÁRIO ───────────────────────────────────────────────────────────────────
function DiaryModule({ userData }) {
  const {weeks}=calcWeek(userData.lmpDate);
  const [entries,setEntries]=useState(()=>getStorage("pp_diary",{}));
  const [selWeek,setSelWeek]=useState(weeks);
  const [form,setForm]=useState({mood:"",symptoms:"",notes:"",weight:"",belly:""});
  const [saved,setSaved]=useState(false);
  const [view,setView]=useState("form");
  const moods=["😄 Ótima","😊 Bem","😐 Regular","😔 Cansada","😰 Ansiosa","🤢 Enjoada"];

  useEffect(()=>{ const e=entries[selWeek]; setForm(e?{mood:e.mood||"",symptoms:e.symptoms||"",notes:e.notes||"",weight:e.weight||"",belly:e.belly||""}:{mood:"",symptoms:"",notes:"",weight:"",belly:""}); setSaved(false); },[selWeek]);

  const save=()=>{ const up={...entries,[selWeek]:{...form,savedAt:new Date().toISOString()}}; setEntries(up); setStorage("pp_diary",up); setSaved(true); setTimeout(()=>setSaved(false),2000); };
  const withEntries=Object.keys(entries).map(Number);

  if(view==="timeline") return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:800,margin:0}}>Linha do Tempo</h2>
        <button style={{background:C.lilacLight,border:"none",borderRadius:10,padding:"8px 12px",fontFamily:f,fontSize:12,fontWeight:700,color:C.lilac,cursor:"pointer"}} onClick={()=>setView("form")}>✏️ Registrar</button>
      </div>
      {withEntries.length===0?(
        <div style={{textAlign:"center",padding:"48px 20px"}}>
          <div style={{fontSize:56,marginBottom:12}}>📔</div>
          <div style={{fontSize:18,fontWeight:800,marginBottom:8}}>Nenhum registro ainda</div>
          <p style={{fontSize:14,color:C.gray,marginBottom:24}}>Comece registrando como você está se sentindo nesta semana.</p>
          <button style={btn(C.lilac)} onClick={()=>setView("form")}>Fazer primeiro registro</button>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {withEntries.sort((a,b)=>a-b).map(w=>{
            const e=entries[w];
            return(
              <div key={w} style={{...card,borderLeft:`4px solid ${C.lilac}`,cursor:"pointer"}} onClick={()=>{setSelWeek(w);setView("form");}}>
                <div style={{fontSize:16,fontWeight:900,marginBottom:6}}>Semana {w}</div>
                {e.mood&&<div style={{fontSize:14,marginBottom:4}}>{e.mood}</div>}
                <div>{e.weight&&<span style={{fontSize:13,color:C.gray,marginRight:12}}>⚖️ {e.weight}kg</span>}{e.belly&&<span style={{fontSize:13,color:C.gray}}>📏 {e.belly}cm</span>}</div>
                {e.notes&&<div style={{fontSize:13,fontStyle:"italic",marginTop:8,color:C.near}}>"{e.notes.slice(0,80)}{e.notes.length>80?"...":""}"</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return(
    <div style={{padding:"20px 16px 90px",fontFamily:f}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{fontSize:22,fontWeight:800,margin:0}}>Diário da Gestação</h2><p style={{fontSize:14,color:C.gray,margin:"4px 0 0"}}>Registre cada semana</p></div>
        <button style={{background:C.lilacLight,border:"none",borderRadius:10,padding:"8px 12px",fontFamily:f,fontSize:12,fontWeight:700,color:C.lilac,cursor:"pointer"}} onClick={()=>setView("timeline")}>📖 Linha do tempo ({withEntries.length})</button>
      </div>
      <div style={{...card,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button style={{background:"none",border:"none",fontSize:28,color:C.lilac,cursor:"pointer",fontWeight:900}} onClick={()=>setSelWeek(w=>Math.max(1,w-1))}>‹</button>
        <div style={{textAlign:"center"}}>
          <span style={{fontSize:18,fontWeight:900,display:"block"}}>Semana {selWeek}</span>
          <div style={{marginTop:4,display:"flex",gap:6,justifyContent:"center"}}>
            {selWeek===weeks&&<span style={tag(C.lilacLight,C.lilac)}>semana atual</span>}
            {entries[selWeek]&&<span style={tag(C.greenBg,C.mintDeep)}>✅ salvo</span>}
          </div>
        </div>
        <button style={{background:"none",border:"none",fontSize:28,color:C.lilac,cursor:"pointer",fontWeight:900}} onClick={()=>setSelWeek(w=>Math.min(40,w+1))}>›</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div><label style={{fontSize:13,fontWeight:800,display:"block",marginBottom:8}}>Como você está se sentindo?</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {moods.map(m=><button key={m} style={{background:form.mood===m?C.lilacLight:"#F0EBF8",border:`2px solid ${form.mood===m?C.lilac:"transparent"}`,borderRadius:10,padding:10,fontFamily:f,fontSize:13,fontWeight:700,cursor:"pointer",textAlign:"left",color:form.mood===m?C.lilac:C.near}} onClick={()=>setForm(ff=>({...ff,mood:m}))}>{m}</button>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div><label style={{fontSize:13,fontWeight:800,display:"block",marginBottom:6}}>Peso (kg)</label><input style={inp} type="number" step="0.1" placeholder="Ex: 65.2" value={form.weight} onChange={e=>setForm(f=>({...f,weight:e.target.value}))}/></div>
          <div><label style={{fontSize:13,fontWeight:800,display:"block",marginBottom:6}}>Barriga (cm)</label><input style={inp} type="number" step="0.5" placeholder="Ex: 28" value={form.belly} onChange={e=>setForm(f=>({...f,belly:e.target.value}))}/></div>
        </div>
        <div><label style={{fontSize:13,fontWeight:800,display:"block",marginBottom:6}}>Sintomas desta semana</label><input style={inp} type="text" placeholder="Ex: náusea, cansaço, ânimo..." value={form.symptoms} onChange={e=>setForm(f=>({...f,symptoms:e.target.value}))}/></div>
        <div><label style={{fontSize:13,fontWeight:800,display:"block",marginBottom:6}}>Observações e memórias 💜</label><textarea style={{...inp,minHeight:80,resize:"vertical"}} placeholder="Como foi a semana? Sentiu o bebê mexer? Algo especial aconteceu?" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></div>
        <button style={btn(C.lilac)} onClick={save}>{saved?"✅ Salvo!":"💾 Salvar registro"}</button>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
const TABS=[
  {id:"dashboard",icon:"🏠",label:"Início"},
  {id:"calendar",icon:"📅",label:"Semanas"},
  {id:"checklist",icon:"✅",label:"Checklist"},
  {id:"exams",icon:"🔬",label:"Exames"},
  {id:"room",icon:"🍼",label:"Quarto"},
  {id:"diary",icon:"📔",label:"Diário"},
];

export default function App() {
  const [userData,setUserData]=useState(()=>{try{const s=localStorage.getItem("pp_userData");return s?JSON.parse(s):null;}catch{return null;}});
  const [tab,setTab]=useState("dashboard");
  const finish=(data)=>{localStorage.setItem("pp_userData",JSON.stringify(data));setUserData(data);};

  if(!userData) return <Onboarding onComplete={finish}/>;

  return(
    <div style={{fontFamily:f,background:C.lilacBg,minHeight:"100vh",maxWidth:480,margin:"0 auto",position:"relative",color:C.near}}>
      {tab==="dashboard"&&<Dashboard userData={userData} setTab={setTab}/>}
      {tab==="calendar"&&<WeeklyCalendar userData={userData}/>}
      {tab==="checklist"&&<ChecklistModule/>}
      {tab==="exams"&&<ExamsModule userData={userData}/>}
      {tab==="room"&&<BabyRoomModule/>}
      {tab==="diary"&&<DiaryModule userData={userData}/>}
      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:`1px solid ${C.lilacLight}`,display:"flex",padding:"6px 2px 10px",boxShadow:"0 -4px 20px rgba(124,58,237,0.08)",zIndex:100}}>
        {TABS.map(t=>(
          <button key={t.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1,background:"none",border:"none",cursor:"pointer",fontFamily:f,padding:"3px 0"}} onClick={()=>setTab(t.id)}>
            <span style={{fontSize:18}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:700,color:tab===t.id?C.lilac:C.gray}}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
