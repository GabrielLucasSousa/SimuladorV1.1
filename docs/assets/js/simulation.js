    // Estado da simulação
    let simulationCart = [];
    const INSTALLMENT_COUNT = 12;

    // Formatação monetária BRL
    function formatCurrency(val) {
      return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Inicialização ao carregar página
    window.addEventListener('DOMContentLoaded', () => {
  onBrandChange();
  renderCart();
});

function calculateSelectedRevisions(car) {
  const startRevision = parseInt(
    document.getElementById('packageSelect').value,
    10
  );
  const quantity = parseInt(
    document.getElementById('revisionQuantitySelect').value,
    10
  );

  return car.revisions
    .slice(startRevision - 1, startRevision - 1 + quantity)
    .reduce((total, revisionPrice) => total + revisionPrice, 0);
}

function updateRevisionQuantityOptions(car) {
  const startRevision = parseInt(
    document.getElementById('packageSelect').value,
    10
  );
  const quantitySelect = document.getElementById('revisionQuantitySelect');
  const maxQuantity = car.revisions.length - startRevision + 1;
  const minimumQuantity = Math.min(2, maxQuantity);
  const currentQuantity = Math.min(
    Math.max(parseInt(quantitySelect.value, 10) || minimumQuantity, minimumQuantity),
    maxQuantity
  );

  quantitySelect.innerHTML = '';
  for (let quantity = minimumQuantity; quantity <= maxQuantity; quantity += 1) {
    const option = document.createElement('option');
    option.value = quantity;
    option.textContent = `${quantity} ${quantity === 1 ? 'revisão' : 'revisões'}`;
    option.selected = quantity === currentQuantity;
    quantitySelect.appendChild(option);
  }
}

    // Filtra modelos pela marca
    function onBrandChange() {
      const selectedBrand = document.getElementById('brandSelect').value;
      const modelSelect = document.getElementById('modelSelect');
      modelSelect.innerHTML = '';

      const filtered = FLEXCARE_DATABASE.filter(item => item.brand === selectedBrand);
      filtered.forEach((car) => {
        const opt = document.createElement('option');
        opt.value = car.id;
        opt.textContent = `${car.name} (${car.year})`;
        modelSelect.appendChild(opt);
      });

      onSelectionChange();
    }

    function onSelectionChange() {

    const modelId =
        document.getElementById('modelSelect').value;

    const car =
        FLEXCARE_DATABASE.find(
            item => item.id === modelId
        );

    if (!car) return;

    updateRevisionQuantityOptions(car);

    const startRevision = parseInt(
      document.getElementById('packageSelect').value,
      10
    );
    const quantity = parseInt(
      document.getElementById('revisionQuantitySelect').value,
      10
    );
    const finalRevision = startRevision + quantity - 1;
    const packageLabel = quantity === 1
      ? `${startRevision}ª Revisão`
      : `${startRevision}ª à ${finalRevision}ª Revisão (${quantity} revisões)`;

    document.getElementById('selectedPackageLabel').textContent =
      packageLabel;
}

function addVehicleToCart() {

    if (simulationCart.length > 0) {
      showToast('Você já adicionou um pacote. Remova antes de incluir outro.', 'warn');
      return;
    }

    const modelId =
        document.getElementById('modelSelect').value;

    const startRevision =
        parseInt(
        document.getElementById('packageSelect').value,
        10
      );
    const quantity =
      parseInt(
        document.getElementById('revisionQuantitySelect').value,
        10
        );

    const car =
        FLEXCARE_DATABASE.find(
            item => item.id === modelId
        );

    if (!car) {
        showToast("Selecione um modelo válido antes de adicionar.", "warn");
        return;
    }

    const price =
        calculateSelectedRevisions(car);
    const packageName = quantity === 1
      ? `${startRevision}ª Revisão`
      : `${startRevision}ª à ${startRevision + quantity - 1}ª Revisão (${quantity} revisões)`;

    const cartItem = {

        id:
            'item_' +
            Date.now() +
            Math.random().toString(36).substr(2, 4),

        brand: car.brand,

        modelName: car.name,

        year: car.year,

        packageName:
          packageName,

        revision:
          startRevision,

        quantity: quantity,

        price: price
    };

    simulationCart.push(cartItem);

    renderCart();

    showToast(
        `${car.name} adicionado com sucesso!`
    );
}

    // Remove item individual
    function removeCartItem(itemId) {
      simulationCart = simulationCart.filter(item => item.id !== itemId);
      renderCart();
      showToast('Veículo removido da simulação', 'info');
    }

    // Limpa todos os itens
    function clearAllItems() {
      if (simulationCart.length === 0) return;
      if (confirm("Deseja realmente limpar toda a lista simulada?")) {
        simulationCart = [];
        renderCart();
        showToast('Lista de simulação esvaziada');
      }
    }

    // Renderiza a lista e calcula totais
    function toggleAddButtonState() {
      const addVehicleBtn = document.getElementById('addVehicleBtn');
      const hasItems = simulationCart.length > 0;

      addVehicleBtn.disabled = hasItems;
      addVehicleBtn.setAttribute('aria-disabled', String(hasItems));
      addVehicleBtn.classList.toggle('opacity-70', hasItems);
      addVehicleBtn.classList.toggle('cursor-not-allowed', hasItems);
    }

    function renderCart() {
      const listContainer = document.getElementById('cartList');
      const emptyState = document.getElementById('emptyState');
      const clearBtnContainer = document.getElementById('clearCartContainer');
      const itemsBadge = document.getElementById('itemsBadge');
      const grandTotalDisplay = document.getElementById('grandTotalDisplay');
      const summaryCountText = document.getElementById('summaryCountText');
      const summaryInstallment = document.getElementById('summaryInstallment');

      toggleAddButtonState();
      listContainer.innerHTML = '';
      const totalCount = simulationCart.length;
      itemsBadge.textContent = `${totalCount} ${totalCount === 1 ? 'Pacote' : 'Pacotes'}`;
      summaryCountText.textContent = `(${totalCount} ${totalCount === 1 ? 'veículo' : 'veículos'})`;

      if (totalCount === 0) {
        emptyState.classList.remove('hidden');
        clearBtnContainer.classList.add('hidden');
        grandTotalDisplay.textContent = formatCurrency(0);
        summaryInstallment.innerHTML = `
          <span class="text-[13px] font-black leading-none text-emerald-700">${INSTALLMENT_COUNT}x de ${formatCurrency(0)}</span>
          <span class="text-[12px] font-black uppercase tracking-[0.08em] leading-none text-emerald-700">Sem juros</span>
        `;
        return;
      }

      emptyState.classList.add('hidden');
      clearBtnContainer.classList.remove('hidden');

      let totalSum = 0;

      simulationCart.forEach((item, index) => {
        totalSum += item.price;
        const card = document.createElement('div');
        card.className = "flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-brand-600/40 transition shadow-sm group";
        
        card.innerHTML = `
          <div class="flex items-start gap-2.5 min-w-0 pr-2">
            <div class="w-8 h-8 rounded-lg bg-red-50 text-red-600 border border-red-200/60 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              F
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <h4 class="text-xs font-bold text-slate-900 truncate">${item.modelName}</h4>
                <span class="text-[10px] text-slate-500 font-normal">(${item.year})</span>
              </div>
              <p class="text-[11px] text-brand-800 font-semibold mt-0.5 flex items-center gap-1">
                <i class="fa-solid fa-wrench text-[10px] text-slate-400"></i> ${item.packageName}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3 flex-shrink-0">
            <button onclick="removeCartItem('${item.id}')" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition" title="Remover item">
              <i class="fa-regular fa-trash-can text-xs"></i>
            </button>
          </div>
        `;
        listContainer.appendChild(card);
      });

      grandTotalDisplay.textContent = formatCurrency(totalSum);
      summaryInstallment.innerHTML = `
        <span class="text-[13px] font-black leading-none text-emerald-700">${INSTALLMENT_COUNT}x de ${formatCurrency(totalSum / INSTALLMENT_COUNT)}</span>
        <span class="text-[12px] font-black uppercase tracking-[0.08em] leading-none text-emerald-700">Sem juros</span>
      `;
    }
