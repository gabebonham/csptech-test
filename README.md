# App de Produtos

Aplicativo mobile de listagem, busca, filtro por categoria e favoritos de produtos, construído com Expo + React Native.

## Instruções para execução

### Pré-requisitos
- Node.js 18+
- npm
- Expo Go instalado no celular (ou emulador Android/iOS configurado)

### Passos
```bash
# instalar dependências
npm install

# iniciar o projeto
npx expo start
```

Após o `expo start`, escaneie o QR code com o app **Expo Go** (Android) ou pela **Câmera** (iOS), ou pressione `a`/`i` no terminal para abrir em emulador Android/simulador iOS.

## Tecnologias utilizadas
 
- **React Native** — base do app
- **Expo** — ferramentas de desenvolvimento, build e execução do projeto
- **TypeScript** — tipagem estática
- **React Navigation** — navegação entre telas (stack para detalhe do produto, tabs para produtos / favoritos)
- **Axios** — cliente HTTP para consumo da API de produtos
- **AsyncStorage** — persistência local (favoritos)
- **lucide-react-native** — ícones (coração de favorito, estrela de avaliação, seta de voltar, etc.)

## Decisões técnicas adotadas

- **Estrutura por feature** (`features/products/...`): componentes, hooks e tipos relacionados a produtos ficam agrupados juntos, facilitando manutenção e localização de código.
- **Filtros combinados no client**: busca por texto e filtro por categoria são aplicados com `useMemo` sobre os dados já carregados, evitando requisições extras a cada tecla digitada.
- **Feedback de erro**:
  - **Tela de erro dedicada com botão de retry**, para falhas no carregamento inicial, quando não há dados para exibir.
- **Componentização de UI reutilizável**: `ProductCard`, `SearchBar` e `CategoriesComponent` são independentes da tela que os usa, recebendo estado e callbacks via props (estado do filtro/busca vive na tela, não nos componentes).

## Limitações conhecidas

- Sem persistência local: favoritos e filtros são perdidos ao fechar o app (não há uso de `AsyncStorage` ou similar).
- Sem testes automatizados (unitários ou E2E).
- Filtro por categoria e busca por texto operam sobre a lista já carregada em memória, não há paginação nem busca server-side — pode não escalar bem para catálogos muito grandes.
- Sem tratamento de estado offline persistente (o app não detecta ausência de conexão previamente, apenas reage ao erro da requisição).

## Performance e boas práticas

- **`useMemo`** na filtragem de produtos, evitando recomputar a lista filtrada em renders que não alteram busca, categoria ou dados.
- **`FlatList`** para listagem e para categorias (ao invés de `ScrollView` com `.map`), garantindo renderização virtualizada e uso de memória controlado em listas potencialmente grandes.
- **Retry controlado em falhas de rede**, evitando que uma falha momentânea interrompa a experiência do usuário sem alternativa de recuperação.
- **Componentes de apresentação simples**, sem lógica de fetch embutida (`ProductCard`, `CategoriesComponent`), favorecendo reuso e testabilidade.
- **Tipagem explícita (`Product`, props de componentes)**, reduzindo erros em tempo de desenvolvimento e facilitando refino futuro do modelo de dados.