// ============================================
//   원격 클라우드폰 — 싸이월드 감성 스크립트
// ============================================

// ── 반짝이 별 생성 ──────────────────────────
(function createStars() {
  var container = document.getElementById('stars');
  if (!container) return;
  var symbols = ['★', '☆', '✦', '✧', '✩', '♡', '♥', '◆', '◇'];
  var colors  = ['#ffe04b','#ff99dd','#bbaaff','#99ddff','#ffbbee','#ffffff'];
  for (var i = 0; i < 40; i++) {
    var el = document.createElement('span');
    el.className = 'star-item';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = (Math.random() * 100).toFixed(1) + '%';
    el.style.top  = (Math.random() * 100).toFixed(1) + '%';
    el.style.fontSize = (8 + Math.random() * 14).toFixed(0) + 'px';
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay    = (Math.random() * 3).toFixed(2) + 's';
    el.style.animationDuration = (1 + Math.random() * 2.5).toFixed(2) + 's';
    el.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
    container.appendChild(el);
  }
})();

// ── 클릭 시 하트 떠오르기 ───────────────────
document.addEventListener('click', function(e) {
  var hearts = ['♥','❤','♡','💕','💖','💗'];
  var el = document.createElement('span');
  el.className = 'heart-item';
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.left     = (e.clientX - 8) + 'px';
  el.style.top      = (e.clientY - 8) + 'px';
  el.style.position = 'fixed';
  el.style.fontSize = (12 + Math.random() * 10).toFixed(0) + 'px';
  el.style.zIndex   = '99999';
  el.style.pointerEvents = 'none';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 3000);
});

// ── 구매 모달 열기 ───────────────────────────
function openOrder(chipName, price) {
  var bg        = document.getElementById('modal-bg');
  var chipInfo  = document.getElementById('modal-chip-info');
  var priceInfo = document.getElementById('modal-price-info');
  chipInfo.innerHTML  = '&#128241; ' + chipName;
  priceInfo.innerHTML = '$' + price + ' <span style="font-size:12px;color:#999;font-weight:normal;">/월</span>';
  bg.classList.add('active');
}

// ── 모달 닫기 (배경 클릭) ────────────────────
function closeModal(e) {
  if (e.target.id === 'modal-bg') {
    e.target.classList.remove('active');
  }
}

// ── 계좌번호 복사 ────────────────────────────
function copyAccount() {
  copyText('29650207718501', '우리은행 계좌번호가 복사되었습니다! ♥');
}

// ── 디스코드 ID 복사 ─────────────────────────
function copyDiscord() {
  copyText('robuxkorea', '디스코드 ID가 복사되었습니다! ♥');
}

function copyText(text, msg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(function() { showToast(msg); })
      .catch(function() { fallbackCopy(text, msg); });
  } else {
    fallbackCopy(text, msg);
  }
}

function fallbackCopy(text, msg) {
  var el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(el);
  showToast(msg);
}

// ── 토스트 알림 ──────────────────────────────
function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function() {
    toast.classList.remove('show');
  }, 2400);
}

// ── FAQ 토글 ─────────────────────────────────
function toggleFaq(el) {
  // 다른 항목 닫기 (아코디언)
  var all = document.querySelectorAll('.faq-item');
  all.forEach(function(item) {
    if (item !== el) item.classList.remove('open');
  });
  el.classList.toggle('open');
}

// ── ESC 키로 모달 닫기 ───────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('modal-bg').classList.remove('active');
  }
});

// ── 부드러운 앵커 이동 ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var href   = this.getAttribute('href');
    var target = document.querySelector(href) || document.querySelector('a[name="' + href.slice(1) + '"]');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 페이지 로드 환영 토스트 ──────────────────
window.addEventListener('load', function() {
  setTimeout(function() {
    showToast('☆ 원격 클라우드폰에 오신걸 환영합니다! ☆');
  }, 800);
});
