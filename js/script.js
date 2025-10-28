const SUPABASE_URL = 'https://sbiqaeavemybpezpfwzp.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiaXFhZWF2ZW15YnBlenBmd3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDY3ODUsImV4cCI6MjA3NzE4Mjc4NX0.JR0RxL0qXP5V0GSahV4nOoesxY2SElYwGO9M-krBKgU'; 
const TABLE_NAME = 'contatos'; 

const form = document.getElementById('contactForm');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
            form.reset();
        } else {
            throw new Error('Erro ao enviar dados para o banco de dados.');
        }
    } catch (error) {
        console.error('Erro de envio:', error);
        alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
        
        submitButton.textContent = 'Enviar Mensagem';
        submitButton.disabled = false;
    }
});