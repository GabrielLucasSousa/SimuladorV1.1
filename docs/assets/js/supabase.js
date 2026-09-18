(function () {
  const url = window.SUPABASE_URL || localStorage.getItem('SUPABASE_URL') || '';
  const anonKey = window.SUPABASE_ANON_KEY || localStorage.getItem('SUPABASE_ANON_KEY') || '';

  window.flexcareSupabase = null;
  window.flexcareSupabaseReady = false;

  if (!window.supabase) {
    console.warn('Supabase SDK não carregado. Verifique se o script do cliente está incluído antes de supabase.js');
    return;
  }

  if (!url || !anonKey) {
    console.warn('Supabase não configurado. Defina window.SUPABASE_URL e window.SUPABASE_ANON_KEY ou salve os valores em localStorage.');
    return;
  }

  window.flexcareSupabase = window.supabase.createClient(url, anonKey);
  window.flexcareSupabaseReady = true;

  console.info('Supabase conectado com sucesso.');
})();

function generateUuid() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const random = Math.random() * 16 | 0;
    const value = char === 'x' ? random : (random & 0x3 | 0x8);
    return value.toString(16);
  });
}

window.saveQuoteToSupabase = async function saveQuoteToSupabase(quote) {
  if (!window.flexcareSupabaseReady || !window.flexcareSupabase) {
    return { ok: false, reason: 'supabase_not_configured' };
  }

  const payload = {
    id: generateUuid(),
    name: quote.client.name,
    phone: quote.client.phone,
    email: quote.client.email || null,
    cpfcnpj: quote.client.cpf || null,
    css: quote.dealership || null,
    vehicles: quote.items,
    total: Number(quote.total || 0),
    created_at: quote.createdAt || new Date().toISOString()
  };

  const { error } = await window.flexcareSupabase
    .from('quote_requests')
    .insert([payload]);

  if (error) {
    console.error('Erro ao salvar cotação no Supabase:', error);
    return { ok: false, reason: error.message };
  }

  return { ok: true };
};
