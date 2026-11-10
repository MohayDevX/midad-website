const projects = [
  { id: 1, title: "تصميم تجربة متجر إلكتروني للأزياء", company: "نواة الرقمية", symbol: "N", color: "#ede6f5", ink: "#806b98", verified: true, ago: "منذ ساعتين", category: "design", description: "نبحث عن مصمم UX/UI لتطوير تجربة تسوق سهلة وأنيقة لمتجر أزياء ناشئ. المطلوب تصميم الصفحات الأساسية وتجهيز ملف Figma للتسليم.", tags: ["تصميم UX/UI", "Figma", "متوسط الخبرة"], budget: "٨٬٠٠٠ – ١٢٬٠٠٠ ج.م", proposals: "٨ عروض", time: 2 },
  { id: 2, title: "تطوير موقع تعريفي لشركة استشارات", company: "أثر للاستشارات", symbol: "أ", color: "#e5eee4", ink: "#547353", verified: true, ago: "منذ ٤ ساعات", category: "development", description: "موقع سريع ومتجاوب يعرّف بخدماتنا ويعرض دراسات الحالة. نحتاج مطورًا يهتم بالتفاصيل وتجربة الاستخدام على الهاتف.", tags: ["تطوير ويب", "React", "متجاوب"], budget: "١٥٬٠٠٠ – ٢٢٬٠٠٠ ج.م", proposals: "١٢ عرض", time: 4 },
  { id: 3, title: "إدارة حملة إطلاق منتج على إنستجرام", company: "بلوم ستوديو", symbol: "B", color: "#f5e8db", ink: "#a17349", verified: false, ago: "منذ ٦ ساعات", category: "marketing", description: "خطة محتوى وحملة إطلاق لمدة شهر لمنتج عناية بالبشرة. نرحب بأفكار إبداعية وأمثلة لأعمال سابقة.", tags: ["تسويق رقمي", "إنستجرام", "حملة شهرية"], budget: "٦٬٠٠٠ – ٩٬٠٠٠ ج.م", proposals: "٥ عروض", time: 6 },
  { id: 4, title: "كتابة محتوى صفحات موقع تعليمي", company: "مدرسة أونلاين", symbol: "م", color: "#e4ebf3", ink: "#607c9a", verified: true, ago: "منذ ٩ ساعات", category: "writing", description: "كتابة نصوص واضحة وجذابة للصفحة الرئيسية وصفحات البرامج التعليمية، بأسلوب قريب من الطلاب وأولياء الأمور.", tags: ["كتابة محتوى", "تعليم", "عربي"], budget: "٣٬٥٠٠ – ٥٬٠٠٠ ج.م", proposals: "١٧ عرض", time: 9 },
  { id: 5, title: "هوية بصرية لمقهى مختص", company: "قهوة حكاية", symbol: "ح", color: "#efe7df", ink: "#916c4c", verified: true, ago: "منذ يوم", category: "design", description: "نحتاج هوية مرنة تشمل الشعار ولوحة الألوان وتطبيقات أساسية على التغليف ووسائل التواصل.", tags: ["هوية بصرية", "Illustrator", "شعار"], budget: "٧٬٠٠٠ – ١٠٬٠٠٠ ج.م", proposals: "٢١ عرض", time: 24 },
  { id: 6, title: "تحسين سرعة وأداء متجر ووكومرس", company: "بيت النبتة", symbol: "ب", color: "#e9efd9", ink: "#668042", verified: false, ago: "منذ يوم", category: "development", description: "متجرنا يحتاج مراجعة الأداء وتحسين وقت التحميل وتجربة الشراء على الهاتف. نفضل مشاركة تقرير قبل وبعد التنفيذ.", tags: ["WordPress", "أداء", "WooCommerce"], budget: "٤٬٠٠٠ – ٧٬٠٠٠ ج.م", proposals: "٦ عروض", time: 26 },
  { id: 7, title: "خطة محتوى شهرية لعلامة أزياء", company: "خيط ولون", symbol: "خ", color: "#f1e4eb", ink: "#9b6b85", verified: true, ago: "منذ يومين", category: "marketing", description: "إعداد تقويم محتوى شهري وأفكار ريلز تستهدف المهتمين بالموضة المستدامة في السوق المصري.", tags: ["استراتيجية محتوى", "سوشيال ميديا", "أزياء"], budget: "٥٬٠٠٠ – ٨٬٠٠٠ ج.م", proposals: "١١ عرض", time: 48 },
  { id: 8, title: "ترجمة وتحرير دليل استخدام تطبيق", company: "فلك للتقنية", symbol: "ف", color: "#e1ecec", ink: "#588080", verified: true, ago: "منذ ٣ أيام", category: "writing", description: "ترجمة احترافية من الإنجليزية للعربية لدليل مستخدم تطبيق مالي مع توحيد المصطلحات ومراجعة لغوية.", tags: ["ترجمة", "تحرير", "تقنية"], budget: "٢٬٠٠٠ – ٣٬٥٠٠ ج.م", proposals: "١٤ عرض", time: 72 }
];

const categoryMap = { "تصميم": "design", "تطوير": "development", "تسويق": "marketing", "كتابة": "writing" };
const projectList = document.querySelector("#project-list");
const searchInput = document.querySelector("#project-search");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const saved = new Set(JSON.parse(localStorage.getItem("midad-saved-projects") || "[]"));
let category = "all";
let expanded = false;
let newestFirst = true;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderProjects() {
  const query = searchInput.value.trim().toLocaleLowerCase("ar");
  let visible = projects.filter(project => {
    const matchesCategory = category === "all" || project.category === category;
    const searchable = `${project.title} ${project.company} ${project.description} ${project.tags.join(" ")}`.toLocaleLowerCase("ar");
    return matchesCategory && searchable.includes(query);
  });
  visible.sort((a, b) => newestFirst ? a.time - b.time : b.time - a.time);
  const shown = expanded ? visible : visible.slice(0, 4);
  projectList.innerHTML = shown.map(project => `
    <article class="project-card">
      <div class="project-card-top">
        <div class="project-client">
          <span class="client-logo" style="background:${project.color};color:${project.ink}">${project.symbol}</span>
          <span><b>${project.company}${project.verified ? '<span class="client-check" aria-label="جهة موثقة"> ✓</span>' : ""}</b><small>${project.verified ? "جهة موثقة" : "عميل جديد"} · ${project.ago}</small></span>
        </div>
        <button class="save-button${saved.has(project.id) ? " saved" : ""}" data-save="${project.id}" aria-label="${saved.has(project.id) ? "إزالة من" : "إضافة إلى"} المحفوظات" aria-pressed="${saved.has(project.id)}">${saved.has(project.id) ? "♥" : "♡"}</button>
      </div>
      <h3>${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-meta"><span>${project.tags[0]}</span>${project.tags.slice(1).map(tag => `<span>${tag}</span>`).join("")}</div>
      <div class="project-card-bottom"><span class="budget-label">الميزانية المتوقعة<strong>${project.budget}</strong></span><span class="proposal-count">${project.proposals}</span><button class="apply-button" data-apply="${project.id}">قدّم عرضك <span>←</span></button></div>
    </article>`).join("");
  emptyState.hidden = visible.length > 0;
  document.querySelector("#load-more").hidden = visible.length <= 4;
  document.querySelector("#load-more").innerHTML = expanded ? 'عرض أقل <span>↑</span>' : 'عرض مشاريع أكتر <span>↓</span>';
}

function updateSavedCount() {
  document.querySelector("#saved-count").textContent = new Intl.NumberFormat("ar-EG").format(saved.size);
  localStorage.setItem("midad-saved-projects", JSON.stringify([...saved]));
}

document.querySelector(".category-filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  category = button.dataset.category;
  document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("selected", chip === button));
  expanded = false;
  renderProjects();
});
searchInput.addEventListener("input", () => { expanded = false; renderProjects(); });
document.querySelector("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  category = "all";
  document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("selected", chip.dataset.category === "all"));
  renderProjects();
});
document.querySelector("#load-more").addEventListener("click", () => { expanded = !expanded; renderProjects(); });
document.querySelector("#sort-button").addEventListener("click", event => {
  newestFirst = !newestFirst;
  event.currentTarget.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M7 12h10m-7 5h4"/></svg> ${newestFirst ? "الأحدث" : "الأقدم"} <span>⌄</span>`;
  renderProjects();
});
projectList.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    saved.has(id) ? saved.delete(id) : saved.add(id);
    updateSavedCount();
    renderProjects();
    showToast(saved.has(id) ? "اتحفظ المشروع في قائمتك" : "اتشال المشروع من المحفوظات");
    return;
  }
  const applyButton = event.target.closest("[data-apply]");
  if (applyButton) showToast("سجّل دخولك عشان تقدّم عرضك على المشروع");
});
document.querySelectorAll("[data-toast]").forEach(button => button.addEventListener("click", () => showToast(button.dataset.toast)));
document.querySelectorAll("[data-modal-open]").forEach(button => button.addEventListener("click", () => document.querySelector(`#${button.dataset.modalOpen}`).showModal()));
document.querySelector("#project-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const project = Object.fromEntries(new FormData(form));
  localStorage.setItem("midad-project-draft", JSON.stringify(project));
  document.querySelector("#project-modal").close();
  form.reset();
  showToast("اتحفظت مسودة مشروعك على الجهاز بنجاح");
});
document.querySelector(".menu-toggle").addEventListener("click", event => {
  const nav = document.querySelector(".main-nav");
  const open = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
}));
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

updateSavedCount();
renderProjects();
