/* ============================================
   Module Common JS
   Lógica compartilhada entre o hub e todas as
   páginas de módulo: tema, reset de progresso,
   botões de copiar código, checklist de exercícios
   e o botão de concluir módulo (agora como toggle).

   Centralizar isso aqui evita que um bug (como um
   erro de digitação) precise ser corrigido em N
   arquivos e evita que cada módulo novo reintroduza
   os mesmos problemas.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const htmlEl = document.documentElement;

    const updateThemeIcon = (theme) => {
      if (!sunIcon || !moonIcon) return;
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
    };

    // Sincroniza o ícone com o tema já aplicado pelo script anti-flash
    updateThemeIcon(htmlEl.getAttribute('data-theme'));

    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('html_curso_theme', next);
      updateThemeIcon(next);
    });
  }

  // ===== RESET PROGRESS =====
  // Cobre tanto o botão da sidebar (#btnResetProgress) quanto o
  // botão do card de progresso no hub (#btnResetHub).
  document.querySelectorAll('#btnResetProgress, #btnResetHub').forEach((btn) => {
    btn.addEventListener('click', () => {
      const confirmed = confirm(
        'Tem certeza que deseja resetar todo o seu progresso?\n\n' +
        'Esta ação apagará todos os módulos concluídos e checkboxes marcados. Não pode ser desfeita.'
      );
      if (confirmed) {
        ProgressTracker.reset();
        alert('Progresso resetado com sucesso! A página será recarregada.');
        location.reload();
      }
    });
  });

  // ===== COPY CODE BUTTONS =====
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.copyTarget;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const preEl = targetEl.querySelector('pre');
      if (!preEl) return;
      const codeText = preEl.innerText;

      try {
        await navigator.clipboard.writeText(codeText);
      } catch (err) {
        // Fallback para navegadores/contexto sem permissão de clipboard
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      const textEl = btn.querySelector('.copy-btn-text');
      const originalText = textEl ? textEl.textContent : '';
      btn.classList.add('copied');
      if (textEl) textEl.textContent = 'Copiado!';
      setTimeout(() => {
        btn.classList.remove('copied');
        if (textEl) textEl.textContent = originalText;
      }, 2000);
    });
  });

  // ===== EXERCISE CHECKLIST =====
  // O id do módulo vem do atributo data-module da própria lista,
  // então não precisa ser repetido/hardcoded em cada arquivo.
  const checklist = document.getElementById('exercise-checklist');
  if (checklist) {
    const moduleId = checklist.dataset.module;
    const checklistKey = 'html_curso_exercises_module_' + moduleId;
    let checkedSteps = {};

    try {
      const stored = localStorage.getItem(checklistKey);
      if (stored) checkedSteps = JSON.parse(stored);
    } catch (e) {
      checkedSteps = {};
    }

    checklist.querySelectorAll('li').forEach((li) => {
      const step = li.dataset.step;
      const checkbox = li.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      // Restaura o estado salvo
      if (checkedSteps[step]) {
        checkbox.checked = true;
        li.classList.add('checked');
      }

      li.addEventListener('click', (e) => {
        if (e.target.tagName === 'LABEL') return; // label já alterna o checkbox sozinha
        if (e.target.tagName !== 'INPUT') {
          checkbox.checked = !checkbox.checked;
        }
        checkedSteps[step] = checkbox.checked;
        li.classList.toggle('checked', checkbox.checked);
        localStorage.setItem(checklistKey, JSON.stringify(checkedSteps));
      });
    });
  }

  // ===== MODULE COMPLETION (TOGGLE) =====
  const btnComplete = document.getElementById('btnComplete');
  const btnNext = document.getElementById('btnNext');

  if (btnComplete) {
    const moduleId = parseInt(btnComplete.dataset.module, 10);
    const defaultLabel = btnComplete.innerHTML; // texto original, ex: "Marcar como Concluído"
    const completedLabel = '<span>✓</span><span>Concluído (clique para reabrir)</span>';

    const updateCompletionUI = () => {
      const done = ProgressTracker.isCompleted(moduleId);
      btnComplete.classList.toggle('completed', done);
      btnComplete.innerHTML = done ? completedLabel : defaultLabel;

      if (btnNext) {
        btnNext.style.opacity = done ? '1' : '0.5';
        btnNext.style.pointerEvents = done ? 'auto' : 'none';
      }
    };

    updateCompletionUI();

    btnComplete.addEventListener('click', () => {
      const isDone = ProgressTracker.isCompleted(moduleId);
      if (isDone) {
        ProgressTracker.markIncomplete(moduleId);
      } else {
        ProgressTracker.markComplete(moduleId);
      }
      btnComplete.style.transform = 'scale(1.05)';
      setTimeout(() => { btnComplete.style.transform = ''; }, 200);
      updateCompletionUI();
    });
  }

  // ===== HUB: MODULE CARDS CLICKABLE =====
  // Os cards da página inicial (index.html) usam data-href para
  // navegar ao módulo correspondente, assim como já funciona na sidebar.
  document.querySelectorAll('.module-card[data-href]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

});
