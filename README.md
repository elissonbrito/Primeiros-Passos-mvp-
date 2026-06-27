# Primeiros Passos 💜
### Desenvolvido por EliTech Tecnologia e Segurança

Guia completo para pais de primeira viagem — acompanhamento semanal da gestação, exames, quarto do bebê e diário.

---

## Como rodar localmente

```bash
npm install
npm start
```

## Como fazer build para produção

```bash
npm run build
```

A pasta `build/` gerada pode ser publicada em qualquer servidor estático (GitHub Pages, Netlify, Vercel, etc).

## Como publicar no GitHub Pages

1. Faça upload de **todo o conteúdo da pasta `build/`** no repositório
2. Vá em **Settings → Pages → Branch: main → / (root)**
3. Aguarde alguns minutos e acesse a URL gerada

---

## Estrutura do projeto

```
src/
  App.js        → Aplicação completa (todos os módulos)
  index.js      → Ponto de entrada React
  index.css     → Reset CSS
```

## Módulos incluídos

- **Dashboard** — Semana atual, DPP automática, bebê da semana, progresso
- **Calendário Gestacional** — 40 semanas com detalhes de cada uma
- **Checklist Inicial** — 10 itens essenciais com fichas completas (7 perguntas cada)
- **Exames** — Cronograma visual + registro de resultados com feedback automático
- **Quarto do Bebê** — 5 categorias, 15+ itens com fichas detalhadas e checklist de compras
- **Diário** — Registro semanal com linha do tempo

## Tecnologias

- React 18
- Inline styles (sem dependência de CSS externo)
- localStorage (dados salvos no dispositivo do usuário)
- Sem backend — pronto para uso como PWA estático

---

*"Você imagina, nós desenvolvemos." — EliTech*
