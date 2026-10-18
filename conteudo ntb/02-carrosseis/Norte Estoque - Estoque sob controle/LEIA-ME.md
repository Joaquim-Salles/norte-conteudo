# Norte Estoque · Estoque sob controle

Carrossel de apresentação do Norte Estoque com sete slides, no formato 4:5 para Instagram.

## Arquivos

- Um PNG estático por slide para revisão e publicação como carrossel de imagens.
- Versões MP4 de 3 segundos nos slides 2 a 6, com movimentos distintos: leitura de QR Code, avanço da conferência, impressão da etiqueta, transferência de volumes e acompanhamento de uma ordem de produção.
- `COPY.md` contém a copy aplicada em cada arte.

As interfaces mostradas vêm das telas oficiais do kit de marca. Os movimentos destacam ações e elementos visuais, sem animar o conteúdo dentro das telas capturadas. O post tem uma entrada Remotion isolada em `src/NorteEstoqueApresentacaoEntry.tsx`.

## Recursos e alegações

O conteúdo usa funcionalidades descritas nos materiais oficiais: inventário com QR Code, etiquetas com lote e validade, transferências em massa, acompanhamento de ordens de produção e integração complementar ao Omie. Não usamos percentuais de desempenho não validados.

Para renderizar novamente a partir da raiz do repositório:

```powershell
node scripts/render-norte-estoque-apresentacao.mjs
```
