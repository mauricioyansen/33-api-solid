# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um user logado
- [x] Deve ser possível obter o número de check-ins realizados pelo user logado
- [x] Deve ser possível obter seu histórico de check-ins
- [ ] Deve ser possível o user buscar academias próximas
- [ ] Deve ser possível o user buscar academias pelo nome
- [x] Deve ser possível o user realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um user
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [x] O user não deve poder se cadastrar com um e-mail duplicado
- [x] O user não pode fazer 2 check-ins no mesmo dia
- [x] O user não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado pelo admin
- [ ] A academia só pode ser cadastrada pelo admin

## RNFs (Requisitos não funcionais)

- [x] A senha do user precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O user deve ser identificado por um JWT
