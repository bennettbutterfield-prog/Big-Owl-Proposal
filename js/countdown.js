(function () {
  function endOfApril15(year) {
    return new Date(year, 3, 15, 23, 59, 59, 999);
  }

  function getDeadline() {
    var now = new Date();
    var y = now.getFullYear();
    var end = endOfApril15(y);
    if (now > end) return null;
    return end;
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /** Same day/h/m/s split as the banner clock — one source of truth */
  function splitRemaining(ms) {
    if (ms <= 0) return null;
    var sec = Math.floor(ms / 1000);
    var d = Math.floor(sec / 86400);
    sec %= 86400;
    var h = Math.floor(sec / 3600);
    sec %= 3600;
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return { days: d, h: h, m: m, s: s };
  }

  function formatRemaining(ms) {
    var parts = splitRemaining(ms);
    if (!parts) return null;
    var d = parts.days;
    var out = [];
    if (d > 0) out.push(d + (d === 1 ? ' day' : ' days'));
    out.push(pad(parts.h) + ':' + pad(parts.m) + ':' + pad(parts.s));
    return out.join(' · ');
  }

  /** Phrase for full calendar days left (matches banner’s day count) */
  function daysPhrase(parts) {
    if (!parts) return '';
    var d = parts.days;
    if (d > 1) return d + ' days';
    if (d === 1) return '1 day';
    return 'Less than a day';
  }

  function applyExpiredCopy() {
    var openingH2Line1 = document.getElementById('opening-h2-line1');
    var closeDaysEyebrow = document.getElementById('close-days-eyebrow');
    var closeSeasonOpens = document.getElementById('close-season-opens');

    if (openingH2Line1) {
      openingH2Line1.textContent = 'Launch & grow — all season long.';
    }
    if (closeDaysEyebrow) {
      closeDaysEyebrow.textContent = 'One season. One decision.';
    }
    if (closeSeasonOpens) {
      closeSeasonOpens.textContent = 'The season is moving fast.';
    }
  }

  function run() {
    var banner = document.getElementById('countdown-banner');
    var display = document.getElementById('countdown-display');
    var openingDaysHeadline = document.getElementById('opening-days-headline');
    var closeDaysEyebrow = document.getElementById('close-days-eyebrow');
    var closeSeasonOpens = document.getElementById('close-season-opens');

    var deadline = getDeadline();
    if (!deadline) {
      if (banner) banner.setAttribute('hidden', '');
      document.body.classList.add('countdown-expired');
      applyExpiredCopy();
      return;
    }

    document.body.classList.add('has-countdown-banner');
    if (banner) banner.removeAttribute('hidden');

    function tick() {
      var left = deadline.getTime() - Date.now();
      var parts = splitRemaining(left);
      var text = formatRemaining(left);

      if (!text || !parts) {
        if (banner) banner.setAttribute('hidden', '');
        document.body.classList.remove('has-countdown-banner');
        document.body.classList.add('countdown-expired');
        applyExpiredCopy();
        return;
      }

      if (display) display.textContent = text;

      var dayStr = daysPhrase(parts);
      if (openingDaysHeadline) openingDaysHeadline.textContent = dayStr;

      if (closeDaysEyebrow) {
        closeDaysEyebrow.textContent = dayStr + '. One Decision.';
      }

      if (closeSeasonOpens) {
        var d = parts.days;
        if (d >= 1) {
          closeSeasonOpens.textContent =
            'The season opens in ' + (d === 1 ? '1 day' : d + ' days') + '.';
        } else {
          closeSeasonOpens.textContent = 'The season opens in less than a day.';
        }
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
