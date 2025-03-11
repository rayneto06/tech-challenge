# Mongodb

MongoDB é um banco de dados de documentos projetado para facilitar o desenvolvimento e o dimensionamento de aplicativos.
[Documentação do mongodb](https://www.mongodb.com/pt-br/docs/manual/)

# Porque escolhemos o mongodb para o projeto 
 
* Manter o banco flexivel para lidar com informações como combos, que tem um schema tambem flexivel.
* Reduzir o numero de relações e complexidade, facilitando as queries, por exemplo a capacidade de adicionar um customer a tabela order e em apenas uma query poder exibir o pedido e o cliente que realizou o pedido.
* Documentação ampla e grande comunidade, facilitando em caso de duvidas e resolução de problemas.
* Familiaridade do time com o banco de dados.


# Collections 

# Product 

* Collection responsável pelos produtos presentes no catalogo da lanchonete, produtos são agrupados para criação de combos e pedidos.

| Propriedade  | Tipo     | Descrição                        |
| ---------    | -------- | -------------------------------- |
| name         | String   | Nome do produto.                 |
| category     | String   | Categoria do produto.            |
| description  | String   | Descrição do produto.            |
| price        | Number   | Preço do produto.                |
| isEnabled    | Boolean  | Define se o produto está ativo ou não.   |
| createdAt    | DateTime | Data de criação do produto.      |
| updatedAt    | DateTime | Date da ultima alteração do produto.|

<br/>


# Order 

* Collection responsável pelos pedidos presentes no catalogo da lanchonete, 
  agrupa as informações de produtos em forma de combo e do cliente que realizou o pedido
  para que a cozinha tenha acesso ao pedido, realize o preparo e o cliente receba seu pedido em mãos.


| Propriedade  | Tipo     | Descrição                              |
| ---------    | -------- | ---------------------------------------|
| combo        | Array    | Array de produtos que compoe o pedido. |
| customer     | ObjectId | Id to cliente que realizou o pedido.   |
| status       | String   | Status do pedido.                      |
| createdAt    | DateTime | Data de criação do pedido.             |
| updatedAt    | DateTime | Date da ultima alteração do pedido.    |


| Relacionamentos                        | Descrição                                   | Type |
| -------------------------------------- | ------------------------------------------- | ---- |
| `Order -[:PERTENCE]-> Customer`        | Um pedido pertence a um cliente.            | 1:1  |


<br/>

# Customer 

* Collection responsável pelos clientes que se cadastraram na lanchonete, ligada diretamente a collection Order,
  a tabela contém as informações do cliente, que podem ser utilizadas para realizar login e aplicar cupoms, por exemplo.

| Propriedade  | Tipo     | Descrição                              |
| ---------    | -------- | ---------------------------------------|
| cpf          | Array    | Cpf do cliente.                        |
| name         | String   | Nome do cliente.                       |
| email        | String   | Email do cliente.                      |
| createdAt    | DateTime | Data de criação do pedido.             |
| updatedAt    | DateTime | Date da ultima alteração do pedido.    |


| Relacionamentos                        | Descrição                                   | Type |
| -------------------------------------- | ------------------------------------------- | ---- |
| `Customer -[:POSSUI]-> Order`             | Um cliente possui varios pedidos.           | 1:N  |
