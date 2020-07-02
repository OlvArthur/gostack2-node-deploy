# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha passando o email;
- O usuário deve poder receber um e-mail com instruções de recuperação de senha;
- O usário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testat envios de email em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de email deve acontecer em segundo plano ( background jobs ) ;

**RN**

- O link enviado por email para resetar sua senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário precisa confirmar sua senha;
- Para atualizar sua senha, o usuário deve informar a senha antiga;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve pode visualizar as notificações não lidas;
- As notificações devem mostrar possuir status de lidas ou não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- O prestador deve ser capaz de controlar o status das notificações ( lidas ou não-lidas);

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis de um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem deve ser guardadas em cache;

**RN**

- Cada agendamento deve durar uma hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 17h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
