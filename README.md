# App

GymPass style app.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar
- [X] Deve ser possível se autenticar
- [X] Deve ser possível obter o perfil de um user logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo user logado
- [ ] Deve ser possível obter seu histórico de check-ins
- [ ] Deve ser possível o user buscar academias próximas
- [ ] Deve ser possível o user buscar academias pelo nome
- [ ] Deve ser possível o user realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um user

## RNs (Regras de negócio)

- [X] O user não deve poder se cadastrar com um e-mail duplicado
- [ ] O user não pode fazer 2 check-ins no mesmo dia
- [ ] O user não pode fazer 2 check-ins se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado pelo admin
- [ ] A academia só pode ser cadastrada pelo admin

## RNFs (Requisitos não funcionais)

- [X] A senha do user precisa estar criptografada
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O user deve ser identificado por um JWT
