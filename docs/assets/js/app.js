
    // Modal de cotação
    function requestQuoteModal() {
      if (simulationCart.length === 0) {
        showToast("Adicione pelo menos um Pacote para salvar o lead!", "warn");
        return;
      }
      const totalSum = simulationCart.reduce((acc, curr) => acc + curr.price, 0);
      document.getElementById('modalTotalVehicles').textContent = `${simulationCart.length} pacote(s)`;
      document.getElementById('modalTotalCost').textContent = formatCurrency(totalSum);
      document.getElementById('modalInstallment').textContent = `${INSTALLMENT_COUNT}x de ${formatCurrency(totalSum / INSTALLMENT_COUNT)}`;
      document.getElementById('quoteModal').classList.remove('hidden');
    }

    function closeQuoteModal() {
      document.getElementById('quoteModal').classList.add('hidden');
    }

    async function confirmQuote() {
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const email = document.getElementById('clientEmail').value.trim();

      if (!name || !phone) {
        alert("Por favor, preencha seu Nome e Telefone para prosseguir.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        alert("Por favor, informe um e-mail válido ou deixe o campo em branco.");
        return;
      }

      const totalSum = simulationCart.reduce((acc, curr) => acc + curr.price, 0);
      const quote = {
        id: `quote_${Date.now()}`,
        createdAt: new Date().toISOString(),
        client: { name, phone, email },
        items: simulationCart.map(item => ({ ...item })),
        total: totalSum,
        installments: INSTALLMENT_COUNT,
        installmentValue: totalSum / INSTALLMENT_COUNT
      };

      const savedQuotes = JSON.parse(localStorage.getItem('flexcare_quotes') || '[]');
      savedQuotes.push(quote);
      localStorage.setItem('flexcare_quotes', JSON.stringify(savedQuotes));

      if (window.saveQuoteToSupabase) {
        const result = await window.saveQuoteToSupabase(quote);
        if (!result.ok) {
          console.warn('Falha ao salvar no Supabase, mantendo fallback local:', result.reason);
        }
      }

      closeQuoteModal();
      showToast("Cotação salva com sucesso! Nossos especialistas entrarão em contato.", "success");
    }

    // Envio por E-mail com texto formatado
    function sendSimulationEmail() {
      if (simulationCart.length === 0) {
        showToast("Adicione ao menos um veículo antes de enviar!", "warn");
        return;
      }

      const totalSum = simulationCart.reduce((acc, curr) => acc + curr.price, 0);
      const subject = "Simulação de Revisões Flexcare";

      let body = `SIMULAÇÃO DE REVISÕES FLEXCARE\n`;
      body += `Data: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
      body += `Veículos Simulados (${simulationCart.length}):\n`;

      simulationCart.forEach((item, i) => {
        body += `${i + 1}. ${item.brand} ${item.modelName} (${item.year})\n`;
        body += `   Pacote: ${item.packageName}\n`;
        body += `   Valor: ${formatCurrency(item.price)}\n\n`;
      });

      body += `------------------------------------\n`;
      body += `VALOR TOTAL SIMULADO: ${formatCurrency(totalSum)}\n`;
      body += `(Opção de parcelamento em até ${INSTALLMENT_COUNT}x sem juros: ${formatCurrency(totalSum / INSTALLMENT_COUNT)} por parcela)\n\n`;
      body += `Gostaria de fechar essa contratação e agendar o pacote!`;

      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }

    // Info modal rápida
    function openInfoModal() {
      alert("Pacotes de Manutenção FlexCare.\n\n Os Pacotes garantem as manutenções futuras com preços fixos sem reajustes. Utilizando peças genuínas e serviço especializado para preservação da garantia de fábrica.");
    }

    // Toast feedback
    function showToast(msg, type = "success") {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toastMessage');
      const toastIcon = document.getElementById('toastIcon');

      toastMsg.textContent = msg;
      if (type === "warn") {
        toastIcon.className = "fa-solid fa-triangle-exclamation text-amber-400";
      } else if (type === "info") {
        toastIcon.className = "fa-solid fa-info-circle text-blue-400";
      } else {
        toastIcon.className = "fa-solid fa-circle-check text-emerald-400";
      }

      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    }
