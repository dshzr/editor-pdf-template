# Template PDF para F.A BICICLETARIA

Este é um guia para criar o template PDF da F.A BICICLETARIA. O PDF deve conter os seguintes campos no formato `{{campo}}`:

## Campos Obrigatórios:

### Dados do Cliente
- `{{nome}}` - Nome completo do cliente

### Produto/Serviço
- `{{produto}}` - Nome do produto ou serviço
- `{{cor}}` - Cor do produto
- `{{numeracao}}` - Numeração ou tamanho
- `{{quantia}}` - Valor ou quantidade

### Data
- `{{dia}}` - Dia
- `{{mes}}` - Mês
- `{{ano}}` - Ano

### Revisões
- `{{revisao1}}` - Data da primeira revisão
- `{{revisao2}}` - Data da segunda revisão

## Exemplo de uso no PDF:

```
F.A BICICLETARIA
================

Cliente: {{nome}}
Data: {{dia}}/{{mes}}/{{ano}}

Produto/Serviço: {{produto}}
Cor: {{cor}}
Numeração: {{numeracao}}
Valor: R$ {{quantia}}

Próximas revisões:
1ª Revisão: {{revisao1}}
2ª Revisão: {{revisao2}}
```

## Instruções:
1. Crie um PDF com o layout desejado da bicicletaria
2. Substitua os valores pelos placeholders `{{campo}}`
3. Faça upload do PDF no sistema
4. Preencha os campos no formulário
5. Gere o PDF final com os dados preenchidos
