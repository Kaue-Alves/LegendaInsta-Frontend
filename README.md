# 📸 LegendaInsta - Frontend

Interface web para geração automática de legendas para Instagram usando IA.

## 🚀 Tecnologias

-   **React 19** - Biblioteca JavaScript para UI
-   **TypeScript** - Superset tipado do JavaScript
-   **Vite** - Build tool e dev server
-   **Tailwind CSS 4** - Framework de CSS utilitário
-   **Lucide React** - Biblioteca de ícones

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/Kaue-Alves/LegendaInsta-Frontend.git

# Entre no diretório
cd LegendaInsta-Frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente (opcional)
cp .env.example .env

# Execute em desenvolvimento
npm run dev
```

## 🌐 Configuração

Crie um arquivo `.env` (opcional) para configurar a URL da API:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Por padrão, o frontend se conecta a `http://localhost:3000`.

## 📋 Scripts Disponíveis

-   `npm run dev` - Inicia o servidor de desenvolvimento
-   `npm run build` - Gera build de produção
-   `npm run preview` - Visualiza o build de produção
-   `npm run lint` - Executa o linter

## 🎨 Funcionalidades

### ✅ Implementadas

-   📤 Upload de imagens com preview
-   🎭 Seleção de tom da legenda (7 opções)
-   😀 Controle de uso de emojis (3 opções)
-   📝 Campo para descrição adicional opcional
-   ✨ Geração de 5 legendas únicas usando IA
-   📋 Copiar legendas com um clique
-   ⚠️ Tratamento de erros amigável
-   📱 Interface responsiva
-   🎨 Design moderno com gradientes

### 📊 Estrutura do Projeto

```
src/
├── components/
│   ├── ImageUpload.tsx      # Componente de upload de imagem
│   ├── CaptionOptions.tsx   # Formulário de opções
│   └── CaptionResults.tsx   # Exibição de resultados
├── services/
│   └── api.ts               # Serviço de comunicação com API
├── types/
│   └── index.ts             # Definições de tipos TypeScript
├── App.tsx                  # Componente principal
├── main.tsx                 # Entry point
└── index.css                # Estilos globais
```

## 🔌 Integração com Backend

O frontend se comunica com o backend através da classe `ApiService`:

```typescript
import { ApiService } from "./services/api";

// Gerar legendas
const captions = await ApiService.generateCaptions({
    image: file,
    tom: "divertido",
    emojis: "com_emoji",
    prompt: "Foto tirada na praia",
});
```

## 📱 Interface

### 1. Upload de Imagem

-   Drag & drop ou clique para selecionar
-   Preview da imagem selecionada
-   Suporte a qualquer formato de imagem

### 2. Opções de Personalização

**Tom da Legenda:**

-   Neutro
-   Profissional
-   Divertido
-   Informal
-   Inspirador
-   Criativo
-   Técnico

**Uso de Emojis:**

-   Livre (opcional)
-   Com Emojis (até 2 por legenda)
-   Sem Emojis

### 3. Resultados

-   5 legendas geradas automaticamente
-   Botão de copiar para cada legenda
-   Feedback visual ao copiar
-   Opção de gerar novas legendas

## 🎯 Requisitos do Backend

O frontend espera que o backend esteja rodando em `http://localhost:3000` com o endpoint:

**POST** `/generate`

-   Content-Type: `multipart/form-data`
-   Body: `image` (File), `tom` (string), `emojis` (string), `prompt` (string)
-   Response: `string[]` (array com 5 legendas)

## 🛠️ Desenvolvimento

### Adicionar Novos Componentes

```bash
# Criar novo componente
touch src/components/MeuComponente.tsx
```

### Modificar Estilos

O projeto usa Tailwind CSS. Adicione classes diretamente nos componentes:

```tsx
<div className="bg-purple-500 text-white p-4 rounded-lg">Conteúdo</div>
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🌐 Deploy

O projeto pode ser facilmente deployado em:

-   **Vercel** - `vercel deploy`
-   **Netlify** - Arraste a pasta `dist/`
-   **GitHub Pages** - Configure o workflow

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por **Kauê Alves**

---

**⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!**
