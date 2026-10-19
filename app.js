const { experience, skills, credentials } = window.portfolio;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
document.querySelector('#experience-list').innerHTML = experience.map((job, index) => `
  <details class="job" data-skills="${job.skills.join(' ')}" ${index === 0 ? 'open' : ''}>
    <summary><span class="job-date">${escapeHTML(job.dates)}${job.type ? `<small>${escapeHTML(job.type)}</small>` : ''}</span><span class="job-heading"><strong>${escapeHTML(job.company)}</strong><span>${escapeHTML(job.role)}</span><span class="job-summary">${escapeHTML(job.summary)}</span></span><span class="expand-icon" aria-hidden="true">+</span></summary>
    <div class="job-body"><ul>${job.bullets.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul><div class="tags">${job.tools.map(tool => `<span>${escapeHTML(tool)}</span>`).join('')}</div></div>
  </details>`).join('');
document.querySelector('#skill-grid').innerHTML = skills.map((skill, index) => `<article><span class="skill-number">0${index + 1}</span><h3>${escapeHTML(skill.title)}</h3><h4>${escapeHTML(skill.subtitle)}</h4><p>${escapeHTML(skill.items)}</p></article>`).join('');
document.querySelector('#credentials-list').innerHTML = credentials.map(cert => `<article class="credential ${cert.accent ? 'featured' : ''}"><span aria-hidden="true">${cert.accent ? '✧' : '↗'}</span><p class="eyebrow">${escapeHTML(cert.issuer)}</p><h3>${escapeHTML(cert.title)}</h3></article>`).join('');
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('.job').forEach(job => {
    const matches = selected === 'all' || job.dataset.skills.split(' ').includes(selected);
    job.classList.toggle('highlighted', selected !== 'all' && matches);
    job.classList.toggle('deemphasized', !matches);
    if (matches) { count++; if (selected !== 'all') job.open = true; }
  });
  document.querySelector('#filter-status').textContent = selected === 'all' ? 'Showing all experience.' : `${count} ${count === 1 ? 'role highlights' : 'roles highlight'} ${button.textContent.toLowerCase()}. All roles remain available.`;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
