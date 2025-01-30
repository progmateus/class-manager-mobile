const errors = [
  {
    message: "ERR_INVALID_CREDENTIALS",
    description: "E-mail ou senha inválidos"
  },
  {
    message: "ERR_USER_INACTIVE",
    description: "Usuário inativo"
  },
  {
    message: "ERR_VALIDATION",
    description: "Dados inválidos"
  },
  {
    message: "ERR_USER_NOT_FOUND",
    description: "Usuário não encontrado"
  },
  {
    message: "ERR_TENANT_INACTIVE",
    description: "A empresa está inativa"
  },
  {
    message: "ERR_CLASS_DAY_NOT_FOUND",
    description: "Aula não encontrada"
  },
  {
    message: "ERR_CLASS_NOT_PENDING",
    description: "A aula não está pendente"
  },
  {
    message: "ERR_ADMIN_ROLE_NOT_FOUND",
    description: "Apenas administradores podem acessar este recurso"
  },
  {
    message: "ERR_STUDENT_ROLE_NOT_FOUND",
    description: "Apenas alunos podem acessar este recurso"
  },
  {
    message: "ERR_SUBSCRIPTION_NOT_FOUND",
    description: "Assinatura não encontrada"
  },
  {
    message: "ERR_SUBSCRIPTION_NOT_ACTIVE",
    description: "Assinatura não inativa"
  },
  {
    message: "ERR_NOT_CLASS_STUDENT",
    description: "O aluno não faz parte da turma"
  },
  {
    message: "ERR_TENANT_PLAN_NOT_FOUND",
    description: "Plano não encontrado"
  },
  {
    message: "ERR_WEEK_TIMES_EXCEEDED",
    description: "Limite de aulas semanais excedido"
  },
  {
    message: "ERR_BOOKING_ALREADY_EXISTS",
    description: "Esta check-in já foi feito"
  },
  {
    message: "ERR_USER_ROLE_NOT_FOUND",
    description: "Acesso negado"
  },
  {
    message: "ERR_BOOKING_NOT_FOUND",
    description: "Agendamento não encontrado"
  },
  {
    message: "ERR_CLASS_DAY_ALREADY_CONCLUDED",
    description: "Esta aula já foi concluida"
  },
  {
    message: "ERR_CLASS_NOT_FOUND",
    description: "Turma não encontrada"
  },
  {
    message: "ERR_CLASS_ALREADY_EXISTS",
    description: "Já existe uma turma com este nome"
  },
  {
    message: "ERR_STUDENT_NOT_FOUND",
    description: "Aluno não encontrado"
  },
  {
    message: "ERR_TACHER_NOT_FOUND",
    description: "Professor não encontrado"
  },
  {
    message: "STUDENT_ALREADY_ADDED",
    description: "Este aluno já faz parte da turma"
  },
  {
    message: "TEACHER_ALREADY_ADDED",
    description: "Este professor já faz parte da turma"
  },
  {
    message: "ERR_ROLE_ALREADY_EXISTS",
    description: "Este cargo já existe"
  },
  {
    message: "ERR_ROLE_NOT_FOUND",
    description: "Cargo não encontrado"
  },
  {
    message: "ERR_USER_ROLE_ALREADY_EXISTS",
    description: "O usuário já possui este cargo"
  },
  {
    message: "ERR_USER_ROLE_NOT_FOUND",
    description: "O usuário não possui este cargo para poder ser removido"
  },
  {
    message: "ACTIVE_SUBSCRIPTION_ALREADY_EXISTS",
    description: "Já existe uma assinatura ativa"
  },
  {
    message: "ERR_SUBSCRIPTION_INACTIVE",
    description: "Assinatura inativa"
  },
  {
    message: "ERR_PERMISSION_DENIED",
    description: "Permissão negada"
  },
  {
    message: "ERR_PLAN_ALREADY_EXISTS",
    description: "Já existe um plano com este nome"
  },
  {
    message: "ERR_TENANT_NOT_FOUND",
    description: "Empresa não encontrada"
  },
  {
    message: "ERR_TIME_TABLE_NOT_FOUND",
    description: "Tabela de horários não encontrada"
  },
  {
    message: "ERR_CHOOSE_ANOTHER_TIME_TABLE",
    description: "Selecione uma tabela de horários diferente"
  },
  {
    message: "ERR_USERNAME_ALREADY_EXISTS",
    description: "Este nome de usuário já está sendo utilizado"
  },
  {
    message: "ERR_CLASS_DAY_TIME_EXPIRED",
    description: "A data desta aula já passou"
  },
  {
    message: "ERR_CHOOSE_ANOTHER_ADDRESS",
    description: "Selecione um endereço diferente"
  },
  {
    message: "ERR_INVOICE_NOT_FOUND",
    description: "Cobrança não encontrada"
  },
  {
    message: "ERR_CANNOT_UPDATE_TENANT_INVOICE",
    description: "Não é permitido atualizar cobranças da empresa"
  },
  {
    message: "ERR_INVOICE_ALREADY_BEEN_PAID",
    description: "Esta cobrança já foi paga"
  },
  {
    message: "ERR_INVALID_STATUS",
    description: "A situação da assinatura não pode ser alterada"
  },
  {
    message: "ERR_ONLY_UPDATE_THE_LATEST_SUBSCRIPTION",
    description: "Só é possivel alterar a assinatura atual do usuário"
  },
  {
    message: "UNPAID_SUBSCRIPTION_ALREADY_EXISTS",
    description: "Existem cobranças pendentes"
  }
]
export { errors }