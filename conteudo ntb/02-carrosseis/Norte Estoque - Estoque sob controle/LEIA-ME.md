# Norte Estoque · Estoque sob controle

Carrossel de apresentação do Norte Estoque com sete slides, no formato 4:5 para Instagram.

## Arquivos

- Um PNG estático por slide para revisão e publicação como carrossel de imagens.
- Versões MP4 de 3 segundos nos slides 2 a 6, com movimentos distintos: leitura de QR Code, avanço da conferência, impressão da etiqueta, transferência de volumes e acompanhamento de uma ordem de produção.
- `COPY.md` contém a copy aplicada em cada arte.

As interfaces mostradas vêm das telas oficiais do kit de marca. A capa compara uma prateleira de estoque físico com uma lista do sistema. No slide 2, a linha vermelha percorre o QR Code na horizontal em 24 quadros e conclui com uma confirmação visual. No slide 4, a etiqueta aparece logo abaixo da abertura da impressora e é revelada de cima para baixo. O notebook entra de baixo; o conteúdo das telas permanece estático. O post tem uma entrada Remotion isolada em `src/NorteEstoqueApresentacaoEntry.tsx`.

## Recursos e alegações

O conteúdo usa funcionalidades descritas nos materiais oficiais: inventário com QR Code, etiquetas com lote e validade, transferências em massa, acompanhamento de ordens de produção e integração complementar ao Omie. Não usamos percentuais de desempenho não validados.

Para renderizar novamente a partir da raiz do repositório:

```powershell
node scripts/render-norte-estoque-apresentacao.mjs
```
