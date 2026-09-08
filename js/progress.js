/* ============================================
   Progress JS: LocalStorage Tracking & UI Updates
   ============================================ */

const ProgressTracker = {
  STORAGE_KEY: 'html_curso_progress',
  TOTAL_MODULES: 9,

  init() {
    this.load();
    this.updateUI();
    console.log('[ProgressTracker] Inicializado. Concluídos:', this.data.completed);
  },

  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      this.data = stored ? JSON.parse(stored) : { completed: [], current: null };
    } catch (e) {
      this.data = { completed: [], current: null };
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('[ProgressTracker] Não foi possível salvar no localStorage');
    }
  },

  markComplete(moduleId) {
    moduleId = parseInt(moduleId);
    if (!this.data.completed.includes(moduleId)) {
      this.data.completed.push(moduleId);
      this.save();
      this.updateUI();
      console.log('[ProgressTracker] Módulo', moduleId, 'concluído!');
      return true;
    }
    return false;
  },

  markIncomplete(moduleId) {
    moduleId = parseInt(moduleId);
    this.data.completed = this.data.completed.filter(id => id !== moduleId);
    this.save();
    this.updateUI();
    console.log('[ProgressTracker] Módulo', moduleId, 'desmarcado.');
  },

  setCurrent(moduleId) {
    this.data.current = moduleId;
    this.save();
  },

  isCompleted(moduleId) {
    return this.data.completed.includes(parseInt(moduleId));
  },

  isUnlocked(moduleId) {
    moduleId = parseInt(moduleId);
    if (moduleId === 1) return true;
    return this.isCompleted(moduleId - 1);
  },

  getProgressPercent() {
    return Math.round((this.data.completed.length / this.TOTAL_MODULES) * 100);
  },

  updateUI() {
    // Update global progress bar
    const progressFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-percent');
    const progressCount = document.querySelector('.progress-count');

    if (progressFill) {
      progressFill.style.width = `${this.getProgressPercent()}%`;
    }
    if (progressText) {
      progressText.textContent = `${this.getProgressPercent()}%`;
    }
    if (progressCount) {
      progressCount.textContent = `${this.data.completed.length}/${this.TOTAL_MODULES}`;
    }

    // Update module cards on hub
    document.querySelectorAll('[data-module-id]').forEach(card => {
      const moduleId = parseInt(card.dataset.moduleId);
      const statusEl = card.querySelector('.module-status');

      if (!statusEl) return;

      if (this.isCompleted(moduleId)) {
        card.classList.remove('module-card-locked');
        statusEl.className = 'module-status status-completed';
        statusEl.innerHTML = '✓ Concluído';
      } else if (this.isUnlocked(moduleId)) {
        card.classList.remove('module-card-locked');
        statusEl.className = 'module-status status-progress';
        statusEl.innerHTML = '▶ Disponível';
      } else {
        card.classList.add('module-card-locked');
        statusEl.className = 'module-status status-locked';
        statusEl.innerHTML = '🔒 Bloqueado';
      }
    });

    // Update sidebar links — nunca mostra cadeado
    document.querySelectorAll('.sidebar-link[data-module-id]').forEach(link => {
      const moduleId = parseInt(link.dataset.moduleId);
      const numberEl = link.querySelector('.sidebar-link-number');

      if (!numberEl) return;

      if (this.isCompleted(moduleId)) {
        numberEl.style.background = '#10b981';
        numberEl.innerHTML = '✓';
      } else {
        numberEl.style.background = 'var(--color-primary)';
        numberEl.innerHTML = moduleId;
      }
    });
  }
};

// Initialize immediately when script loads
ProgressTracker.init();
