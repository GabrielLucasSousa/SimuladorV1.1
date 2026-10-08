    // Estado da simulação
    let simulationCart = [];
    const INSTALLMENT_COUNT = 12;

    // Formatação monetária BRL
    function formatCurrency(val) {
      return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function formatInstallmentValue(val) {
      const [integerPart, decimalPart] = formatCurrency(val)
        .replace(/^R\$\s?/, '')
        .split(',');
      return `<strong class="text-2xl leading-none">${integerPart}</strong><span class="text-sm leading-none">,${decimalPart}</span>`;
    }

    function calculateInstallmentValue(totalAmount) {
      return totalAmount / INSTALLMENT_COUNT;
    }

    function buildInstallmentSummaryMarkup(totalAmount) {
      const installmentValue = calculateInstallmentValue(totalAmount);
      return `
        <span class="flex items-baseline gap-1 font-black leading-none text-emerald-700"><span class="text-[12px]">${INSTALLMENT_COUNT}x</span> ${formatInstallmentValue(installmentValue)}</span>
        <span class="text-[12px] font-black uppercase tracking-[0.08em] leading-none text-emerald-700">Sem juros</span>
      `;
    }

    // Inicialização ao carregar página
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('#quoteModal input').forEach(input => {
        input.value = '';
      });
      populateBrandOptions();
      onBrandChange();
      renderCart();
    });

    function populateBrandOptions() {
      const brandSelect = document.getElementById('brandSelect');
      const selectedBrand = brandSelect.value;
      const brands = [...new Set(FLEXCARE_DATABASE.map(car => car.brand))];

      brandSelect.innerHTML = '';
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Selecione uma marca';
      placeholder.disabled = true;
      placeholder.selected = true;
      brandSelect.appendChild(placeholder);

      brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand.toUpperCase();
        brandSelect.appendChild(option);
      });

      brandSelect.value = brands.includes(selectedBrand) ? selectedBrand : '';
    }

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

function updateStartRevisionOptions(car) {
    const packageSelect = document.getElementById('packageSelect');
    const currentRevision = parseInt(packageSelect.value, 10) || 3;
    const selectedRevision = Math.min(currentRevision, car.revisions.length);

    packageSelect.innerHTML = '';
    for (let revision = 1; revision <= car.revisions.length; revision += 1) {
  const option = document.createElement('option');
  option.value = revision;
  option.textContent = `${revision}ª Revisão`;
  option.selected = revision === selectedRevision;
  packageSelect.appendChild(option);
    }
}

  // Filtra modelos pela marca
  function onBrandChange() {
      const selectedBrand = document.getElementById('brandSelect').value;
      const modelSelect = document.getElementById('modelSelect');
      modelSelect.innerHTML = '';

      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = selectedBrand ? 'Selecione um modelo' : 'Selecione primeiro uma marca';
      placeholder.disabled = true;
      placeholder.selected = true;
      modelSelect.appendChild(placeholder);

      modelSelect.disabled = !selectedBrand;
      const filtered = FLEXCARE_DATABASE.filter(item => item.brand === selectedBrand);
      filtered.forEach((car) => {
        const opt = document.createElement('option');
        opt.value = car.id;
        opt.textContent = car.name.includes(car.year)
          ? car.name
          : `${car.name} (${car.year})`;
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

    if (!car) {
      document.getElementById('packageSelect').disabled = true;
      document.getElementById('revisionQuantitySelect').disabled = true;
      document.getElementById('selectedPackageLabel').textContent =
        'Selecione uma marca e um modelo';
      toggleAddButtonState();
      return;
    }

    document.getElementById('packageSelect').disabled = false;
    document.getElementById('revisionQuantitySelect').disabled = false;
    updateStartRevisionOptions(car);
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
    toggleAddButtonState();
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
      const hasSelectedModel = Boolean(document.getElementById('modelSelect').value);
      const isDisabled = hasItems || !hasSelectedModel;

      addVehicleBtn.disabled = isDisabled;
      addVehicleBtn.setAttribute('aria-disabled', String(isDisabled));
      addVehicleBtn.classList.toggle('opacity-70', isDisabled);
      addVehicleBtn.classList.toggle('cursor-not-allowed', isDisabled);
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
        summaryInstallment.innerHTML = buildInstallmentSummaryMarkup(0);
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
      summaryInstallment.innerHTML = buildInstallmentSummaryMarkup(totalSum);
    }
