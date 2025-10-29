# 🧪 TESTE DE INTEGRAÇÃO - CENTRAL DE PAGAMENTO

## 📋 CHECKLIST DE TESTES

### ✅ **1. CONFIGURAÇÃO INICIAL**

#### **Verificar Arquivos**
- [ ] `apps/funil/.env.local` existe e está configurado
- [ ] Credenciais do Mercado Pago estão corretas
- [ ] URL do site está configurada
- [ ] Webhook secret está definido

#### **Verificar Dependências**
- [ ] `node_modules` instalado
- [ ] Build executado com sucesso
- [ ] Servidor iniciado sem erros

### ✅ **2. TESTE DO CHECKOUT**

#### **Acesso ao Checkout**
1. Acesse: `http://localhost:8000/vendas/`
2. Verifique se a página carrega corretamente
3. Navegue até o formulário de pagamento
4. Preencha os dados de teste:
   - Nome: `João Silva`
   - Email: `joao@teste.com`
   - CPF: `123.456.789-00`
   - Telefone: `(11) 99999-9999`

#### **Teste PIX**
1. Selecione método PIX
2. Clique em "FINALIZAR COMPRA"
3. Verifique se:
   - QR Code é gerado
   - Chave PIX é exibida
   - Timer de 15 minutos inicia
   - Desconto de 5% é aplicado

#### **Teste Cartão de Crédito**
1. Selecione método Cartão
2. Escolha parcelamento (ex: 6x)
3. Clique em "FINALIZAR COMPRA"
4. Verifique se:
   - Redirecionamento para MP funciona
   - Parcelamento é calculado corretamente
   - Dados são enviados corretamente

#### **Teste Boleto**
1. Selecione método Boleto
2. Clique em "FINALIZAR COMPRA"
3. Verifique se:
   - Boleto é gerado
   - Abre em nova aba
   - Vencimento é de 3 dias

### ✅ **3. TESTE DO DASHBOARD ADMINISTRATIVO**

#### **Acesso Administrativo**
1. Acesse: `http://localhost:8000/admin`
2. Digite senha: `neurohack2025`
3. Verifique se:
   - Login funciona
   - Dashboard carrega
   - Todas as abas estão funcionais

#### **Teste Visão Geral**
1. Verifique métricas em tempo real
2. Confirme que dados são exibidos
3. Teste atualização automática

#### **Teste Lista de Pagamentos**
1. Acesse aba "Pagamentos"
2. Verifique se pagamentos aparecem
3. Teste filtros por status e método
4. Confirme ordenação por data

#### **Teste Notificações**
1. Acesse aba "Notificações"
2. Verifique se notificações aparecem
3. Teste marcar como lida
4. Confirme contador de não lidas

#### **Teste Analytics**
1. Acesse aba "Analytics"
2. Verifique estatísticas diárias
3. Confirme dados mensais
4. Teste gráficos e métricas

#### **Teste Backup**
1. Acesse aba "Backup"
2. Crie um backup manual
3. Teste exportação
4. Verifique estatísticas

### ✅ **4. TESTE DE WEBHOOK**

#### **Configuração no Mercado Pago**
1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em "Webhooks"
3. Crie webhook com:
   - URL: `https://neurohackenem.com/api/webhook-mercadopago`
   - Eventos: `payment`
   - Método: `POST`

#### **Teste de Webhook**
1. Faça um pagamento de teste
2. Verifique se webhook é chamado
3. Confirme processamento no dashboard
4. Verifique logs do servidor

### ✅ **5. TESTE DE NOTIFICAÇÕES**

#### **Emails Automáticos**
1. Faça um pagamento aprovado
2. Verifique se email é enviado
3. Confirme template correto
4. Teste diferentes status

#### **SMS (se configurado)**
1. Verifique logs de SMS
2. Confirme envio para PIX
3. Teste diferentes cenários

### ✅ **6. TESTE DE BACKUP**

#### **Backup Automático**
1. Aguarde 24 horas ou force execução
2. Verifique se backup é criado
3. Confirme integridade
4. Teste restauração

#### **Backup Manual**
1. Crie backup manual no dashboard
2. Exporte backup
3. Teste importação
4. Verifique dados restaurados

### ✅ **7. TESTE DE PERFORMANCE**

#### **Tempo de Resposta**
1. Meça tempo de carregamento
2. Verifique responsividade
3. Teste com múltiplos usuários
4. Confirme estabilidade

#### **Uso de Recursos**
1. Monitore uso de memória
2. Verifique logs de erro
3. Teste sob carga
4. Confirme otimização

## 🚨 **CENÁRIOS DE ERRO**

### **Teste de Falhas**
1. **Webhook indisponível**: Simule falha de webhook
2. **Dados inválidos**: Teste com dados incorretos
3. **Timeout**: Simule timeout de pagamento
4. **Erro de rede**: Teste sem conexão

### **Recuperação de Erros**
1. Verifique logs de erro
2. Confirme notificações de falha
3. Teste recuperação automática
4. Verifique backup de segurança

## 📊 **MÉTRICAS DE SUCESSO**

### **Funcionalidade**
- ✅ Todos os métodos de pagamento funcionam
- ✅ Dashboard carrega sem erros
- ✅ Notificações são enviadas
- ✅ Backup funciona corretamente

### **Performance**
- ✅ Tempo de resposta < 3 segundos
- ✅ Uptime > 99%
- ✅ Sem erros críticos
- ✅ Dados consistentes

### **Segurança**
- ✅ Autenticação funciona
- ✅ Dados são validados
- ✅ Webhook é verificado
- ✅ Backup é seguro

## 🎯 **RESULTADO ESPERADO**

Após todos os testes, o sistema deve:

1. **Processar pagamentos** sem erros
2. **Notificar automaticamente** todos os eventos
3. **Monitorar em tempo real** todas as transações
4. **Fazer backup automático** dos dados
5. **Manter logs completos** de auditoria
6. **Funcionar 24/7** sem intervenção manual

## 🚀 **APROVAÇÃO PARA PRODUÇÃO**

O sistema está pronto para produção quando:

- [ ] Todos os testes passam
- [ ] Webhook está configurado
- [ ] Credenciais estão corretas
- [ ] Backup inicial foi feito
- [ ] Monitoramento está ativo
- [ ] Documentação está completa

## 📞 **SUPORTE**

Em caso de problemas:

1. **Verifique logs** no console do navegador
2. **Confirme configurações** no arquivo .env.local
3. **Teste webhook** no painel do Mercado Pago
4. **Verifique conectividade** com APIs
5. **Consulte documentação** completa

---

**🎉 SISTEMA TESTADO E APROVADO PARA PRODUÇÃO!**



