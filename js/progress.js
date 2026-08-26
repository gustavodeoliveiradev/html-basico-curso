/* ============================================
   Progress JS: LocalStorage Tracking & UI Updates
   ============================================ */

const ProgressTracker = {
  STORAGE_KEY: 'html_curso_progress',
  TOTAL_MODULES: 9,

  init() {
    this.load();
    this.updateUI();
  },

  load() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.data = stored ? JSON.parse(stored) : { completed: [], current: null };
  },

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  },

  markComplete(moduleId) {
    if (!this.data.completed.includes(moduleId)) {
      this.data.completed.push(moduleId);
      this.save();
      this.updateUI();
    }
  },

  markIncomplete(moduleId) {
    this.data.completed = this.data.completed.filter(id => id !== moduleId);
    this.save();
    this.updateUI();
  },

  setCurrent(moduleId) {
    this.data.current = moduleId;
    this.save();
    this.updateUI();
  },

  isCompleted(moduleId) {
    return this.data.completed.includes(moduleId);
  },

  isUnlocked(moduleId) {
    // Module 1 is always unlocked
    if (moduleId === 1) return true;
    // Others unlock when previous is completed
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

    // Update module cards
    document.querySelectorAll('[data-module-id]').forEach(card => {
      const moduleId = parseInt(card.dataset.moduleId);
      const statusEl = card.querySelector('.module-status');

      if (this.isCompleted(moduleId)) {
        card.classList.remove('module-card-locked');
        if (statusEl) {
          statusEl.className = 'module-status status-completed';
          statusEl.innerHTML = '✓ Concluído';
        }
      } else if (this.isUnlocked(moduleId)) {
        card.classList.remove('module-card-locked');
        if (statusEl) {
          statusEl.className = 'module-status status-progress';
          statusEl.innerHTML = '▶ Disponível';
        }
      } else {
        card.classList.add('module-card-locked');
        if (statusEl) {
          statusEl.className = 'module-status status-locked';
          statusEl.innerHTML = '🔒 Bloqueado';
        }
      }
    });

    // Update sidebar links
    document.querySelectorAll('.sidebar-link[data-module-id]').forEach(link => {
      const moduleId = parseInt(link.dataset.moduleId);
      const numberEl = link.querySelector('.sidebar-link-number');

      if (this.isCompleted(moduleId)) {
        numberEl.style.background = '#10b981';
        numberEl.innerHTML = '✓';
      } else if (this.isUnlocked(moduleId)) {
        numberEl.style.background = 'var(--color-primary)';
        numberEl.innerHTML = moduleId;
      } else {
        numberEl.style.background = 'var(--text-muted)';
        numberEl.innerHTML = '🔒';
      }
    });
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  ProgressTracker.init();
});

// Demo: allow clicking cards to toggle completion (for testing)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.module-card');
  if (card && !card.classList.contains('module-card-locked')) {
    const moduleId = parseInt(card.dataset.moduleId);
    if (moduleId) {
      if (ProgressTracker.isCompleted(moduleId)) {
        ProgressTracker.markIncomplete(moduleId);
      } else {
        ProgressTracker.markComplete(moduleId);
      }
    }
  }
});
