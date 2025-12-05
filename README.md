# 🐾 Animalec — Miniprojeto Full Stack  
**MEIW – UTAD / Programação Web Avançada 2025**  
**Ano letivo:** 2025/2026  
**Autor:** Weber Marcelo Guirra de Souza  

---

## 📌 Enquadramento da Atividade

Este repositório corresponde ao **Miniprojeto Animalec**, desenvolvido no âmbito da UC **Programação Web Avançada 2025**, integrando as atividades:

- **Tarefa 3.1b – Prototipagem de Interfaces Web**  
  - Wireframes, mockups e protótipos HTML5 para a extensão da área de administração do Animalec.

- **Tarefa 3.2 – Miniprojeto: Desenvolvimento do front-end**  
  - Implementação de uma SPA em Vue.js, baseada nos protótipos da Tarefa 3.1b.

- **Tarefa 3.3 – Miniprojeto: Desenvolvimento do back-end**  
  - Implementação da API REST (Node.js/Express + MongoDB) que suporta as funcionalidades do front-end.

O projeto é baseado no caso de estudo **Animalec** do livro:

> QUEIRÓS, Ricardo; PORTELA, Filipe. *Desenvolvimento Avançado para a Web* – Projeto Animalec.

---

## 🎯 Objetivo do Projeto

O objetivo principal é **evoluir o protótipo estático** (HTML5/CSS) da Tarefa 3.1b para uma **aplicação web full stack**, com:

- **Front-end dinâmico** em Vue.js (SPA);  
- **Back-end REST** em Node.js/Express;  
- **Persistência de dados** em MongoDB;  
- **Autenticação e área de administração** para gestão das entidades do Animalec.

Além das entidades já presentes no projeto do livro, o miniprojeto estende a área de administração com:

- **Patrocinadores (Sponsors)**  
- **Especialistas (Experts)**  

Seguindo o mesmo padrão visual e de navegação da administração original.

---

## 🧩 Relação com a Tarefa 3.1b (Prototipagem)

A Tarefa 3.1b produziu:

- **Wireframes**  
- **Mockups**  
- **Protótipos HTML5 semânticos**

para as páginas de:

- Listagem, criação e edição de **Patrocinadores**;  
- Listagem, criação e edição de **Especialistas**.

Na Tarefa 3.2 e 3.3, estes artefatos foram usados como **guia direto** para:

- Definir a navegação e o layout do back-office em Vue.js;  
- Implementar os componentes de lista, detalhe e formulários;  
- Mapear as rotas do front-end para os endpoints REST do back-end;  
- Garantir consistência entre **protótipo** e **aplicação final**.

---

## 🧱 Arquitetura Geral do Repositório

```txt
Animalec/
├── Back-end_Animalec-master/     # API REST em Node.js / Express / MongoDB
├── Front-end_Animalec-master/    # SPA em Vue.js (área pública + administração)
└── database/
    └── test/                     # Dump MongoDB (mongodump) da base 'test'
        ├── animals.bson.gz
        ├── animals.metadata.json.gz
        ├── especialistas.bson.gz
        ├── especialistas.metadata.json.gz
        ├── patrocionadores.bson.gz
        ├── ...
        └── users.bson.gz
