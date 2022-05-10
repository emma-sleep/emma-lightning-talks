# GraphDB Introduction

## Running using Neo4j docker

You can spin up a Neo4j server using the following docker command:

```shell
docker run -v $HOME/neo4j/data:/data -p7474:7474 -p7687:7687 --env NEO4J_AUTH=neo4j/test neo4j
```

### Explanation

- The persistent data is in a shared volume between the container and the host. The path in the host is the `HOME` directory `/neo4j/data` and the path in the container will be `/data`.
- The port `7474` of the container is mapped to the port `7474` of the host to be able to see the Neo4j interface in the browser.
- The port `7687` of the container is mapped to the port `7687` of the host so that it can connect to the **DB** using the **Bolt Protocol**.
- The authentication on the container would be `neo4j` as username and `test` as password. To set that we set the environment variable `NEO4J_AUTH` in the container to `neo4j/test`.
- We run the `neo4j` image which fetches and runs the **latest** version.

## To access the GUI open the port `7474` on the browser

# Basic commands

## Creating a new node

```Bash
CREATE (n:Person {name: 'Alice', title: 'Product Manager'})
```

## Creating another node

```Bash
CREATE (:Person {name: 'Bob', title: 'Developer'})
```

## Creating a relation between these two created nodes and showing returning the graph

```Bash
MATCH
  (a:Person),
  (b:Person)
WHERE a.name = 'Alice' AND b.name = 'Bob'
CREATE (a)-[r:RELTYPE]->(b)
RETURN a,r,b
```

## Deleting all the nodes

```Bash
MATCH (a), ()-[r]-() DELETE a,r
```

## Retrieving all the nodes and relations between them

```Bash
MATCH (a), ()-[r]-() RETURN a,r
```

# If you are just starting Neo4j

Use the documents on their [website](https://neo4j.com/docs/getting-started/current/) or go through their tutorial by running 

```Shell
:play movie graph
```

Or by running the classing northwind database

```Shell
:play northwind-graph
```
