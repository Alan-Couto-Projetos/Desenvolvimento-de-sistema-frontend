# Para inicia o projeto

Instalar o Visual Studio Code

### `Instalação`
Acesse o site oficial do Visual Studio Code: https://code.visualstudio.com/.
Clique no botão "Download" e selecione a versão adequada para o seu sistema operacional (Windows, macOS, ou Linux).

Windows:
Execute o arquivo baixado (normalmente chamado de VSCodeSetup.exe).
Siga as instruções do instalador, aceitando os termos de licença e selecionando as configurações desejadas.

macOS:
Abra o arquivo baixado (.dmg).
Arraste o ícone do Visual Studio Code para a pasta Aplicativos.

Linux:
Dependendo da distribuição, você pode instalar o VS Code usando pacotes .deb ou .rpm, ou via gerenciadores de pacotes como snap ou apt.
### `Abrir o VS Code`

Após a instalação, abra o VS Code. Você verá a tela de boas-vindas.

### `Instalar o Node.js`

Baixar o Node.js:

Acesse o site oficial do Node.js: https://nodejs.org/.
Baixe a versão recomendada.

### `Instalar`

Windows:
Execute o arquivo baixado (.msi).
Siga as instruções do instalador, aceitando os termos de licença e selecionando as configurações padrão.

macOS:
Execute o arquivo baixado (.pkg).
Siga as instruções do instalador.

Linux:
Você pode instalar o Node.js via gerenciadores de pacotes como apt, yum, ou snap. Consulte a documentação do Node.js para comandos específicos para a sua distribuição.

### `Verificar a Instalação`

Windows:
Abra o terminal (ou prompt de comando no Windows) e execute os comandos abaixo para verificar se o Node.js e o npm foram instalados corretamente.

Você pode abrir o Prompt de Comando ou PowerShell de várias maneiras:

Prompt de Comando:
Pressione Win + R, digite cmd e pressione Enter.
Ou procure por "Prompt de Comando" no menu Iniciar e clique no aplicativo.

PowerShell:
Pressione Win + X e selecione Windows PowerShell ou Windows PowerShell (Admin).
Ou procure por "PowerShell" no menu Iniciar e clique no aplicativo.

No Terminal, digite o seguinte comando para verificar a versão do Node.js:
sh

node -v

Se o Node.js estiver instalado corretamente, você verá a versão instalada, por exemplo:
v16.14.0

No Terminal, digite o seguinte comando para verificar a versão do Node.js:
sh

npm -v

Se o npm estiver instalado corretamente, você verá a versão instalada, por exemplo:
8.3.1

macOS:

Você pode abrir o Terminal no macOS de várias maneiras:
Use o Spotlight Search (Cmd + Space) e digite Terminal, depois pressione Enter.
Ou navegue até Aplicativos > Utilitários > Terminal.

No Terminal, digite o seguinte comando para verificar a versão do Node.js:
sh

node -v

Se o Node.js estiver instalado corretamente, você verá a versão instalada, por exemplo:
v16.14.0

Ainda no Terminal, digite o seguinte comando para verificar a versão do npm:
sh

npm -v

Se o npm estiver instalado corretamente, você verá a versão instalada, por exemplo:
8.3.1

Linux:

Dependendo da sua distribuição Linux, você pode abrir o Terminal de várias maneiras:
No Ubuntu, você pode usar o atalho Ctrl + Alt + T.
Ou procure por "Terminal" no menu de aplicativos.

No Terminal, digite o seguinte comando para verificar a versão do Node.js:
sh

node -v

Se o Node.js estiver instalado corretamente, você verá a versão instalada, por exemplo:
v16.14.0

Ainda no Terminal, digite o seguinte comando para verificar a versão do npm:
sh

npm -v

Se o npm estiver instalado corretamente, você verá a versão instalada, por exemplo:
8.3.1

### `Baixar o Projeto do GitHub`

Navegue até o repositório do projeto no GitHub que você deseja baixar.
Baixar o Projeto:

No repositório do GitHub, clique no botão "Code".
Selecione "Download ZIP" para baixar o projeto como um arquivo ZIP.
Extraia o conteúdo do arquivo ZIP para uma pasta de sua escolha no seu sistema.

### `Abrir o VSCode`

Abra o VSCode.

Abrir a Pasta do Projeto:

No VS Code, clique em Arquivo > Abrir Pasta (ou Arquivo > Abrir no macOS).
Navegue até a pasta onde você extraiu o projeto baixado do GitHub e selecione-a.
Clique em "Selecionar Pasta" (ou "Abrir" no macOS).

Abra o terminal:

Na barra de menu superior, clique em Terminal > Novo Terminal.

Digite os comandos abaixo no terminal:

primeiro garanta a instalação de todas as bibliotecas node.js:

### `npm i`

após isso digite o seguinte comando e aperte enter para realizar a iniciação da aplicação web, o teste dos componentes ou iniciar a aplicação e realizar o teste ao mesmo tempo, todos os comandos estão na respectivas ordem, escolha uma forma das forma que deseja executar e digite no terminal:

Inicia apenas a aplicação web.
### `npm start`

Inicia apenas o teste.
### `npm test`

Para executar a aplicação web e o teste em conjunto.
### `npm run dev:test`

Abra o link local fornecido em um navegador de sua preferência.
Sendo o link padrão: [http://localhost:3000]

clique em Adicionar carros para acrescentar carros novos, mas o limite de ano máximo do modelo foi definido para o ano atual, e o limite mínimo foi definido para 1886 que é o ano da criação do primeiro carro, e todos os campos devem ser preenchidos para adicionar um carro novo.

Em carros você tem acesso a toda a lista de carros que foram adicionados e pode excluir ou atualizar esses carros. Ao clicar em atualizar o usuário é redirecionado para a página adicionar carros e só poderá adicionar um carro novo após clicar em atualizar.

Caso queira acessar a lista de carros armazenados na API acesse o seguinte link:
[http://localhost:5000/cars]

# Componentes

### `Home`

É a apresentação da página para o usuário com uma breve descrição de boas vindas com a definição do que é essa página.

Não realiza conexão com a API.

### `CarDetail`

local onde será armazenado e exibido todos os carros adicionados pelo o usuário durante o uso da página, a exibição é realizada pela lista de carros obtidos da api. Permite a exclusão ou atualização de cada item de forma individual,  também possibilita a busca por carros específicos mediante a utilização da filtragem por modelo, marca ou ano.

Já a conexão com a API é realizada por meio da biblioteca axios que realiza requisições HTTP. Dentro de useEffect e feita uma requisição GET para buscar a lista de carros, e em caso de erro o seguinte console de erro é exibido "console.error('Houve um erro ao buscar os detalhes dos carros!', error);".

Quando é abordado a exclusão de itens o processo é realizado por "handleDelete" que garante a conexão com a API, sendo que "axios.delete(`http://localhost:5000/cars/${id}`)" solicita a exclusão do item com base no ID, e quando a exclusão é realizada com sucesso o carro é removido com o uso de "setCars(cars.filter(car => car.id !== id));", caso contrário é exibido um erro "console.error('Houve um erro ao remover o carro!', error);".

O botão de atualizar redireciona o usuário para o componente CarForm, ou seja, a conexão com a API para atualização do item será feita no componente de CarForm.

## `CarForm`

É o formulário onde é realizado a adição ou atualização de carros, sendo composto por nome, marca e ano, e dependendo da URL é utilizado para adicionar um carro novo ou atualizar um existente, caso haja um ID na URL significa que será atualizado um carro existente, assim os dados do carro correspondente são carregados nos respectivos campos de preenchimento.

Já a conexão com a API é realizada por meio da biblioteca axios que realiza requisições HTTP. 

Em casos que for usado para atualizar os dados de um carro buscará os dados por meio do ID na URL por meio da definição em useEffect, fazendo a conexão com a API em "axios.get(`http://localhost:5000/cars?id=${id}`)".

Para salvar um carro novo na API é utilizado "axios.post('http://localhost:5000/cars', car)" junto com a verificação de preenchimento dos campos, enquanto o processo para atualizar o carro na API utiliza "axios.put(`http://localhost:5000/cars?${id}`, car)", e também realiza a verificação de preenchimento dos campos.

### `About`

Consiste na página em que é apresentado os detalhes do que se trata o site e informações sobre a aplicação.

Não realiza conexão com a API.

### `NavBar`

NavBar é a configuração da barra de navegação, e cria a navegação entre os componentes com o uso de react-router-dom, sendo composta pelos seguintes itens página inicial, adicionar carro e sobre.

Não realiza conexão com a API.

### `App`

É responsável por toda a exibição da aplicação web com o uso de React Router para gerenciar a navegação entre as páginas e o React.lazy para carregamento dinâmico dos componentes, e sendo definido NavBar para realizar a exibição da barra de navegação, assim pode ser acessado todos os demais componentes.

Não realiza conexão com a API.