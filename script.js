
const resources = [
  {
    title: "Introduction to Basic Life Support",
    file: "1. Introduction to Basic Life Support SLIDE.pdf",
    category: "notes",
    description: "Foundations and introductory lecture slides for Basic Life Support.",
    topic: "Introduction • BLS"
  },
  {
    title: "Airway and Breathing Emergency",
    file: "2. Airway and Breathing Emercency - Copy.pdf",
    category: "notes",
    description: "Hypoxia, breathing emergencies, asthma, choking and inhalation injuries.",
    topic: "Airway • Breathing"
  },
  {
    title: "Cardiovascular Emergencies and CPR",
    file: "3. Cardiovascular emergencies and CPR.pdf",
    category: "notes",
    description: "Cardiovascular conditions, angina, heart attack, stroke, CPR and AED.",
    topic: "Cardiovascular • CPR"
  },
  {
    title: "Wounds and Bleeding",
    file: "4. Wounds and Bleeding.pdf",
    category: "notes",
    description: "Dressings, bandages, wounds, bleeding and injury care.",
    topic: "Wounds • Bleeding"
  },
  {
    title: "Bone and Joint Injuries",
    file: "5_Bone and Joint Injuries.pdf",
    category: "notes",
    description: "Fractures, dislocations, sprains and other musculoskeletal injuries.",
    topic: "Bones • Joints"
  },
  {
    title: "Other First Aid Emergencies",
    file: "6_Other  Emergencies.pdf",
    category: "notes",
    description: "Diabetes, seizures, poisoning, heat and cold emergencies.",
    topic: "Other emergencies"
  },
  {
    title: "Basic Life Support",
    file: "BASIC LIFE SUPPORT.pdf",
    category: "notes",
    description: "Comprehensive undergraduate notes on Basic Life Support.",
    topic: "BLS • Undergraduate notes"
  },
  {
    title: "Basic Life Support and Emergency Care Notes",
    file: "Basic Life support and emergency care notes (2).pdf",
    category: "notes",
    description: "Additional notes covering Basic Life Support and emergency care.",
    topic: "BLS • Emergency care"
  },
  {
    title: "HSU 100 Past Paper",
    file: "HSU 100 Past paper.pdf",
    category: "past",
    description: "HSU 100 Basic Life Support and Emergency Care examination paper.",
    topic: "Past paper"
  },
  {
    title: "HSU 100 Past Papers — Ogutu Rollines Melvin",
    file: "HSU 100 past papers BY OGUTU ROLLINES MELVIN .pdf",
    category: "past",
    description: "A collection of HSU 100 examination papers for revision practice.",
    topic: "Past papers"
  }
];

const grid = document.getElementById('resourceGrid');
const search = document.getElementById('searchInput');
const empty = document.getElementById('emptyState');
const count = document.getElementById('visibleCount');

let activeFilter = 'all';

function safeFile(name) {
  return 'pdfs/' + encodeURIComponent(name).replace(/%2F/g, '/');
}

function render() {
  const q = search.value.trim().toLowerCase();

  const filtered = resources.filter(r =>
    (activeFilter === 'all' || r.category === activeFilter) &&
    (`${r.title} ${r.description} ${r.topic} ${r.file}`)
      .toLowerCase()
      .includes(q)
  );

  count.textContent = filtered.length;
  empty.hidden = filtered.length !== 0;

  grid.innerHTML = filtered.map(r => `
    <article class="resource-card">
      <div class="card-top">
        <div class="file-icon">▤</div>
        <span class="tag ${r.category === 'past' ? 'past' : ''}">
          ${r.category === 'past' ? 'Past paper' : 'Lecture notes'}
        </span>
      </div>

      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml(r.description)}</p>

      <div class="card-bottom">
        <span class="file-type">PDF DOCUMENT</span>

        <div class="card-buttons">
          <button
            data-open="${escapeHtml(r.file)}"
            data-title="${escapeHtml(r.title)}">
            Read PDF ↗
          </button>

          <a href="${safeFile(r.file)}" download>↓ Save</a>
        </div>
      </div>
    </article>
  `).join('');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

search.addEventListener('input', render);

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b =>
      b.classList.remove('active')
    );

    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });
});

const modal = document.getElementById('pdfModal');
const frame = document.getElementById('pdfFrame');
const title = document.getElementById('modalTitle');
const download = document.getElementById('downloadLink');
const openNewTab = document.getElementById('openNewTab');

grid.addEventListener('click', e => {
  const btn = e.target.closest('[data-open]');

  if (!btn) return;

  const url = safeFile(btn.dataset.open);

  title.textContent = btn.dataset.title;
  frame.src = url;
  download.href = url;
  download.download = btn.dataset.open;
  openNewTab.href = url;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
});

function closeViewer() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  frame.src = 'about:blank';
  document.body.style.overflow = '';
}

document.getElementById('closeModal')
  .addEventListener('click', closeViewer);

modal.addEventListener('click', e => {
  if (e.target === modal) closeViewer();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeViewer();
  }
});

document.getElementById('year').textContent =
  new Date().getFullYear();

render();
        
