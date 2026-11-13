# LinkTree — página de links da marca

Página estilo linktree (Next.js App Router) usada por **clientes reais**. Links: site principal, bot de WhatsApp, bot da Shopee e botão de orçamento.

## Regras inegociáveis

1. **Ícones: Remix Icon** (`remixicon` via npm, classes `ri-*-line` / `ri-*-fill`). Não usar Lucide, Heroicons, Solar, emoji ou SVG desenhado à mão como ícone. Escolha um estilo (line OU fill) e mantenha em toda a página.
2. **CSS com tokens em `:root` num arquivo separado**: `app/styles/tokens.css` contém TODAS as cores, fontes, espaçamentos, raios, sombras, durações e easings. Componentes só consomem `var(--...)`. Nenhum hex/px solto fora do arquivo de tokens (exceto 0/1px de borda).
3. **Harmonia**: paleta pequena (1 cor de marca + neutros + no máx. 1 acento), escala tipográfica e de espaçamento modular. Tudo deriva dos tokens.
4. **Sem cara de IA** — ver lista abaixo. Isso é requisito de negócio, não estética.

## Anti "cara de IA" (proibido)

- Gradiente roxo→azul / roxo→rosa, "aurora", blobs borrados de fundo.
- Glassmorphism em tudo, glow neon em botões, bordas com gradiente animado.
- Fonte Inter/Poppins como escolha padrão; títulos em gradiente.
- Emojis e ícones de "brilho" (✨, sparkles, foguetes) decorando texto.
- Copy genérica: "Eleve seu negócio", "Soluções inovadoras", "Transforme sua experiência", "Bem-vindo ao futuro".
- Cards idênticos centralizados com sombra difusa e hover de escala 1.05 em tudo.
- Avatar com iniciais, ilustração ou pessoa gerada por IA.
- Badges falsos ("+10.000 clientes satisfeitos") sem dado real.

## O que fazer em vez disso

- Foto/logo **real** da marca; cor de marca **real** extraída do logo/site.
- Tipografia com personalidade (ex.: um grotesco/serifado editorial do Google Fonts) e hierarquia clara.
- Detalhes de ofício: alinhamento rigoroso, números/labels pequenos em mono, estados hover/focus/active pensados, micro-movimento sutil e com propósito.
- Copy curta, direta, no tom de quem atende o cliente ("Fale com a gente no WhatsApp", "Pedir orçamento").
- Respeitar `prefers-reduced-motion`, contraste AA, foco visível, toque ≥ 44px, mobile-first (a maioria abre pelo Instagram/WhatsApp no celular).

## Fluxo obrigatório (TODO pedido do usuário)

Nenhuma mudança de UI vai direto para o código. Sempre:
1. **Revisão/direção em paralelo**: `ui-ux-designer` + `awwwards-director` + `twentyfirst-scout` (quando houver componente novo ou ajuste visual).
2. **Implementação**: `frontend-design` aplica a síntese das recomendações.
3. **Auditoria final**: `ui-ux-designer` revisa o resultado (anti-IA + acessibilidade) antes de entregar.
O agente principal só orquestra, sintetiza e valida (build/lint/screenshot).

## Sub-agentes (`.claude/agents/`)

| Agente | Papel |
|---|---|
| `ui-ux-designer` | Direção, hierarquia, fluxo de clique, acessibilidade, revisão anti-IA |
| `frontend-design` | Implementação: componentes, CSS com tokens, Remix Icon |
| `awwwards-director` | Direção de arte e motion premium (com contenção) |
| `twentyfirst-scout` | Busca referências/componentes no 21st.dev e adapta ao padrão do projeto |

Skills de projeto em `.claude/skills/`: `build-awwwards-quality-sites`, `21st-cli-use`. Skills globais úteis: `frontend-design`, `web-design-guidelines`.
Obs.: o skill de awwwards sugere ícones Solar — **neste projeto vale Remix Icon** (regra 1 tem prioridade).
